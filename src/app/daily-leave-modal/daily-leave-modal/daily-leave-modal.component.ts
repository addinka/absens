import { Component, Injector, OnInit } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { ToastrService } from 'ngx-toastr';

interface Post {
	date: Date;
}

@Component({
	selector: 'app-daily-leave-modal',
	templateUrl: './daily-leave-modal.component.html',
	styleUrls: ['./daily-leave-modal.component.scss']
})
export class DailyLeaveModalComponent extends BaseModal implements OnInit {
	questionOne: any = '';
	questionTwo: any = '';
	questionThree: any = '';
	temperature: any = '';
	questionFive: any = '';
	questionSix: any = '';
	questionSeven: any = '';
	questionEight: any = '';
	questionNine: any = '';
	startDate: any;
	endDate: any;
	storedStart = new Date();
	storedEnd = new Date();

	submitForm: FormGroup;
	events: any[] = [];

	post: Post = {
		date: new Date()
	};

	constructor(
		public employeeService: EmployeeService,
		protected injector: Injector,
		private router: Router,
		private fb: FormBuilder,
		private toastr: ToastrService) {
		super();
		this.questionOne = this.injector.get('questionOne');
		this.questionTwo = this.injector.get('questionTwo');
		this.questionThree = this.injector.get('questionThree');
		this.temperature = this.injector.get('temperature');
		this.questionFive = this.injector.get('questionFive');
		this.questionSix = this.injector.get('questionSix');
		this.questionSeven = this.injector.get('questionSeven');
		this.questionEight = this.injector.get('questionEight');
		this.questionNine = this.injector.get('questionNine');

		this.submitForm = this.fb.group({
			startDate: ['', Validators.required],
			endDate: ['', Validators.required],
		});

	}

	ngOnInit() {
		this.post.date.setHours(0, 0, 0, 0);
		this.submitForm.controls['startDate'].setValue(this.post.date);
		this.submitForm.controls['startDate'].updateValueAndValidity();

		this.submitForm.controls['endDate'].setValue(this.post.date);
		this.submitForm.controls['endDate'].updateValueAndValidity();

		this.storedStart.setHours(0, 0, 0, 0);
		this.storedEnd.setHours(0, 0, 0, 0);
	}

	selectDate(type, event) {
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		yesterday.setHours(0, 0, 0, 0);

		const oneWeekBefore = new Date();
		oneWeekBefore.setDate(oneWeekBefore.getDate() - 8);
		oneWeekBefore.setHours(0, 0, 0, 0);

		if (type === 'start') {
			if (event.value === undefined) {
				this.showError('Please fill your Start Date');
				this.submitForm.controls['startDate'].setValue(this.storedStart);
				this.submitForm.controls['startDate'].updateValueAndValidity();
				return;
			} else if (event.value < yesterday) {
				this.showError('Start Date cannot be in the past');
				this.submitForm.controls['startDate'].setValue(this.storedStart);
				this.submitForm.controls['startDate'].updateValueAndValidity();
				return;
			}
			//  else if (event.value < oneWeekBefore) {
			// 	this.showError('Start Date can only back-date up to within a week from today');
			// 	this.submitForm.controls['startDate'].setValue(this.storedStart);
			// 	this.submitForm.controls['startDate'].updateValueAndValidity();
			// 	return;
			// }
		} else {
			if (event.value === undefined) {
				this.showError('Please fill your End Date');
				this.submitForm.controls['endDate'].setValue(this.storedEnd);
				this.submitForm.controls['endDate'].updateValueAndValidity();
				return;
			} else if (event.value < yesterday) {
				this.showError('End Date cannot be in the past');
				this.submitForm.controls['endDate'].setValue(this.storedEnd);
				this.submitForm.controls['endDate'].updateValueAndValidity();
				return;
			}
		}

		if (this.submitForm.value.endDate < this.submitForm.value.startDate) {
			console.log(this.storedStart);
			this.showError('End Date cannot be before Start Date');
			this.submitForm.controls['startDate'].setValue(this.storedStart);
			this.submitForm.controls['startDate'].updateValueAndValidity();

			this.submitForm.controls['endDate'].setValue(this.storedEnd);
			this.submitForm.controls['endDate'].updateValueAndValidity();
			return;
		} else {
			if (type === 'start') {
				this.storedStart = event.value;
			} else {
				this.storedEnd = event.value;
			}
		}
	}

	showSuccess() {
		this.toastr.success('Successfully updated your Daily Status');
	}

	showError(errorMessage) {
		if (errorMessage === '' || errorMessage === null || errorMessage === undefined) {
			errorMessage = 'An unknown error occured';
		}
		this.toastr.error(errorMessage);
	}

	setStatus() {
		const content = {
			'oneLeftHouse': this.questionOne,
			'twoPublicTransport': this.questionTwo,
			'threePublicActivity': this.questionThree,
			'fourTemperature': this.temperature,
			'fiveTravel': this.questionFive,
			'sixCloseContact': this.questionSix,
			'sevenSymptoms': this.questionSeven,
			'eightSelfQuarantine': this.questionEight,
			'nineConditions': this.questionNine,
			'workMode': 'leave',
			'leaveStart': this.submitForm.value.startDate,
			'leaveEnd': this.submitForm.value.endDate,
		};
		this.employeeService.setDailyStatus(content).subscribe(response => {
			console.log('CONTENT', content);
			this.showSuccess();
			this.navigate();
			this.closeModal();
			console.log(response);
		},
			error => {
				console.log(error);
				this.showError(error.error);
			});
	}

	navigate() {
		const userType = localStorage.getItem('userType');
		this.router.navigate(['/dashboard'], {
			queryParams: {
				userType: userType,
			}
		});
	}
}
