import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UtilsService } from '../../core/services/utils.service';

@Component({
	selector: 'app-detail-request-item',
	templateUrl: './detail-request-item.component.html',
	styleUrls: ['./detail-request-item.component.scss']
})

export class DetailRequestItemComponent implements OnInit {

    hrefId;
    letterPressed: boolean = false;
    isValidId = false;

    status: string;
    requestDate: any;
    name: string;
    point: string;
    time: any;
    reviewDate: any;
    itemType: string;
    reason: string;
    isActive: string;
    quantity: any;
    remarks: string;
    reasonText: string;

    constructor (
        public router: Router,
        public employeeService: EmployeeService,
        public toastr: ToastrService,
        public activatedRoute: ActivatedRoute,
        public utilsService: UtilsService,
    ) { }
    
    ngOnInit () {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            console.log(params);
            this.hrefId = params.id;
            this.getRequestDetail(this.hrefId);
        });
    }

    showSuccess() {
		this.toastr.success('Hello world!', 'Toastr fun!');
	}

	showError(errorMessage) {
        if(errorMessage === '' || errorMessage === null || errorMessage === undefined){
			errorMessage = 'An unknown error occured';
		}
		this.toastr.error(errorMessage);
	}

    getRequestDetail (id) {
        this.employeeService.getItemRequestDetail(id).subscribe(
            response => {
                this.isValidId = true;
                console.log(response);
                this.status = response.status.toLowerCase();
                if(this.status === 'rejected'){
                    this.reasonText = 'Rejection';
                }else if(this.status === 'revoked'){
                    this.reasonText = 'Revocation';
                }else{
                    this.reasonText = 'Approval';
                }
                this.requestDate = this.utilsService.getDateTimeFormat(new Date(response.requestDate));
                this.name = response.requesterDetails[0].name;
                this.isActive = response.isActive;
                this.itemType = response.itemType;
                this.point = response.pickupPoint;
                this.quantity = response.quantity;
                this.remarks = response.remarks;
                this.time = this.utilsService.getDateTimeFormat(new Date(response.pickupTime));
                if (response.status !== 'REQUESTED') {
                    this.reviewDate = this.utilsService.getDateTimeFormat(new Date(response.timestamp));
                } else {
                    this.reviewDate = null;
                }
                this.reason = response.reason;
            },
            error => {
                this.isValidId = false;
                console.log(error);
                this.showError(error.error);
            });
    }

    sureCancel () {
        const buttonSubmitElement = (<HTMLInputElement>document.getElementById('buttonSubmit'));
		buttonSubmitElement.disabled = true;
        
        this.employeeService.cancelItem({
            '_id': this.hrefId
            }).subscribe(
            response => {
                console.log(response);
                this.router.navigate(['/dashboard']).then(() => {
                    window.location.reload();
                });
            },
            error => {
                console.log(error);
                this.showError(error.error);
            });
    }
}
