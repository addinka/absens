import { Component, OnInit, Injector } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import {
	TableModel,
	TableItem,
	TableHeaderItem,
	ModalService,
} from 'carbon-components-angular';
import { UtilsService } from '../../core/services/utils.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-status-details',
	templateUrl: './status-details.component.html',
	styleUrls: ['./status-details.component.scss'],
})
export class StatusDetailsComponent implements OnInit {
	model = new TableModel(); // Instantiate variable to store table data
	dataExist = false;
	responseData: any[] = []; // Store response.edOTSummaryDetails data
	year: any;
	month: any;
	monthName: any;

	months = [
		{
			content: 'January',
		},
		{
			content: 'February',
		},
		{
			content: 'March',
		},
		{
			content: 'April',
		},
		{
			content: 'May',
		},
		{
			content: 'June',
		},
		{
			content: 'July',
		},
		{
			content: 'August',
		},
		{
			content: 'September',
		},
		{
			content: 'October',
		},
		{
			content: 'November',
		},
		{
			content: 'December',
		},
	];

	years = [];

	constructor(
		private activatedRoute: ActivatedRoute,
		protected injector: Injector,
		private employeeService: EmployeeService,
		public modalService: ModalService,
		public utilsService: UtilsService
	) {}

	ngOnInit() {
		this.model.header = [
			new TableHeaderItem({ data: 'DATE' }),
			new TableHeaderItem({ data: 'TIME' }),
			new TableHeaderItem({ data: 'STATUS' })
		];

		const today = new Date();
		this.month = today.getMonth() + 1;
		this.year = today.getFullYear();

		for (let i = 0; i < 5; i++) {
			const newYear = {
				content: this.year - i
			};

			this.years.push(newYear);
		}

		this.monthName = this.months[this.month - 1].content;

		this.getStatusSummary();
	}

	getStatusSummary() {
		this.dataExist = false;
		this.employeeService.getStatusSummary(
			this.year,
			this.month,
		)
		.subscribe(
			response => {
				this.responseData = response;
				const modelData = [];
				if (response !== undefined && response !== null) {
					this.dataExist = true;

					for (let i = 0; i < response.length; i++) {
						let status;

						if (response[i].workMode === 'home' ) {
							status = 'Work from Home';
						} else if (response[i].workMode === 'office' ) {
							status = 'Work from Office';
						} else if (response[i].workMode === 'sick' ) {
							status = 'Sick Leave';
						} else if (response[i].workMode === 'leave' ) {
							status = 'On Leave';
						} else {
							status = response[i].workMode;
						}

						modelData.push([
							new TableItem({ data: this.utilsService.getDateFormat(new Date(response[i].requestDate)) }),
							new TableItem({ data: this.utilsService.getDateTimeFormat(new Date(response[i].requestDate)).split(' ')[1] }),
							new TableItem({ data: status })
						]);
					}
				}

				this.model.data = modelData;
			},
			error => {
				console.log(error);
			}
		);
	}

	onSelectedMonth(event) {
		const selected = event.item.content;

		function findMonthIndex(array, key) {
			for (let i = 0; i < array.length; i++) {
				if (array[i].content === key) {
					return i + 1;
				}
			}
		}

		this.month = findMonthIndex(this.months, selected);

		this.getStatusSummary();
	}

	onSelectedYear(event) {
		const selected = event.item.content;
		this.year = selected;

		this.getStatusSummary();
	}
}
