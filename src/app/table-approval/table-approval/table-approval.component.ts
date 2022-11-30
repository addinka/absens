import { Component, OnInit, Injector, ViewChild, ElementRef } from '@angular/core';
import { SiteManagerService } from '../../core/services/site-manager.service';
import { HealthSafetyManagerService } from '../../core/services/health-safety-manager.service';
import { ManagerService } from '../../core/services/manager.service';
import { TableModel, TableItem, TableHeaderItem, ModalService, BaseModal, PaginationModel } from 'carbon-components-angular';
import { TodayApprovalRevokeComponent } from '../../today-approval/today-approval/today-approval-revoke.component';
import { MultipleRejectComponent } from '../../multiple-reject/multiple-reject/multiple-reject.component';
import { EmployeeService } from '../../core/services/employee.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { UtilsService } from '../../core/services/utils.service';
import { ReviewRequestComponent } from '../../review-request/review-request/review-request.component';
import { ItemRequestComponent } from '../../item-request/item-request/item-request.component';
import { ReviewOvertimeComponent } from '../../review-overtime/review-overtime/review-overtime.component';
import { ReviewShiftComponent } from '../../review-shift/review-shift/review-shift.component';
import { ReviewLeaveComponent } from '../../review-leave/review-leave/review-leave.component';

@Component({
	selector: 'app-table-approval',
	templateUrl: './table-approval.component.html',
	styleUrls: ['./table-approval.component.scss']
})
export class TableApprovalComponent extends BaseModal implements OnInit {
	public model = new TableModel();
	public modelOvertime = new TableModel();
	public modelAssignment = new TableModel();
	public modelShift = new TableModel();
	public modelLeave = new TableModel();

	public paginationModel = new PaginationModel();
	public overtimePaginationModel = new PaginationModel();
	public assignmentPaginationModel = new PaginationModel();
	public shiftPaginationModel = new PaginationModel();
	public leavePaginationModel = new PaginationModel();

	public dataNumber;
	public dataNumberOvertime;
	public dataNumberAssignment;
	public dataNumberShift;
	public dataNumberLeave;

	public userType: any;
	public userID: any;
	public archived: boolean;
	public tableType: string;

	public dataExist: boolean;
	public dataExistOvertime: boolean;
	public dataExistAssignment: boolean;
	public dataExistShift: boolean;
	public dataExistLeave: boolean;

	public itemsPerPage: number[] = [5, 10, 15, 20];
	public requestType: string;

	public savedResponse: any;
	public savedPending = [];
	public savedRevoked = [];
	public savedRejected = [];

	public savedPendingOvertime = [];
	public savedApprovedOvertime = [];
	public savedRejectedOvertime = [];

	public savedPendingAssignment = [];
	public savedApprovedAssignment = [];
	public savedRejectedAssignment = [];

	public savedPendingShift = [];
	public savedApprovedShift = [];
	public savedRejectedShift = [];

	public savedPendingLeave = [];
	public savedApprovedLeave = [];
	public savedRejectedLeave = [];

	public isCheckAll: boolean;
	public isCheckAllOvertime: boolean;
	public isCheckAllAssignment: boolean;
	public isCheckAllShift: boolean;
	public isCheckAllLeave: boolean;

	public checkboxes: boolean[];
	public overtimeCheckboxes: boolean[];
	public assignmentCheckboxes: boolean[];
	public shiftCheckboxes: boolean[];
	public leaveCheckboxes: boolean[];

	public latestDate: any;
	public latestDateOvertime: any;
	public latestDateAssignment: any;
	public latestDateShift: any;
	public latestDateLeave: any;

	public skeleton: boolean = false;
	pageUpdate = new Subject<any>();
	pageUpdateOvertime = new Subject<any>();
	pageUpdateAssignment = new Subject<any>();
	pageUpdateShift = new Subject<any>();
	pageUpdateLeave = new Subject<any>();

	public archivedInput;
	public type;
	public title;
	public lastRequestDate: any;
	public lastRequestPlanned: any;
	public lastRequestActual: any;

	currentMode = 'today';
	@ViewChild('todayButton', {static: false}) todayButton: ElementRef;
	@ViewChild('tomorrowButton', {static: false}) tomorrowButton: ElementRef;

	floorFilled = '0';
	floorMax = '0';

	floorSixteenFilled = '0';
	floorSixteenMax = '0';

	floorSeventeenFilled = '0';
	floorSeventeenMax = '0';

	floors : any = [
		{
			content: 'All',
			id: 0
		},
		{
			content: 'Floor 16 - Office The Plaza (Jakarta)',
			id: 16
		},
		{
			content: 'Floor 17 - Office The Plaza (Jakarta)',
			id: 17
		},
		{
			content: 'Floor 18 - Office The Plaza (Jakarta)',
			id: 18
		},
	];

	selectedFloor = '0';

	constructor(
		protected injector: Injector,
		private modalService: ModalService,
		private siteManagerService: SiteManagerService,
		private employeeService: EmployeeService,
		private managerService: ManagerService,
		private healthService: HealthSafetyManagerService,
		public utilsService: UtilsService,
	) {
		super();
		this.archivedInput = this.injector.get('archivedInput');
		this.type = this.injector.get('type');
	 }

	ngOnInit() {
		console.log('reqType', this.requestType);
		this.paginationModel.pageLength = 10;
		this.paginationModel.currentPage = 0;

		this.overtimePaginationModel.pageLength = 10;
		this.overtimePaginationModel.currentPage = 0;

		this.assignmentPaginationModel.pageLength = 10;
		this.assignmentPaginationModel.currentPage = 0;

		this.shiftPaginationModel.pageLength = 10;
		this.shiftPaginationModel.currentPage = 0;

		this.leavePaginationModel.pageLength = 10;
		this.leavePaginationModel.currentPage = 0 ;

		// gini aja ga masalah
		this.userType = localStorage.getItem('userType');
		this.userID = localStorage.getItem('id');

		if (this.userType === 'hsc') {
			this.title = 'Item';
		} else {
			this.title = 'Travel';
		}

		if (this.archivedInput === true) {
			this.tableType = 'Archived';
		} else {
			this.tableType = 'Today';
		}

		this.getTableData();

		this.managerService.managerEmitter().subscribe(data => {
			this.paginationModel.pageLength = 10;
			this.paginationModel.currentPage = 0;

			this.overtimePaginationModel.pageLength = 10;
			this.overtimePaginationModel.currentPage = 0;

			this.assignmentPaginationModel.pageLength = 10;
			this.assignmentPaginationModel.currentPage = 0;

			this.shiftPaginationModel.pageLength = 10;
			this.shiftPaginationModel.currentPage = 0;

			this.leavePaginationModel.pageLength = 10;
			this.leavePaginationModel.currentPage = 0;
			this.getTableData();
		});

		this.employeeService.changeTypeEmitter().subscribe(data => {
			this.userType = localStorage.getItem('userType');
			this.paginationModel.pageLength = 10;
			this.paginationModel.currentPage = 0;

			this.overtimePaginationModel.pageLength = 10;
			this.overtimePaginationModel.currentPage = 0;

			this.assignmentPaginationModel.pageLength = 10;
			this.assignmentPaginationModel.currentPage = 0;

			this.shiftPaginationModel.pageLength = 10;
			this.shiftPaginationModel.currentPage = 0;

			this.leavePaginationModel.pageLength = 10;
			this.leavePaginationModel.currentPage = 0;
			console.log(this.userType);
			this.getTableData();
		});

		this.pageUpdate.pipe(
			debounceTime(500),
			distinctUntilChanged())
			.subscribe(value => {
				this.selectPage(value);
		});

		this.pageUpdateOvertime.pipe(
			debounceTime(500),
			distinctUntilChanged())
			.subscribe(value => {
				this.selectPage(value, 'overtime');
		});

		this.pageUpdateAssignment.pipe(
			debounceTime(500),
			distinctUntilChanged())
			.subscribe(value => {
				this.selectPage(value, 'assignment');
		});

		this.pageUpdateShift.pipe(
			debounceTime(500),
			distinctUntilChanged())
			.subscribe(value => {
				this.selectPage(value, 'shift');
		});

		this.pageUpdateLeave.pipe(
			debounceTime(500),
			distinctUntilChanged())
			.subscribe(value => {
				this.selectPage(value, 'leave');
		});
	}

	closeModal() {
		this.modalService.destroy();
	}

	openModalBasedOnUserType(id) {
		this.userType = localStorage.getItem('userType');
		if (this.userType === 'manager' || this.userType === 'sc') {
			this.openModalReviewTravelRequest(id);
		} else if (this.userType === 'hsc') {
			this.openModalReviewItemRequest(id);
		}
	}

	openModal(type, _id) {
		console.log('reqType', this.requestType);
		console.log('Modal Type: ', type);
		console.log('ID:', _id);
		let bool = false;
		if (this.tableType === 'Archived') {
			bool = true;
		} else {
			bool = false;
		}
		const modal = {
			component: TodayApprovalRevokeComponent,
			inputs: {
				type: type,
				_id: _id,
				isArchived: bool,
				requestStatus: this.type
			}
		};

		let modalOvertime;

		if (type === 'overtime' || type === 'assignment') {
			if (type === 'overtime') {
				type = 'Overtime';
			} else {
				type = 'WorkAssignment';
			}

			modalOvertime = {
				component: ReviewOvertimeComponent,
				inputs: {
					modalText: _id,
					requestType: this.type,
					type: type
				}
			};
		}

		let modalShift;

		if (type === 'shift') {
			type = 'Shift';
			modalShift = {
				component: ReviewShiftComponent,
				inputs: {
					modalText: _id,
					requestType: this.type,
					type: type
				}
			};
		}

		let modalLeave;

		if (type === 'leave') {
			type = 'Leave';
			modalLeave = {
				component: ReviewLeaveComponent,
				inputs: {
					modalText: _id,
					requestType: this.type,
					type: type
				}
			};
		}

		if (type === 'Overtime' || type === 'WorkAssignment') {
			this.modalService.create(modalOvertime);
		} else if (type === 'Shift') {
			this.modalService.create(modalShift);
		} else if (type === 'Leave') {
			this.modalService.create(modalLeave);
		}  else {
			this.modalService.create(modal);
		}
	}

	openModalReviewTravelRequest(id) {
		const modal = {
			component: ReviewRequestComponent,
			inputs: { modalText: id }
		};
		this.modalService.create(modal);
	}

	openModalReviewItemRequest(id) {
		const modal = {
			component: ItemRequestComponent,
			inputs: { modalText: id }
		};
		this.modalService.create(modal);
	}

