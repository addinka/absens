import { Component, OnInit } from '@angular/core';
import { ModalService } from 'carbon-components-angular';
import { CancelModalComponent } from '../../cancel-modal/cancel-modal/cancel-modal.component';
import { RiskResultModalComponent } from '../../risk-result-modal/risk-result-modal/risk-result-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
	selector: 'app-risk-calculator',
	templateUrl: './risk-calculator.component.html',
	styleUrls: ['./risk-calculator.component.scss']
})
export class RiskCalculatorComponent implements OnInit {
	questionOne = 0;
	questionTwo = 0;
	questionThree = 1;
	questionFour = 1;
	questionFive = 1;
	questionSix = 0;
	questionSeven = 0;
	questionEight = 0;
	questionNine: any;
	questionTen: any;
	questionEleven: any;
	questionTwelve: any;

	checkboxOne: any = 0;
	checkboxTwo: any = 0;
	checkboxThree: any = 0;
	checkboxFour: any = 0;
	checkboxFive: any = 0;
	checkboxSix: any = 0;
	checkboxSeven: any = 0;
	checkboxEight: any = 0;
	checkboxNine: any = 0;
	checkboxTen: any = 0;

	public ageRange: any = [
		{
			content: '0-9'
		},
		{
			content: '10-19'
		},
		{
			content: '20-29'
		},
		{
			content: '30-39'
		},
		{
			content: '40-49'
		},
		{
			content: '50-59'
		},
		{
			content: '60-69'
		},
		{
			content: '70-79'
		},
		{
			content: '80-89'
		},
		{
			content: '90-99'
		},
		{
			content: '100+'
		}
	];

	constructor(
		private router: Router,
		public toastr: ToastrService,
		private activatedRoute: ActivatedRoute,
		public modalService: ModalService,
		public employeeService: EmployeeService) { }

	ngOnInit() {
	}

	cancelModal() {
		this.modalService.create({
			component: CancelModalComponent,
			inputs: { }
		});
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

	valueChange(event) {
		/* console.log('Event:', event);
		if (event === 0) {
			this.showError('Cannot input value 0');
			return;
		} */
	}

	submitModal() {
		if (this.questionThree === 0) {
			this.showError('Cannot input value 0 (Question 3)');
			this.questionThree = 1;
			return;
		}

		if (this.questionFour === 0) {
			this.showError('Cannot input value 0 (Question 4)');
			this.questionFour = 1;
			return;
		}

		if (this.questionFive === 0) {
			this.showError('Cannot input value 0 (Question 5)');
			this.questionFive = 1;
			return;
		}

		if (this.questionNine === undefined) {
			this.showError('Please input your age range');

			return;
		}

		if (this.questionTen === undefined || !Number.isFinite(Number(this.questionTen))) {
			this.showError('Please input your weight correctly');

			return;
		}

		if (this.questionEleven === undefined || !Number.isFinite(Number(this.questionEleven))) {
			this.showError('Please input your height correctly');

			return;
		}

		const content = {
			'contacts_count': Number(this.questionOne),
			'house_count': Number(this.questionTwo),
			'rate_reducing_risk_single_social_distancing': Number(this.questionThree),
			'rate_reducing_risk_single_washing_hands': Number(this.questionFour),
			'rate_reducing_mask': Number(this.questionFive),
			'covid19_symptoms': Number(this.questionSix),
			'covid19_contact': Number(this.questionSeven),
			'sex': Number(this.questionEight),
			'age': this.questionNine.content,
			'weight': Number(this.questionTen),
			'height': Number(this.questionEleven),
			'asthma': this.checkboxOne,
			'hypertension': this.checkboxTwo,
			'kidney_disease': this.checkboxThree,
			'diabetes': this.checkboxFour,
			'heart_disease': this.checkboxFive,
			'hiv_positive': this.checkboxSix,
			'liver_disease': this.checkboxSeven,
			'compromised_immune': this.checkboxEight,
			'lung_disease': this.checkboxNine,
			'other_chronic': this.checkboxTen
		};

		this.employeeService.getRiskCalculation(content).subscribe(response => {
			this.openModal(response.infection_rate, response.mortality_rate);
		},
			error => {
				console.log(error);
				this.showError(error.error);
		});
	}

	openModal(infectionRate, mortalityRate) {
		this.modalService.create({
			component: RiskResultModalComponent,
			inputs: {
				infectionRate: infectionRate,
				mortalityRate: mortalityRate
			}
		});
	}

	onChecked(event, question) {
		console.log(event);
		console.log(question);
		if (question === 1) {
			if (this.checkboxOne === 0) {
				this.checkboxOne = 1;
			} else {
				this.checkboxOne = 0;
			}

			console.log('Checkbox One: ', this.checkboxOne);
		} else if (question === 2) {
			if (this.checkboxTwo === true) {
				this.checkboxTwo = 1;
			} else {
				this.checkboxTwo = 0;
			}

			console.log('Checkbox Two: ', this.checkboxTwo);
		} else if (question === 3) {
			if (this.checkboxThree === true) {
				this.checkboxThree = 1;
			} else {
				this.checkboxThree = 0;
			}

			console.log('Checkbox Three: ', this.checkboxThree);
		} else if (question === 4) {
			if (this.checkboxFour === true) {
				this.checkboxFour = 1;
			} else {
				this.checkboxFour = 0;
			}

			console.log('Checkbox Four: ', this.checkboxFour);
		} else if (question === 5) {
			if (this.checkboxFive === true) {
				this.checkboxFive = 1;
			} else {
				this.checkboxFive = 0;
			}

			console.log('Checkbox Five: ', this.checkboxFive);
		} else if (question === 6) {
			if (this.checkboxSix === true) {
				this.checkboxSix = 1;
			} else {
				this.checkboxSix = 0;
			}

			console.log('Checkbox Six: ', this.checkboxSix);
		} else if (question === 7) {
			if (this.checkboxSeven === true) {
				this.checkboxSeven = 1;
			} else {
				this.checkboxSeven = 0;
			}

			console.log('Checkbox Seven: ', this.checkboxSeven);
		} else if (question === 8) {
			if (this.checkboxEight === true) {
				this.checkboxEight = 1;
			} else {
				this.checkboxEight = 0;
			}

			console.log('Checkbox Eight: ', this.checkboxEight);
		} else if (question === 9) {
			if (this.checkboxNine === true) {
				this.checkboxNine = 1;
			} else {
				this.checkboxNine = 0;
			}

			console.log('Checkbox Nine: ', this.checkboxNine);
		} else if (question === 10) {
			if (this.checkboxTen === true) {
				this.checkboxTen = 1;
			} else {
				this.checkboxTen = 0;
			}

			console.log('Checkbox Ten: ', this.checkboxTen);
		}
	}

	formatLabel(value: number) {
	if (value >= 1000) {
		return Math.round(value / 1000) + 'k';
	}

		return value;
	}
}
