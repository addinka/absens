import { Component, OnInit } from '@angular/core';
import { ModalService } from 'carbon-components-angular';
import { CancelModalComponent } from '../../cancel-modal/cancel-modal/cancel-modal.component';
import { ConfirmationModalComponent } from '../../confirmation-modal/confirmation-modal/confirmation-modal.component';
import { RiskResultModalComponent } from '../../risk-result-modal/risk-result-modal/risk-result-modal.component';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../core/services/employee.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
	selector: 'app-survey-page',
	templateUrl: './survey-page.component.html',
	styleUrls: ['./survey-page.component.scss']
})

export class SurveyPageComponent implements OnInit {
	public formGroupOne: FormGroup;
	public formGroupTwo: FormGroup;
	public formGroupThree: FormGroup;
	answers = [];
	familyMember = true;
	onEdit = false;

	data: any;
	allData: any;
	edited = false;
	currentID: any;

	constructor(
		protected formBuilder: FormBuilder,
		public toastr: ToastrService,
		private router: Router,
		public modalService: ModalService,
		public employeeService: EmployeeService) {
		}

	ngOnInit() {
		this.formGroupOne = this.formBuilder.group({
			radioGroupOne: new FormControl()
		});

		this.formGroupTwo = this.formBuilder.group({
			radioGroupTwo: new FormControl()
		});

		this.formGroupThree = this.formBuilder.group({
			radioGroupThree: new FormControl()
		});

		this.getVaccinationSurveyData();
		this.getAllVaccinationData();
	}

	ngAfterViewInit() {
	}

	onChange(id) {
		if (id === 0) {
			this.familyMember = false;
		} else {
			if (id === 1) {
				this.familyMember = true;
			}
		}
	}

	getVaccinationSurveyData() {
		this.employeeService.getVaccinationSurveyData()
		.subscribe(
			response => {
				this.data = response;
		},
		error => {
			console.log(error);
			this.showError(error.error);
		});
	}

	getAllVaccinationData() {
		this.employeeService.getAllVaccinationData()
		.subscribe(
			response => {
				this.allData = response;
				console.log(this.allData);
		},
		error => {
			console.log(error);
			this.showError(error.error);
		});
	}

	cancelModal() {
		this.modalService.create({
			component: CancelModalComponent,
			inputs: { }
		});
	}

	confirmModal() {
		this.modalService.create({
			component: ConfirmationModalComponent,
			inputs: { }
		});
	}

