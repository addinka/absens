import { Component, OnInit } from '@angular/core';
import { ModalService, BaseModal } from 'carbon-components-angular';
import { DailyModalComponent } from '../../daily-modal/daily-modal/daily-modal.component';
import { DailyLeaveModalComponent } from '../../daily-leave-modal/daily-leave-modal/daily-leave-modal.component';
import { DailySickModalComponent } from '../../daily-sick-modal/daily-sick-modal/daily-sick-modal.component';
import { EmployeeService } from '../../core/services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FunService } from '../../core/services/fun.service';

@Component({
	selector: 'app-daily-checkup',
	templateUrl: './daily-checkup.component.html',
	styleUrls: ['./daily-checkup.component.scss']
})
export class DailyCheckupComponent implements OnInit {
	questionOne: any = 'N';
	questionTwo: any = 'N';
	questionThree: any = 'N';
	// Question Four
	temperatureValue: any = 36.5;
	questionFive: any = 'N';
	questionSix: any = 'N';
	questionSeven: any = 'N';
	questionEight: any = 'N';
	questionNine: any = 'N';
	type: any;
	status: any;

	// Employee Title
	userName = 'Employee';
	isShow = false;

	// Employee Subtitle
	currTime: string;
	zone = 'Origin';
	temperature: any = '30';
	humidity: any = '50';
	risk = 'None';

	constructor(
		public modalService: ModalService,
		public employeeService: EmployeeService,
		private router: Router,
		public toastr: ToastrService,
		private activatedRoute: ActivatedRoute,
		private funService: FunService, ) { }

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe(params => {
			const token = params.token;
			// tslint:disable-next-line: max-line-length
			// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI1OTEyODI1NjksImlzcyI6IklCTS1NeS1Xb3JrZm9yY2UiLCJpZCI6IjAzMDA1NyIsIm5hbWUiOiJOdXJ1dWwgUGVyd2FkaSIsIm1hbmFnZXJJRCI6IjAzMDA1NyIsImlzTWFuYWdlciI6IlkiLCJpc1NDIjoiWSIsImlzSFNDIjoiWSJ9.rlRsIrYA6XBDzImM6AP-i_D-JnC_gicD9j_B4aCJUOE';
			if (token !== undefined) {
				const decodedToken = this.funService.getDecodedAccessToken(token);
				localStorage.setItem('token', token);
				localStorage.setItem('exp', decodedToken.exp);
				this.router.navigate(['/daily-checkup'], {
					queryParams: { state : 'default' }
				});
			}
		});

