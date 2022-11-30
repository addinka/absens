import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
	selector: 'app-event-see-more',
	templateUrl: './event-see-more.component.html',
	styleUrls: ['./event-see-more.component.scss']
})
export class EventSeeMoreComponent implements OnInit {
	public page: number;
	public pageMax: number;
	public entries: number;
	public contents: any = [];
	public numberOfContents: any;

	constructor(
		public router: Router,
		private employeeService: EmployeeService
	) {
		this.page = 1;
		this.entries = 5;
	}

	ngOnInit() {
		this.getListContent(this.page, this.entries);
	}

	getListContent(page, entries): any {
		this.employeeService.getBannerByPage(page, entries).subscribe(
			response => {
				const data = [];
				console.log(response);
					for (let i = 0; i <  response.docs.length; i++) {
						data.push(response.docs[i]);
						response.docs[i].date = new Date(response.docs[i].startTime).toLocaleDateString('en-GB');
						response.docs[i].startTime = new Date(response.docs[i].startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
						response.docs[i].endTime = new Date(response.docs[i].endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
					}

					this.contents = data;
					console.log(this.contents);

					if (response.count !== 0) {
						this.numberOfContents = response.count;
						this.pageMax = Math.ceil(this.numberOfContents / 5);
						console.log(this.contents);
					} else {
						this.contents = [];
					}
			}, error => {
				console.log(error);
			}
		);
	}

	nextPage() {
		this.page = this.page + 1;
		this.getListContent(this.page, 5);
	}

	changePage(page, change) {
		this.getListContent(page + change, 5);
		this.page = this.page + change;
	}

	previousPage() {
		if (this.page !== 1) {
			this.getListContent(this.page - 1, 5);
			this.page = this.page - 1;
		}
	}

	formatDate(input) {
		const datePart = input.match(/\d+/g);

		const year = datePart[0].substring(2);
		const month = datePart[1];
		const day = datePart[2];

		return day + '/' + month + '/' + year;
	}

	onDetailContent(id) {
		// console.log(id);
		this.router.navigate(['/event-detail'], {
			queryParams: {
				contentID: id
			}
		});
	}

	joinEvent(link) {
		window.open('//' + link, '_blank');
	}
}
