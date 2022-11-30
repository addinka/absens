import { Component, Injector } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-daily-modal',
	templateUrl: './daily-modal.component.html',
	styleUrls: ['./daily-modal.component.scss']
})
export class DailyModalComponent extends BaseModal {
	questionOne: any = '';
	questionTwo: any = '';
	questionThree: any = '';
	temperature: any = '';
	questionFive: any = '';
	questionSix: any = '';
	questionSeven: any = '';
	questionEight: any = '';
	questionNine:  any = '';

	constructor(
		public employeeService: EmployeeService,
		protected injector: Injector,
		private router: Router,
		private toastr: ToastrService
		) {
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
	}

	showSuccess() {
		this.toastr.success('Successfully updated your Daily Status');
	}

	showError(errorMessage) {
		if(errorMessage === '' || errorMessage === null || errorMessage === undefined){
			errorMessage = 'An unknown error occured';
		}
		this.toastr.error(errorMessage);
	}

	setStatus(workMode) {
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
			'workMode': workMode
		};

		this.employeeService.setDailyStatus(content).subscribe(response => {
			console.log('CONTENT', content);
			this.showSuccess();
			this.navigate();
			this.closeModal();
		},
			error => {
			console.log(error);
			this.showError(error.error);
			// this.toastService.error(error.error);
		});
	}

	navigate() {
		const userType = localStorage.getItem('userType');
		this.router.navigate(['/dashboard'], {
			queryParams: {
				userType : userType,
			}
		});
	}
}
