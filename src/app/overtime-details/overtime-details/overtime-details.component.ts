import { Component, OnInit, Injector } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import { DetailRequestOvertimeEdComponent } from '../../detail-request-overtime-ed/detail-request-overtime-ed/detail-request-overtime-ed.component';
import { TableModel, TableItem, TableHeaderItem, PaginationModel, ModalService } from 'carbon-components-angular';
import { UtilsService } from '../../core/services/utils.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-overtime-details',
	templateUrl: './overtime-details.component.html',
	styleUrls: ['./overtime-details.component.scss']
})
export class OvertimeDetailsComponent implements OnInit {
	model = new TableModel(); // Instantiate variable to store table data
	convertedModel = new TableModel(); // Instantiate variable to store table data
	paginationModel = new PaginationModel(); // Instantiate variable to store pagination data
	convertedPaginationModel = new PaginationModel(); // Instantiate variable to store pagination data
	itemsPerPage: number[] = [10];
	dataExist = false;
	convertedDataExist = false;
	responseData: any[] = []; // Store response.edOTSummaryDetails data
	convertedData: any[] = []; // Store response.edOTSummaryDetails data
	year: any;
	month: any;
	convertedYear: any;
	convertedMonth: any;
	monthName: any;
	totalHours: any = 0;
	totalPoints: any = 0;
	convertedTotalHours: any = 0;
	convertedTotalPoints: any = 0;
	type: any;
	label1: any;
	label2: any;

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
		private activatedRoute: ActivatedRoute,
		protected injector: Injector,
		private employeeService: EmployeeService,
		public modalService: ModalService,
		public utilsService: UtilsService,
	) {
	 }

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe(params => {
			this.type = params.type;
		});

		console.log(this.type);

		this.model.header = [
			new TableHeaderItem({ data: 'DATE' }),
			new TableHeaderItem({ data: 'TIME IN' }),
			new TableHeaderItem({ data: 'TIME OUT' }),
			new TableHeaderItem({ data: 'HOUR' }),
			new TableHeaderItem({ data: 'POINT' })
		];

		this.paginationModel.pageLength = 10;
		this.paginationModel.currentPage = 0;

		this.convertedModel.header = [
			new TableHeaderItem({ data: 'DATE' }),
			new TableHeaderItem({ data: 'TIME IN' }),
			new TableHeaderItem({ data: 'TIME OUT' }),
			new TableHeaderItem({ data: 'HOUR' }),
			new TableHeaderItem({ data: 'POINT' })
		];

		this.convertedPaginationModel.pageLength = 10;
		this.convertedPaginationModel.currentPage = 0;

		const today = new Date();
		this.month = today.getMonth();
		this.year = today.getFullYear();
		this.convertedMonth = today.getMonth();
		this.convertedYear = today.getFullYear();

		for (let i = 0; i < 5; i++) {
			const newYear = {
				content: this.year - i
			};

			this.years.push(newYear);
		}

		this.monthName = this.months[this.month - 1].content;

		if (this.type === 'overtime') {
			this.getOvertimeSummary();
			this.getConvertedOvertimeSummary();
			this.label1 = 'Overtime';
			this.label2 = 'Converted Overtime';
		} else {
			this.getWorkAssignmentSummary();
			this.getConvertedWorkAssignmentSummary();
			this.label1 = 'Work Assignment';
			this.label2 = 'Converted Work Assignment';
		}
	}

	getOvertimeSummary() {
		this.dataExist = false;
		this.employeeService.getOvertimeSummary(
			this.paginationModel.pageLength,
			this.paginationModel.currentPage + 1,
			this.year,
			this.month,
		)
		.subscribe(
			response => {
				this.responseData = response.edOTSummaryDetails;
				console.log(response);
				this.paginationModel.totalDataLength = response.count;
				const modelData = [];
				if (response.edOTSummaryDetails !== undefined && response.edOTSummaryDetails !== null) {
					this.dataExist = true;
					for (let i = 0; i < response.edOTSummaryDetails.length; i++) {
						modelData.push([
							new TableItem({ data: this.utilsService.getDateFormat(new Date(response.edOTSummaryDetails[i].startdate)) }),
							new TableItem({ data: this.utilsService.getTimeFormat(response.edOTSummaryDetails[i].timein )}),
							new TableItem({ data: this.utilsService.getTimeFormat(response.edOTSummaryDetails[i].timeout) }),
							new TableItem({ data: Number(response.edOTSummaryDetails[i].hours).toFixed(2) }),
							new TableItem({ data: Number(response.edOTSummaryDetails[i].poin).toFixed(2) }),
						]);
					}
				}

				this.totalHours = Number(response.othour).toFixed(2);
				this.totalPoints = Number(response.otpoin).toFixed(2);
				this.model.data = modelData;

				console.log('MODEL DATA: ', this.model.data);
			},
			error => {
				console.log(error);
			}
		);
	}

	getConvertedOvertimeSummary() {
		this.convertedDataExist = false;
		this.employeeService.getConvertedOvertimeSummary(
			this.convertedPaginationModel.pageLength,
			this.convertedPaginationModel.currentPage + 1,
			this.convertedYear,
			this.convertedMonth,
		)
		.subscribe(
			response => {
				this.convertedData = response.edOTConvertedDetails;
				console.log(response);
				this.convertedPaginationModel.totalDataLength = response.countConverted;
				const modelData = [];

				if (response.edOTConvertedDetails !== undefined && response.edOTConvertedDetails !== null) {
					this.convertedDataExist = true;
					for (let i = 0; i < response.edOTConvertedDetails.length; i++) {
						modelData.push([
							new TableItem({ data: this.utilsService.getDateFormat(new Date(response.edOTConvertedDetails[i].startdate)) }),
							new TableItem({ data: this.utilsService.getTimeFormat(response.edOTConvertedDetails[i].timein )}),
							new TableItem({ data: this.utilsService.getTimeFormat(response.edOTConvertedDetails[i].timeout) }),
							new TableItem({ data: Number(response.edOTConvertedDetails[i].hours).toFixed(2) }),
							new TableItem({ data: Number(response.edOTConvertedDetails[i].poin).toFixed(2) }),
						]);
					}
				}

				this.convertedTotalHours = Number(response.otconvertedhour).toFixed(2);
				this.convertedTotalPoints = Number(response.otconvertedpoin).toFixed(2);
				this.convertedModel.data = modelData;

				console.log('MODEL DATA: ', this.convertedModel.data);
			},
			error => {
				console.log(error);
			}
		);
	}

	getWorkAssignmentSummary() {
		this.dataExist = false;
		this.employeeService.getWorkAssignmentSummary(
			this.paginationModel.pageLength,
			this.paginationModel.currentPage + 1,
			this.year,
			this.month,
		)
		.subscribe(
			response => {
				this.responseData = response.edOTSummaryDetails;
				console.log(response);
				this.paginationModel.totalDataLength = response.count;
				const modelData = [];
				if (response.edOTSummaryDetails !== undefined && response.edOTSummaryDetails !== null) {
					this.dataExist = true;
					for (let i = 0; i < response.edOTSummaryDetails.length; i++) {
						modelData.push([
							new TableItem({ data: this.utilsService.getDateFormat(new Date(response.edOTSummaryDetails[i].startdate)) }),
							new TableItem({ data: this.utilsService.getTimeFormat(response.edOTSummaryDetails[i].timein )}),
							new TableItem({ data: this.utilsService.getTimeFormat(response.edOTSummaryDetails[i].timeout) }),
							new TableItem({ data: Number(response.edOTSummaryDetails[i].hours).toFixed(2) }),
							new TableItem({ data: Number(response.edOTSummaryDetails[i].poin).toFixed(2) }),
						]);
					}
				}

				this.totalHours = Number(response.othour).toFixed(2);
				this.totalPoints = Number(response.otpoin).toFixed(2);
				this.model.data = modelData;
			},
			error => {
				console.log(error);
			}
		);
	}

	getConvertedWorkAssignmentSummary() {
		this.convertedDataExist = false;
		this.employeeService.getWorkAssignmentSummary(
			this.convertedPaginationModel.pageLength,
			this.convertedPaginationModel.currentPage + 1,
			this.convertedYear,
			this.convertedMonth,
		)
		.subscribe(
			response => {
				this.convertedData = response.edOTConvertedDetails;
				console.log(response);
				this.convertedPaginationModel.totalDataLength = response.countConverted;
				const modelData = [];

				if (response.edOTConvertedDetails !== undefined && response.edOTConvertedDetails !== null) {
					this.convertedDataExist = true;
					for (let i = 0; i < response.edOTConvertedDetails.length; i++) {
						modelData.push([
							new TableItem({ data: this.utilsService.getDateFormat(new Date(response.edOTConvertedDetails[i].startdate)) }),
							new TableItem({ data: this.utilsService.getTimeFormat(response.edOTConvertedDetails[i].timein )}),
							new TableItem({ data: this.utilsService.getTimeFormat(response.edOTConvertedDetails[i].timeout) }),
							new TableItem({ data: Number(response.edOTConvertedDetails[i].hours).toFixed(2) }),
							new TableItem({ data: Number(response.edOTConvertedDetails[i].poin).toFixed(2) }),
						]);
					}
				}

				this.convertedTotalHours = Number(response.otconvertedhour).toFixed(2);
				this.convertedTotalPoints = Number(response.otconvertedpoin).toFixed(2);
				this.convertedModel.data = modelData;
			},
			error => {
				console.log(error);
			}
		);
	}

	openModal(type, data) {
		console.log(type);
		if (type === 'overtime') {
			type = 'Overtime';
		} else if (type === 'assignment') {
			type = 'WorkAssignment';
		}

		if (type === 'Overtime' || type === 'WorkAssignment') {
			this.modalService.create({
				component: DetailRequestOvertimeEdComponent,
				inputs: {
					type: type,
					data: data
				}
			});
		}
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

		if (this.type === 'overtime') {
			this.getOvertimeSummary();
		} else {
			this.getWorkAssignmentSummary();
		}
	}

	onSelectedMonthConverted(event) {
		const selected = event.item.content;
		console.log('Selected: ', selected);

		function findMonthIndex(array, key) {
			for (let i = 0; i < array.length; i++) {
				if (array[i].content === key) {
					return i + 1;
				}
			}
		}

		this.convertedMonth = findMonthIndex(this.months, selected);

		if (this.type === 'overtime') {
			this.getConvertedOvertimeSummary();
		} else {
			this.getConvertedWorkAssignmentSummary();
		}
	}

	onSelectedYear(event) {
		const selected = event.item.content;
		console.log('Selected: ', selected);
		this.year = selected;

		if (this.type === 'overtime') {
			this.getOvertimeSummary();
		} else {
			this.getWorkAssignmentSummary();
		}
	}

	onSelectedYearConverted(event) {
		const selected = event.item.content;
		console.log('Selected: ', selected);
		this.convertedYear = selected;

		if (this.type === 'overtime') {
			this.getConvertedOvertimeSummary();
		} else {
			this.getConvertedWorkAssignmentSummary();
		}
	}

	changePage(event) {
		this.paginationModel.currentPage = event.pageIndex;

		if (this.type === 'overtime') {
			this.getOvertimeSummary();
		} else {
			this.getWorkAssignmentSummary();
		}
	}

	changePageConverted(event) {
		this.convertedPaginationModel.currentPage = event.pageIndex;

		if (this.type === 'overtime') {
			this.getConvertedOvertimeSummary();
		} else {
			this.getConvertedWorkAssignmentSummary();
		}
	}
}
