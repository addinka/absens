import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../core/services/manager.service';
import { ModalService } from 'carbon-components-angular';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../core/services/utils.service';

@Component({
	selector: 'app-shift-excel-approval',
	templateUrl: './shift-excel-approval.component.html',
	styleUrls: ['./shift-excel-approval.component.scss']
})

export class ShiftExcelApprovalComponent implements OnInit {
	public excelFile: File;
	public managerShiftUploadList;
	public timestamp;

	constructor(
		private managerService: ManagerService,
		public modalService: ModalService,
		public utilsService: UtilsService,
		public toastr: ToastrService
	) { }

	ngOnInit() {
		this.getShiftRequests();
	}

	getShiftRequests() {
		this.managerService.getManagerUploadRequests('Today', 1000, 1, 'REQUESTED,APPROVED,REJECTED,CANCELLED').subscribe(
			res => {
				for (let i = 0; i < res.docs.length; i++) {
					res.docs[i].timestamp = this.utilsService.getDateFormat(new Date(res.docs[i].timestamp));
				}

				this.managerShiftUploadList = res;
			},
			error => {
				console.log(error);
		});
	}

	approveUpload(id, index) {
		const param = [];
			param.push({_id: id});
			this.managerService.approveExcelUpload(param)
			.subscribe(
				response => {
					this.showSuccess('Succesfully approved shift excel upload request');
					this.managerShiftUploadList.docs.splice(index, 1);
				},
				error => {
					if (error.status === 200) {
						this.showSuccess('Succesfully approved shift excel upload request');
						this.managerShiftUploadList.docs.splice(index, 1);
					} else {
						console.log(error);
						this.showError(error.error);
					}
				});
	}

	rejectUpload(id, index) {
		const param = [];
			param.push({_id: id});
			this.managerService.rejectExcelUpload(param)
			.subscribe(
				response => {
					this.showSuccess('Succesfully rejected shift excel upload request');
					this.managerShiftUploadList.docs.splice(index, 1);
				},
				error => {
					console.log(error);
					this.showError(error.error);
				});
	}

	downloadShiftExcel(id) {
		this.managerService.downloadUploadedExcel(id).subscribe(
			res => {
				this.excelFile = this.blobToFile(res, 'Excel File');
			},
			error => {
				console.log(error);
		});
	}

	onGetExcel(id) {
		this.downloadShiftExcel(id);
		const url = window.URL.createObjectURL(this.excelFile);
		window.open(url, '_blank');
	}

	public blobToFile = (theBlob: Blob, fileName: string): File => {
		const b: any = theBlob;
		// A Blob() is almost a File() - it's just missing the two properties below which we will add
		b.lastModifiedDate = new Date();
		b.name = fileName;

		// Cast to a File() type
		return theBlob as File;
	}

	showSuccess(successMessage) {
		this.toastr.success(successMessage);
	}

	showError(errorMessage) {
		if (errorMessage === '' || errorMessage === null || errorMessage === undefined) {
			errorMessage = 'An unknown error occured';
		}

		this.toastr.error(errorMessage);
	}
}