		this.getEmployeeData();
	}

	showSuccess() {
		this.toastr.success('Successfully updated your Daily Status');
	}

	showError(errorMessage) {
		if (errorMessage === '' || errorMessage === null || errorMessage === undefined){
			errorMessage = 'An unknown error occured';
		}
		this.toastr.error(errorMessage);
	}

	notFeelingWell() {
		if (this.questionSeven === 'Y' && (this.questionSix === 'Y' || this.questionEight === 'Y' || this.questionNine === 'Y')) {
			this.type = 'exposureSymptoms';
			this.status = 'sick';
			this.openModal();
		} else if (this.questionSeven === 'Y') {
			this.type = 'symptoms';
			this.status = 'sick';
			this.openModal();
		} else if (this.questionSix === 'Y' || this.questionEight === 'Y' || this.questionNine === 'Y') {
			this.type = 'exposure';
			this.status = 'sick';
			this.openModal();
		} else {
			this.type = 'noExposureSymptoms';
			this.status = 'sick';
			this.openModal();
		}
	}

	openModal() {
		this.modalService.create({
			component: DailySickModalComponent,
			inputs: {
				questionOne: this.questionOne,
				questionTwo: this.questionTwo,
				questionThree: this.questionThree,
				temperature: this.temperatureValue,
				questionFive: this.questionFive,
				questionSix: this.questionSix,
				questionSeven: this.questionSeven,
				questionEight: this.questionEight,
				questionNine: this.questionNine,
				type: this.type,
				status: this.status
			}
		});
	}

	readyToWork() {
		if (this.questionSeven === 'Y' && (this.questionSix === 'Y' || this.questionEight === 'Y' || this.questionNine === 'Y')) {
			this.type = 'exposureSymptoms';
			this.status = 'work';
			this.openModal();
		} else if (this.questionSeven === 'Y') {
			this.type = 'symptoms';
			this.status = 'work';
			this.openModal();
		} else if (this.questionSix === 'Y' || this.questionEight === 'Y' || this.questionNine === 'Y') {
			this.type = 'exposure';
			this.status = 'work';
			this.openModal();
		} else {
			this.modalService.create({
				component: DailyModalComponent,
				inputs: {
					questionOne: this.questionOne,
					questionTwo: this.questionTwo,
					questionThree: this.questionThree,
					temperature: this.temperatureValue,
					questionFive: this.questionFive,
					questionSix: this.questionSix,
					questionSeven: this.questionSeven,
					questionEight: this.questionEight,
					questionNine: this.questionNine,
				}
			});
		}
	}

	takingLeave() {
		this.modalService.create({
			component: DailyLeaveModalComponent,
			inputs: {
				questionOne: this.questionOne,
				questionTwo: this.questionTwo,
				questionThree: this.questionThree,
				temperature: this.temperatureValue,
				questionFive: this.questionFive,
				questionSix: this.questionSix,
				questionSeven: this.questionSeven,
				questionEight: this.questionEight,
				questionNine: this.questionNine,
			}
		});
	}

	// setStatus(workMode) {
	// 	const content = {
	// 		'oneLeftHouse': this.questionOne,
	// 		'twoPublicTransport': this.questionTwo,
	// 		'threePublicActivity': this.questionThree,
	// 		'fourTemperature': this.temperatureValue,
	// 		'fiveTravel': this.questionFive,
	// 		'sixCloseContact': this.questionSix,
	// 		'sevenSymptoms': this.questionSeven,
	// 		'eightSelfQuarantine': this.questionEight,
	// 		'nineConditions': this.questionNine,
	// 		'workMode': workMode
	// 	};

	// 	this.employeeService.setDailyStatus(content).subscribe(response => {
	// 		console.log('CONTENT', content);
	// 		this.showSuccess();
	// 	},
	// 		error => {
	// 		console.log(error);
	// 		this.showError(error.error);
	// 		// this.toastService.error(error.error);
	// 	});
	// }

	navigate() {
		const userType = localStorage.getItem('userType');
		this.router.navigate(['/dashboard'], {
			queryParams: {
				userType : userType,
			}
		});
	}

	getEmployeeData() {
		this.employeeService.getUserDashboard().subscribe(
			response => {
				console.log(response);
				if (response.isNew === 'Y') {
					this.router.navigate(['/account']);
					this.toastr.error('You have to fill your account information before anything');
					this.employeeService.headerStatusTrueEmitter().emit();
				} else if (response.isChecked !== 'Y') {
					// Hi, {{userName}}
					this.isShow = true;
					this.userName = response.name;
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
					// At {{currTime}} in {{zone}}, ..., and epidemic risk is {{risk}}
					if (response.riskRegion !== undefined &&
						response.riskRegion !== null && response.riskRegion !== [] && response.riskRegion.length !== 0) {
						this.risk = response.riskRegion[0].kategori;
						const splitString = response.riskRegion[0].title.split(',');
						this.zone = splitString[0].toLowerCase();
					}
					// Temperature is {{temperature}}, humidity is {{humidity}}
					if (response.weatherData !== undefined &&
						response.weatherData !== null && response.weatherData !== [] && response.weatherData.length !== 0) {
						this.temperature = response.weatherData.main.feels_like;
						this.humidity = response.weatherData.main.humidity;
					}
				} else {
					this.showError("You already filled today's checkup");
					this.router.navigate(['/dashboard']);
					this.employeeService.headerStatusEmitter().emit();
				}
			},
			error => {
				console.log(error);
			});
	}
}
