import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../core/services/manager.service';
import { DetailRequestModalComponent } from '../../detail-request-modal/detail-request-modal/detail-request-modal.component';
import { DetailRequestItemModalComponent } from '../../detail-request-item-modal/detail-request-item-modal/detail-request-item-modal.component';
import { ReviewOvertimeComponent } from '../../review-overtime/review-overtime/review-overtime.component';
import { ReviewShiftComponent } from '../../review-shift/review-shift/review-shift.component';
import { TableModel, TableItem, TableHeaderItem, PaginationModel, ModalService } from 'carbon-components-angular';
import { UtilsService } from '../../core/services/utils.service';

@Component({
	selector: 'app-shift-assignment-history',
	templateUrl: './shift-assignment-history.component.html',
	styleUrls: ['./shift-assignment-history.component.scss']
})

export class ShiftAssignmentHistoryComponent implements OnInit {

	model = new TableModel(); // Instantiate variable to store table data
	paginationModel = new PaginationModel(); // Instantiate variable to store pagination data
	itemsPerPage: number[] = [10];
	dataExist: boolean = false;
	responseData: any[] = []; // Store response.docs data

	constructor(
		private managerService: ManagerService,
		public modalService: ModalService,
		public utilsService: UtilsService,
	) { }

	ngOnInit() {
		this.model.header = [
			new TableHeaderItem({ data: 'STATUS' }),
			new TableHeaderItem({ data: 'REQUESTED DATE' }),
			new TableHeaderItem({ data: 'REQUESTER NAME' }),
			new TableHeaderItem({ data: 'SUBSTITUTE NAME' })
		];

		this.getReqHistory();
	}

	getReqHistory() {
		const content = {
			"status": "REQUESTED",
  			"isActive": "Y"
		};

		this.dataExist = false;
		this.managerService.getAssignmentHistory(content)
		.subscribe(
			response => {
				this.responseData = response;
				console.log(response);
				const modelData = [];
				if (response !== undefined && response !== null) {
					this.dataExist = true;
					for (let i = 0; i < response.length; i++) {
						let currItemType = 'Shift';
						modelData.push([
							new TableItem({ data: response[i].status.toLowerCase() }),
							new TableItem({ data: this.utilsService.getDateTimeFormat(new Date(response[i].requestDate))}),
							new TableItem({ data: response[i].requesterDetails[0].name }),
							new TableItem({ data: response[i].substituteDetails[0].name }),
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
		} else {
			this.modalService.create({
				component: DetailRequestItemModalComponent,
				inputs: {
					_id: _id
				}
			});
		}
	}
}
