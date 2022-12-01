import '@carbon/charts/styles.css';
import 'app/ibm-plex-font.css';

import { Component, Inject, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import {
	TableModel,
	TableItem,
	TableHeaderItem,
	ModalService,
	PaginationModel,
} from 'carbon-components-angular';
import { EmployeeService } from '../../core/services/employee.service';
import { SiteManagerService } from '../../core/services/site-manager.service';
import { ManagerService } from '../../core/services/manager.service';
import { HealthSafetyManagerService } from '../../core/services/health-safety-manager.service';
import { FunService } from '../../core/services/fun.service';
import { ToastrService } from 'ngx-toastr';
// import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

// Start of Modal Imports //
import { CheckInComponent } from '../../check-in/check-in/check-in.component';
import { ClaimItemComponent } from '../../claim-item/claim-item/claim-item.component';
import { FinishOvertimeComponent } from '../../finish-overtime/finish-overtime/finish-overtime.component';
import { DetailRequestModalComponent } from '../../detail-request-modal/detail-request-modal/detail-request-modal.component';
import { DetailRequestItemModalComponent } from '../../detail-request-item-modal/detail-request-item-modal/detail-request-item-modal.component';
import { ReviewRequestComponent } from '../../review-request/review-request/review-request.component';
import { ReviewShiftComponent } from '../../review-shift/review-shift/review-shift.component';
import { ReviewLeaveComponent } from '../../review-leave/review-leave/review-leave.component';
import { ItemRequestComponent } from '../../item-request/item-request/item-request.component';
import { ReviewOvertimeComponent } from '../../review-overtime/review-overtime/review-overtime.component';
import { TableApprovalComponent } from '../../table-approval/table-approval/table-approval.component';
// End of Modal Imports //

import { MatDatepicker } from '@angular/material';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit, OnInit {
	todayDate;
	tomorrowDate;



	
	
	isValidMoment: boolean = false;
	form: FormGroup;


	// Navigation stuff
	dashboardMode = 0; // 0 is default for Employee Dashboard
	uri: string; // uri segment
	userType = ''; // user, sc, hsc, manager

	// Employee Title
	userName = 'Employee';
	loginText = 'Employee';
	orgID = '';
	otEligibility = '';
	isManager = '';
	isVaccinated = '';
	
	// Employee Subtitle
	currTime: string;
	zone = 'Origin';
	temperature: any = '30';
	humidity: any = '50';
	risk = 'None';

	// SVG
	documentIcon = '../../assets/icons/document_icon.svg';
	srcChecklist = '../../assets/icons/check.svg';
	srcCross = '../../assets/icons/cross.svg';
	srcPen = '../../assets/icons/pen.svg';
	srcBullet = '../../../../assets/images/bullet.svg';
	srcBulletEmpty = '../../../../assets/images/bullet_empty.svg';
	srcTrail = '../../../../assets/images/trails.svg';

	// Employee variables
	boxes: any = []; // contains dynamic styling for activity's list elements
	travelBoxes: any = []; // for travel requests portion of activity list
	vitaminBoxes: any = []; // for item requests portion of activity list
	overtimeBoxes: any = []; // for overtime requests portion of activity list
	workAssignmentBoxes: any = []; // for work assignment requests portion of activity list
	shiftBoxes: any = []; // for shift switch requests portion of activity list
	incomingShiftBoxes: any = []; // for incoming shift switch requests portion of activity list
	incomingAssignShiftBoxes: any = []; // for incoming assign shift requests portion of activity list
	leaveBoxes: any = []; // for leave requests portion of activity list
	boxWidth = 300 + 'px'; // box width scaled to fit form width
	requestSpanWidth = 200 + 'px'; // span width to display request text

	// Approver variables
	data: any = []; // for pie chart
	historyData: any = [];
	dataExist = false; // boolean to check if table has data
	dataNumber;
	isCheckAll = false; // default condition of select all checkbox
	checkboxes: any = [];
	model = new TableModel();
	skeleton = false;
	dataPackage: any = []; // to store response
	dataPackageRequested = []; // to store request with status Requested
	archived = false; // To determine Today / History View
	paginationModel = new PaginationModel();
	pageUpdate = new Subject<any>();
	requestType: string;
	savedResponse: any;
	savedRevoked = [];
	savedRejected = [];

	pendingCount;
	approvedCount;
	revokedCount;
	rejectedCount;

	approvedCountHistory;
	revokedCountHistory;
	rejectedCountHistory;

	excelFile: File;
	totalEmployee: any;

	// Banner Variables

	public firstContent: any;
	public contents: any;
	public allBanners: any;
	public filteredBanners: any;
	public getImageURL: string;
	public numberOfContents;

	options = {
		// donut chart options
		resizable: true,
		height: '260px',
		width: '300px',
		style: 'css',
		donut: {
			center: {
				label: 'Today\'s Requests',
			},
		},
		legend: {
			alignment: 'center',
			enabled: false,
		},
		tooltip: {
			datapoint: {
				enabled: false,
			},
		},
	};
	optionsHistory = {
		// donut chart options
		resizable: true,
		height: '260px',
		width: '300px',
		style: 'css',
		donut: {
			center: {
				label: 'Past Requests',
			},
		},
		legend: {
			alignment: 'center',
			enabled: false,
		},
		tooltip: {
			datapoint: {
				enabled: false,
			},
		},
	};

	// Create & Update Content

	menuType: any;
	public loaders: number[];
	public searching: boolean;
	public loading: boolean;
	public loading_delete: boolean;
	public modelChanged: Subject<string> = new Subject<string>();
	public subscription: Subscription;
	public filter: string;
	public page: number;
	public pageMax: number;
	public entries: number;
	public list: any[];

	contentForm: FormGroup;
	updateForm: FormGroup;

	public startHour: string = undefined;
	invalidStartHour = false;

	public startMinute: string = undefined;
	invalidStartMinute = false;

	public startTime: any;
	invalidStartTime = false;

	public endHour: string = undefined;
	invalidEndHour = false;

	public endMinute: string = undefined;
	invalidEndMinute = false;

	public endTime: any;
	invalidEndTime = false;

	public startHourTwo: string = undefined;
	invalidStartHourTwo = false;

	public startMinuteTwo: string = undefined;
	invalidStartMinuteTwo = false;

	public startTimeTwo: any;
	invalidStartTimeTwo = false;

	public endHourTwo: string = undefined;
	invalidEndHourTwo = false;

	public endMinuteTwo: string = undefined;
	invalidEndMinuteTwo = false;

	public endTimeTwo: any;
	invalidEndTimeTwo = false;

	public hour: any = [
		{
			content: '00'
		},
		{
			content: '01'
		},
		{
			content: '02'
		},
		{
			content: '03'
		},
		{
			content: '04'
		},
		{
			content: '05'
		},
		{
			content: '06'
		},
		{
			content: '07'
		},
		{
			content: '08'
		},
		{
			content: '09'
		},
		{
			content: '10'
		},
		{
			content: '11'
		},
		{
			content: '12'
		},
		{
			content: '13'
		},
		{
			content: '14'
		},
		{
			content: '15'
		},
		{
			content: '16'
		},
		{
			content: '17'
		},
		{
			content: '18'
		},
		{
			content: '19'
		},
		{
			content: '20'
		},
		{
			content: '21'
		},
		{
			content: '22'
		},
		{
			content: '23'
		},
	];

	public minute: any = [
		{
			content: '00'
		},
		{
			content: '01'
		},
		{
			content: '02'
		},
		{
			content: '03'
		},
		{
			content: '04'
		},
		{
			content: '05'
		},
		{
			content: '06'
		},
		{
			content: '07'
		},
		{
			content: '08'
		},
		{
			content: '09'
		},
		{
			content: '10'
		},
		{
			content: '11'
		},
		{
			content: '12'
		},
		{
			content: '13'
		},
		{
			content: '14'
		},
		{
			content: '15'
		},
		{
			content: '16'
		},
		{
			content: '17'
		},
		{
			content: '18'
		},
		{
			content: '19'
		},
		{
			content: '20'
		},
		{
			content: '21'
		},
		{
			content: '22'
		},
		{
			content: '23'
		},
		{
			content: '24'
		},
		{
			content: '25'
		},
		{
			content: '26'
		},
		{
			content: '27'
		},
		{
			content: '28'
		},
		{
			content: '29'
		},
		{
			content: '30'
		},
		{
			content: '31'
		},
		{
			content: '32'
		},
		{
			content: '33'
		},
		{
			content: '34'
		},
		{
			content: '35'
		},
		{
			content: '36'
		},
		{
			content: '37'
		},
		{
			content: '38'
		},
		{
			content: '39'
		},
		{
			content: '40'
		},
		{
			content: '41'
		},
		{
			content: '42'
		},
		{
			content: '43'
		},
		{
			content: '44'
		},
		{
			content: '45'
		},
		{
			content: '46'
		},
		{
			content: '47'
		},
		{
			content: '48'
		},
		{
			content: '49'
		},
		{
			content: '50'
		},
		{
			content: '51'
		},
		{
			content: '52'
		},
		{
			content: '53'
		},
		{
			content: '54'
		},
		{
			content: '55'
		},
		{
			content: '56'
		},
		{
			content: '57'
		},
		{
			content: '58'
		},
		{
			content: '59'
		},
	];

	// config: AngularEditorConfig = {
	// 	editable: true,
	// 	height: '10rem',
	// 	minHeight: '5rem',
	// 	placeholder: 'Enter description here...',
	// 	translate: 'no',
	// 	defaultParagraphSeparator: 'p',
	// 	defaultFontName: 'IBM-Plex-Sans-Regular',
	// 	defaultFontSize: '',
	// 	toolbarHiddenButtons: [
	// 		[
	// 			'undo',
	// 			'redo',
	// 			// 'strikeThrough',
	// 			'subscript',
	// 			'superscript',
	// 			// 'justifyLeft',
	// 			// 'justifyCenter',
	// 			// 'justifyRight',
	// 			// 'justifyFull',
	// 			'indent',
	// 			'outdent',
	// 			// 'insertUnorderedList',
	// 			// 'insertOrderedList',
	// 			'heading',
	// 			'fontName'
	// 		],
	// 		[
	// 			// 'fontSize',
	// 			'textColor',
	// 			'backgroundColor',
	// 			'customClasses',
	// 			'link',
	// 			'unlink',
	// 			'insertImage',
	// 			'insertVideo',
	// 			'insertHorizontalRule',
	// 			'removeFormat',
	// 			'toggleEditorMode'
	// 		]
	// 	],
	// 	customClasses: [
	// 		{
	// 			name: 'quote',
	// 			class: 'quote',
	// 		},
	// 		{
	// 			name: 'redText',
	// 			class: 'redText'
	// 		},
	// 		{
	// 			name: 'titleText',
	// 			class: 'titleText',
	// 			tag: 'h1',
	// 		},
	// 	]
	// };

	public pathPhoto;
	public isPathPhoto = false;
	public imageHeader: File;
	public hasChanged: boolean;


	public pathPhotoTwo;
	public isPathPhotoTwo = false;
	public imageHeaderTwo: File;
	public isEditing = false;
	public currentEvent: any;

	rowActive = 0;
	public id: any;
	public eventType = 'Online';
	lastUpdated: any;

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private managerService: ManagerService,
		private employeeService: EmployeeService,
		private siteManagerService: SiteManagerService,
		private hscService: HealthSafetyManagerService,
		public modalService: ModalService,
		private funService: FunService,
		public toastr: ToastrService,
		public fb: FormBuilder,
	) {
		this.contentForm = this.fb.group({
			title: ['', Validators.required],
			description: ['', Validators.required],
			date: ['', Validators.required],
			type: ['', Validators.required],
			location: ['', Validators.required],
			link: ['', Validators.required],
		});

		this.updateForm = this.fb.group({
			title: ['', Validators.required],
			description: ['', Validators.required],
			date: ['', Validators.required],
			type: ['', Validators.required],
			location: ['', Validators.required],
			link: ['', Validators.required],
		});

		this.loaders = [];
		for (let index = 0; index < 5; index++) {
			this.loaders.push(index);
		}

		this.contents = [];
		this.searching = true;
		this.page = 1;
		this.pageMax = 2;
		this.entries = 100000;

		this.subscription = this.modelChanged.pipe(debounceTime(500), )
		.subscribe(() => {
			// Reset pagination.
			this.page = 1;
			this.pageMax = 2;

			this.getListContentWithPage(this.page, this.entries);
			this.page += 1;
		});
	}
	ngAfterViewInit(): void {
		throw new Error('Method not implemented.');
		
		
	}

	ngOnInit() {

		this.form = this.fb.group({
			purchaseDate: '',
		}); 
		
		this.todayDate = new Date();
		this.todayDate = this.todayDate.toDateString();
		this.todayDate = new Date(this.todayDate);
		this.getListContent();
		this.getAllContent();

		this.paginationModel.pageLength = 10;
		this.paginationModel.currentPage = 0;
		const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
		console.log(width);
		if (width < 430) {
			this.boxWidth = (0.79 * width).toString();
		} else {
			this.boxWidth = (0.85 * width).toString();
		}

		if (Number(this.boxWidth) > 515) {
			this.boxWidth = '480px';
		} else {
			this.boxWidth = this.boxWidth + 'px';
		}
		const boxWidthNumber = this.boxWidth.split('p');
		this.requestSpanWidth =
			(0.4 * Number(boxWidthNumber[0])).toString() + 'px';

		this.activatedRoute.queryParams.subscribe((params) => {
			this.employeeService.headerStatusEmitter().emit();
			const token = params.token;
			console.log('route: dashboard');
			const res = this.router.url.match(/daily-checkup/gi);
			const resNew = this.router.url.match(/account/gi);

			// Token Dummy
			// tslint:disable-next-line: max-line-length
			// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTEzNzA0ODIyLCJpc3MiOiJJQk0tTXktV29ya2ZvcmNlIiwiaWQiOiI5MDI3ODIiLCJuYW1lIjoiSUxIQU0gWlVMS0FSTkFJTiIsIm1hbmFnZXJJRCI6IjA3NTE0NyJ9.SWHrmYlGtnCaVzgF66jntkyUHtE3qk3_rUr1qAym3qQ';


			if (token !== undefined) {
				const decodedToken = this.funService.getDecodedAccessToken(token);
				localStorage.setItem('token', token);
				localStorage.setItem('exp', decodedToken.exp);
				console.log(token);
				this.router.navigate(['/dashboard'], {
					queryParams: { state: 'default' },
				});
			}
		});

		this.userType = localStorage.getItem('userType');
		console.log(this.userType);
		if (
			this.userType === '' ||
			this.userType === null ||
			this.userType === undefined
		) {
			this.userType = 'user';
			localStorage.setItem('userType', this.userType);
		}
		this.detectUserType();

		this.employeeService.changeTypeEmitter().subscribe((data) => {
			this.userType = localStorage.getItem('userType');
			this.paginationModel.pageLength = 10;
			this.paginationModel.currentPage = 0;
			this.detectUserType();
		});

		this.managerService.managerEmitter().subscribe((data) => {
			this.paginationModel.pageLength = 10;
			this.paginationModel.currentPage = 0;
			this.detectUserType();
		});

		const currDate = new Date();
		const currHour = currDate.getHours();
		const currMinute = currDate.getMinutes();
		let realMinutes = '';
		let realHours = '';

		if (Number(currMinute) < 10) {
			realMinutes = '0' + Number(currMinute);
		} else {
			realMinutes = Number(currMinute).toString();
		}

		if (Number(currHour) < 10) {
			realHours = '0' + Number(currHour);
		} else {
			realHours = Number(currHour).toString();
		}

		this.currTime = realHours + ':' + realMinutes;

		this.pageUpdate
			.pipe(debounceTime(500), distinctUntilChanged())
			.subscribe((value) => {
				this.selectPage(value);
			});
	}

	onResize(event) {
		console.log(event.target.screen);
		// this.boxWidth = (0.58 * document.getElementById('some-activity').offsetWidth) + 'px';
		if (event.target.screen.width < 430) {
			this.boxWidth = (0.79 * event.target.screen.width).toString();
		} else {
			this.boxWidth = (0.85 * event.target.screen.width).toString();
		}
		if (Number(this.boxWidth) > 515) {
			this.boxWidth = '480px';
		} else {
			this.boxWidth = this.boxWidth + 'px';
		}
		console.log(this.boxWidth);
		const boxWidthNumber = this.boxWidth.split('p');
		this.requestSpanWidth =
			(0.4 * Number(boxWidthNumber[0])).toString() + 'px';
	}

	showError(errorMessage) {
		if (
			errorMessage === '' ||
			errorMessage === null ||
			errorMessage === undefined
		) {
			errorMessage = 'An unknown error occured';
		}
		this.toastr.error(errorMessage);
	}

	detectUserType() {
		this.checkboxes = [];
		this.getEmployeeData();
		this.skeleton = true;
		this.model.header = [
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' }),
		];
		if (this.userType === 'user') {
			this.dashboardMode = 0;
		} else if (this.userType === 'sc') {
			this.loginText = 'Site Coordinator';
			this.getSiteCoordinatorDashboard();
			this.dashboardMode = 1;
		} else if (this.userType === 'hsc') {
			this.dashboardMode = 1;
			this.getHSCDashboard();
			this.loginText = 'Health & Safety Coordinator';
		} else if (this.userType === 'manager') {
			this.getManagerDashboard();
			this.managerService.getSubordinatesVaccinationStatus().subscribe(
				response => {
					this.totalEmployee = response.vaccineStatus.pending;
				},
				error => {
					console.log(error);
			});

			this.loginText = 'Manager';
			this.dashboardMode = 1;
		} else if (this.userType === 'contentManager') {
			this.dashboardMode = 1;
			this.loginText = 'Content Manager';
		}
	}

	onSelectFileExcel() {
		document.getElementById('fileExcel').click();
	}

	onExcelSelected(event: any) {
		if (event.target.files && event.target.files[0]) {
			this.excelFile = event.target.files[0];
		}

		this.managerService.postUserDataExcelFile(this.excelFile).subscribe(
			response => {
				this.toastr.success('Excel File uploaded succesfully, waiting for manager approval');
			},
			error => {
				console.log(error.error);
				this.toastr.error(error.error);
				this.toastr.error('Please refresh the page to retry uploading');
			});
	}

	downloadShiftExcel() {
		this.managerService.downloadShiftExcel().subscribe(
			res => {
				this.excelFile = this.excelBlobToFile(res, 'Excel File');
			},
			error => {
				console.log(error);
		});
	}

	onGetExcel() {
		this.downloadShiftExcel();
		const url = window.URL.createObjectURL(this.excelFile);
		window.open(url, '_blank');
	}

	navigate(uri) {
		if (uri === 'Travel') {
			if (this.isVaccinated === 'Y') {
				this.router.navigate(['/create-travel-request']);
			} else {
				this.showError('Travel request require vaccination certificate. \n' + 'Please upload your latest certificate for Covid-19 vaccination certification from PeduliLindungi in your account settings.');
				return;
			}
		} else if (
			uri === 'Mask' ||
			uri === 'Hand Sanitizer' ||
			uri === 'Thermometer' ||
			uri === 'Vitamin'
		) {
			this.router.navigate(['/create-health-request'], {
				queryParams: { itemType: uri },
			});
		} else if (uri === 'Overtime') {
			this.router.navigate(['/create-overtime-request']);
		} else if (uri === 'WorkAssignment') {
			this.router.navigate(['/create-work-assignment-request']);
		} else if (uri === 'Leave') {
			this.router.navigate(['/create-leave-request']);
		} else if (uri === 'Chatbot') {
			this.router.navigate(['/chatbot']);
		} else if (uri === 'History') {
			this.router.navigate(['/view-request-history']);
		} else if (uri === 'PositionHistory') {
			this.router.navigate(['/position-history']);
		} else if (uri === 'Setting') {
			this.router.navigate(['/account']);
		} else if (uri === 'ItemStock') {
			this.router.navigate(['/item-stock']);
		} else if (uri === 'SiteManagement') {
			this.router.navigate(['/site-management']);
		} else if (uri === 'SeatManagement') {
			this.router.navigate(['/seating-management']);
		} else if (uri === 'ShiftAssignmentHistory') {
			this.router.navigate(['/shift-assignment-history']);
		} else if (uri === 'archivedRequest') {
			this.router.navigate(['/table-approval'], {
				queryParams: {
					archived: true,
					userType: this.userType,
				},
			});
		} else if (uri === 'todayRequest') {
			this.router.navigate(['/table-approval'], {
				queryParams: { userType: this.userType },
			});
		} else if (uri === 'RiskCalculator') {
			this.router.navigate(['/risk-calculator']);
		} else if (uri === 'SurveyPage') {
			this.router.navigate(['/survey-page']);
		} else if (uri === 'ShiftSchedule') {
			this.router.navigate(['/shift-schedule']);
		} else if (uri === 'ShiftAssignment') {
			this.router.navigate(['/shift-assignment']);
		} else if (uri === 'OvertimeDetails') {
			this.router.navigate(['/overtime-details'], {
				queryParams: { type: 'overtime' },
			});
		} else if (uri === 'WorkAssignmentDetails') {
			this.router.navigate(['/overtime-details'], {
				queryParams: { type: 'work-assignment' },
			});
		} else if (uri === 'StatusDetails') {
			this.router.navigate(['/status-details']);
		} else if (uri === 'ShiftExcelApproval') {
			this.router.navigate(['/shift-excel-approval']);
		} else if (uri === 'Vaccine') {
			this.router.navigate(['/vaccine-approval']);
		} else if (uri === 'LeaveDetails') {
			this.router.navigate(['/leave-details']);
		}
	}

	openModalBasedOnUserType(id) {
		this.userType = localStorage.getItem('userType');
		if (this.userType === 'manager' || this.userType === 'sc') {
			this.openModalReviewTravelRequest(id);
		} else if (this.userType === 'hsc') {
			this.openModalReviewItemRequest(id);
		}
	}

	openModalReviewTravelRequest(id) {
		const modal = {
			component: ReviewRequestComponent,
			inputs: { modalText: id },
		};
		this.modalService.create(modal);
	}

	openModalReviewItemRequest(id) {
		const modal = {
			component: ItemRequestComponent,
			inputs: { modalText: id },
		};
		this.modalService.create(modal);
	}

	openModal2(type, status, _id, requestDate, checkInTime) {
		if (type === 'Travel') {
			this.modalService.create({
				component: CheckInComponent,
				inputs: {
					status: status,
					_id: _id,
					requestDate: requestDate,
					checkInTime: checkInTime,
				},
			});
		} else if (type === 'Overtime' || type === 'WorkAssignment') {
			this.modalService.create({
				component: FinishOvertimeComponent,
				inputs: {
					_id: _id,
					type: type,
				},
			});
		} else if (type === 'IncomingShift') {
			this.employeeService.acceptShift({
				'_id': _id
				}).subscribe(
				response => {
					console.log(response);
					location.reload();
				},
				error => {
					console.log(error);
				});
		} else if (type === 'AssignedShift') {
			this.employeeService.approveEmployeeShift({
				'_id': _id
				}).subscribe(
				response => {
					console.log(response);
					location.reload();
				},
				error => {
					location.reload();
					console.log(error);
				});
		} else if (type === 'Leave') {
			this.employeeService.cancelLeaveRequest({
				'_id': _id
				}).subscribe(
				response => {
					console.log(response);
					location.reload();
				},
				error => {
					location.reload();
					console.log(error);
				});
		} else {
			this.modalService.create({
				component: ClaimItemComponent,
				inputs: {
					_id: _id,
				},
			});
		}
	}

	openModal3(type, _id) {
		if (type === 'Travel') {
			this.modalService.create({
				component: DetailRequestModalComponent,
				inputs: {
					_id: _id,
				},
			});
		} else if (type === 'Overtime' || type === 'WorkAssignment') {
			this.modalService.create({
				component: ReviewOvertimeComponent,
				inputs: {
					requestType: 'Details',
					modalText: _id,
					type: type,
				},
			});
		} else if (type === 'Shift' || type === 'IncomingShift' || type === 'AssignedShift') {
			this.modalService.create({
				component: ReviewShiftComponent,
				inputs: {
					requestType: 'Details',
					modalText: _id,
					type: type,
				},
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
					_id: _id,
				},
			});
		}
	}

	getEmployeeData() {
		const resAccount = this.router.url.match(/account/gi);
		const resCheckup = this.router.url.match(/daily-checkup/gi);
		this.boxes = []; // reset boxes content after each API call
		this.travelBoxes = []; // reset boxes content after each API call
		this.vitaminBoxes = []; // reset boxes content after each API call
		this.overtimeBoxes = [];
		this.workAssignmentBoxes = [];
		this.shiftBoxes = [];
		this.incomingShiftBoxes = [];
		this.incomingAssignShiftBoxes = [];
		this.leaveBoxes = [];

		this.employeeService.getUserDashboard().subscribe(
			(response) => {
				console.log(response);
				// Hi, {{userName}}
				localStorage.setItem('id', response._id);
				this.userName = response.name;
				this.orgID = response.orgID;
				this.otEligibility = response.otEligibility;
				this.isManager = response.isManager;
				this.isVaccinated = response.isVaccinated;

				if (response.isNew === 'Y') {
					this.router.navigate(['/account']);
					this.toastr.error(
						'You have to fill your account information before anything'
					);
					this.employeeService.headerStatusTrueEmitter().emit();
				} else if (response.isChecked === 'N') {
					this.router.navigate(['/daily-checkup']);
					this.toastr.error(
						'You have to do your daily checkup before doing anything for today'
					);
					this.employeeService.headerStatusTrueEmitter().emit();
				} else {
					// At {{currTime}} in {{zone}}, ..., and epidemic risk is {{risk}}
					if (
						response.riskRegion !== undefined &&
						response.riskRegion !== null &&
						response.riskRegion !== [] &&
						response.riskRegion.length !== 0
					) {
						this.risk = response.riskRegion[0].kategori;
						console.log(this.risk);
						const splitString =
							response.riskRegion[0].title.split(',');
						this.zone = splitString[0].toLowerCase();
					}
					// Temperature is {{temperature}}, humidity is {{humidity}}
					if (
						response.weatherData !== undefined &&
						response.weatherData !== null &&
						response.weatherData !== [] &&
						response.weatherData.length !== 0
					) {
						this.temperature = response.weatherData.main.feels_like;
						this.humidity = response.weatherData.main.humidity;
					}

					let marginTop = 30; // distance between all the requests to the dashboard menu
					let marginTravel = 0; // distance between all of travel requests to the first item request
					let marginVitamin = 0;
					let marginOvertime = 0;
					let marginAssignment = 0;
					let marginShift = 0;
					let marginIncomingShift = 0;
					let marginAssignShift = 0;

					const gutter = 16; // used for calculation
					const actualGutter = gutter + 'px'; // used for the actual css styling

					if (
						response.travels !== undefined &&
						response.travels !== null
					) {
						let totalBoxHeight = 0;
						let currTop = 0;
						let itemTop = 0;

						for (let i = 0; i < response.travels.length; i++) {
							const items = [];
							const trails = [];
							let boxHeight = 0;

							if (
								response.travels[i] !== undefined &&
								response.travels[i] !== null
							) {
								const top = currTop + 'px';
								const leftTrail = '13px';
								let trailTop = 29;

								for (
									let j = response.travels[i].length - 1;
									j >= 0;
									j--
								) {
									if (j === response.travels[i].length - 1) {
										const dateBanner = {
											height: '50px',
											left: actualGutter,
											top: itemTop + 'px',
											boxDate: {
												left: '25px',
												top: '20px',
												text: new Date(
													response.travels[i][
														j
													].currentDate
												).toDateString(),
											},
										};

										items.push(dateBanner);
										itemTop += 34;
										boxHeight += 34;
										trails.push({
											left: leftTrail,
											top: trailTop + 'px',
											invis: true,
										});
										trailTop += 34;
									} else if (
										response.travels[i][j].status ===
										'CHECKED-OUT'
									) {
										const dateBanner = {
											height: '50px',
											left: actualGutter,
											top: itemTop + 'px',
											boxDate: {
												left: '25px',
												top: '20px',
												text: new Date(
													response.travels[i][
														j
													].currentDate
												).toDateString(),
											},
										};

										items.push(dateBanner);
										itemTop += 34;
										boxHeight += 34;
										trails.push({
											left: leftTrail,
											top: trailTop + 'px',
											invis: true,
										});
										trailTop += 34;
									}

									trails.push({
										left: leftTrail,
										top: trailTop + 'px',
										invis: false,
									});
									trailTop += 34;

									const heightItem = '50px';
									const topItem = itemTop + 'px';

									let currButtonText = '';

									if (
										response.travels[i][j].status ===
										'APPROVED'
									) {
										currButtonText = 'CHECK IN';
									} else if (
										response.travels[i][j].status ===
										'CHECKED-IN'
									) {
										currButtonText = 'CHECK OUT';
									}

									const item = {
										height: heightItem,
										left: actualGutter,
										top: topItem,
										_id: response.travels[i][j]._id,
										requestDate: new Date(
											response.travels[i][j].currentDate
										).toDateString(),
										requestDateTypeDate: new Date(
											new Date(
												response.travels[i][
													j
												].currentDate
											).toDateString()
										),
										checkInTime:
											response.travels[i][j].checkInTime,
										bullet: {
											left: '10px',
											top: '20px',
											src: this.srcBulletEmpty,
										},
										request: {
											left: '25px',
											top: actualGutter,
											text: response.travels[i][j]
												.destination,
											isActive: false,
										},
										status: {
											left: '25px',
											top: '28px',
											text: response.travels[i][j].status,
										},
										button1: {
											right: '70px',
											top: '16px',
											text: currButtonText,
											isLatest:
												response.travels[i][j].isLatest,
										},
										button2: {
											right: '10px',
											top: '16px',
											text: 'DETAILS',
											isLatest:
												response.travels[i][j].isLatest,
										},
									};

									items.push(item);
									itemTop += 34;
									boxHeight += 34;
								}

								this.travelBoxes[i] = {
									type: 'Travel',
									height: boxHeight,
									left: actualGutter,
									top: top,
									trails: trails,
									items: items,
								};

								currTop += boxHeight;
								currTop += 2 * gutter;
								totalBoxHeight += boxHeight;
								totalBoxHeight += 2 * gutter;
								itemTop = 0;
								itemTop += totalBoxHeight;
								marginTravel = totalBoxHeight;
							}
						}
						// For calculating margin-top to be used by dashboardMenu
						marginTop += totalBoxHeight;
					}

					if (
						response.items !== undefined &&
						response.items !== null
					) {
						let totalBoxHeight = 0;
						let currTop = 0;
						let itemTop = 0;

						for (let i = 0; i < response.items.length; i++) {
							const items = [];
							const trails = [];
							let boxHeight = 0;

							if (
								response.items[i] !== undefined &&
								response.items[i] !== null
							) {
								const top = currTop + 'px';
								const leftTrail = '13px';
								let trailTop = 29;

								for (
									let j = response.items[i].length - 1;
									j >= 0;
									j--
								) {
									if (j === response.items[i].length - 1) {
										const dateBanner = {
											height: '50px',
											left: actualGutter,
											top: itemTop + 'px',
											boxDate: {
												left: '25px',
												top: '20px',
												text: new Date(
													response.items[i][
														j
													].pickupTime
												).toDateString(),
											},
										};

										items.push(dateBanner);
										itemTop += 34;
										boxHeight += 34;
										trails.push({
											left: leftTrail,
											top: trailTop + 'px',
											invis: true,
										});
										trailTop += 34;
									}

									trails.push({
										left: leftTrail,
										top: trailTop + 'px',
										invis: false,
									});
									trailTop += 34;

									const heightItem = '50px';
									const topItem = itemTop + 'px';

									let currButtonText = '';

									if (
										response.items[i][j].status ===
										'APPROVED'
									) {
										currButtonText = 'CLAIM';
									}

									const item = {
										height: heightItem,
										left: actualGutter,
										top: topItem,
										_id: response.items[i][j]._id,
										requestDate: new Date(
											response.items[i][j].pickupTime
										).toDateString(),
										requestDateTypeDate: new Date(
											new Date(
												response.items[i][j].pickupTime
											).toDateString()
										),
										bullet: {
											left: '10px',
											top: '20px',
											src: this.srcBulletEmpty,
										},
										request: {
											left: '25px',
											top: actualGutter,
											text: response.items[i][j].itemType,
											isActive: false,
										},
										status: {
											left: '25px',
											top: '28px',
											text: response.items[i][j].status,
										},
										button1: {
											right: '70px',
											top: '16px',
											text: currButtonText,
											isLatest:
												response.items[i][j].isLatest,
										},
										button2: {
											right: '10px',
											top: '16px',
											text: 'DETAILS',
											isLatest:
												response.items[i][j].isLatest,
										},
									};

									items.push(item);
									itemTop += 34;
									boxHeight += 34;
								}

								this.vitaminBoxes[i] = {
									type: response.items[i][0].itemType,
									height: boxHeight,
									left: actualGutter,
									top: top,
									trails: trails,
									items: items,
								};

								currTop += boxHeight;
								currTop += 2 * gutter;
								totalBoxHeight += boxHeight;
								totalBoxHeight += 2 * gutter;
								itemTop = 0;
								itemTop += totalBoxHeight;
								marginVitamin = totalBoxHeight;
							}
						}
						// For calculating margin-top to be used by dashboardMenu
						marginTop += totalBoxHeight;
					}

					if (
						response.overtimes !== undefined &&
						response.overtimes !== null
					) {
						let totalBoxHeight = 0;
						let currTop = 0;
						let itemTop = 0;

						for (let i = 0; i < response.overtimes.length; i++) {
							const items = [];
							const trails = [];
							let boxHeight = 0;

							if (
								response.overtimes[i] !== undefined &&
								response.overtimes[i] !== null
							) {
								const top = currTop + 'px';
								const leftTrail = '13px';
								let trailTop = 29;

								for (
									let j = response.overtimes[i].length - 1;
									j >= 0;
									j--
								) {
									if (
										j ===
										response.overtimes[i].length - 1
									) {
										const dateBanner = {
											height: '50px',
											left: actualGutter,
											top: itemTop + 'px',
											boxDate: {
												left: '25px',
												top: '20px',
												text: new Date(
													response.overtimes[i][
														j
													].plannedStart
												).toDateString(),
											},
										};

										items.push(dateBanner);
										itemTop += 34;
										boxHeight += 34;
										trails.push({
											left: leftTrail,
											top: trailTop + 'px',
											invis: true,
										});
										trailTop += 34;
									}

									trails.push({
										left: leftTrail,
										top: trailTop + 'px',
										invis: false,
									});
									trailTop += 34;

									const heightItem = '50px';
									const topItem = itemTop + 'px';

									let currButtonText = '';

									if (
										response.overtimes[i][j].status ===
										'APPROVED'
									) {
										currButtonText = 'FINISH';
									}

									const item = {
										height: heightItem,
										left: actualGutter,
										top: topItem,
										_id: response.overtimes[i][j]._id,
										requestDate: new Date(
											response.overtimes[i][
												j
											].plannedStart
										).toDateString(),
										requestDateTypeDate: new Date(
											new Date(
												response.overtimes[i][
													j
												].plannedStart
											).toDateString()
										),
										bullet: {
											left: '10px',
											top: '20px',
											src: this.srcBulletEmpty,
										},
										request: {
											left: '25px',
											top: actualGutter,
											text: 'Overtime',
											isActive: false,
										},
										status: {
											left: '25px',
											top: '28px',
											text: response.overtimes[i][j]
												.status,
										},
										button1: {
											right: '70px',
											top: '16px',
											text: currButtonText,
											isLatest:
												response.overtimes[i][j]
													.isLatest,
										},
										button2: {
											right: '10px',
											top: '16px',
											text: 'DETAILS',
											isLatest:
												response.overtimes[i][j]
													.isLatest,
										},
									};

									items.push(item);
									itemTop += 34;
									boxHeight += 34;
								}

								this.overtimeBoxes[i] = {
									type: 'Overtime',
									height: boxHeight,
									left: actualGutter,
									top: top,
									trails: trails,
									items: items,
								};

								currTop += boxHeight;
								currTop += 2 * gutter;
								totalBoxHeight += boxHeight;
								totalBoxHeight += 2 * gutter;
								itemTop = 0;
								itemTop += totalBoxHeight;
								marginOvertime = totalBoxHeight;
							}
						}
						// For calculating margin-top to be used by dashboardMenu
						marginTop += totalBoxHeight;
					}

					// WORK ASSIGNMENT
					if (
						response.assignments !== undefined &&
						response.assignments !== null
					) {
						let totalBoxHeight = 0;
						let currTop = 0;
						let itemTop = 0;

						for (let i = 0; i < response.assignments.length; i++) {
							const items = [];
							const trails = [];
							let boxHeight = 0;

							if (
								response.assignments[i] !== undefined &&
								response.assignments[i] !== null
							) {
								const top = currTop + 'px';
								const leftTrail = '13px';
								let trailTop = 29;

								for (
									let j = response.assignments[i].length - 1;
									j >= 0;
									j--
								) {
									if (
										j ===
										response.assignments[i].length - 1
									) {
										const dateBanner = {
											height: '50px',
											left: actualGutter,
											top: itemTop + 'px',
											boxDate: {
												left: '25px',
												top: '20px',
												text: new Date(
													response.assignments[i][
														j
													].plannedStart
												).toDateString(),
											},
										};

										items.push(dateBanner);
										itemTop += 34;
										boxHeight += 34;
										trails.push({
											left: leftTrail,
											top: trailTop + 'px',
											invis: true,
										});
										trailTop += 34;
									}

									trails.push({
										left: leftTrail,
										top: trailTop + 'px',
										invis: false,
									});
									trailTop += 34;

									const heightItem = '50px';
									const topItem = itemTop + 'px';

									let currButtonText = '';

									if (
										response.assignments[i][j].status ===
										'APPROVED'
									) {
										currButtonText = 'FINISH';
									}

									const item = {
										height: heightItem,
										left: actualGutter,
										top: topItem,
										_id: response.assignments[i][j]._id,
										requestDate: new Date(
											response.assignments[i][
												j
											].plannedStart
										).toDateString(),
										requestDateTypeDate: new Date(
											new Date(
												response.assignments[i][
													j
												].plannedStart
											).toDateString()
										),
										bullet: {
											left: '10px',
											top: '20px',
											src: this.srcBulletEmpty,
										},
										request: {
											left: '25px',
											top: actualGutter,
											text: 'Work Assignment',
											isActive: false,
										},
										status: {
											left: '25px',
											top: '28px',
											text: response.assignments[i][j]
												.status,
										},
										button1: {
											right: '70px',
											top: '16px',
											text: currButtonText,
											isLatest:
												response.assignments[i][j]
													.isLatest,
										},
										button2: {
											right: '10px',
											top: '16px',
											text: 'DETAILS',
											isLatest:
												response.assignments[i][j]
													.isLatest,
										},
									};

									items.push(item);
									itemTop += 34;
									boxHeight += 34;
								}

								this.workAssignmentBoxes[i] = {
									type: 'WorkAssignment',
									height: boxHeight,
									left: actualGutter,
									top: top,
									trails: trails,
									items: items,
								};

								currTop += boxHeight;
								currTop += 2 * gutter;
								totalBoxHeight += boxHeight;
								totalBoxHeight += 2 * gutter;
								itemTop = 0;
								itemTop += totalBoxHeight;
								marginAssignment = totalBoxHeight;
							}
						}
						// For calculating margin-top to be used by dashboardMenu
						marginTop += totalBoxHeight;
					}

					// SHIFT
					if (
						response.shifts !== undefined &&
						response.shifts !== null
					) {
						let totalBoxHeight = 0;
						let currTop = 0;
						let itemTop = 0;

						for (let i = 0; i < response.shifts.length; i++) {
							const items = [];
							const trails = [];
							let boxHeight = 0;

							if (
								response.shifts[i] !== undefined &&
								response.shifts[i] !== null
							) {
								const top = currTop + 'px';
								const leftTrail = '13px';
								let trailTop = 29;

								for (
									let j = response.shifts[i].length - 1;
									j >= 0;
									j--
								) {
									if (
										j ===
										response.shifts[i].length - 1
									) {
										const dateBanner = {
											height: '50px',
											left: actualGutter,
											top: itemTop + 'px',
											boxDate: {
												left: '25px',
												top: '20px',
												text: new Date(
													response.shifts[i][
														j
													].requestDate
												).toDateString(),
											},
										};

										items.push(dateBanner);
										itemTop += 34;
										boxHeight += 34;
										trails.push({
											left: leftTrail,
											top: trailTop + 'px',
											invis: true,
										});
										trailTop += 34;
									}

									trails.push({
										left: leftTrail,
										top: trailTop + 'px',
										invis: false,
									});
									trailTop += 34;

									const heightItem = '50px';
									const topItem = itemTop + 'px';

									const currButtonText = '';

									const item = {
										height: heightItem,
										left: actualGutter,
										top: topItem,
										_id: response.shifts[i][j]._id,
										requestDate: new Date(
											response.shifts[i][
												j
											].requestDate
										).toDateString(),
										requestDateTypeDate: new Date(
											new Date(
												response.shifts[i][
													j
												].requestDate
											).toDateString()
										),
										bullet: {
											left: '10px',
											top: '20px',
											src: this.srcBulletEmpty,
										},
										request: {
											left: '25px',
											top: actualGutter,
											text: 'Shift Switch Request',
											isActive: false,
										},
										status: {
											left: '25px',
											top: '28px',
											text: response.shifts[i][j]
												.status,
										},
										button1: {
											right: '70px',
											top: '16px',
											text: currButtonText,
											isLatest:
												response.shifts[i][j]
													.isLatest,
										},
										button2: {
											right: '10px',
											top: '16px',
											text: 'DETAILS',
											isLatest:
												response.shifts[i][j]
													.isLatest,
										},
									};

									items.push(item);
									itemTop += 34;
									boxHeight += 34;
								}

								this.shiftBoxes[i] = {
									type: 'Shift',
									height: boxHeight,
									left: actualGutter,
									top: top,
									trails: trails,
									items: items,
								};

								currTop += boxHeight;
								currTop += 2 * gutter;
								totalBoxHeight += boxHeight;
								totalBoxHeight += 2 * gutter;
								itemTop = 0;
								itemTop += totalBoxHeight;

								marginShift = totalBoxHeight;
							}
						}
						// For calculating margin-top to be used by dashboardMenu
						marginTop += totalBoxHeight;
					}

					// Incoming Shift
					if (
						response.incomingShifts !== undefined &&
						response.incomingShifts !== null
					) {
						let totalBoxHeight = 0;
						let currTop = 0;
						let itemTop = 0;

						for (let i = 0; i < response.incomingShifts.length; i++) {
							const items = [];
							const trails = [];
							let boxHeight = 0;

							if (
								response.incomingShifts[i] !== undefined &&
								response.incomingShifts[i] !== null
							) {
								const top = currTop + 'px';
								const leftTrail = '13px';
								let trailTop = 29;

								for (
									let j = response.incomingShifts[i].length - 1;
									j >= 0;
									j--
								) {
									if (
										j ===
										response.incomingShifts[i].length - 1
									) {
										const dateBanner = {
											height: '50px',
											left: actualGutter,
											top: itemTop + 'px',
											boxDate: {
												left: '25px',
												top: '20px',
												text: new Date(
													response.incomingShifts[i][
														j
													].requestDate
												).toDateString(),
											},
										};

										items.push(dateBanner);
										itemTop += 34;
										boxHeight += 34;
										trails.push({
											left: leftTrail,
											top: trailTop + 'px',
											invis: true,
										});
										trailTop += 34;
									}

									trails.push({
										left: leftTrail,
										top: trailTop + 'px',
										invis: false,
									});
									trailTop += 34;

									const heightItem = '50px';
									const topItem = itemTop + 'px';

									let currButtonText = '';

									if (
										response.incomingShifts[i][j].status ===
										'REQUESTED'
									) {
										currButtonText = 'ACCEPT';
									}

									const item = {
										height: heightItem,
										left: actualGutter,
										top: topItem,
										_id: response.incomingShifts[i][j]._id,
										requestDate: new Date(
											response.incomingShifts[i][
												j
											].requestDate
										).toDateString(),
										requestDateTypeDate: new Date(
											new Date(
												response.incomingShifts[i][
													j
												].requestDate
											).toDateString()
										),
										bullet: {
											left: '10px',
											top: '20px',
											src: this.srcBulletEmpty,
										},
										request: {
											left: '25px',
											top: actualGutter,
											text: 'Incoming Shift Switch Request',
											isActive: false,
										},
										status: {
											left: '25px',
											top: '28px',
											text: response.incomingShifts[i][j]
												.status,
										},
										button1: {
											right: '70px',
											top: '16px',
											text: currButtonText,
											isLatest:
												response.incomingShifts[i][j]
													.isLatest,
										},
										button2: {
											right: '10px',
											top: '16px',
											text: 'DETAILS',
											isLatest:
												response.incomingShifts[i][j]
													.isLatest,
										},
									};

									items.push(item);
									itemTop += 34;
									boxHeight += 34;
								}

								this.incomingShiftBoxes[i] = {
									type: 'IncomingShift',
									height: boxHeight,
									left: actualGutter,
									top: top,
									trails: trails,
									items: items,
								};

								currTop += boxHeight;
								currTop += 2 * gutter;
								totalBoxHeight += boxHeight;
								totalBoxHeight += 2 * gutter;
								itemTop = 0;
								itemTop += totalBoxHeight;

								marginIncomingShift = totalBoxHeight;
							}
						}
						// For calculating margin-top to be used by dashboardMenu
						marginTop += totalBoxHeight;
					}

					// Assign Shift
					if (
						(response.assignedShifts !== undefined &&
						response.assignedShifts !== null)
					) {
						let totalBoxHeight = 0;
						let currTop = 0;
						let itemTop = 0;

						for (let i = 0; i < response.assignedShifts.length; i++) {
							const items = [];
							const trails = [];
							let boxHeight = 0;

							if (
								response.assignedShifts[i] !== undefined &&
								response.assignedShifts[i] !== null
							) {
								const top = currTop + 'px';
								const leftTrail = '13px';
								let trailTop = 29;

								for (
									let j = response.assignedShifts[i].length - 1;
									j >= 0;
									j--
								) {
									if (
										j ===
										response.assignedShifts[i].length - 1
									) {
										const dateBanner = {
											height: '50px',
											left: actualGutter,
											top: itemTop + 'px',
											boxDate: {
												left: '25px',
												top: '20px',
												text: new Date(
													response.assignedShifts[i][
														j
													].requestDate
												).toDateString(),
											},
										};

										items.push(dateBanner);
										itemTop += 34;
										boxHeight += 34;
										trails.push({
											left: leftTrail,
											top: trailTop + 'px',
											invis: true,
										});
										trailTop += 34;
									}

									trails.push({
										left: leftTrail,
										top: trailTop + 'px',
										invis: false,
									});
									trailTop += 34;

									const heightItem = '50px';
									const topItem = itemTop + 'px';

									let currButtonText = '';

									if (
										response.assignedShifts[i][j].status ===
										'REQUESTED'
									) {
										currButtonText = 'APPROVE';
									}

									const item = {
										height: heightItem,
										left: actualGutter,
										top: topItem,
										_id: response.assignedShifts[i][j]._id,
										requestDate: new Date(
											response.assignedShifts[i][
												j
											].requestDate
										).toDateString(),
										requestDateTypeDate: new Date(
											new Date(
												response.assignedShifts[i][
													j
												].requestDate
											).toDateString()
										),
										bullet: {
											left: '10px',
											top: '20px',
											src: this.srcBulletEmpty,
										},
										request: {
											left: '25px',
											top: actualGutter,
											text: 'Incoming Shift Assignment Request',
											isActive: false,
										},
										status: {
											left: '25px',
											top: '28px',
											text: response.assignedShifts[i][j]
												.status,
										},
										button1: {
											right: '70px',
											top: '16px',
											text: currButtonText,
											isLatest:
												response.assignedShifts[i][j]
													.isLatest,
										},
										button2: {
											right: '10px',
											top: '16px',
											text: 'DETAILS',
											isLatest:
												response.assignedShifts[i][j]
													.isLatest,
										},
									};

									items.push(item);
									itemTop += 34;
									boxHeight += 34;
								}

								this.incomingAssignShiftBoxes[i] = {
									type: 'AssignedShift',
									height: boxHeight,
									left: actualGutter,
									top: top,
									trails: trails,
									items: items,
								};

								currTop += boxHeight;
								currTop += 2 * gutter;
								totalBoxHeight += boxHeight;
								totalBoxHeight += 2 * gutter;
								itemTop = 0;
								itemTop += totalBoxHeight;

								marginAssignShift = totalBoxHeight;
							}
						}
						// For calculating margin-top to be used by dashboardMenu
						marginTop += totalBoxHeight;
					}

					// Leave
					if (
						(response.leaves !== undefined &&
						response.leaves !== null)
					) {
						let totalBoxHeight = 0;
						let currTop = 0;
						let itemTop = 0;

						for (let i = 0; i < response.leaves.length; i++) {
							const items = [];
							const trails = [];
							let boxHeight = 0;

							if (
								response.leaves[i] !== undefined &&
								response.leaves[i] !== null
							) {
								const top = currTop + 'px';
								const leftTrail = '13px';
								let trailTop = 29;

								for (
									let j = response.leaves[i].length - 1;
									j >= 0;
									j--
								) {
									if (
										j ===
										response.leaves[i].length - 1
									) {
										const dateBanner = {
											height: '50px',
											left: actualGutter,
											top: itemTop + 'px',
											boxDate: {
												left: '25px',
												top: '20px',
												text: new Date(
													response.leaves[i][
														j
													].requestDate
												).toDateString(),
											},
										};

										items.push(dateBanner);
										itemTop += 34;
										boxHeight += 34;
										trails.push({
											left: leftTrail,
											top: trailTop + 'px',
											invis: true,
										});
										trailTop += 34;
									}

									trails.push({
										left: leftTrail,
										top: trailTop + 'px',
										invis: false,
									});
									trailTop += 34;

									const heightItem = '50px';
									const topItem = itemTop + 'px';

									let currButtonText = '';

									if (
										response.leaves[i][j].status ===
										'REQUESTED'
									) {
										currButtonText = 'CANCEL';
									}

									const item = {
										height: heightItem,
										left: actualGutter,
										top: topItem,
										_id: response.leaves[i][j]._id,
										requestDate: new Date(
											response.leaves[i][
												j
											].requestDate
										).toDateString(),
										requestDateTypeDate: new Date(
											new Date(
												response.leaves[i][
													j
												].requestDate
											).toDateString()
										),
										bullet: {
											left: '10px',
											top: '20px',
											src: this.srcBulletEmpty,
										},
										request: {
											left: '25px',
											top: actualGutter,
											text: 'Leave Request',
											isActive: false,
										},
										status: {
											left: '25px',
											top: '28px',
											text: response.leaves[i][j]
												.status,
										},
										button1: {
											right: '70px',
											top: '16px',
											text: currButtonText,
											isLatest:
												response.leaves[i][j]
													.isLatest,
										},
										button2: {
											right: '10px',
											top: '16px',
											text: 'DETAILS',
											isLatest:
												response.leaves[i][j]
													.isLatest,
										},
									};

									items.push(item);
									itemTop += 34;
									boxHeight += 34;
								}

								this.leaveBoxes[i] = {
									type: 'Leave',
									height: boxHeight,
									left: actualGutter,
									top: top,
									trails: trails,
									items: items,
								};

								currTop += boxHeight;
								currTop += 2 * gutter;
								totalBoxHeight += boxHeight;
								totalBoxHeight += 2 * gutter;
								itemTop = 0;
								itemTop += totalBoxHeight;
							}
						}
						// For calculating margin-top to be used by dashboardMenu
						marginTop += totalBoxHeight;
					}

					// Inserting travel requests into box
					for (let i = 0; i < this.travelBoxes.length; i++) {
						this.boxes.push(this.travelBoxes[i]);
					}
					// Then followed by item requests
					for (let i = 0; i < this.vitaminBoxes.length; i++) {
						this.boxes.push(this.vitaminBoxes[i]);
					}

					// Then followed by overtime requests
					for (let i = 0; i < this.overtimeBoxes.length; i++) {
						this.boxes.push(this.overtimeBoxes[i]);
					}

					for (let i = 0; i < this.workAssignmentBoxes.length; i++) {
						this.boxes.push(this.workAssignmentBoxes[i]);
					}

					for (let i = 0; i < this.shiftBoxes.length; i++) {
						this.boxes.push(this.shiftBoxes[i]);
					}

					for (let i = 0; i < this.incomingShiftBoxes.length; i++) {
						this.boxes.push(this.incomingShiftBoxes[i]);
					}

					for (let i = 0; i < this.incomingAssignShiftBoxes.length; i++) {
						this.boxes.push(this.incomingAssignShiftBoxes[i]);
					}

					for (let i = 0; i < this.leaveBoxes.length; i++) {
						this.boxes.push(this.leaveBoxes[i]);
					}

					// Formatting for requests
					for (let i = 0; i < this.boxes.length; i++) {
						for (let j = 0; j < this.boxes[i].items.length; j++) {
							if (this.boxes[i].items[j].boxDate !== undefined) {
								this.boxes[i].items[j + 1].bullet.src =
									this.srcBullet;
								this.boxes[i].items[j + 1].request.isActive =
									true;
								if (j - 1 >= 0) {
									this.boxes[i].trails[j - 1].invis = true;
								}
							} else if (j === this.boxes[i].items.length - 1) {
								this.boxes[i].trails[j].invis = true;
							}
						}

						// Additional conditioning for item requests
						if (
							this.boxes[i].type !== 'Travel' &&
							this.boxes[i].type !== 'Overtime' &&
							this.boxes[i].type !== 'WorkAssignment' &&
							this.boxes[i].type !== 'Shift' &&
							this.boxes[i].type !== 'IncomingShift' &&
							this.boxes[i].type !== 'AssignedShift' &&
							this.boxes[i].type !== 'Leave'
						) {
							const splitString = this.boxes[i].top.split('p');
							const originalNumber = Number(splitString[0]);
							const newNumber = originalNumber + marginTravel;
							this.boxes[i].top = newNumber + 'px';
							for (
								let j = 0;
								j < this.boxes[i].items.length;
								j++
							) {
								const splitString =
									this.boxes[i].items[j].top.split('p');
								const originalNumber = Number(splitString[0]);
								const newNumber = originalNumber + marginTravel;
								this.boxes[i].items[j].top = newNumber + 'px';
							}
						}

						// Additional conditioning for overtime requests
						if (this.boxes[i].type === 'Overtime') {
							const splitString = this.boxes[i].top.split('p');
							const originalNumber = Number(splitString[0]);
							const newNumber =
								originalNumber + marginTravel + marginVitamin;
							this.boxes[i].top = newNumber + 'px';
							for (
								let j = 0;
								j < this.boxes[i].items.length;
								j++
							) {
								const splitString =
									this.boxes[i].items[j].top.split('p');
								const originalNumber = Number(splitString[0]);
								const newNumber =
									originalNumber +
									marginTravel +
									marginVitamin;
								this.boxes[i].items[j].top = newNumber + 'px';
							}
						}

						if (this.boxes[i].type === 'WorkAssignment') {
							const splitString = this.boxes[i].top.split('p');
							const originalNumber = Number(splitString[0]);
							const newNumber =
								originalNumber +
								marginTravel +
								marginVitamin +
								marginOvertime;
							this.boxes[i].top = newNumber + 'px';
							for (
								let j = 0;
								j < this.boxes[i].items.length;
								j++
							) {
								const splitString =
									this.boxes[i].items[j].top.split('p');
								const originalNumber = Number(splitString[0]);
								const newNumber =
									originalNumber +
									marginTravel +
									marginVitamin +
									marginOvertime;
								this.boxes[i].items[j].top = newNumber + 'px';
							}
						}

						if (this.boxes[i].type === 'Shift') {
							const splitString = this.boxes[i].top.split('p');
							const originalNumber = Number(splitString[0]);
							const newNumber =
								originalNumber +
								marginTravel +
								marginVitamin +
								marginOvertime +
								marginAssignment;
							this.boxes[i].top = newNumber + 'px';
							for (
								let j = 0;
								j < this.boxes[i].items.length;
								j++
							) {
								const splitString =
									this.boxes[i].items[j].top.split('p');
								const originalNumber = Number(splitString[0]);
								const newNumber =
									originalNumber +
									marginTravel +
									marginVitamin +
									marginOvertime +
									marginAssignment;
								this.boxes[i].items[j].top = newNumber + 'px';
							}
						}

						if (this.boxes[i].type === 'IncomingShift') {
							const splitString = this.boxes[i].top.split('p');
							const originalNumber = Number(splitString[0]);
							const newNumber =
								originalNumber +
								marginTravel +
								marginVitamin +
								marginOvertime +
								marginAssignment +
								marginShift;
							this.boxes[i].top = newNumber + 'px';
							for (
								let j = 0;
								j < this.boxes[i].items.length;
								j++
							) {
								const splitString =
									this.boxes[i].items[j].top.split('p');
								const originalNumber = Number(splitString[0]);
								const newNumber =
									originalNumber +
									marginTravel +
									marginVitamin +
									marginOvertime +
									marginAssignment +
									marginShift;
								this.boxes[i].items[j].top = newNumber + 'px';
							}
						}

						if (this.boxes[i].type === 'AssignedShift') {
							const splitString = this.boxes[i].top.split('p');
							const originalNumber = Number(splitString[0]);
							const newNumber =
								originalNumber +
								marginTravel +
								marginVitamin +
								marginOvertime +
								marginAssignment +
								marginShift +
								marginIncomingShift;
							this.boxes[i].top = newNumber + 'px';
							for (
								let j = 0;
								j < this.boxes[i].items.length;
								j++
							) {
								const splitString =
									this.boxes[i].items[j].top.split('p');
								const originalNumber = Number(splitString[0]);
								const newNumber =
									originalNumber +
									marginTravel +
									marginVitamin +
									marginOvertime +
									marginAssignment +
									marginShift +
									marginIncomingShift;
								this.boxes[i].items[j].top = newNumber + 'px';
							}
						}

						if (this.boxes[i].type === 'Leave') {
							const splitString = this.boxes[i].top.split('p');
							const originalNumber = Number(splitString[0]);
							const newNumber =
								originalNumber +
								marginTravel +
								marginVitamin +
								marginOvertime +
								marginAssignment +
								marginShift +
								marginIncomingShift +
								marginAssignShift;
							this.boxes[i].top = newNumber + 'px';
							for (
								let j = 0;
								j < this.boxes[i].items.length;
								j++
							) {
								const splitString =
									this.boxes[i].items[j].top.split('p');
								const originalNumber = Number(splitString[0]);
								const newNumber =
									originalNumber +
									marginTravel +
									marginVitamin +
									marginOvertime +
									marginAssignment +
									marginShift +
									marginIncomingShift +
									marginAssignShift;
								this.boxes[i].items[j].top = newNumber + 'px';
							}
						}

						// Natural padding between boxes
						this.boxes[i].height += gutter;
						this.boxes[i].height = this.boxes[i].height + 'px';
					}
					// Inserting margin top for dashboard menu
					const dashboardMenu = <HTMLInputElement>(
						document.getElementById('dashboardMenu')
					);
					if (dashboardMenu !== null) {
						dashboardMenu.style.marginTop = marginTop + 'px';
					}
					console.log('Boxes:', this.boxes);
				}
			},
			(error) => {
				console.log(error);
				this.showError('An error occurred. Please refresh the page');
			}
		);
	}

	getManagerDashboard() {
		this.isCheckAll = false;

		this.data = [
			{
				group: 'Pending',
				value: 0,
			},
			{
				group: 'Approved',
				value: 0,
			},
			{
				group: 'Revoked',
				value: 0,
			},
			{
				group: 'Rejected',
				value: 0,
			},
		];

		this.historyData = [
			{
				group: 'Pending',
				value: 0,
			},
			{
				group: 'Approved',
				value: 0,
			},
			{
				group: 'Revoked',
				value: 0,
			},
			{
				group: 'Rejected',
				value: 0,
			},
		];

		this.model.data = [];
		this.dataExist = false;
		this.checkboxes = [];
		this.dataPackageRequested = [];

		let tableType = 'Archived';

		this.managerService
			.getManagerApprovalList(
				tableType,
				this.paginationModel.pageLength,
				this.paginationModel.currentPage + 1,
				''
			)
			.subscribe(
				(response) => {
					this.approvedCountHistory = response.approvedCount;
					this.revokedCountHistory = response.revokedCount;
					this.rejectedCountHistory = response.rejectedCount;

					this.historyData = [
						{
							group: 'Pending',
							value: 0,
						},
						{
							group: 'Approved',
							value: response.approvedCount,
						},
						{
							group: 'Revoked',
							value: response.revokedCount,
						},
						{
							group: 'Rejected',
							value: response.rejectedCount,
						},
					];

					this.managerService
						.getManagerOvertimeList(
							'Archived',
							this.paginationModel.pageLength,
							this.paginationModel.currentPage + 1,
							''
						)
						.subscribe(
							(response) => {
								const totalApprovedCount =
									this.approvedCountHistory +
									response.approvedCount;
								const totalRejectedCount =
									this.rejectedCountHistory +
									response.rejectedCount;
								this.historyData = [
									{
										group: 'Pending',
										value: 0,
									},
									{
										group: 'Approved',
										value: totalApprovedCount,
									},
									{
										group: 'Revoked',
										value: this.revokedCountHistory,
									},
									{
										group: 'Rejected',
										value: totalRejectedCount,
									},
								];

								this.managerService
									.getManagerAssignmentList(
										'Archived',
										this.paginationModel.pageLength,
										this.paginationModel.currentPage + 1,
										''
									)
									.subscribe(
										(response) => {
											const secondTotalApprovedCount =
												totalApprovedCount +
												response.approvedCount;
											const secondTotalRejectedCount =
												totalRejectedCount +
												response.rejectedCount;

											this.historyData = [
												{
													group: 'Pending',
													value: 0,
												},
												{
													group: 'Approved',
													value: secondTotalApprovedCount,
												},
												{
													group: 'Revoked',
													value: this
														.revokedCountHistory,
												},
												{
													group: 'Rejected',
													value: secondTotalRejectedCount,
												},
											];

											this.managerService
												.getManagerShiftList(
													'Archived',
													this.paginationModel
														.pageLength,
													this.paginationModel
														.currentPage + 1,
													''
												)
												.subscribe(
													(response) => {
														const thirdTotalApprovedCount =
															secondTotalApprovedCount +
															response.approvedCount;
														const thirdTotalRejectedCount =
															secondTotalRejectedCount +
															response.rejectedCount;

														this.historyData = [
															{
																group: 'Pending',
																value: 0,
															},
															{
																group: 'Approved',
																value: thirdTotalApprovedCount,
															},
															{
																group: 'Revoked',
																value: this
																	.revokedCountHistory,
															},
															{
																group: 'Rejected',
																value: thirdTotalRejectedCount,
															},
														];

														this.managerService
															.getManagerLeaveList(
																'Archived',
																this.paginationModel
																	.pageLength,
																this.paginationModel
																	.currentPage + 1,
																''
															)
															.subscribe(
																(response) => {
																	const lastTotalApprovedCount =
																		thirdTotalApprovedCount +
																		response.approvedCount;
																	const lastTotalRejectedCount =
																		thirdTotalRejectedCount +
																		response.rejectedCount;

																	this.historyData = [
																		{
																			group: 'Pending',
																			value: 0,
																		},
																		{
																			group: 'Approved',
																			value: lastTotalApprovedCount,
																		},
																		{
																			group: 'Revoked',
																			value: this
																				.revokedCountHistory,
																		},
																		{
																			group: 'Rejected',
																			value: lastTotalRejectedCount,
																		},
																	];
																},
																(error) => {
																	console.log(error);
																	this.showError(
																		'An error occurred. Please refresh the page'
																	);
																}
															);
													},
													(error) => {
														console.log(error);
														this.showError(
															'An error occurred. Please refresh the page'
														);
													}
												);
										},
										(error) => {
											console.log(error);
											this.showError(
												'An error occurred. Please refresh the page'
											);
										}
									);
							},
							(error) => {
								console.log(error);
								this.showError(
									'An error occurred. Please refresh the page'
								);
							}
						);
				},
				(error) => {
					console.log(error);
					this.showError(
						'An error occurred. Please refresh the page'
					);
				}
			);

		tableType = 'Today';

		this.managerService
			.getManagerApprovalList(
				tableType,
				this.paginationModel.pageLength,
				this.paginationModel.currentPage + 1,
				''
			)
			.subscribe(
				(response) => {
					this.pendingCount = response.pendingCount;
					this.approvedCount = response.approvedCount;
					this.revokedCount = response.revokedCount;
					this.rejectedCount = response.rejectedCount;

					this.data = [
						{
							group: 'Pending',
							value: this.pendingCount,
						},
						{
							group: 'Approved',
							value: this.approvedCount,
						},
						{
							group: 'Revoked',
							value: this.revokedCount,
						},
						{
							group: 'Rejected',
							value: this.rejectedCount,
						},
					];

					this.managerService
						.getManagerOvertimeList(
							tableType,
							this.paginationModel.pageLength,
							this.paginationModel.currentPage + 1,
							''
						)
						.subscribe(
							(response) => {
								const totalPendingCount =
									this.pendingCount + response.pendingCount;
								const totalApprovedCount =
									this.approvedCount + response.approvedCount;
								const totalRejectedCount =
									this.rejectedCount + response.rejectedCount;

								this.data = [
									{
										group: 'Pending',
										value: totalPendingCount,
									},
									{
										group: 'Approved',
										value: totalApprovedCount,
									},
									{
										group: 'Revoked',
										value: this.revokedCount,
									},
									{
										group: 'Rejected',
										value: totalRejectedCount,
									},
								];

								this.managerService
									.getManagerAssignmentList(
										tableType,
										this.paginationModel.pageLength,
										this.paginationModel.currentPage + 1,
										''
									)
									.subscribe(
										(response) => {
											const secondTotalPendingCount =
												totalPendingCount +
												response.pendingCount;
											const secondTotalApprovedCount =
												totalApprovedCount +
												response.approvedCount;
											const secondTotalRejectedCount =
												totalRejectedCount +
												response.rejectedCount;

											this.data = [
												{
													group: 'Pending',
													value: secondTotalPendingCount,
												},
												{
													group: 'Approved',
													value: secondTotalApprovedCount,
												},
												{
													group: 'Revoked',
													value: this.revokedCount,
												},
												{
													group: 'Rejected',
													value: secondTotalRejectedCount,
												},
											];

											this.managerService
												.getManagerShiftList(
													tableType,
													this.paginationModel
														.pageLength,
													this.paginationModel
														.currentPage + 1,
													''
												)
												.subscribe(
													(response) => {
														const thirdTotalPendingCount =
															secondTotalPendingCount +
															response.pendingCount;
														const thirdTotalApprovedCount =
															secondTotalApprovedCount +
															response.approvedCount;
														const thirdTotalRejectedCount =
															secondTotalRejectedCount +
															response.rejectedCount;

														this.data = [
															{
																group: 'Pending',
																value: thirdTotalPendingCount,
															},
															{
																group: 'Approved',
																value: thirdTotalApprovedCount,
															},
															{
																group: 'Revoked',
																value: this
																	.revokedCount,
															},
															{
																group: 'Rejected',
																value: thirdTotalRejectedCount,
															},
														];

														this.managerService
															.getManagerLeaveList(
																tableType,
																this.paginationModel
																	.pageLength,
																this.paginationModel
																	.currentPage + 1,
																''
															)
															.subscribe(
																(response) => {
																	const lastTotalPendingCount =
																		thirdTotalPendingCount +
																		response.pendingCount;
																	const lastTotalApprovedCount =
																		thirdTotalApprovedCount +
																		response.approvedCount;
																	const lastTotalRejectedCount =
																		thirdTotalRejectedCount +
																		response.rejectedCount;

																	this.data = [
																		{
																			group: 'Pending',
																			value: lastTotalPendingCount,
																		},
																		{
																			group: 'Approved',
																			value: lastTotalApprovedCount,
																		},
																		{
																			group: 'Revoked',
																			value: this
																				.revokedCount,
																		},
																		{
																			group: 'Rejected',
																			value: lastTotalRejectedCount,
																		},
																	];
																},
																(error) => {
																	console.log(error);
																	this.showError(
																		'An error occurred. Please refresh the page'
																	);
																}
															);
													},
													(error) => {
														console.log(error);
														this.showError(
															'An error occurred. Please refresh the page'
														);
													}
												);
										},
										(error) => {
											console.log(error);
											this.showError(
												'An error occurred. Please refresh the page'
											);
										}
									);
							},
							(error) => {
								console.log(error);
								this.showError(
									'An error occurred. Please refresh the page'
								);
							}
						);
				},
				(error) => {
					console.log(error);
					this.showError(
						'An error occurred. Please refresh the page'
					);
				}
			);

		this.managerService
			.getManagerApprovalList(
				tableType,
				this.paginationModel.pageLength,
				this.paginationModel.currentPage + 1,
				'REQUESTED'
			)
			.subscribe(
				(response) => {
					console.log('RESPONSE: ', response);
					this.dataPackage = response;
					if (response.docs !== null && response.docs !== undefined) {
						for (let i = 0; i < response.docs.length; i++) {
							const splitData =
								response.docs[i].originLocation.split(', ');
							const resultOrigin =
								splitData[0] + ', ' + splitData[1];
							console.log(resultOrigin);

							this.model.data.push([
								new TableItem({
									data: response.docs[i].requesterDetails[0]
										.name,
								}),
								new TableItem({
									data:
										this.dataPackage.docs[i].origin +
										' / ' +
										this.dataPackage.docs[i].destination,
								}),
								new TableItem({
									data: response.docs[i].transportation,
								}),
							]);
							this.dataPackageRequested.push(response.docs[i]);
							this.dataExist = true;
						}
						this.model.data.splice(0, 1);
					}
					this.dataOrganizerFunc(this.dataPackageRequested);
				},
				(error) => {
					console.log(error);
					this.showError(
						'An error occurred. Please refresh the page'
					);
				}
			);
	}

	getSiteCoordinatorDashboard() {
		this.isCheckAll = false;

		this.data = [
			{
				group: 'Pending',
				value: 0,
			},
			{
				group: 'Approved',
				value: 0,
			},
			{
				group: 'Revoked',
				value: 0,
			},
			{
				group: 'Rejected',
				value: 0,
			},
		];

		this.historyData = [
			{
				group: 'Pending',
				value: 0,
			},
			{
				group: 'Approved',
				value: 0,
			},
			{
				group: 'Revoked',
				value: 0,
			},
			{
				group: 'Rejected',
				value: 0,
			},
		];

		this.model.data = [];
		this.dataExist = false;
		this.dataPackageRequested = [];

		let tableType = 'Archived';

		this.siteManagerService
			.getSiteCoordinatorApprovalList(
				tableType,
				this.paginationModel.pageLength,
				this.paginationModel.currentPage + 1,
				''
			)
			.subscribe(
				(response) => {
					this.historyData = [
						{
							group: 'Pending',
							value: 0,
						},
						{
							group: 'Approved',
							value: response.approvedCount,
						},
						{
							group: 'Revoked',
							value: response.revokedCount,
						},
						{
							group: 'Rejected',
							value: response.rejectedCount,
						},
					];
				},
				(error) => {
					console.log(error);
					this.showError(
						'An error occurred. Please refresh the page'
					);
				}
			);

		tableType = 'Today';

		this.siteManagerService
			.getSiteCoordinatorApprovalList(
				tableType,
				this.paginationModel.pageLength,
				this.paginationModel.currentPage + 1,
				''
			)
			.subscribe(
				(response) => {
					this.data = [
						{
							group: 'Pending',
							value: response.pendingCount,
						},
						{
							group: 'Approved',
							value: response.approvedCount,
						},
						{
							group: 'Revoked',
							value: response.revokedCount,
						},
						{
							group: 'Rejected',
							value: response.rejectedCount,
						},
					];
				},
				(error) => {
					console.log(error);
					this.showError(
						'An error occurred. Please refresh the page'
					);
				}
			);
	}

	selected(event, history) {
		if (event.target.name === 'Pending') {
			this.modalService.create({
				component: TableApprovalComponent,
				inputs: {
					type: 'Pending',
					archivedInput: history,
				},
			});
		} else if (event.target.name === 'Approved') {
			this.modalService.create({
				component: TableApprovalComponent,
				inputs: {
					type: 'Approved',
					archivedInput: history,
				},
			});
		} else if (event.target.name === 'Revoked') {
			this.modalService.create({
				component: TableApprovalComponent,
				inputs: {
					type: 'Revoked',
					archivedInput: history,
				},
			});
		} else if (event.target.name === 'Rejected') {
			this.modalService.create({
				component: TableApprovalComponent,
				inputs: {
					type: 'Rejected',
					archivedInput: history,
				},
			});
		}
	}

	getHSCDashboard() {
		this.isCheckAll = false;
		this.dataExist = false;
		this.data = [
			{
				group: 'Pending',
				value: 0,
			},
			{
				group: 'Approved',
				value: 0,
			},
			{
				group: 'Revoked',
				value: 0,
			},
			{
				group: 'Rejected',
				value: 0,
			},
		];

		this.historyData = [
			{
				group: 'Pending',
				value: 0,
			},
			{
				group: 'Approved',
				value: 0,
			},
			{
				group: 'Revoked',
				value: 0,
			},
			{
				group: 'Rejected',
				value: 0,
			},
		];

		this.model.data = [];
		this.dataPackageRequested = [];

		let tableType = 'Archived';

		this.hscService
			.getHSCApprovalList(
				tableType,
				this.paginationModel.pageLength,
				this.paginationModel.currentPage + 1,
				''
			)
			.subscribe(
				(response) => {
					this.historyData = [
						{
							group: 'Pending',
							value: 0,
						},
						{
							group: 'Approved',
							value: response.approvedCount,
						},
						{
							group: 'Revoked',
							value: response.revokedCount,
						},
						{
							group: 'Rejected',
							value: response.rejectedCount,
						},
					];
				},
				(error) => {
					console.log(error);
					this.showError(
						'An error occurred. Please refresh the page'
					);
				}
			);

		tableType = 'Today';

		this.hscService
			.getHSCApprovalList(
				tableType,
				this.paginationModel.pageLength,
				this.paginationModel.currentPage + 1,
				''
			)
			.subscribe(
				(response) => {
					this.data = [
						{
							group: 'Pending',
							value: response.pendingCount,
						},
						{
							group: 'Approved',
							value: response.approvedCount,
						},
						{
							group: 'Revoked',
							value: response.revokedCount,
						},
						{
							group: 'Rejected',
							value: response.rejectedCount,
						},
					];
				},
				(error) => {
					console.log(error);
					this.showError(
						'An error occurred. Please refresh the page'
					);
				}
			);

		this.hscService
			.getHSCApprovalList(
				tableType,
				this.paginationModel.pageLength,
				this.paginationModel.currentPage + 1,
				'REQUESTED'
			)
			.subscribe(
				(response) => {
					this.dataPackage = response;
					console.log(this.dataPackage);
					if (response.docs !== null && response.docs !== undefined) {
						for (let i = 0; i < response.docs.length; i++) {
							this.model.data.push([
								new TableItem({
									data: response.docs[i].requesterDetails[0]
										.name,
								}),
								new TableItem({
									data: response.docs[i].pickupPoint,
								}),
								new TableItem({
									data:
										response.docs[i].itemType +
										' (' +
										response.docs[i].quantity +
										')',
								}),
							]);
							this.dataPackageRequested.push(response.docs[i]);
							this.dataExist = true;
						}
					}
					this.model.data.splice(0, 1);
					this.dataOrganizerFunc(this.dataPackageRequested);
				},
				(error) => {
					console.log(error);
					this.showError(
						'An error occurred. Please refresh the page'
					);
				}
			);
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
			console.log(this.isCheckAll);
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

	selectPage(event) {
		this.paginationModel.currentPage = event.pageIndex;
		this.getTableData();
	}

	getTableData() {
		this.skeleton = true;
		this.dataExist = false;
		this.model.data = [];
		this.model.header = [
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' }),
			new TableHeaderItem({ data: '' }),
		];
		this.isCheckAll = false;
		this.checkboxes = [];
		if (this.userType === 'manager') {
			this.getManagerApprovalList();
		} else if (this.userType === 'hsc') {
			this.getHSCApprovalList();
		} else if (this.userType === 'sc') {
			this.getSiteCoordinatorApprovalList();
		}
	}

	getSiteCoordinatorApprovalList() {
		let tableType: any;
		if (this.archived === true) {
			tableType = 'Archived';
		} else if (this.archived === false) {
			tableType = 'Today';
		}

		this.siteManagerService
			.getSiteCoordinatorApprovalList(
				tableType,
				this.paginationModel.pageLength,
				this.paginationModel.currentPage + 1,
				'REQUESTED'
			)
			.subscribe(
				(response) => {
					console.log(response);
					this.dataOrganizerFunc(response.docs);
				},
				(error) => {
					console.log(error);
					this.showError(
						'An error occurred. Please refresh the page'
					);
				}
			);
	}

	getManagerApprovalList() {
		let tableType: any;
		if (this.archived === true) {
			tableType = 'Archived';
		} else if (this.archived === false) {
			tableType = 'Today';
		}

		this.managerService
			.getManagerApprovalList(
				tableType,
				this.paginationModel.pageLength,
				this.paginationModel.currentPage + 1,
				'REQUESTED'
			)
			.subscribe(
				(response) => {
					this.dataOrganizerFunc(response.docs);
				},
				(error) => {
					console.log(error);
					this.showError(
						'An error occurred. Please refresh the page'
					);
				}
			);
	}

	getHSCApprovalList() {
		let tableType: any;
		if (this.archived === true) {
			tableType = 'Archived';
		} else if (this.archived === false) {
			tableType = 'Today';
		}

		this.hscService
			.getHSCApprovalList(
				tableType,
				this.paginationModel.pageLength,
				this.paginationModel.currentPage + 1,
				'REQUESTED'
			)
			.subscribe(
				(response) => {
					this.dataOrganizerFunc(response.docs);
				},
				(error) => {
					console.log(error);
					this.showError(
						'An error occurred. Please refresh the page'
					);
				}
			);
	}

	dataOrganizerFunc(response) {
		console.log(this.dataPackage);
		this.dataExist = false;
		this.skeleton = false;
		console.log(response);
		const active = [];
		if (this.userType === 'manager') {
			this.model.header = [
				new TableHeaderItem({ data: 'Requester' }),
				new TableHeaderItem({ data: 'Origin / Destination' }),
				new TableHeaderItem({ data: 'Transportation' }),
			];
		} else if (this.userType === 'sc') {
			this.model.header = [
				new TableHeaderItem({ data: 'Requester' }),
				new TableHeaderItem({ data: 'Origin' }),
				new TableHeaderItem({ data: 'Transportation' }),
			];
		} else if (this.userType === 'hsc') {
			this.model.header = [
				new TableHeaderItem({ data: 'Requester' }),
				new TableHeaderItem({ data: 'Pickup Point' }),
				new TableHeaderItem({ data: 'Type (Qty)' }),
			];
		}
		if (
			response !== undefined &&
			response !== null &&
			response.length !== 0
		) {
			this.requestType = response[0].requestType;
			this.savedResponse = response;
			this.dataExist = true;
			for (let i = 0; i < response.length; i++) {
				if (this.userType === 'manager') {
					active.push([
						new TableItem({
							data: response[i].requesterDetails[0].name,
						}),
						new TableItem({
							data:
								response[i].origin +
								' / ' +
								response[i].destination,
						}),
						new TableItem({ data: response[i].transportation }),
					]);
				} else if (this.userType === 'sc') {
					active.push([
						new TableItem({
							data: response[i].requesterDetails[0].name,
						}),
						new TableItem({ data: response[i].origin }),
						new TableItem({ data: response[i].transportation }),
					]);
				} else if (this.userType === 'hsc') {
					active.push([
						new TableItem({
							data: response[i].requesterDetails[0].name,
						}),
						new TableItem({ data: response[i].pickupPoint }),
						new TableItem({
							data:
								response[i].itemType +
								' (' +
								response[i].quantity +
								')',
						}),
					]);
				}
				this.checkboxes.push(false);
			}
		}

		this.model.data = active;

		if (this.dataExist) {
			this.dataNumber = this.model.data.length;
		} else {
			this.dataNumber = 0;
		}

		this.paginationModel.totalDataLength = this.dataPackage.count;
	}

	changeMode(mode) {
		if (mode === 'Today') {
			this.archived = false;
		} else if (mode === 'History') {
			this.archived = true;
		}
	}

	getListContent() {
		this.employeeService.getRecentBanners().subscribe(
			response => {
				console.log(response);

				this.firstContent = response.shift();

				this.contents = response;

				console.log('First Content: ', this.firstContent);
				console.log(this.firstContent.image);
				console.log('Data: ', this.contents);
			}, error => {
				console.log(error);
			}
		);
	}

	getAllContent() {
		this.employeeService.getAllBanners().subscribe(
			response => {
				console.log(response);
				this.allBanners = response;
				this.filteredBanners = response;
			}, error => {
				console.log(error);
			}
		);
	}

	getListContentWithPage(page, entries): any {
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

	formatDate(input) {
		const datePart = input.match(/\d+/g);

		const year = datePart[0].substring(2);
		const month = datePart[1];
		const day = datePart[2];

		return day + '/' + month + '/' + year;
	}

	onSeeMoreContents() {
		this.router.navigate(['/event-see-more']);
	}

	onDetailContent(id) {
		// console.log(id);
		this.router.navigate(['/event-detail'], {
			queryParams: {
				contentID: id
			}
		});
	}

	// Create Content

	routerChangeMethod(url) {
		if (url === '/admin/manage-content?type=Create%20Content') {
			this.reset();
		} else {
			this.getListContentWithPage(1, 30);
			this.page += 1;
		}
	}

	onSelectPhoto() {
		document.getElementById('photo').click();
	}

	onPhotoSelected(event: any) {
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();
			reader.onload = (e: any) => {
				this.pathPhoto = e.target.result;
				this.isPathPhoto = true;
			};
			reader.readAsDataURL(event.target.files[0]);
			this.imageHeader = event.target.files[0];
		}
		console.log(event);
	}

	reset() {
		location.reload();
	}

	createContent() {
		console.log(this.imageHeader);
		this.loading = true;
		if (this.imageHeader === null || this.imageHeader === undefined) {
			this.toastr.error('Please upload cover image for the event');
			this.loading = false;
			return;
		} else if (this.contentForm.value.title === '') {
			this.toastr.error('Please fill-in event title field');
			this.loading = false;
			return;
		} else if (this.contentForm.value.date === '') {
			this.toastr.error('Please fill-in event date');
			this.loading = false;
			return;
		} else if (this.startHour === undefined || this.startMinute === undefined) {
			this.toastr.error('Please enter the correct start time', 'Invalid Time');
		} else if (this.endHour === undefined || this.endMinute === undefined) {
			this.toastr.error('Please enter the correct end time', 'Invalid Time');
		} else if (this.contentForm.value.location === '') {
			this.toastr.error('Please fill-in event location');
			this.loading = false;
			return;
		} else if (this.contentForm.value.link === '') {
			this.toastr.error('Please fill-in event link');
			this.loading = false;
			return;
		} else if (this.contentForm.value.type === '') {
			this.toastr.error('Please fill-in event type');
			this.loading = false;
			return;
		} else if (this.contentForm.value.description === '') {
			this.toastr.error('Please fill-in event description');
			this.loading = false;
			return;
		}

		const data = {
			description: this.contentForm.value.description,
			eventDate: this.contentForm.value.date.toISOString().split('T')[0],
			eventLink: this.contentForm.value.link,
			eventLocation: this.contentForm.value.location,
			eventTime: this.startHour + ':' + this.startMinute + ' - ' + this.endHour + ':' + this.endMinute,
			eventType: this.contentForm.value.type,
			image: this.imageHeader,
			title: this.contentForm.value.title,
		};

		console.log('Create data:', data);
		console.log('Valid:', this.contentForm.valid);
		if (this.contentForm.valid) {
			this.employeeService.createBanner(data).subscribe(
			response => {
				this.loading = false;
				this.toastr.success('New content succesfully created.');
				location.reload();
			},
			(error) => {
				this.loading = false;
				console.log(error);
				const message = error.error;
				this.toastr.error(message);
				// this.toastService.error('Content creation failed, please try again');
			});
		} else {
			this.toastr.error('Please fill-in the blank field');
			this.loading = false;
		}
	}

	public blobToFile = (theBlob: Blob, fileName: string): File => {
		const b: any = theBlob;
		// A Blob() is almost a File() - it's just missing the two properties below which we will add
		console.log(b);
		b.lastModifiedDate = new Date();
		b.name = fileName;

		// Cast to a File() type
		return theBlob as File;
	}

	public excelBlobToFile = (theBlob: Blob, fileName: string): File => {
		const b: any = theBlob;
		// A Blob() is almost a File() - it's just missing the two properties below which we will add
		console.log(b);
		b.lastModifiedDate = new Date();
		b.name = fileName;

		// Cast to a File() type
		return theBlob as File;
	}

	// Update Content

	onSelectPhotoTwo() {
		document.getElementById('phototwo').click();
	}

	onPhotoSelectedTwo(event: any) {
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();
			reader.onload = (e: any) => {
				this.pathPhotoTwo = e.target.result;
				this.isPathPhotoTwo = true;
			};
			reader.readAsDataURL(event.target.files[0]);
			this.imageHeaderTwo = event.target.files[0];
		}
		console.log(event);
	}

	picChange(thePicture: File) {
		// for picture changes
		const reader = new FileReader();
		reader.onload = e => {
			this.pathPhotoTwo = reader.result;
		};

		reader.readAsDataURL(thePicture);
		this.hasChanged = true;
		this.imageHeaderTwo = thePicture;
	}

	onSearchEvent(event) {
		console.log(this.allBanners);
		const filter = event.srcElement.value.toLowerCase();

		this.filteredBanners = this.allBanners.filter(item => item.title.toLowerCase().includes(filter));

		console.log('Filtered List:', this.filteredBanners);
	}

	updateContent(item) {
		this.currentEvent = item;
		this.pathPhotoTwo = item.image;
		this.updateForm.controls.title.setValue(item.title);
		this.updateForm.controls.description.setValue(item.description);
		this.updateForm.controls.date.setValue(new Date(item.startTime));
		this.startHourTwo = new Date(item.startTime).toLocaleTimeString(['en-GB'], { hour: '2-digit' });
		this.startMinuteTwo = new Date(item.startTime).toLocaleTimeString(['en-GB'], { minute: '2-digit' });

		if (this.startMinuteTwo === '0') {
			this.startMinuteTwo += '0';
		}

		this.endHourTwo = new Date(item.endTime).toLocaleTimeString(['en-GB'], { hour: '2-digit' });
		this.endMinuteTwo = new Date(item.endTime).toLocaleTimeString(['en-GB'], { minute: '2-digit' });

		if (this.endMinuteTwo === '0') {
			this.endMinuteTwo += '0';
		}

		this.updateForm.controls.type.setValue(item.eventType);

		this.updateForm.controls.location.setValue(item.eventLocation);
		this.updateForm.controls.link.setValue(item.eventLink);

		this.isEditing = true;

		console.log(this.updateForm);
	}

	submitUpdate() {
		console.log(this.updateForm);
		console.log(this.startHourTwo);
		console.log(this.startMinuteTwo);
		console.log(this.endHourTwo);
		console.log(this.endMinuteTwo);
		console.log(this.updateForm.value.type);
		console.log(this.imageHeaderTwo);
		this.loading = true;
		if (this.updateForm.value.title === '') {
			this.toastr.error('Please fill-in event title field');
			this.loading = false;
			return;
		} else if (this.updateForm.value.date === '') {
			this.toastr.error('Please fill-in event date');
			this.loading = false;
			return;
		} else if (this.startHourTwo === undefined || this.startMinuteTwo === undefined) {
			this.toastr.error('Please enter the correct start time', 'Invalid Time');
		} else if (this.endHourTwo === undefined || this.endMinuteTwo === undefined) {
			this.toastr.error('Please enter the correct end time', 'Invalid Time');
		} else if (this.updateForm.value.location === '') {
			this.toastr.error('Please fill-in event location');
			this.loading = false;
			return;
		} else if (this.updateForm.value.link === '') {
			this.toastr.error('Please fill-in event link');
			this.loading = false;
			return;
		} else if (this.updateForm.value.type === '') {
			this.toastr.error('Please fill-in event type');
			this.loading = false;
			return;
		} else if (this.updateForm.value.description === '') {
			this.toastr.error('Please fill-in event description');
			this.loading = false;
			return;
		}

		const data = {
			description: this.updateForm.value.description,
			eventDate: this.updateForm.value.date.toISOString().split('T')[0],
			eventLink: this.updateForm.value.link,
			eventLocation: this.updateForm.value.location,
			eventTime: this.startHourTwo + ':' + this.startMinuteTwo + ' - ' + this.endHourTwo + ':' + this.endMinuteTwo,
			eventType: this.updateForm.value.type,
			image: this.imageHeaderTwo,
			title: this.updateForm.value.title,
		};

		console.log('Create data:', data);
		console.log('Valid:', this.updateForm.valid);
		if (this.updateForm.valid) {
			this.employeeService.editBanner(this.currentEvent._id, data).subscribe(
			response => {
				this.loading = false;
				this.toastr.success('Content succesfully edited.');
				location.reload();
			},
			(error) => {
				this.loading = false;
				console.log(error);
				const message = error.error;
				this.toastr.error(message);
				// this.toastService.error('Content creation failed, please try again');
			});
		} else {
			this.toastr.error('Please fill-in the blank field');
			this.loading = false;
		}
	}

	deleteEvent() {
		console.log(this.currentEvent);
		this.employeeService.deleteBanner(this.currentEvent._id).subscribe(
			response => {
				this.toastr.success('Succesfully deleted event ' + this.currentEvent.title);
				location.reload();
			},
			(error) => {
				console.log(error);
				const message = error.error;
				this.toastr.error(message);
				// this.toastService.error('Content creation failed, please try again');
			});
	}

	onSelectedHourStart(event) {
		if (event.length === 0) {
			this.invalidStartHour = true;
			return;
		}
		// this.pickUpLain = event.item.content;
		const selected = event.item.content;
		this.invalidStartHour = false;
		console.log('Selected: ', selected);
		this.startHour = selected;
	}

	onSelectedMinuteStart(event) {
		if (event.length === 0) {
			this.invalidStartMinute = true;
			return;
		}
		// this.pickUpLain = event.item.content;
		const selected = event.item.content;
		this.invalidStartMinute = false;
		console.log('Selected: ', selected);
		this.startMinute = selected;
	}

	onStartTimeInput(event) {
		if (event.srcElement.value === '') {
			this.invalidStartTime = true;
		} else {
			this.invalidStartTime = false;
		}
	}

	onSelectedHourEnd(event) {
		if (event.length === 0) {
			this.invalidEndHour = true;
			return;
		}
		// this.pickUpLain = event.item.content;
		const selected = event.item.content;
		this.invalidEndHour = false;
		console.log('Selected: ', selected);
		this.endHour = selected;
	}

	onSelectedMinuteEnd(event) {
		if (event.length === 0) {
			this.invalidEndMinute = true;
			return;
		}
		// this.pickUpLain = event.item.content;
		const selected = event.item.content;
		this.invalidEndMinute = false;
		console.log('Selected: ', selected);
		this.endMinute = selected;
	}

	onEndTimeInput(event) {
		if (event.srcElement.value === '') {
			this.invalidEndTime = true;
		} else {
			this.invalidEndTime = false;
		}
	}

	onSelectedHourStartTwo(event) {
		if (event.length === 0) {
			this.invalidStartHourTwo = true;
			return;
		}
		// this.pickUpLain = event.item.content;
		const selected = event.item.content;
		this.invalidStartHourTwo = false;
		console.log('Selected: ', selected);
		this.startHourTwo = selected;
	}

	onSelectedMinuteStartTwo(event) {
		if (event.length === 0) {
			this.invalidStartMinuteTwo = true;
			return;
		}
		// this.pickUpLain = event.item.content;
		const selected = event.item.content;
		this.invalidStartMinuteTwo = false;
		console.log('Selected: ', selected);
		this.startMinuteTwo = selected;
	}

	onStartTimeInputTwo(event) {
		if (event.srcElement.value === '') {
			this.invalidStartTimeTwo = true;
		} else {
			this.invalidStartTimeTwo = false;
		}
	}

	onSelectedHourEndTwo(event) {
		if (event.length === 0) {
			this.invalidEndHourTwo = true;
			return;
		}
		// this.pickUpLain = event.item.content;
		const selected = event.item.content;
		this.invalidEndHourTwo = false;
		console.log('Selected: ', selected);
		this.endHourTwo = selected;
	}

	onSelectedMinuteEndTwo(event) {
		if (event.length === 0) {
			this.invalidEndMinuteTwo = true;
			return;
		}
		// this.pickUpLain = event.item.content;
		const selected = event.item.content;
		this.invalidEndMinuteTwo = false;
		console.log('Selected: ', selected);
		this.endMinuteTwo = selected;
	}

	onEndTimeInputTwo(event) {
		if (event.srcElement.value === '') {
			this.invalidEndTimeTwo = true;
		} else {
			this.invalidEndTimeTwo = false;
		}
	}
	
}