	showSuccess(message) {
		this.toastr.success(message);
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
		for (var i = 0; i < 12; i++) {
			if (!this.answers[i]) {
				if ((i === 3) && (this.familyMember === false)) {
					continue;
				} else {
					this.showError('Please fill-in the answer for question ' + (i + 1));
					return;
				}
			}		
		}

		if (this.answers[1].length !== 16) {
			this.showError('Please check your NIK, and make sure that it is 16 digits');
			return;
		}

		this.data.doc[0].response = this.answers[0];
		this.data.doc[1].response = this.answers[1];

		if (this.answers[2] === "zero") {
			this.data.doc[2].optionResponses = "0";
		} else if (this.answers[2] === "one") {
			this.data.doc[2].optionResponses = "1";
		}

		if (this.familyMember) {
			if (this.answers[3] === "zero") {
				this.data.doc[3].optionResponses = "0";
			} else if (this.answers[3] === "one") {
				this.data.doc[3].optionResponses = "1";
			} else if (this.answers[3] === "two") {
				this.data.doc[3].optionResponses = "2";
			}
		}

		this.data.doc[4].response = this.answers[4];

		// Tanggal Lahir Skipped
		// this.data.doc[5].response = this.answers[5];
		
		if (this.answers[5] === "zero") {
			this.data.doc[6].optionResponses = "0";
		} else if (this.answers[5] === "one") {
			this.data.doc[6].optionResponses = "1";
		} 

		this.data.doc[7].response = this.answers[6];
		this.data.doc[8].response = this.answers[7];
		this.data.doc[9].response = this.answers[8];
		this.data.doc[10].response = this.answers[9];
		this.data.doc[11].response = this.answers[10];
		this.data.doc[12].response = this.answers[11];

		this.employeeService.submitVaccinationSurvey(this.data).subscribe(response => {
			this.answers[0] = '';
			this.answers[1] = '';
			this.answers[4] = '';
			this.answers[6] = '';

			this.showSuccess('Successfully register entry for Vaccination');
			this.confirmModal();
			this.getAllVaccinationData();
		},
			error => {
				this.showError(error.error);
				console.log(error);
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

	formatLabel(value: number) {
	if (value >= 1000) {
		return Math.round(value / 1000) + 'k';
	}

		return value;
	}

	editEntry(id) {
		this.onEdit = true;
		this.employeeService.getIndividualVaccinationData(id)
		.subscribe(
			response => {
				this.data = response;
				this.answers = [];

				this.answers[0] = this.data.doc[0].response;
				this.answers[1] = this.data.doc[1].response;

				if (this.data.doc[2].optionResponses === "0") {
					this.answers[2] = "zero";
					this.formGroupOne.get("radioGroupOne").patchValue("zero");
				} else if (this.data.doc[2].optionResponses === "1") {
					this.answers[2] = "one";
					this.formGroupOne.get("radioGroupOne").patchValue("one");
				}

				if (this.answers[2] === "one") {
					if (this.data.doc[3].optionResponses === "0") {
						this.answers[3] = "zero";
						this.formGroupTwo.get("radioGroupTwo").patchValue("zero");
					} else if (this.data.doc[3].optionResponses === "1") {
						this.answers[3] = "one";
						this.formGroupTwo.get("radioGroupTwo").patchValue("one");
					} else if (this.data.doc[3].optionResponses === "2") {
						this.answers[3] = "two";
						this.formGroupTwo.get("radioGroupTwo").patchValue("two");
					}

					this.familyMember = true;
				} else {
					this.familyMember = false;
				}

				this.answers[4] = this.data.doc[4].response;

				// Tanggal Lahir Skipped
				// this.data.doc[5].response = this.answers[5];
				if (this.data.doc[6].optionResponses === "0") {
					this.answers[5] = "zero";
					this.formGroupThree.get("radioGroupThree").patchValue("zero");
				} else if (this.data.doc[6].optionResponses === "1") {
					this.answers[5] = "one";
					this.formGroupThree.get("radioGroupThree").patchValue("one");
				}

				this.answers[6] = this.data.doc[7].response;
				this.answers[7] = this.data.doc[8].response;
				this.answers[8] = this.data.doc[9].response;
				this.answers[9] = this.data.doc[10].response;
				this.answers[10] = this.data.doc[11].response;
				this.answers[11] = this.data.doc[12].response;

				this.edited = true;
				this.currentID = id;
		},
		error => {
			console.log(error);
			this.showError(error.error);
		});
	}

	editReservation() {
		for (var i = 0; i < this.answers.length; i++) {
			if (!this.answers[i]) {
				if ((i === 3) && (this.familyMember === false)) {
					continue;
				} else {
					this.showError('Please fill-in the answer for question ' + (i + 1));
					return;
				}
			}
		}

		if (this.answers[1].length !== 16) {
			this.showError('Please check your NIK, and make sure that it is 16 digits');
			return;
		}

		this.data.doc[0].response = this.answers[0];
		this.data.doc[1].response = this.answers[1];

		if (this.answers[2] === "zero") {
			this.data.doc[2].optionResponses = "0";
		} else if (this.answers[2] === "one") {
			this.data.doc[2].optionResponses = "1";
		}

		if (this.familyMember) {
			if (this.answers[3] === "zero") {
				this.data.doc[3].optionResponses = "0";
			} else if (this.answers[3] === "one") {
				this.data.doc[3].optionResponses = "1";
			} else if (this.answers[3] === "two") {
				this.data.doc[3].optionResponses = "2";
			}
		}

		this.data.doc[4].response = this.answers[4];

		// Tanggal Lahir Skipped
		// this.data.doc[5].response = this.answers[5];
		if (this.answers[5] === "zero") {
			this.data.doc[6].optionResponses = "0";
		} else if (this.answers[5] === "one") {
			this.data.doc[6].optionResponses = "1";
		} 

		this.data.doc[7].response = this.answers[6];
		this.data.doc[8].response = this.answers[7];
		this.data.doc[9].response = this.answers[8];
		this.data.doc[10].response = this.answers[9];
		this.data.doc[11].response = this.answers[10];
		this.data.doc[12].response = this.answers[11];
		
		this.employeeService.editReservation(this.currentID, this.data)
		.subscribe(
			response => {
				this.showSuccess('Succesfully Edited Family Member Information');
				this.onEdit = false;
				location.reload();
		},
		error => {
			console.log(error);
			this.showError(error.error);
		});
	}

	deleteEntry(id) {
		this.employeeService.deleteReservation(id)
		.subscribe(
			response => {
				this.showSuccess('Succesfully Deleted Family Member');
				location.reload();
		},
		error => {
			console.log(error);
			this.showError(error.error);
		});
	}

	backToDashboard() {
		this.router.navigate(['/dashboard']);
	}
}
