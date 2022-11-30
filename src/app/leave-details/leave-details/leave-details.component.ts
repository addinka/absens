import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import { UtilsService } from '../../core/services/utils.service';

@Component({
	selector: 'app-leave-details',
	templateUrl: './leave-details.component.html',
	styleUrls: ['./leave-details.component.scss']
})
export class LeaveDetailsComponent implements OnInit {
	year: any;
	month: any;
	monthName: any;
	leaveHistory: any;

	months = [
		{
			content: 'January'
		},
		{
			content: 'February'
		},
		{
			content: 'March'
		},
		{
			content: 'April'
		},
		{
			content: 'May'
		},
		{
			content: 'June'
		},
		{
			content: 'July'
		},
		{
			content: 'August'
		},
		{
			content: 'September'
		},
		{
			content: 'October'
		},
		{
			content: 'November'
		},
		{
			content: 'December'
		}
	];

	years = [];

	constructor(
		private employeeService: EmployeeService,
		private utilsService: UtilsService
	) {}

	ngOnInit() {
		const today = new Date();
		this.month = today.getMonth() + 1;
		this.year = today.getFullYear();

		for (let i = 0; i < 5; i++) {
			const newYear = {
				content: this.year - i
			};

			this.years.push(newYear);
		}

		this.getLeaveDetails();

		this.monthName = this.months[this.month - 1].content;
	}

	onSelectedMonth(event) {
		const selected = event.item.content;
		console.log('Selected: ', selected);

		function findMonthIndex(array, key) {
			for (let i = 0; i < array.length; i++) {
				if (array[i].content === key) {
					return i + 1;
				}
			}
		}

		this.month = findMonthIndex(this.months, selected);

		this.getLeaveDetails();
	}

	onSelectedYear(event) {
		const selected = event.item.content;
		console.log('Selected: ', selected);
		this.year = selected;

		this.getLeaveDetails();
	}

	getLeaveDetails() {
		this.employeeService.getLeaveHistory(
			this.year,
			this.month,
		)
		.subscribe(
			response => {
				this.leaveHistory = response;

				for (let i = 0 ; i < this.leaveHistory.length; i++) {
					this.leaveHistory[i].startDate = new Date(this.leaveHistory[i].startDate).toLocaleDateString('en-GB');
					this.leaveHistory[i].endDate = new Date(this.leaveHistory[i].endDate).toLocaleDateString('en-GB');
				}
				console.log(this.leaveHistory);
			},
			error => {
				console.log(error);
			}
		);
	}
}