	openModalMultipleAction(mode) {
		const arrayOfId = [];
		const arrayOfIdOvertime = [];
		const arrayOfIdAssignment = [];
		const arrayOfIdShift = [];
		const arrayOfIdLeave = [];

		for (let i = 0; i < this.checkboxes.length; i++) {
			if (this.checkboxes[i] === true) {
				arrayOfId.push(this.savedPending[i]._id);
			}
		}

		for (let i = 0; i < this.overtimeCheckboxes.length; i++) {
			if (this.overtimeCheckboxes[i] === true) {
				arrayOfIdOvertime.push(this.savedPendingOvertime[i]._id);
			}
		}

		for (let i = 0; i < this.assignmentCheckboxes.length; i++) {
			if (this.assignmentCheckboxes[i] === true) {
				arrayOfIdAssignment.push(this.savedPendingAssignment[i]._id);
			}
		}

		for (let i = 0; i < this.shiftCheckboxes.length; i++) {
			if (this.shiftCheckboxes[i] === true) {
				arrayOfIdShift.push(this.savedPendingShift[i]._id);
			}
		}

		for (let i = 0; i < this.leaveCheckboxes.length; i++) {
			if (this.leaveCheckboxes[i] === true) {
				arrayOfIdLeave.push(this.savedPendingLeave[i]._id);
			}
		}

		if (arrayOfId.length > 0 || arrayOfIdOvertime.length > 0 || arrayOfIdAssignment.length > 0 || arrayOfIdShift.length > 0
			|| arrayOfIdLeave.length > 0) {
			let modal: any;
			if (mode === 'reject') {
				modal = {
					component: MultipleRejectComponent,
					inputs: {
						passedArray: arrayOfId,
						passedArrayOvertime: arrayOfIdOvertime,
						passedArrayAssignment: arrayOfIdAssignment,
						passedArrayShift: arrayOfIdShift,
						passedArrayLeave: arrayOfIdLeave,
						setStatus: 'Reject'
					},
				};
			} else {
				modal = {
					component: MultipleRejectComponent,
					inputs: {
						passedArray: arrayOfId,
						passedArrayOvertime: arrayOfIdOvertime,
						passedArrayAssignment: arrayOfIdAssignment,
						passedArrayShift: arrayOfIdShift,
						passedArrayLeave: arrayOfIdLeave,
						setStatus: 'Approve'
					},
				};
			}
			this.modalService.create(modal);
		}
	}

	revokeModal() {
		const arrayOfId = [];
		const arrayOfIdOvertime = [];
		const arrayOfIdAssignment = [];
		const arrayOfIdShift = [];
		const arrayOfIdLeave = [];

		for (let i = 0; i < this.checkboxes.length; i++) {
			if (this.checkboxes[i] === true) {
				arrayOfId.push(this.savedResponse[i]._id);
			}
		}

		if (arrayOfId.length > 0 || arrayOfIdOvertime.length > 0 || arrayOfIdAssignment.length > 0 || arrayOfIdShift.length > 0
			|| arrayOfIdLeave.length > 0) {
			const modal = {
				component: MultipleRejectComponent,
				inputs: {
					passedArray: arrayOfId,
					passedArrayOvertime: arrayOfIdOvertime,
					passedArrayAssignment: arrayOfIdAssignment,
					passedArrayShift: arrayOfIdShift,
					passedArrayLeave: arrayOfIdLeave,
					setStatus: 'Revoke'
				}
			};
			this.modalService.create(modal);
		}
	}

	contentSwitch(mode) {
		if (mode === 'today' && this.currentMode !== 'today') {
			this.currentMode = mode;
			this.getSeatingAvailability();
			this.filterDataByFloor(this.selectedFloor);
			this.tomorrowButton.nativeElement.classList.remove('content-switcher-button-1');
			this.tomorrowButton.nativeElement.classList.add('content-switcher-button-2');
			this.todayButton.nativeElement.classList.remove('content-switcher-button-2');
			this.todayButton.nativeElement.classList.add('content-switcher-button-1');

		} else if (mode === 'tomorrow' && this.currentMode !== 'tomorrow') {
			this.currentMode = mode;
			this.getSeatingAvailability();
			this.filterDataByFloor(this.selectedFloor);
			this.tomorrowButton.nativeElement.classList.remove('content-switcher-button-2');
			this.tomorrowButton.nativeElement.classList.add('content-switcher-button-1');
			this.todayButton.nativeElement.classList.remove('content-switcher-button-1');
			this.todayButton.nativeElement.classList.add('content-switcher-button-2');
		}
	}

	onSelectedFloor(event) {
		const selected = event.item.id;
		this.selectedFloor = selected.toString();
		this.getSeatingAvailability();
		this.filterDataByFloor(this.selectedFloor);
	}

	filterDataByFloor(floor) {
		this.getManagerTravelApprovalList(floor);
	}

	getManagerTravelApprovalList(floor) {
		let type = '';
		if (this.type === 'Pending') {
			type = 'REQUESTED';
		} else if (this.type === 'Revoked') {
			type = 'REVOKED';
		} else if (this.type === 'Rejected') {
			type = 'REJECTED';
		} else if (this.tableType === 'Archived') {
			type = 'APPROVED,CHECKED-IN,CHECKED-OUT';
		} else if (this.tableType === 'Today') {
			type = 'APPROVED,CHECKED-IN';
		}

		this.managerService.getManagerApprovalList(this.tableType, this.paginationModel.pageLength, this.paginationModel.currentPage + 1, type)
			.subscribe(
				response => {
					console.log('Manager Approval',  response);
					this.dataOrganizerFunc2(response.docs, floor);

				},
				error => {
					console.log(error);
				});
	}

	dataOrganizerFunc2(docs, floor) {
		this.model.header = [
			new TableHeaderItem({ data: 'Requester' }),
			new TableHeaderItem({ data: 'Origin / Destination' }),
			new TableHeaderItem({ data: 'Transportation' })
		];

		this.skeleton = false;
		const pending = [];
		const approved = [];
		const revoked = [];
		const rejected = [];
		this.checkboxes = [];

		this.dataExist = false;
		this.savedPending = [];
		this.savedResponse = [];
		this.savedRevoked = [];
		this.savedRejected = [];

		if (docs !== undefined && docs !== null) {
			if (docs !== []) {
				this.requestType = docs[0].requestType;
			}

			let currDate = new Date();
			currDate.setHours(0, 0, 0, 0);

			for (let i = 0; i < docs.length; i++) {
				let requesterName;

				if (docs[i].requesterDetails.length !== 0) {
					requesterName = docs[i].requesterDetails[0].name;
				} else {
					requesterName = 'Undefined';
				}

				if (this.userType === 'manager' && this.tableType === 'Today' && this.type === 'Pending') {
					if (docs[i].destinationFloor === floor || floor === '0') {
						let currRequestDate = new Date(docs[i].currentDate);
						currRequestDate.setHours(0, 0, 0, 0);

						if (this.currentMode === 'today' && currDate.getTime() === currRequestDate.getTime()) {
							this.savedPending.push(docs[i]);

							pending.push([
								new TableItem({ data: requesterName}),
								new TableItem({ data: docs[i].origin + ' / ' + docs[i].destination }),
								new TableItem({ data: docs[i].transportation })
							]);
						} else if (this.currentMode === 'tomorrow' && currDate.getTime() !== currRequestDate.getTime()) {
							this.savedPending.push(docs[i]);

							pending.push([
								new TableItem({ data: requesterName}),
								new TableItem({ data: docs[i].origin + ' / ' + docs[i].destination }),
								new TableItem({ data: docs[i].transportation })
							]);
						}
					}
				}
			}
		}

		this.model.data = pending;

		if (pending.length > 0) {
			this.dataExist = true;
		}

		this.paginationModel.totalDataLength = pending.length;

		if (this.dataExist) {
			this.dataNumber = this.model.data.length;
		} else {
			this.dataNumber = 0;
		}
	}

	getSeatingAvailability() {
		let tomorrow = '';
		if (this.currentMode === 'tomorrow') {
			tomorrow = 'true';
		}
		this.siteManagerService.seatingAvailability(tomorrow).subscribe(
			response => {
				console.log('Seating Availability', response);
				for (let i = 0; i < response.length; i++) {
					if (response[i]._id === '17') {
						this.floorSeventeenFilled = response[i].reserved;
						this.floorSeventeenMax = response[i].available + response[i].reserved;
					} else if (response[i]._id === '16') {
						this.floorSixteenFilled = response[i].reserved;
						this.floorSixteenMax = response[i].available + response[i].reserved;
					}
				}

				if (this.selectedFloor === '16') {
					this.floorFilled = this.floorSixteenFilled;
					this.floorMax = this.floorSixteenMax;
				} else if (this.selectedFloor === '17') {
					this.floorFilled = this.floorSeventeenFilled;
					this.floorMax = this.floorSeventeenMax;
				} else {
					this.floorFilled = (Number(this.floorSeventeenFilled) + Number(this.floorSixteenFilled)).toString();
					this.floorMax = (Number(this.floorSeventeenMax) + Number(this.floorSixteenMax)).toString();	
				}
			},
			error => {
				console.log(error);
			});
	}

	getTableData() {
		this.isCheckAll = false;
		this.isCheckAllOvertime = false;
		this.isCheckAllAssignment = false;
		this.isCheckAllShift = false;
		this.isCheckAllLeave = false;

		this.checkboxes = [];
		this.overtimeCheckboxes = [];
		this.assignmentCheckboxes = [];
		this.shiftCheckboxes = [];
		this.leaveCheckboxes = [];

		this.model.data = [];
		this.modelOvertime.data = [];
		this.modelAssignment.data = [];
		this.modelShift.data = [];
		this.modelLeave.data = [];

		this.dataExist = false;
		this.dataExistOvertime = false;
		this.dataExistAssignment = false;
		this.dataExistShift = false;
		this.dataExistLeave = false;

		this.model.header = [
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' })
		];

		this.modelOvertime.header = [
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' })
		];

		this.modelAssignment.header = [
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' })
		];

		this.modelShift.header = [
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' })
		];

		this.modelLeave.header = [
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' })
		];

		this.skeleton = true;
		if (this.userType === 'manager') {
			this.getManagerApprovalList();

			if (this.type !== 'Revoked') {
				this.getManagerOvertimeList();
				this.getManagerAssignmentList();
				this.getManagerShiftList();
				this.getManagerLeaveList();
			}
		}  else if (this.userType === 'hsc') {
			this.getHSCApprovalList();
		}  else if (this.userType === 'sc') {
			this.getSiteCoordinatorApprovalList();
		}
	}

	selectPage(event, type = 'travel') {
		this.paginationModel.currentPage = event.pageIndex;

		if (type === 'overtime') {
			this.overtimePaginationModel.currentPage = event.pageIndex;
		}

		if (type === 'assignment') {
			this.assignmentPaginationModel.currentPage = event.pageIndex;
		}

		if (type === 'shift') {
			this.shiftPaginationModel.currentPage = event.pageIndex;
		}

		if (type === 'leave') {
			this.leavePaginationModel.currentPage = event.pageIndex;
		}

		this.getTableData();
	}

	getSiteCoordinatorApprovalList() {
		let type = '';
		if (this.type === 'Pending') {
			type = 'REQUESTED';
		} else if (this.type === 'Revoked') {
			type = 'REVOKED';
		} else if (this.type === 'Rejected') {
			type = 'REJECTED';
		} else if (this.tableType === 'Archived') {
			type = 'APPROVED,CHECKED-IN,CHECKED-OUT';
		} else if (this.tableType === 'Today') {
			type = 'APPROVED,CHECKED-IN';
		}

		this.siteManagerService.getSiteCoordinatorApprovalList
			(this.tableType, this.paginationModel.pageLength, this.paginationModel.currentPage + 1, type)
			.subscribe(
				response => {
					console.log('Site Manager', response);
					this.dataOrganizerFunc(response.docs);
					this.paginationModel.totalDataLength = response.count;
				},
				error => {
					console.log(error);
				});
	}

