import '@carbon/charts/styles.css';
import 'app/ibm-plex-font.css';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
@Component({
	selector: 'app-risk-result-modal',
	templateUrl: './risk-result-modal.component.html',
	styleUrls: ['./risk-result-modal.component.scss']
})
export class RiskResultModalComponent extends BaseModal implements OnInit {
	infectionRate: any;
	mortalityRate: any;

	infectionRisk = 'Low';
	mortalityRisk = 'Low';

	infection = [
		{
			'group': 'value',
			'value': 0
		}
	];

	mortality = [
		{
			'group': 'value',
			'value': 0
		}
	];

	options = {
		'title': '',
		'resizable': true,
		'height': '100px',
		'width': '70%',
		'gauge': {
			'type': 'semi',
		}
	};

	options1 = {
		'title': '',
		'resizable': true,
		'height': '100px',
		'width': '70%',
		'gauge': {
			'type': 'semi',
			'numberFormatter': (num) => (num / 10).toFixed(2)
		}
	};

	constructor(
		public employeeService: EmployeeService,
		private router: Router,
		protected injector: Injector,
		) {
		super();
		this.infectionRate = this.injector.get('infectionRate');
		this.mortalityRate = this.injector.get('mortalityRate');
	}

	ngOnInit() {
		this.infection[0].value = this.infectionRate;
		this.mortality[0].value = this.mortalityRate * 10;

		if (this.infectionRate < 15) {
			this.infectionRisk = 'Low';
		} else if (this.infectionRate < 41) {
			this.infectionRisk = 'Medium';
		} else {
			this.infectionRisk = 'High';
		}

		if (this.mortalityRate < 1) {
			this.mortalityRisk = 'Low';
		} else if (this.mortalityRate < 3) {
			this.mortalityRisk = 'Medium';
		} else {
			this.mortalityRisk = 'High';
		}
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
