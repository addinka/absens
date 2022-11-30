import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
	selector: 'app-event-detail',
	templateUrl: './event-detail.component.html',
	styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
	contentID: any;
	contentDetail: any;

	constructor(
		private activatedRoute: ActivatedRoute,
		private employeeService: EmployeeService,
		private toastService: ToastService,
		private router: Router) { }

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe(params => {
			this.contentID = params.contentID;
		});

		this.getContentDetails(this.contentID);
	}

	getContentDetails(id) {
		this.employeeService.getBannerByID(id).subscribe(
			response => {
				console.log(response);
				if (response) {
					this.contentDetail = response;
					this.contentDetail.date = new Date(this.contentDetail.startTime).toLocaleDateString('en-GB');
					this.contentDetail.startTime = new Date(this.contentDetail.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
					this.contentDetail.endTime = new Date(this.contentDetail.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
				}
			}, error => {
				console.log(error);
			}
		);
	}

	registerEvent(id) {
		this.router.navigate(['/profile-confirmation'], {
			queryParams: {
				contentID: id
			}
		});
	}

	joinEvent(link) {
		window.open('//' + link, '_blank');
	}
}