	getManagerApprovalList() {
		this.getSeatingAvailability();
		let type = '';
		if (this.type === 'Pending') {
			type = 'REQUESTED';
		} else if (this.type === 'Revoked') {
			type = 'REVOKED';
		} else if (this.type === 'Rejected') {
			type = 'REJECTED';
		} else if (this.tableType === 'Archived') {
			type = 'APPROVED,CHECKED-IN,CHECKED-OUT';
		} else if (this.tableType === 'Today') {
			type = 'APPROVED,CHECKED-IN';
		}

		this.managerService.getManagerApprovalList(this.tableType, this.paginationModel.pageLength, this.paginationModel.currentPage + 1, type)
			.subscribe(
				response => {
					console.log('Manager Approval',  response);
					this.dataOrganizerFunc(response.docs);
					this.paginationModel.totalDataLength = response.count;
				},
				error => {
					console.log(error);
				});
	}

	getManagerOvertimeList() {
		let type = '';
		if (this.type === 'Pending') {
			type = 'REQUESTED';
		} else if (this.type === 'Rejected') {
			type = 'REJECTED';
		} else if (this.tableType === 'Archived') {
			type = 'APPROVED,FINISHED';
		} else if (this.tableType === 'Today') {
			type = 'APPROVED';
		}

		this.managerService.getManagerOvertimeList(this.tableType, this.overtimePaginationModel.pageLength,
			this.overtimePaginationModel.currentPage + 1, type)
			.subscribe(
				response => {
					console.log('Manager Approval Overtime',  response);
					this.dataOrganizerFunc(response.docs, 'Overtime');
					this.overtimePaginationModel.totalDataLength = response.count;
				},
				error => {
					console.log(error);
			});
	}

	getManagerAssignmentList() {
		let type = '';
		if (this.type === 'Pending') {
			type = 'REQUESTED';
		} else if (this.type === 'Rejected') {
			type = 'REJECTED';
		} else if (this.tableType === 'Archived') {
			type = 'APPROVED,FINISHED';
		} else if (this.tableType === 'Today') {
			type = 'APPROVED';
		}

		this.managerService.getManagerAssignmentList(this.tableType, this.assignmentPaginationModel.pageLength,
			this.assignmentPaginationModel.currentPage + 1, type)
			.subscribe(
				response => {
					console.log('Manager Response', response);
					this.dataOrganizerFunc(response.docs, 'WorkAssignment');
					this.assignmentPaginationModel.totalDataLength = response.count;
				},
				error => {
					console.log(error);
			});
	}

	getManagerShiftList() {
		let type = '';
		if (this.type === 'Pending') {
			type = 'ACCEPTED';
		} else if (this.type === 'Rejected') {
			type = 'REJECTED';
		} else if (this.tableType === 'Archived') {
			type = 'APPROVED,FINISHED';
		} else if (this.tableType === 'Today') {
			type = 'APPROVED';
		}

		this.managerService.getManagerShiftList(this.tableType, this.shiftPaginationModel.pageLength,
			this.shiftPaginationModel.currentPage + 1, type)
			.subscribe(
				response => {
					console.log('Manager Response', response);
					this.dataOrganizerFunc(response.docs, 'Shift');
					this.shiftPaginationModel.totalDataLength = response.count;
				},
				error => {
					console.log(error);
			});
	}

	getManagerLeaveList() {
		let type = '';
		if (this.type === 'Pending') {
			type = 'REQUESTED';
		} else if (this.type === 'Rejected') {
			type = 'REJECTED';
		} else if (this.tableType === 'Archived') {
			type = 'APPROVED';
		} else if (this.tableType === 'Today') {
			type = 'APPROVED';
		}

		this.managerService.getManagerLeaveList(this.tableType, this.leavePaginationModel.pageLength,
			this.leavePaginationModel.currentPage + 1, type)
			.subscribe(
				response => {
					console.log('Manager Response', response);
					this.dataOrganizerFunc(response.docs, 'Leave');
					this.leavePaginationModel.totalDataLength = response.count;
				},
				error => {
					console.log(error);
			});
	}

	getHSCApprovalList() {
		let type = '';

		if (this.type === 'Pending') {
			type = 'REQUESTED';
		} else if (this.type === 'Revoked') {
			type = 'REVOKED';
		} else if (this.type === 'Rejected') {
			type = 'REJECTED';
		} else if (this.tableType === 'Archived') {
			type = 'APPROVED,RECEIVED';
		} else if (this.tableType === 'Today') {
			type = 'APPROVED';
		}

		this.healthService.getHSCApprovalList(this.tableType, this.paginationModel.pageLength, this.paginationModel.currentPage + 1, type)
			.subscribe(
				response => {
					this.dataOrganizerFunc(response.docs);
					this.paginationModel.totalDataLength = response.count;
				},
				error => {
					console.log(error);
				});
	}

	dataOrganizerFunc(response, type = 'Travel') {
		if (type === 'Overtime' && this.tableType === 'Archived') {
			this.modelOvertime.header = [
				new TableHeaderItem({ data: 'Date' }),
				new TableHeaderItem({ data: 'Requester' }),
				new TableHeaderItem({ data: 'Start Time' }),
				new TableHeaderItem({ data: 'End Time' }),
				new TableHeaderItem({ data: 'Total OT Hour' })
			];
		} else if (type === 'WorkAssignment' && this.tableType === 'Archived') {
			this.modelAssignment.header = [
				new TableHeaderItem({ data: 'Date' }),
				new TableHeaderItem({ data: 'Requester' }),
				new TableHeaderItem({ data: 'Start Time' }),
				new TableHeaderItem({ data: 'End Time' }),
				new TableHeaderItem({ data: 'Total WA Hour' })
			];
		} else if (type === 'Shift' && this.tableType === 'Archived') {
			this.modelShift.header = [
				new TableHeaderItem({ data: 'Date' }),
				new TableHeaderItem({ data: 'Requester' }),
				new TableHeaderItem({ data: 'Requester Shift' }),
				new TableHeaderItem({ data: 'Substitute' }),
				new TableHeaderItem({ data: 'Substitute Shift' })
			];
		} else if (type === 'Leave' && this.tableType === 'Archived') {
			this.modelLeave.header = [
				new TableHeaderItem({ data: 'Date' }),
				new TableHeaderItem({ data: 'Requester' }),
				new TableHeaderItem({ data: 'Leave Type (Days Left)' }),
				new TableHeaderItem({ data: 'Leave Date' }),
				new TableHeaderItem({ data: 'Duration' }),
			];
		} else if (type === 'Overtime') {
			this.modelOvertime.header = [
				new TableHeaderItem({ data: 'Date' }),
				new TableHeaderItem({ data: 'Requester' }),
				new TableHeaderItem({ data: 'Start Time' }),
				new TableHeaderItem({ data: 'End Time' }),
				new TableHeaderItem({ data: 'Total OT Hour' })
			];
		} else if (type === 'WorkAssignment') {
			this.modelAssignment.header = [
				new TableHeaderItem({ data: 'Date' }),
				new TableHeaderItem({ data: 'Requester' }),
				new TableHeaderItem({ data: 'Start Time' }),
				new TableHeaderItem({ data: 'End Time' }),
				new TableHeaderItem({ data: 'Total WA Hour' })
			];
		} else if (type === 'Shift') {
			this.modelShift.header = [
				new TableHeaderItem({ data: 'Date' }),
				new TableHeaderItem({ data: 'Requester' }),
				new TableHeaderItem({ data: 'Requester Shift' }),
				new TableHeaderItem({ data: 'Substitute' }),
				new TableHeaderItem({ data: 'Substitute Shift' })
			];
		} else if (type === 'Leave') {
			this.modelLeave.header = [
				new TableHeaderItem({ data: 'Date' }),
				new TableHeaderItem({ data: 'Requester' }),
				new TableHeaderItem({ data: 'Leave Type (Days Left)' }),
				new TableHeaderItem({ data: 'Leave Date' }),
				new TableHeaderItem({ data: 'Duration' }),
			];
	}

		if (this.userType === 'manager' && this.tableType === 'Archived') {
			this.model.header = [
				new TableHeaderItem({ data: 'Date' }),
				new TableHeaderItem({ data: 'Requester' }),
				new TableHeaderItem({ data: 'Origin / Destination' }),
				new TableHeaderItem({ data: 'Transportation' })
			];
		} else if (this.userType === 'manager') {
			this.model.header = [
				new TableHeaderItem({ data: 'Requester' }),
				new TableHeaderItem({ data: 'Origin / Destination' }),
				new TableHeaderItem({ data: 'Transportation' })
			];
		} else if (this.userType === 'hsc' && this.tableType === 'Archived') {
			this.model.header = [
				new TableHeaderItem({ data: 'Date' }),
				new TableHeaderItem({ data: 'Requester' }),
				new TableHeaderItem({ data: 'Pickup Point' }),
				new TableHeaderItem({ data: 'Type (Qty)' })
			];
		} else if (this.userType === 'hsc') {
			this.model.header = [
				new TableHeaderItem({ data: 'Requester' }),
				new TableHeaderItem({ data: 'Pickup Point' }),
				new TableHeaderItem({ data: 'Type (Qty)' })
			];
		} else if (this.userType === 'sc' && this.tableType === 'Archived') {
			this.model.header = [
				new TableHeaderItem({ data: 'Date' }),
				new TableHeaderItem({ data: 'Requester' }),
				new TableHeaderItem({ data: 'Origin' }),
				new TableHeaderItem({ data: 'Transportation' })
			];
		} else if (this.userType === 'sc') {
			this.model.header = [
				new TableHeaderItem({ data: 'Requester' }),
				new TableHeaderItem({ data: 'Origin' }),
				new TableHeaderItem({ data: 'Transportation' })
			];
		}

		this.skeleton = false;
		const pending = [];
		const approved = [];
		const revoked = [];
		const rejected = [];
		const pendingOvertime = [];
		const approvedOvertime = [];
		const rejectedOvertime = [];
		const pendingAssignment = [];
		const approvedAssignment = [];
		const rejectedAssignment = [];
		const pendingShift = [];
		const approvedShift = [];
		const rejectedShift = [];
		const pendingLeave = [];
		const approvedLeave = [];
		const rejectedLeave = [];

		if (type === 'Travel') {
			this.dataExist = false;
			this.savedPending = [];
			this.savedResponse = [];
			this.savedRevoked = [];
			this.savedRejected = [];
		} else if (type === 'Overtime') {
			this.dataExistOvertime = false;
			this.savedPendingOvertime = [];
			this.savedApprovedOvertime = [];
			this.savedRejectedOvertime = [];
		} else if (type === 'WorkAssignment') {
			this.dataExistAssignment = false;
			this.savedPendingAssignment = [];
			this.savedApprovedAssignment = [];
			this.savedRejectedAssignment = [];
		} else if (type === 'Shift') {
			this.dataExistShift = false;
			this.savedPendingShift = [];
			this.savedApprovedShift = [];
			this.savedRejectedShift = [];
		} else if (type === 'Leave') {
			this.dataExistLeave = false;
			this.savedPendingLeave = [];
			this.savedApprovedLeave = [];
			this.savedRejectedLeave = [];
		}

		if (response !== undefined && response !== null) {
			if (response !== []) {
				this.requestType = response[0].requestType;
			}

			if (type === 'Overtime') {
				this.dataExistOvertime = true;
			} else if (type === 'WorkAssignment') {
				this.dataExistAssignment = true;
			} else if (type === 'Shift') {
				this.dataExistShift = true;
			}  else if (type === 'Leave') {
				this.dataExistLeave = true;
			} else {
				this.dataExist = true;
			}

			for (let i = 0; i < response.length; i++) {
				let requesterName;

				if (response[i].requesterDetails.length !== 0) {
					requesterName = response[i].requesterDetails[0].name;
				} else {
					requesterName = 'Undefined';
				}

				if (type === 'Shift' && this.userType === 'manager' && this.tableType === 'Today' && this.type === 'Pending') {
					this.savedPendingShift.push(response[i]);

					let requesterDate;
					let substituteDate;
					let substituteName;

					if (response[i].originShiftDetails[0]) {
						requesterDate = this.utilsService.getDateFormat(new Date(response[i].originShiftDetails[0].shiftStart));
					}

					if (response[i].targetShiftDetails[0]) {
						substituteDate = this.utilsService.getDateFormat(new Date(response[i].targetShiftDetails[0].shiftStart));
						substituteName = response[i].targetShiftDetails[0].nama;
					}

					const newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));

					pendingShift.push([
						new TableItem({ data: newDate}),
						new TableItem({ data: requesterName}),
						new TableItem({ data: requesterDate}),
						new TableItem({ data: substituteName}),
						new TableItem({ data: substituteDate}),
					]);

					console.log(pendingShift);
				} else if (type === 'Shift' && this.userType === 'manager' && this.tableType === 'Today' && this.type === 'Rejected') {
					this.savedRejectedShift.push(response[i]);

					let requesterDate;
					let substituteDate;
					let substituteName;

					if (response[i].originShiftDetails[0]) {
						requesterDate = this.utilsService.getDateFormat(new Date(response[i].originShiftDetails[0].shiftStart));
					}

					if (response[i].targetShiftDetails[0]) {
						substituteDate = this.utilsService.getDateFormat(new Date(response[i].targetShiftDetails[0].shiftStart));
						substituteName = response[i].targetShiftDetails[0].nama;
					}

					const newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));

