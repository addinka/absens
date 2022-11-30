import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import { DetailRequestModalComponent } from '../../detail-request-modal/detail-request-modal/detail-request-modal.component';
import { DetailRequestItemModalComponent } from '../../detail-request-item-modal/detail-request-item-modal/detail-request-item-modal.component';
import { ReviewOvertimeComponent } from '../../review-overtime/review-overtime/review-overtime.component';
import { ReviewShiftComponent } from '../../review-shift/review-shift/review-shift.component';
import { ReviewLeaveComponent } from '../../review-leave/review-leave/review-leave.component';
import { TableModel, TableItem, TableHeaderItem, PaginationModel, ModalService } from 'carbon-components-angular';
import { UtilsService } from '../../core/services/utils.service';

@Component({
	selector: 'app-view-request-history',
	templateUrl: './view-request-history.component.html',
	styleUrls: ['./view-request-history.component.scss']
})

export class ViewRequestHistoryComponent implements OnInit {

	model = new TableModel(); // Instantiate variable to store table data
	paginationModel = new PaginationModel(); // Instantiate variable to store pagination data
	itemsPerPage: number[] = [10];
	dataExist: boolean = false;
	responseData: any[] = []; // Store response.docs data

	constructor(
		private employeeService: EmployeeService,
		public modalService: ModalService,
		public utilsService: UtilsService,
	) { }

	ngOnInit() {
		this.model.header = [
			new TableHeaderItem({ data: 'STATUS' }),
			new TableHeaderItem({ data: 'REQUESTED DATE' }),
			new TableHeaderItem({ data: 'TYPE' })
		];
		this.paginationModel.pageLength = 10;
		this.paginationModel.currentPage = 0;

		this.getReqHistory();
	}

	getReqHistory() {
		this.dataExist = false;
		this.employeeService.getRequestHistory(
			this.paginationModel.pageLength,
			this.paginationModel.currentPage + 1
		)
		.subscribe(
			response => {
				this.responseData = response.docs;
				console.log(response);
				this.paginationModel.totalDataLength = response.count;
				const modelData = [];
				if (response.docs !== undefined && response.docs !== null) {
					this.dataExist = true;
					for (let i = 0; i < response.docs.length; i++) {
						let currItemType;
						if (response.docs[i].requestType.toLowerCase() === 'travel') {
							currItemType = response.docs[i].requestType.toLowerCase();
						} else if (response.docs[i].requestType.toLowerCase() === 'overtime') {
							currItemType = response.docs[i].requestType.toLowerCase();
						} else if (response.docs[i].requestType.toLowerCase() === 'assignment') {
							currItemType = 'Work Assignment';
						} else if (response.docs[i].requestType.toLowerCase() === 'shifting') {
							currItemType = 'Shift';
						} else if (response.docs[i].requestType.toLowerCase() === 'leave') {
							currItemType = 'Leave';
						} else {
							currItemType = response.docs[i].itemType.toLowerCase();
						}
						modelData.push([
							new TableItem({ data: response.docs[i].status.toLowerCase() }),
							new TableItem({ data: this.utilsService.getDateTimeFormat(new Date(response.docs[i].requestDate))}),
							new TableItem({ data: currItemType }),
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

	openModal(type, _id) {
		console.log(type);
		if (type === 'overtime') {
			type = 'Overtime';
		} else if (type === 'assignment') {
			type = 'WorkAssignment';
		} else if (type === 'shifting') {
			type = 'Shift';
		} else if (type === 'leave') {
			type = 'Leave';
		}

		if (type === 'travel') {
			this.modalService.create({
				component: DetailRequestModalComponent,
				inputs: {
					_id: _id
				}
			});
		} else if (type === 'Overtime' || type === 'WorkAssignment') {
			this.modalService.create({
				component: ReviewOvertimeComponent,
				inputs: {
					requestType: 'Details',
					modalText: _id,
					type: type
				}
			});
		} else if (type === 'Shift') {
			this.modalService.create({
				component: ReviewShiftComponent,
				inputs: {
					requestType: 'Details',
					modalText: _id,
					type: type
				}
			});
		} else if (type === 'Leave') {
			this.modalService.create({
				component: ReviewLeaveComponent,
				inputs: {
					requestType: 'Details',
					modalText: _id,
					type: type,
				},
			});
		} else {
			this.modalService.create({
				component: DetailRequestItemModalComponent,
				inputs: {
					_id: _id
				}
			});
		}
	}

	changePage(event){
		this.paginationModel.currentPage = event.pageIndex;
		this.getReqHistory();
	}
}
