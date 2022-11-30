import {
	Component,
	Input,
	OnInit
} from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	Validators
} from '@angular/forms';
import { ModalService } from 'carbon-components-angular';
import { CancelModalComponent } from '../../cancel-modal/cancel-modal/cancel-modal.component';
import { SampleModalComponent } from '../../sample-modal/sample-modal/sample-modal.component';
import { EmployeeService } from '../../core/services/employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from '../../core/services/utils.service';

interface Post {
	date: Date;
}

@Component({
	selector: 'app-create-leave-request',
	templateUrl: './create-leave-request.component.html',
	styleUrls: ['./create-leave-request.component.scss']
})
export class CreateLeaveRequestComponent implements OnInit {
	@Input() modalText = 'Hello, World';
	@Input() size = 'default';
	type: any;

	leaveTypeValue: any;

	leaveType: any = [
	];

	durationValue: any;
	durationInvalid = true;

	startDate: any;

	storedStart = new Date();

	loopDate: any;

	purposeValue: any;
	purposeInvalid = true;

	availableAnnual: any;
	availableDayoff: any;

	submitForm: FormGroup;

	post: Post = {
		date: new Date()
	};

	endDate: any;
	reason: any;

	constructor(
		public modalService: ModalService,
		public employeeService: EmployeeService,
		private router: Router,
		public toastr: ToastrService,
		public utilsService: UtilsService,
		private fb: FormBuilder) {

			this.submitForm = this.fb.group({
				startDate: ['', Validators.required]
			});
		}

	ngOnInit() {
			this.getUserDashboard();
			console.log(this.post);
			this.submitForm.controls['startDate'].setValue(this.post.date);
			this.submitForm.controls['startDate'].updateValueAndValidity();
	}

	showSuccess() {
		this.toastr.success('Hello world!', 'Toastr fun!');
	}

	showError(errorMessage) {
		if (errorMessage === '' || errorMessage === null || errorMessage === undefined) {
			errorMessage = 'An unknown error occured';
		}

		this.toastr.error(errorMessage);
	}

	selectDate(type, event) {
		if (type === 'start') {
			if (event.value === undefined) {
				this.showError('Please fill your Start Date');
				this.submitForm.controls['startDate'].setValue(this.storedStart);
				this.submitForm.controls['startDate'].updateValueAndValidity();
				return;
			}
		}

		if (type === 'start') {
			this.storedStart = event.value;

			if (this.durationValue && this.leaveType) {
				const content = {
					'duration': this.durationValue,
					'leaveType': this.leaveTypeValue.content,
					'startDate': this.submitForm.value.startDate,
				};

				this.employeeService.generateEndDate(content).subscribe(response => {
					this.endDate = this.utilsService.getDateFormat(new Date(response.endDate));
					this.reason = response.reason;
				},
					error => {
						console.log(error);
						this.showError(error.error);
						// this.toastService.error(error.error);
				});
			}
		}
	}

	getUserDashboard() {
		this.employeeService.getUserDashboard()
			.subscribe(
				response => {
					if (response.isNew === 'Y') {
						this.router.navigate(['/account']);
						this.toastr.error('You have to fill your account information before anything');
						this.employeeService.headerStatusTrueEmitter().emit();
					} else if (response.isChecked === 'N') {
						this.router.navigate(['/daily-checkup']);
						this.toastr.error('You have to do your daily checkup before doing anything for today');
						this.employeeService.headerStatusTrueEmitter().emit();
					} else {
						this.employeeService.getLeaveTypes().subscribe(
							res => {
								console.log(res);

								this.leaveType = [];

								res.forEach(element => {
									const newDestination = {
										'content': element
									};

									this.leaveType.push(newDestination);
								});
							});

							this.employeeService.getAnnualLeave().subscribe(
								res => {
									console.log(res);
									this.availableAnnual = res;
								});

							this.employeeService.getDayoffs().subscribe(
									res => {
										console.log(res);
										this.availableDayoff = res;
									});
					}
				},
				error => {
					console.log(error);
					this.showError(error.error);
				});
		}


	purposeChange(event) {
		this.purposeInvalid = false;
		if (event.srcElement.value === '') {
			this.purposeInvalid = true;
		}
	}

	durationChange(event) {
		this.durationInvalid = false;

		if (event.srcElement.value === '') {
			this.durationInvalid = true;
		} else if (event.srcElement.value < 0.5) {
			this.durationInvalid = true;
		} else {
			if (this.submitForm.value.startDate && this.leaveType) {
				const content = {
					'duration': this.durationValue,
					'leaveType': this.leaveTypeValue.content,
					'startDate': this.submitForm.value.startDate,
				};

				this.employeeService.generateEndDate(content).subscribe(response => {
					this.endDate = this.utilsService.getDateFormat(new Date(response.endDate));
					this.reason = response.reason;
				},
					error => {
						console.log(error);
						this.showError(error.error);
						// this.toastService.error(error.error);
				});
			}
		}
	}

	leaveTypeChange(event) {
		if (this.leaveTypeValue.content && this.durationValue) {
			const content = {
				'duration': this.durationValue,
				'leaveType': this.leaveTypeValue.content,
				'startDate': this.submitForm.value.startDate,
			};

			this.employeeService.generateEndDate(content).subscribe(response => {
				this.endDate = this.utilsService.getDateFormat(new Date(response.endDate));
				this.reason = response.reason;
			},
				error => {
					console.log(error);
					this.showError(error.error);
					// this.toastService.error(error.error);
			});
		}
	}

	submitLeaveRequest() {
		const buttonSubmitElement = (<HTMLInputElement>document.getElementById('buttonSubmit'));
		buttonSubmitElement.disabled = true;


		if (this.leaveTypeValue === undefined) {
			this.showError('Please select your leave type');
			buttonSubmitElement.disabled = false;
			return;
		}

		if (this.durationValue === '' || this.durationValue === undefined) {
			this.showError('Please fill in your leave duration');
			buttonSubmitElement.disabled = false;
			return;
		}

		if (this.purposeValue === '' || this.purposeValue === undefined) {
			this.showError('Please fill in your leave purpose');
			buttonSubmitElement.disabled = false;
			return;
		}

		const content = {
			'duration': this.durationValue,
			'leaveType': this.leaveTypeValue.content,
			'reason': this.purposeValue,
			'startDate': this.submitForm.value.startDate,
		};

		this.employeeService.createLeaveRequest(content).subscribe(response => {
			this.type = 'Leave';
			this.openModal();
		},
			error => {
				buttonSubmitElement.disabled = false;
				console.log(error);
				this.showError(error.error);
				// this.toastService.error(error.error);
			});
	}

	openModal() {
		this.modalService.create({
			component: SampleModalComponent,
			inputs: {
				type: this.type
			}
		});
	}

	cancelRequest() {
		const userType = localStorage.getItem('userType');
		this.router.navigate(['/dashboard'], {
			queryParams: {
				userType: userType,
			}
		});
	}

	cancelModal() {
		this.modalService.create({
			component: CancelModalComponent,
			inputs: {
				modalText: this.modalText,
				size: this.size
			}
		});
	}
}