					rejectedShift.push([
						new TableItem({ data: newDate}),
						new TableItem({ data: requesterName}),
						new TableItem({ data: requesterDate}),
						new TableItem({ data: substituteName}),
						new TableItem({ data: substituteDate}),
					]);

					console.log(rejectedShift);
				} else if (type === 'Shift' && this.userType === 'manager' && this.tableType === 'Today' && this.type === 'Approved') {
					this.savedApprovedShift.push(response[i]);

					let requesterDate;
					let substituteDate;
					let substituteName;

					if (response[i].originShiftDetails[0]) {
						requesterDate = this.utilsService.getDateFormat(new Date(response[i].originShiftDetails[0].shiftStart));
					}

					if (response[i].targetShiftDetails[0]) {
						substituteDate = this.utilsService.getDateFormat(new Date(response[i].targetShiftDetails[0].shiftStart));
						substituteName = response[i].targetShiftDetails[0].nama;
					}

					const newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));

					approvedShift.push([
						new TableItem({ data: newDate}),
						new TableItem({ data: requesterName}),
						new TableItem({ data: requesterDate}),
						new TableItem({ data: substituteName}),
						new TableItem({ data: substituteDate}),
					]);

					console.log(approvedShift);
				} else if (type === 'Shift' && this.userType === 'manager' && this.tableType === 'Archived' && this.type === 'Rejected') {
					this.savedRejectedShift.push(response[i]);

					let requesterDate;
					let substituteDate;
					let substituteName;

					if (response[i].originShiftDetails[0]) {
						requesterDate = this.utilsService.getDateFormat(new Date(response[i].originShiftDetails[0].shiftStart));
					}

					if (response[i].targetShiftDetails[0]) {
						substituteDate = this.utilsService.getDateFormat(new Date(response[i].targetShiftDetails[0].shiftStart));
						substituteName = response[i].targetShiftDetails[0].nama;
					}

					let newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));
					if (this.latestDateOvertime === newDate) {
						newDate = '';
					} else {
						this.latestDateOvertime = newDate;
					}

					rejectedShift.push([
						new TableItem({ data: newDate}),
						new TableItem({ data: requesterName}),
						new TableItem({ data: requesterDate}),
						new TableItem({ data: substituteName}),
						new TableItem({ data: substituteDate}),
					]);

					console.log(rejectedShift);
				} else if (type === 'Shift' && this.userType === 'manager' && this.tableType === 'Archived' && this.type === 'Approved') {
					this.savedApprovedShift.push(response[i]);

					let requesterDate;
					let substituteDate;
					let substituteName;

					if (response[i].originShiftDetails[0]) {
						requesterDate = this.utilsService.getDateFormat(new Date(response[i].originShiftDetails[0].shiftStart));
					}

					if (response[i].targetShiftDetails[0]) {
						substituteDate = this.utilsService.getDateFormat(new Date(response[i].targetShiftDetails[0].shiftStart));
						substituteName = response[i].targetShiftDetails[0].nama;
					}

					let newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));
					if (this.latestDateOvertime === newDate) {
						newDate = '';
					} else {
						this.latestDateOvertime = newDate;
					}

					approvedShift.push([
						new TableItem({ data: newDate}),
						new TableItem({ data: requesterName}),
						new TableItem({ data: requesterDate}),
						new TableItem({ data: substituteName}),
						new TableItem({ data: substituteDate}),
					]);

					console.log(approvedShift);
				} else if (type === 'Leave' && this.userType === 'manager' && this.tableType === 'Today' && this.type === 'Pending') {
					this.savedPendingLeave.push(response[i]);

					let leaveType;
					let startDate;
					let endDate;
					let leaveDate;
					let duration;

					const newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));
					leaveType = response[i].leaveType;
					startDate = this.utilsService.getDateFormat(new Date(response[i].startDate));
					endDate = this.utilsService.getDateFormat(new Date(response[i].endDate));
					leaveDate = startDate + ' - ' + endDate;
					duration = response[i].duration;

					pendingLeave.push([
						new TableItem({ data: newDate}),
						new TableItem({ data: requesterName}),
						new TableItem({ data: leaveType}),
						new TableItem({ data: leaveDate}),
						new TableItem({ data: duration}),
					]);

					console.log(pendingLeave);
				} else if (type === 'Leave' && this.userType === 'manager' && this.tableType === 'Today' && this.type === 'Rejected') {
					this.savedRejectedLeave.push(response[i]);

					let leaveType;
					let startDate;
					let endDate;
					let leaveDate;
					let duration;
					let purpose;

					const newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));
					leaveType = response[i].leaveType;
					startDate = this.utilsService.getDateFormat(new Date(response[i].startDate));
					endDate = this.utilsService.getDateFormat(new Date(response[i].endDate));
					leaveDate = startDate + ' - ' + endDate;
					duration = response[i].duration;

					rejectedLeave.push([
						new TableItem({ data: newDate}),
						new TableItem({ data: requesterName}),
						new TableItem({ data: leaveType}),
						new TableItem({ data: leaveDate}),
						new TableItem({ data: duration})
					]);

					console.log(rejectedLeave);
				} else if (type === 'Leave' && this.userType === 'manager' && this.tableType === 'Today' && this.type === 'Approved') {
					this.savedApprovedLeave.push(response[i]);

					let leaveType;
					let startDate;
					let endDate;
					let leaveDate;
					let duration;
					let purpose;

					const newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));
					leaveType = response[i].leaveType;
					startDate = this.utilsService.getDateFormat(new Date(response[i].startDate));
					endDate = this.utilsService.getDateFormat(new Date(response[i].endDate));
					leaveDate = startDate + ' - ' + endDate;
					duration = response[i].duration;

					approvedLeave.push([
						new TableItem({ data: newDate}),
						new TableItem({ data: requesterName}),
						new TableItem({ data: leaveType}),
						new TableItem({ data: leaveDate}),
						new TableItem({ data: duration})
					]);

					console.log(approvedLeave);
				} else if (type === 'Leave' && this.userType === 'manager' && this.tableType === 'Archived' && this.type === 'Rejected') {
					this.savedRejectedLeave.push(response[i]);

					let leaveType;
					let startDate;
					let endDate;
					let leaveDate;
					let duration;
					let purpose;

					let newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));
					leaveType = response[i].leaveType;
					startDate = this.utilsService.getDateFormat(new Date(response[i].startDate));
					endDate = this.utilsService.getDateFormat(new Date(response[i].endDate));
					leaveDate = startDate + ' - ' + endDate;
					duration = response[i].duration;

					if (this.latestDateLeave === newDate) {
						newDate = '';
					} else {
						this.latestDateLeave = newDate;
					}

					rejectedLeave.push([
						new TableItem({ data: newDate}),
						new TableItem({ data: requesterName}),
						new TableItem({ data: leaveType}),
						new TableItem({ data: leaveDate}),
						new TableItem({ data: duration})
					]);

					console.log(rejectedLeave);
				} else if (type === 'Leave' && this.userType === 'manager' && this.tableType === 'Archived' && this.type === 'Approved') {
					this.savedApprovedLeave.push(response[i]);

					let leaveType;
					let startDate;
					let endDate;
					let leaveDate;
					let duration;
					let purpose;

					let newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));
					leaveType = response[i].leaveType;
					startDate = this.utilsService.getDateFormat(new Date(response[i].startDate));
					endDate = this.utilsService.getDateFormat(new Date(response[i].endDate));
					leaveDate = startDate + ' - ' + endDate;
					duration = response[i].duration;
					purpose = response[i].reason;

					if (this.latestDateLeave === newDate) {
						newDate = '';
					} else {
						this.latestDateLeave = newDate;
					}

					approvedLeave.push([
						new TableItem({ data: newDate}),
						new TableItem({ data: requesterName}),
						new TableItem({ data: leaveType}),
						new TableItem({ data: leaveDate}),
						new TableItem({ data: duration})
					]);

					console.log(approvedLeave);
				} else if (type === 'Overtime' && this.userType === 'manager' && this.tableType === 'Today' && this.type === 'Pending') {
					if (response[i].lastRequest.length !== 0) {
						console.log(response[i].lastRequest[0].requestDate);
						response[i].lastRequest[0].requestDate = this.utilsService.getDateFormat(new Date(response[i].lastRequest[0].requestDate));
						console.log('Last Request Date: ', response[i].lastRequest[0].requestDate);

						var hoursActualStart = new Date(response[i].lastRequest[0].actualStart).getHours();
						var hoursActualEnd = new Date(response[i].lastRequest[0].actualEnd).getHours();

						if (hoursActualEnd < hoursActualStart) {
							hoursActualEnd = hoursActualEnd + 24;
						}

						console.log('Hours Actual Start: ', hoursActualStart);
						console.log('Hours Actual End: ', hoursActualEnd);

						response[i].lastRequest[0].actualStart = hoursActualEnd - hoursActualStart;

						console.log('Hours Actual: ', response[i].lastRequest[0].actualStart);

						var hoursPlannedStart = new Date(response[i].lastRequest[0].plannedStart).getHours();
						var hoursPlannedEnd = new Date(response[i].lastRequest[0].plannedEnd).getHours();

						if (hoursPlannedEnd < hoursPlannedStart) {
							hoursPlannedEnd = hoursPlannedEnd + 24;

						}

						response[i].lastRequest[0].plannedStart = hoursPlannedEnd - hoursPlannedStart;

						console.log('Hours Planned Start: ', hoursPlannedStart);
						console.log('Hours Planned Start: ', hoursPlannedEnd);

						console.log('Hours Planned: ', response[i].lastRequest[0].plannedStart);
					} else {
						const none = {
							requestDate : 'None',
							plannedStart: 'None',
							actualStart: 'None',
						};

						response[i].lastRequest.push(none);

						console.log(response[i].lastRequest);
					}

					this.savedPendingOvertime.push(response[i]);

					const startDate = new Date(response[i].plannedStart);
					let startTime;
					let hours;
					let minutes;

					hours = startDate.getHours();
					minutes = startDate.getMinutes();

					if (hours === 0) {
						hours = '00';
					}

					if (minutes === 0) {
						minutes = '00';
					}

					if (hours.toString().length === 1) {
						hours = '0' + hours;
					}

					if (minutes.toString().length === 1) {
						minutes = '0' + minutes;
					}

					startTime = hours + ':' + minutes;

					const endDate = new Date(response[i].plannedEnd);
					let endTime;
					let endMinutes;

					let endHours;
					endHours = endDate.getHours();
					endMinutes = endDate.getMinutes();

					if (endHours === 0) {
						endHours = '00';
					}

					if (endHours.toString().length === 1) {
						endHours = '0' + endHours;
					}

					if (endMinutes === 0) {
						endMinutes = '00';
					}

					if (endMinutes.toString().length === 1) {
						endMinutes = '0' + endMinutes;
					}

					endTime = endHours + ':' + endMinutes;

					const newDate = this.utilsService.getDateFormat(new Date(response[i].plannedStart));

					pendingOvertime.push([
						new TableItem({ data: newDate }),
						new TableItem({ data: requesterName}),
						new TableItem({ data: startTime }),
						new TableItem({ data: endTime }),
						new TableItem({ data: Math.floor((response[i].weekdayCount + response[i].weekendCount) / 60) +
							 ' Hours, ' + (response[i].weekdayCount + response[i].weekendCount) % 60 + ' Mins' })
					]);
				} else if (type === 'Overtime' && this.userType === 'manager' && this.tableType === 'Archived' && this.type === 'Rejected') {
					this.savedRejectedOvertime.push(response[i]);

					const startDate = new Date(response[i].plannedStart);
					let startTime;
					let hours;
					let minutes;

					hours = startDate.getHours();
					minutes = startDate.getMinutes();

					if (hours === 0) {
						hours = '00';
					}

					if (minutes === 0) {
						minutes = '00';
					}

					if (hours.toString().length === 1) {
						hours = '0' + hours;
					}

					if (minutes.toString().length === 1) {
						minutes = '0' + minutes;
					}

					startTime = hours + ':' + minutes;

					const endDate = new Date(response[i].plannedEnd);
					let endTime;
					let endMinutes;

					let endHours;
					endHours = endDate.getHours();
					endMinutes = endDate.getMinutes();

					if (endHours === 0) {
						endHours = '00';
					}

					if (endHours.toString().length === 1) {
						endHours = '0' + endHours;
					}

					if (endMinutes === 0) {
						endMinutes = '00';
					}

					if (endMinutes.toString().length === 1) {
						endMinutes = '0' + endMinutes;
					}

					endTime = endHours + ':' + endMinutes;

					let newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));
					if (this.latestDateOvertime === newDate) {
						newDate = '';
					} else {
						this.latestDateOvertime = newDate;
					}

					rejectedOvertime.push([
						new TableItem({ data: newDate }),
						new TableItem({ data: requesterName}),
						new TableItem({ data: startTime }),
						new TableItem({ data: endTime }),
						new TableItem({ data: Math.floor((response[i].weekdayCount + response[i].weekendCount) / 60) +
							 ' Hours, ' + (response[i].weekdayCount + response[i].weekendCount) % 60 + ' Mins'})
					]);
				} else if (type === 'Overtime' && this.userType === 'manager' && this.type === 'Rejected') {
					if (response[i].lastRequest.length !== 0) {
						console.log(response[i].lastRequest[0].requestDate);
						response[i].lastRequest[0].requestDate = this.utilsService.getDateFormat(new Date(response[i].lastRequest[0].requestDate));
						console.log('Last Request Date: ', response[i].lastRequest[0].requestDate);
						
						var hoursActualStart = new Date(response[i].lastRequest[0].actualStart).getHours();
						var hoursActualEnd = new Date(response[i].lastRequest[0].actualEnd).getHours();

						if (hoursActualEnd < hoursActualStart) {
							hoursActualEnd = hoursActualEnd + 24;
						}

						console.log('Hours Actual Start: ', hoursActualStart);
						console.log('Hours Actual End: ', hoursActualEnd);

						response[i].lastRequest[0].actualStart = hoursActualEnd - hoursActualStart;

						console.log('Hours Actual: ', response[i].lastRequest[0].actualStart);

						var hoursPlannedStart = new Date(response[i].lastRequest[0].plannedStart).getHours();
						var hoursPlannedEnd = new Date(response[i].lastRequest[0].plannedEnd).getHours();

						if (hoursPlannedEnd < hoursPlannedStart) {
							hoursPlannedEnd = hoursPlannedEnd + 24;

						}

						response[i].lastRequest[0].plannedStart = hoursPlannedEnd - hoursPlannedStart;

						console.log('Hours Planned Start: ', hoursPlannedStart);
						console.log('Hours Planned Start: ', hoursPlannedEnd);

						console.log('Hours Planned: ', response[i].lastRequest[0].plannedStart);						
					} else {
						const none = {
							requestDate : 'None',
							plannedStart: 'None',
							actualStart: 'None',
						};

						response[i].lastRequest.push(none);

						console.log(response[i].lastRequest);
					}

					this.savedRejectedOvertime.push(response[i]);

					const startDate = new Date(response[i].plannedStart);
					let startTime;
					let hours;
					let minutes;

					hours = startDate.getHours();
					minutes = startDate.getMinutes();

					if (hours === 0) {
						hours = '00';
					}

					if (minutes === 0) {
						minutes = '00';
					}

					if (hours.toString().length === 1) {
						hours = '0' + hours;
					}

					if (minutes.toString().length === 1) {
						minutes = '0' + minutes;
					}

					startTime = hours + ':' + minutes;

					const endDate = new Date(response[i].plannedEnd);
					let endTime;
					let endMinutes;

					let endHours;
					endHours = endDate.getHours();
					endMinutes = endDate.getMinutes();

					if (endHours === 0) {
						endHours = '00';
					}

					if (endHours.toString().length === 1) {
						endHours = '0' + endHours;
					}

					if (endMinutes === 0) {
						endMinutes = '00';
					}

					if (endMinutes.toString().length === 1) {
						endMinutes = '0' + endMinutes;
					}

					endTime = endHours + ':' + endMinutes;

					let newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));

					rejectedOvertime.push([
						new TableItem({ data: newDate }),
						new TableItem({ data: requesterName }),
						new TableItem({ data: startTime }),
						new TableItem({ data: endTime }),
						new TableItem({ data: Math.floor((response[i].weekdayCount + response[i].weekendCount) / 60) + ' Hours, ' +
						 (response[i].weekdayCount + response[i].weekendCount) % 60 + ' Mins'})
					]);
				} else if (type === 'Overtime' && this.userType === 'manager' && this.tableType === 'Archived' && this.type === 'Approved') {
					this.savedApprovedOvertime.push(response[i]);

					const startDate = new Date(response[i].plannedStart);
					let startTime;
					let hours;
					let minutes;

					hours = startDate.getHours();
					minutes = startDate.getMinutes();

					if (hours === 0) {
						hours = '00';
					}

					if (minutes === 0) {
						minutes = '00';
					}

					if (hours.toString().length === 1) {
						hours = '0' + hours;
					}

					if (minutes.toString().length === 1) {
						minutes = '0' + minutes;
					}

					startTime = hours + ':' + minutes;

					const endDate = new Date(response[i].plannedEnd);
					let endTime;
					let endMinutes;

					let endHours;
					endHours = endDate.getHours();
					endMinutes = endDate.getMinutes();

					if (endHours === 0) {
						endHours = '00';
					}

					if (endHours.toString().length === 1) {
						endHours = '0' + endHours;
					}

					if (endMinutes === 0) {
						endMinutes = '00';
					}

					if (endMinutes.toString().length === 1) {
						endMinutes = '0' + endMinutes;
					}

					endTime = endHours + ':' + endMinutes;

					let newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));
					if (this.latestDateOvertime === newDate) {
						newDate = '';
					} else {
						this.latestDateOvertime = newDate;
					}

					approvedOvertime.push([
						new TableItem({ data: newDate }),
						new TableItem({ data: requesterName}),
						new TableItem({ data: startTime }),
						new TableItem({ data: endTime }),
						new TableItem({ data: Math.floor((response[i].weekdayCount + response[i].weekendCount) / 60) + ' Hours, ' +
						 (response[i].weekdayCount + response[i].weekendCount) % 60 + ' Mins' })
					]);
				} else if (type === 'Overtime' && this.userType === 'manager' && this.type === 'Approved') {
					if (response[i].lastRequest.length !== 0) {
						console.log(response[i].lastRequest[0].requestDate);
						response[i].lastRequest[0].requestDate = this.utilsService.getDateFormat(new Date(response[i].lastRequest[0].requestDate));
						console.log('Last Request Date: ', response[i].lastRequest[0].requestDate);
						
						var hoursActualStart = new Date(response[i].lastRequest[0].actualStart).getHours();
						var hoursActualEnd = new Date(response[i].lastRequest[0].actualEnd).getHours();

						if (hoursActualEnd < hoursActualStart) {
							hoursActualEnd = hoursActualEnd + 24;
						}

						console.log('Hours Actual Start: ', hoursActualStart);
						console.log('Hours Actual End: ', hoursActualEnd);

						response[i].lastRequest[0].actualStart = hoursActualEnd - hoursActualStart;

						console.log('Hours Actual: ', response[i].lastRequest[0].actualStart);

						var hoursPlannedStart = new Date(response[i].lastRequest[0].plannedStart).getHours();
						var hoursPlannedEnd = new Date(response[i].lastRequest[0].plannedEnd).getHours();

						if (hoursPlannedEnd < hoursPlannedStart) {
							hoursPlannedEnd = hoursPlannedEnd + 24;

						}

						response[i].lastRequest[0].plannedStart = hoursPlannedEnd - hoursPlannedStart;

						console.log('Hours Planned Start: ', hoursPlannedStart);
						console.log('Hours Planned Start: ', hoursPlannedEnd);

						console.log('Hours Planned: ', response[i].lastRequest[0].plannedStart);						
					} else {
						const none = {
							requestDate : 'None',
							plannedStart: 'None',
							actualStart: 'None',
						};

						response[i].lastRequest.push(none);

						console.log(response[i].lastRequest);
					}

					this.savedApprovedOvertime.push(response[i]);

					const startDate = new Date(response[i].plannedStart);
					let startTime;
					let hours;
					let minutes;

					hours = startDate.getHours();
					minutes = startDate.getMinutes();

					if (hours === 0) {
						hours = '00';
					}

					if (minutes === 0) {
						minutes = '00';
					}

					if (hours.toString().length === 1) {
						hours = '0' + hours;
					}

					if (minutes.toString().length === 1) {
						minutes = '0' + minutes;
					}

					startTime = hours + ':' + minutes;

					const endDate = new Date(response[i].plannedEnd);
					let endTime;
					let endMinutes;

					let endHours;
					endHours = endDate.getHours();
					endMinutes = endDate.getMinutes();

					if (endHours === 0) {
						endHours = '00';
					}

					if (endHours.toString().length === 1) {
						endHours = '0' + endHours;
					}

					if (endMinutes === 0) {
						endMinutes = '00';
					}

					if (endMinutes.toString().length === 1) {
						endMinutes = '0' + endMinutes;
					}

					endTime = endHours + ':' + endMinutes;

					const newDate = this.utilsService.getDateFormat(new Date(response[i].plannedStart));

					approvedOvertime.push([
						new TableItem({ data: newDate }),
						new TableItem({ data: requesterName}),
						new TableItem({ data: startTime }),
						new TableItem({ data: endTime }),
						new TableItem({ data: Math.floor((response[i].weekdayCount + response[i].weekendCount) / 60) + ' Hours, ' + (response[i].weekdayCount + response[i].weekendCount) % 60 + ' Mins' })
					]);
				} else if (type === 'WorkAssignment' && this.userType === 'manager' && this.tableType === 'Today' && this.type === 'Pending') {
					if (response[i].lastRequest.length !== 0) {
						console.log(response[i].lastRequest[0].requestDate);
						response[i].lastRequest[0].requestDate = this.utilsService.getDateFormat(new Date(response[i].lastRequest[0].requestDate));
						console.log('Last Request Date: ', response[i].lastRequest[0].requestDate);
						
						var hoursActualStart = new Date(response[i].lastRequest[0].actualStart).getHours();
						var hoursActualEnd = new Date(response[i].lastRequest[0].actualEnd).getHours();

						if (hoursActualEnd < hoursActualStart) {
							hoursActualEnd = hoursActualEnd + 24;
						}

						console.log('Hours Actual Start: ', hoursActualStart);
						console.log('Hours Actual End: ', hoursActualEnd);

						response[i].lastRequest[0].actualStart = hoursActualEnd - hoursActualStart;

						console.log('Hours Actual: ', response[i].lastRequest[0].actualStart);

						var hoursPlannedStart = new Date(response[i].lastRequest[0].plannedStart).getHours();
						var hoursPlannedEnd = new Date(response[i].lastRequest[0].plannedEnd).getHours();

						if (hoursPlannedEnd < hoursPlannedStart) {
							hoursPlannedEnd = hoursPlannedEnd + 24;

						}

						response[i].lastRequest[0].plannedStart = hoursPlannedEnd - hoursPlannedStart;

						console.log('Hours Planned Start: ', hoursPlannedStart);
						console.log('Hours Planned Start: ', hoursPlannedEnd);

						console.log('Hours Planned: ', response[i].lastRequest[0].plannedStart);						
					} else {
						const none = {
							requestDate : 'None',
							plannedStart: 'None',
							actualStart: 'None',
						};

						response[i].lastRequest.push(none);

						console.log(response[i].lastRequest);
					}

					this.savedPendingAssignment.push(response[i]);

					const startDate = new Date(response[i].plannedStart);
					let startTime;
					let hours;
					let minutes;

					hours = startDate.getHours();
					minutes = startDate.getMinutes();

					if (hours === 0) {
						hours = '00';
					}

					if (minutes === 0) {
						minutes = '00';
					}

					if (hours.toString().length === 1) {
						hours = '0' + hours;
					}

					if (minutes.toString().length === 1) {
						minutes = '0' + minutes;
					}

					startTime = hours + ':' + minutes;

					const endDate = new Date(response[i].plannedEnd);
					let endTime;
					let endMinutes;

					let endHours;
					endHours = endDate.getHours();
					endMinutes = endDate.getMinutes();

					if (endHours === 0) {
						endHours = '00';
					}

					if (endHours.toString().length === 1) {
						endHours = '0' + endHours;
					}

					if (endMinutes === 0) {
						endMinutes = '00';
					}

					if (endMinutes.toString().length === 1) {
						endMinutes = '0' + endMinutes;
					}

					endTime = endHours + ':' + endMinutes;

					const newDate = this.utilsService.getDateFormat(new Date(response[i].plannedStart));

					pendingAssignment.push([
						new TableItem({ data: newDate }),
						new TableItem({ data: requesterName}),
						new TableItem({ data: startTime }),
						new TableItem({ data: endTime }),
						new TableItem({ data: Math.floor((response[i].weekdayCount + response[i].weekendCount) / 60) + ' Hours, ' + (response[i].weekdayCount + response[i].weekendCount) % 60 + ' Mins' })
					]);
				} else if (type === 'WorkAssignment' && this.userType === 'manager' && this.tableType === 'Archived' && this.type === 'Rejected') {
					this.savedRejectedAssignment.push(response[i]);

					const startDate = new Date(response[i].plannedStart);
					let startTime;
					let hours;
					let minutes;

					hours = startDate.getHours();
					minutes = startDate.getMinutes();

					if (hours === 0) {
						hours = '00';
					}

					if (minutes === 0) {
						minutes = '00';
					}

					if (hours.toString().length === 1) {
						hours = '0' + hours;
					}

					if (minutes.toString().length === 1) {
						minutes = '0' + minutes;
					}

					startTime = hours + ':' + minutes;

					const endDate = new Date(response[i].plannedEnd);
					let endTime;
					let endMinutes;

					let endHours;
					endHours = endDate.getHours();
					endMinutes = endDate.getMinutes();

					if (endHours === 0) {
						endHours = '00';
					}

					if (endHours.toString().length === 1) {
						endHours = '0' + endHours;
					}

					if (endMinutes === 0) {
						endMinutes = '00';
					}

					if (endMinutes.toString().length === 1) {
						endMinutes = '0' + endMinutes;
					}

					endTime = endHours + ':' + endMinutes;

					let newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));
					if (this.latestDateAssignment === newDate) {
						newDate = '';
					} else {
						this.latestDateAssignment = newDate;
					}

					rejectedAssignment.push([
						new TableItem({ data: newDate }),
						new TableItem({ data: requesterName}),
						new TableItem({ data: startTime }),
						new TableItem({ data: endTime }),
						new TableItem({ data: Math.floor((response[i].weekdayCount + response[i].weekendCount) / 60) + ' Hours, ' + (response[i].weekdayCount + response[i].weekendCount) % 60 + ' Mins'})
					]);
				} else if (type === 'WorkAssignment' && this.userType === 'manager' && this.type === 'Rejected') {
					if (response[i].lastRequest.length !== 0) {
						console.log(response[i].lastRequest[0].requestDate);
						response[i].lastRequest[0].requestDate = this.utilsService.getDateFormat(new Date(response[i].lastRequest[0].requestDate));
						console.log('Last Request Date: ', response[i].lastRequest[0].requestDate);
						
						var hoursActualStart = new Date(response[i].lastRequest[0].actualStart).getHours();
						var hoursActualEnd = new Date(response[i].lastRequest[0].actualEnd).getHours();

						if (hoursActualEnd < hoursActualStart) {
							hoursActualEnd = hoursActualEnd + 24;
						}

						console.log('Hours Actual Start: ', hoursActualStart);
						console.log('Hours Actual End: ', hoursActualEnd);

						response[i].lastRequest[0].actualStart = hoursActualEnd - hoursActualStart;

						console.log('Hours Actual: ', response[i].lastRequest[0].actualStart);

						var hoursPlannedStart = new Date(response[i].lastRequest[0].plannedStart).getHours();
						var hoursPlannedEnd = new Date(response[i].lastRequest[0].plannedEnd).getHours();

						if (hoursPlannedEnd < hoursPlannedStart) {
							hoursPlannedEnd = hoursPlannedEnd + 24;

						}

						response[i].lastRequest[0].plannedStart = hoursPlannedEnd - hoursPlannedStart;

						console.log('Hours Planned Start: ', hoursPlannedStart);
						console.log('Hours Planned Start: ', hoursPlannedEnd);

						console.log('Hours Planned: ', response[i].lastRequest[0].plannedStart);
					} else {
						const none = {
							requestDate : 'None',
							plannedStart: 'None',
							actualStart: 'None',
						};

						response[i].lastRequest.push(none);

						console.log(response[i].lastRequest);
					}

					this.savedRejected.push(response[i]);

					const startDate = new Date(response[i].plannedStart);
					let startTime;
					let hours;
					let minutes;

					hours = startDate.getHours();
					minutes = startDate.getMinutes();

					if (hours === 0) {
						hours = '00';
					}

					if (minutes === 0) {
						minutes = '00';
					}

					if (hours.toString().length === 1) {
						hours = '0' + hours;
					}

					if (minutes.toString().length === 1) {
						minutes = '0' + minutes;
					}

					startTime = hours + ':' + minutes;

					const endDate = new Date(response[i].plannedEnd);
					let endTime;
					let endMinutes;

					let endHours;
					endHours = endDate.getHours();
					endMinutes = endDate.getMinutes();

					if (endHours === 0) {
						endHours = '00';
					}

					if (endHours.toString().length === 1) {
						endHours = '0' + endHours;
					}

					if (endMinutes === 0) {
						endMinutes = '00';
					}

					if (endMinutes.toString().length === 1) {
						endMinutes = '0' + endMinutes;
					}

					endTime = endHours + ':' + endMinutes;

					const newDate = this.utilsService.getDateFormat(new Date(response[i].plannedStart));

					rejectedAssignment.push([
						new TableItem({ data: newDate }),
						new TableItem({ data: requesterName}),
						new TableItem({ data: startTime }),
						new TableItem({ data: endTime }),
						new TableItem({ data: Math.floor((response[i].weekdayCount + response[i].weekendCount) / 60) + ' Hours, ' + (response[i].weekdayCount + response[i].weekendCount) % 60 + ' Mins'})
					]);
				} else if (type === 'WorkAssignment' && this.userType === 'manager' && this.tableType === 'Archived' && this.type === 'Approved') {
					this.savedApprovedAssignment.push(response[i]);

					const startDate = new Date(response[i].plannedStart);
					let startTime;
					let hours;
					let minutes;

					hours = startDate.getHours();
					minutes = startDate.getMinutes();

					if (hours === 0) {
						hours = '00';
					}

					if (minutes === 0) {
						minutes = '00';
					}

					if (hours.toString().length === 1) {
						hours = '0' + hours;
					}

					if (minutes.toString().length === 1) {
						minutes = '0' + minutes;
					}

					startTime = hours + ':' + minutes;

					const endDate = new Date(response[i].plannedEnd);
					let endTime;
					let endMinutes;

					let endHours;
					endHours = endDate.getHours();
					endMinutes = endDate.getMinutes();

					if (endHours === 0) {
						endHours = '00';
					}

					if (endHours.toString().length === 1) {
						endHours = '0' + endHours;
					}

					if (endMinutes === 0) {
						endMinutes = '00';
					}

					if (endMinutes.toString().length === 1) {
						endMinutes = '0' + endMinutes;
					}

					endTime = endHours + ':' + endMinutes;

					let newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));
					if (this.latestDateAssignment === newDate) {
						newDate = '';
					} else {
						this.latestDateAssignment = newDate;
					}

					approvedAssignment.push([
						new TableItem({ data: newDate }),
						new TableItem({ data: requesterName}),
						new TableItem({ data: startTime }),
						new TableItem({ data: endTime }),
						new TableItem({ data: Math.floor((response[i].weekdayCount + response[i].weekendCount) / 60) + ' Hours, ' + (response[i].weekdayCount + response[i].weekendCount) % 60 + ' Mins' })
					]);
				} else if (type === 'WorkAssignment' && this.userType === 'manager' && this.type === 'Approved') {
					if (response[i].lastRequest.length !== 0) {
						console.log(response[i].lastRequest[0].requestDate);
						response[i].lastRequest[0].requestDate = this.utilsService.getDateFormat(new Date(response[i].lastRequest[0].requestDate));
						console.log('Last Request Date: ', response[i].lastRequest[0].requestDate);
						
						var hoursActualStart = new Date(response[i].lastRequest[0].actualStart).getHours();
						var hoursActualEnd = new Date(response[i].lastRequest[0].actualEnd).getHours();

						if (hoursActualEnd < hoursActualStart) {
							hoursActualEnd = hoursActualEnd + 24;
						}

						console.log('Hours Actual Start: ', hoursActualStart);
						console.log('Hours Actual End: ', hoursActualEnd);

						response[i].lastRequest[0].actualStart = hoursActualEnd - hoursActualStart;

						console.log('Hours Actual: ', response[i].lastRequest[0].actualStart);

						var hoursPlannedStart = new Date(response[i].lastRequest[0].plannedStart).getHours();
						var hoursPlannedEnd = new Date(response[i].lastRequest[0].plannedEnd).getHours();

						if (hoursPlannedEnd < hoursPlannedStart) {
							hoursPlannedEnd = hoursPlannedEnd + 24;

						}

						response[i].lastRequest[0].plannedStart = hoursPlannedEnd - hoursPlannedStart;

						console.log('Hours Planned Start: ', hoursPlannedStart);
						console.log('Hours Planned Start: ', hoursPlannedEnd);

						console.log('Hours Planned: ', response[i].lastRequest[0].plannedStart);
					} else {
						const none = {
							requestDate : 'None',
							plannedStart: 'None',
							actualStart: 'None',
						};

						response[i].lastRequest.push(none);

						console.log(response[i].lastRequest);
					}

					this.savedApprovedAssignment.push(response[i]);

					const startDate = new Date(response[i].plannedStart);
					let startTime;
					let hours;
					let minutes;

					hours = startDate.getHours();
					minutes = startDate.getMinutes();

					if (hours === 0) {
						hours = '00';
					}

					if (minutes === 0) {
						minutes = '00';
					}

					if (hours.toString().length === 1) {
						hours = '0' + hours;
					}

					if (minutes.toString().length === 1) {
						minutes = '0' + minutes;
					}

					startTime = hours + ':' + minutes;

					const endDate = new Date(response[i].plannedEnd);
					let endTime;
					let endMinutes;

					let endHours;
					endHours = endDate.getHours();
					endMinutes = endDate.getMinutes();

					if (endHours === 0) {
						endHours = '00';
					}

					if (endHours.toString().length === 1) {
						endHours = '0' + endHours;
					}

					if (endMinutes === 0) {
						endMinutes = '00';
					}

					if (endMinutes.toString().length === 1) {
						endMinutes = '0' + endMinutes;
					}

					endTime = endHours + ':' + endMinutes;

					const newDate = this.utilsService.getDateFormat(new Date(response[i].plannedStart));

					approvedAssignment.push([
						new TableItem({ data: newDate }),
						new TableItem({ data: requesterName}),
						new TableItem({ data: startTime }),
						new TableItem({ data: endTime }),
						new TableItem({ data: Math.floor((response[i].weekdayCount + response[i].weekendCount) / 60) + ' Hours, ' + (response[i].weekdayCount + response[i].weekendCount) % 60 + ' Mins' })
					]);
				} else if (this.userType === 'manager' && this.tableType === 'Today' && this.type === 'Pending') {
					this.savedPending.push(response[i]);

					pending.push([
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].origin + ' / ' + response[i].destination }),
						new TableItem({ data: response[i].transportation })
					]);
				} else if (this.userType === 'manager' && this.tableType === 'Archived' && this.type === 'Revoked') {
					this.savedRevoked.push(response[i]);

					let newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));
					if (this.latestDate === newDate) {
						newDate = '';
					} else {
						this.latestDate = newDate;
					}

					revoked.push([
						new TableItem({ data: newDate }),
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].origin + ' / ' + response[i].destination }),
						new TableItem({ data: response[i].transportation })
					]);
				} else if (this.userType === 'manager' && this.type === 'Revoked') {
					this.savedRevoked.push(response[i]);

					revoked.push([
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].origin + ' / ' + response[i].destination }),
						new TableItem({ data: response[i].transportation })
					]);
				} else if (this.userType === 'manager' && this.tableType === 'Archived' && this.type === 'Rejected') {
					this.savedRejected.push(response[i]);
					let newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));
					if (this.latestDate === newDate) {
						newDate = '';
					} else {
						this.latestDate = newDate;
					}

					rejected.push([
						new TableItem({ data: newDate }),
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].origin + ' / ' + response[i].destination }),
						new TableItem({ data: response[i].transportation })
					]);
				} else if (this.userType === 'manager' && this.type === 'Rejected') {
					this.savedRejected.push(response[i]);

					rejected.push([
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].origin + ' / ' + response[i].destination }),
						new TableItem({ data: response[i].transportation })
					]);
				} else if (this.userType === 'manager' && this.tableType === 'Archived' && this.type === 'Approved') {
					this.savedResponse.push(response[i]);
					let newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));
					if (this.latestDate === newDate) {
						newDate = '';
					} else {
						this.latestDate = newDate;
					}

					approved.push([
						new TableItem({ data: newDate }),
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].origin + ' / ' + response[i].destination }),
						new TableItem({ data: response[i].transportation })
					]);
				} else if (this.userType === 'manager' && this.type === 'Approved') {
					this.savedResponse.push(response[i]);
					approved.push([
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].origin + ' / ' + response[i].destination }),
						new TableItem({ data: response[i].transportation })
					]);
				} else if (this.userType === 'sc' && this.tableType === 'Archived' && this.type === 'Revoked') {
					this.savedRevoked.push(response[i]);
					let newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));
					if (this.latestDate === newDate) {
						newDate = '';
					} else {
						this.latestDate = newDate;
					}

					revoked.push([
						new TableItem({ data: newDate }),
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].origin }),
						new TableItem({ data: response[i].transportation })
					]);
				} else if (this.userType === 'sc' && this.tableType === 'Today' && this.type === 'Pending') {
					this.savedPending.push(response[i]);

					pending.push([
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].origin}),
						new TableItem({ data: response[i].transportation })
					]);
				} else if (this.userType === 'sc' && this.type === 'Revoked') {
					this.savedRevoked.push(response[i]);

					revoked.push([
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].origin }),
						new TableItem({ data: response[i].transportation })
					]);
				} else if (this.userType === 'sc' && this.tableType === 'Archived' && this.type === 'Rejected') {
					this.savedRejected.push(response[i]);
					let newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));
					if (this.latestDate === newDate) {
						newDate = '';
					} else {
						this.latestDate = newDate;
					}

					rejected.push([
						new TableItem({ data: newDate }),
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].origin }),
						new TableItem({ data: response[i].transportation })
					]);
				} else if (this.userType === 'sc' && this.type === 'Rejected') {
					this.savedRejected.push(response[i]);

					rejected.push([
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].origin }),
						new TableItem({ data: response[i].transportation })
					]);
				} else if (this.userType === 'sc' && this.tableType === 'Archived' && this.type === 'Approved') {
					this.savedResponse.push(response[i]);
					let newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));
					if (this.latestDate === newDate) {
						newDate = '';
					} else {
						this.latestDate = newDate;
					}

					approved.push([
						new TableItem({ data: newDate }),
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].origin }),
						new TableItem({ data: response[i].transportation })
					]);
				} else if (this.userType === 'sc' && this.type === 'Approved') {
					this.savedResponse.push(response[i]);
					approved.push([
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].origin }),
						new TableItem({ data: response[i].transportation })
					]);
				} else if (this.userType === 'hsc' && this.tableType === 'Today' && this.type === 'Pending') {
					this.savedPending.push(response[i]);

					pending.push([
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].pickupPoint }),
						new TableItem({ data: response[i].itemType + ' (' + response[i].quantity + ')' })
					]);
				} else if (this.userType === 'hsc' && this.tableType === 'Archived' && this.type === 'Revoked') {
					this.savedRevoked.push(response[i]);
					let newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));
					if (this.latestDate === newDate) {
						newDate = '';
					} else {
						this.latestDate = newDate;
					}

					revoked.push([
						new TableItem({ data: newDate }),
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].pickupPoint }),
						new TableItem({ data: response[i].itemType + ' (' + response[i].quantity + ')' })
					]);
				} else if (this.userType === 'hsc' && this.type === 'Revoked') {
					this.savedRevoked.push(response[i]);

					revoked.push([
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].pickupPoint }),
						new TableItem({ data: response[i].itemType + ' (' + response[i].quantity + ')' })
					]);
				} else if (this.userType === 'hsc' && this.tableType === 'Archived' && this.type === 'Rejected') {
					this.savedRejected.push(response[i]);
					let newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));
					if (this.latestDate === newDate) {
						newDate = '';
					} else {
						this.latestDate = newDate;
					}

					rejected.push([
						new TableItem({ data: newDate }),
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].pickupPoint }),
						new TableItem({ data: response[i].itemType + ' (' + response[i].quantity + ')' })
					]);
				} else if (this.userType === 'hsc' && this.type === 'Rejected') {
					this.savedRejected.push(response[i]);

					rejected.push([
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].pickupPoint }),
						new TableItem({ data: response[i].itemType + ' (' + response[i].quantity + ')' })
					]);
				} else if (this.userType === 'hsc' && this.tableType === 'Archived' && this.type === 'Approved') {
					this.savedResponse.push(response[i]);
					let newDate = this.utilsService.getDateFormat(new Date(response[i].requestDate));
					if (this.latestDate === newDate) {
						newDate = '';
					} else {
						this.latestDate = newDate;
					}
					approved.push([
						new TableItem({ data: newDate }),
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].pickupPoint }),
						new TableItem({ data: response[i].itemType + ' (' + response[i].quantity + ')' })
					]);
				} else if (this.userType === 'hsc' && this.type === 'Approved') {
					this.savedResponse.push(response[i]);
					approved.push([
						new TableItem({ data: requesterName}),
						new TableItem({ data: response[i].pickupPoint }),
						new TableItem({ data: response[i].itemType + ' (' + response[i].quantity + ')' })
					]);
				}

				if (type === 'Overtime') {
					this.overtimeCheckboxes.push(false);
				} else if (type === 'WorkAssignment') {
					this.assignmentCheckboxes.push(false);
				} else if (type === 'Shift') {
					this.shiftCheckboxes.push(false);
				} else if (type === 'Leave') {
					this.leaveCheckboxes.push(false);
				} else {
					this.checkboxes.push(false);
				}
			}
		}

		if (this.type === 'Pending' && type === 'Overtime') {
			this.modelOvertime.data = pendingOvertime;
			console.log(this.modelOvertime.data);

			if (this.dataExistOvertime) {
				this.dataNumberOvertime = this.modelOvertime.data.length;
			} else {
				this.dataNumberOvertime = 0;
			}
		} else if (this.type === 'Approved' && type === 'Overtime') {
			this.modelOvertime.data = approvedOvertime;
			console.log(this.modelOvertime.data);

			if (this.dataExistOvertime) {
				this.dataNumberOvertime = this.modelOvertime.data.length;
			} else {
				this.dataNumberOvertime = 0;
			}
		} else if (this.type === 'Rejected' && type === 'Overtime') {
			this.modelOvertime.data = rejectedOvertime;
			console.log(this.modelOvertime.data);

			if (this.dataExistOvertime) {
				this.dataNumberOvertime = this.modelOvertime.data.length;
			} else {
				this.dataNumberOvertime = 0;
			}
		} else if (this.type === 'Pending' && type === 'WorkAssignment') {
			this.modelAssignment.data = pendingAssignment;
			console.log(this.modelAssignment.data);

			if (this.dataExistAssignment) {
				this.dataNumberAssignment = this.modelAssignment.data.length;
			} else {
				this.dataNumberAssignment = 0;
			}
		} else if (this.type === 'Approved' && type === 'WorkAssignment') {
			this.modelAssignment.data = approvedAssignment;
			console.log(this.modelAssignment.data);

			if (this.dataExistAssignment) {
				this.dataNumberAssignment = this.modelOvertime.data.length;
			} else {
				this.dataNumberAssignment = 0;
			}
		} else if (this.type === 'Rejected' && type === 'WorkAssignment') {
			this.modelAssignment.data = rejectedAssignment;
			console.log(this.modelAssignment.data);

			if (this.dataExistAssignment) {
				this.dataNumberAssignment = this.modelAssignment.data.length;
			} else {
				this.dataNumberAssignment = 0;
			}
		} else if (this.type === 'Pending' && type === 'Shift') {
			this.modelShift.data = pendingShift;
			console.log(this.modelShift.data);

			if (this.dataExistShift) {
				this.dataNumberShift = this.modelShift.data.length;
			} else {
				this.dataNumberShift = 0;
			}
		} else if (this.type === 'Approved' && type === 'Shift') {
			this.modelShift.data = approvedShift;
			console.log(this.modelShift.data);

			if (this.dataExistShift) {
				this.dataNumberShift = this.modelShift.data.length;
			} else {
				this.dataNumberShift = 0;
			}
		} else if (this.type === 'Rejected' && type === 'Shift') {
			this.modelShift.data = rejectedShift;
			console.log(this.modelShift.data);

			if (this.dataExistShift) {
				this.dataNumberShift = this.modelShift.data.length;
			} else {
				this.dataNumberShift = 0;
			}
		} else if (this.type === 'Pending' && type === 'Leave') {
			this.modelLeave.data = pendingLeave;
			console.log(this.modelLeave.data);

			if (this.dataExistLeave) {
				this.dataNumberLeave = this.modelLeave.data.length;
			} else {
				this.dataNumberLeave = 0;
			}
		} else if (this.type === 'Approved' && type === 'Leave') {
			this.modelLeave.data = approvedLeave;
			console.log(this.modelLeave.data);

			if (this.dataExistLeave) {
				this.dataNumberLeave = this.modelLeave.data.length;
			} else {
				this.dataNumberLeave = 0;
			}
		} else if (this.type === 'Rejected' && type === 'Leave') {
			this.modelLeave.data = rejectedLeave;
			console.log(this.modelLeave.data);

			if (this.dataExistLeave) {
				this.dataNumberLeave = this.modelLeave.data.length;
			} else {
				this.dataNumberLeave = 0;
			}
		} else if (this.type === 'Pending') {
			this.model.data = pending;
			console.log(this.model.data);

			if (this.dataExist) {
				this.dataNumber = this.model.data.length;
			} else {
				this.dataNumber = 0;
			}
		} else if (this.type === 'Revoked') {
			this.model.data = revoked;
			console.log(this.model.data);

			if (this.dataExist) {
				this.dataNumber = this.model.data.length;
			} else {
				this.dataNumber = 0;
			}
		} else if (this.type === 'Rejected') {
			this.model.data = rejected;
			console.log(this.model.data);

			if (this.dataExist) {
				this.dataNumber = this.model.data.length;
			} else {
				this.dataNumber = 0;
			}
		} else {
			this.model.data = approved;
			console.log(this.model.data);

			if (this.dataExist) {
				this.dataNumber = this.model.data.length;
			} else {
				this.dataNumber = 0;
			}
		}
	}

	checkboxFunction(input) {
		if (input === 'all') {
			if (this.isCheckAll === false) {
				for (let i = 0; i < this.checkboxes.length; i++) {
					this.checkboxes[i] = true;
				}
				this.isCheckAll = true;
			} else {
				for (let i = 0; i < this.checkboxes.length; i++) {
					this.checkboxes[i] = false;
				}
				this.isCheckAll = false;
			}
		} else {
			if (this.checkboxes[input] === false) {
				this.checkboxes[input] = true;
			} else {
				this.checkboxes[input] = false;
			}
			let trueCount = 0;
			for (let i = 0; i < this.checkboxes.length; i++) {
				if (this.checkboxes[i] === true) {
					trueCount++;
				}
			}
			if (trueCount === this.dataNumber) {
				this.isCheckAll = true;
			} else {
				this.isCheckAll = false;
			}
		}
	}

	overtimeCheckboxFunction(input) {
		if (input === 'all') {
			if (this.isCheckAllOvertime === false) {
				for (let i = 0; i < this.overtimeCheckboxes.length; i++) {
					this.overtimeCheckboxes[i] = true;
				}
				this.isCheckAllOvertime = true;
			} else {
				for (let i = 0; i < this.overtimeCheckboxes.length; i++) {
					this.overtimeCheckboxes[i] = false;
				}
				this.isCheckAllOvertime = false;
			}
		} else {
			if (this.overtimeCheckboxes[input] === false) {
				this.overtimeCheckboxes[input] = true;
			} else {
				this.overtimeCheckboxes[input] = false;
			}
			let trueCount = 0;
			for (let i = 0; i < this.overtimeCheckboxes.length; i++) {
				if (this.overtimeCheckboxes[i] === true) {
					trueCount++;
				}
			}
			if (trueCount === this.dataNumberOvertime) {
				this.isCheckAllOvertime = true;
			} else {
				this.isCheckAllOvertime = false;
			}
		}
	}

	assignmentCheckboxFunction(input) {
		if (input === 'all') {
			if (this.isCheckAllAssignment === false) {
				for (let i = 0; i < this.assignmentCheckboxes.length; i++) {
					this.assignmentCheckboxes[i] = true;
				}
				this.isCheckAllAssignment = true;
			} else {
				for (let i = 0; i < this.assignmentCheckboxes.length; i++) {
					this.assignmentCheckboxes[i] = false;
				}
				this.isCheckAllAssignment = false;
			}
		} else {
			if (this.assignmentCheckboxes[input] === false) {
				this.assignmentCheckboxes[input] = true;
			} else {
				this.assignmentCheckboxes[input] = false;
			}
			let trueCount = 0;
			for (let i = 0; i < this.assignmentCheckboxes.length; i++) {
				if (this.assignmentCheckboxes[i] === true) {
					trueCount++;
				}
			}
			if (trueCount === this.dataNumberAssignment) {
				this.isCheckAllAssignment = true;
			} else {
				this.isCheckAllAssignment = false;
			}
		}
	}

	shiftCheckboxFunction(input) {
		if (input === 'all') {
			if (this.isCheckAllShift === false) {
				for (let i = 0; i < this.shiftCheckboxes.length; i++) {
					this.shiftCheckboxes[i] = true;
				}
				this.isCheckAllShift = true;
			} else {
				for (let i = 0; i < this.shiftCheckboxes.length; i++) {
					this.shiftCheckboxes[i] = false;
				}
				this.isCheckAllShift = false;
			}
		} else {
			if (this.shiftCheckboxes[input] === false) {
				this.shiftCheckboxes[input] = true;
			} else {
				this.shiftCheckboxes[input] = false;
			}
			let trueCount = 0;
			for (let i = 0; i < this.shiftCheckboxes.length; i++) {
				if (this.shiftCheckboxes[i] === true) {
					trueCount++;
				}
			}
			if (trueCount === this.dataNumberShift) {
				this.isCheckAllShift = true;
			} else {
				this.isCheckAllShift = false;
			}
		}
	}

	leaveCheckboxFunction(input) {
		if (input === 'all') {
			if (this.isCheckAllLeave === false) {
				for (let i = 0; i < this.leaveCheckboxes.length; i++) {
					this.leaveCheckboxes[i] = true;
				}
				this.isCheckAllLeave = true;
			} else {
				for (let i = 0; i < this.leaveCheckboxes.length; i++) {
					this.leaveCheckboxes[i] = false;
				}
				this.isCheckAllLeave = false;
			}
		} else {
			if (this.leaveCheckboxes[input] === false) {
				this.leaveCheckboxes[input] = true;
			} else {
				this.leaveCheckboxes[input] = false;
			}
			let trueCount = 0;
			for (let i = 0; i < this.leaveCheckboxes.length; i++) {
				if (this.leaveCheckboxes[i] === true) {
					trueCount++;
				}
			}
			if (trueCount === this.dataNumberLeave) {
				this.isCheckAllLeave = true;
			} else {
				this.isCheckAllLeave = false;
			}
		}
	}
}
