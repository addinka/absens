import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import { TableModel, TableItem, TableHeaderItem, PaginationModel, ModalService } from 'carbon-components-angular';
import { UtilsService } from '../../core/services/utils.service';


@Component({
  selector: 'app-position-history',
  templateUrl: './position-history.component.html',
  styleUrls: ['./position-history.component.scss']
})
export class PositionHistoryComponent implements OnInit {
  model = new TableModel(); // Instantiate variable to store table data
	paginationModel = new PaginationModel(); // Instantiate variable to store pagination data
	itemsPerPage: number[] = [10];
	dataExist: boolean = false;
	responseData: any[] = []; // Store response.docs data
  year: any;
	month: any;
  monthName: any;
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
		public utilsService: UtilsService,
  ) { }

  ngOnInit() {
    this.model.header = [
			new TableHeaderItem({ data: 'DATE' }),
			new TableHeaderItem({ data: 'TIME' }),
			new TableHeaderItem({ data: 'POSTION' })
		];
		this.paginationModel.pageLength = 10;
		this.paginationModel.currentPage = 0;

    const today = new Date();
		this.month = today.getMonth() + 1;
		this.year = today.getFullYear();

		for (let i = 0; i < 5; i++) {
			const newYear = {
				content: this.year - i
			};

			this.years.push(newYear);
		}

		this.monthName = this.months[this.month-1].content;

    console.log(this.month)
    console.log(this.year)
    this.getReqHistory();
  }

  getReqHistory() {
		this.dataExist = false;
		this.employeeService.getPositionHistory(this.year,this.month)
		.subscribe(
			response => {
				console.log(response);
				this.paginationModel.totalDataLength = response.length;
				const modelData = [];
				if (response !== undefined && response !== null && response.length) {
					this.dataExist = true;
					for (let i = 0; i < response.length; i++) {
						modelData.push([
							new TableItem({ data: this.utilsService.getDateFormat(new Date(response[i].timestamp))}),
							new TableItem({ data: this.utilsService.getTimeFormatV2(new Date(response[i].timestamp))}),
							new TableItem({ data: response[i].location }),
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

  changePage(event){
		this.paginationModel.currentPage = event.pageIndex;
		this.getReqHistory();
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
    this.getReqHistory();
	}

  onSelectedYear(event) {
		const selected = event.item.content;
		console.log('Selected: ', selected);
		this.year = selected;
    this.getReqHistory();
	}

}
