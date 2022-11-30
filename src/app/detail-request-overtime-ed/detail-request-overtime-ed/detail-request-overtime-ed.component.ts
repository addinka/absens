import { Component, OnInit, Injector } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';
import { ManagerService } from '../../core/services/manager.service';
import { UtilsService } from '../../core/services/utils.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
	selector: 'app-detail-request-overtime-ed',
	templateUrl: './detail-request-overtime-ed.component.html',
	styleUrls: ['./detail-request-overtime-ed.component.scss'],
})
export class DetailRequestOvertimeEdComponent extends BaseModal implements OnInit {
	type: string;
	data: any;

	overtimeDate: string;
	displayDate: string;
	approverOneName = 'First Approver';
	approverTwoName = 'Second Approver';
	approverOneStatus = 'Status';
	approverTwoStatus = 'Status';
	timeIn = '';
	timeOut = '';
	totalOTHour;
	points = '';
	otHour = 0;
	otMinutes = 0;
	purpose = '';

	constructor(protected injector: Injector, protected managerService: ManagerService, public utilsService: UtilsService) {
		super();
		this.type = this.injector.get('type');
		this.data = this.injector.get('data');
	}
	// tslint:disable-next-line:use-lifecycle-interface
	ngOnInit() {
		this.overtimeDate = this.utilsService.getDateFormat(new Date(this.data.startdate));
		this.timeIn = this.utilsService.getTimeFormat(this.data.timein);
		this.timeOut = this.utilsService.getTimeFormat(this.data.timeout);
		this.totalOTHour = this.data.hours;

		this.otHour = Math.floor(this.totalOTHour);
		this.otMinutes = (this.totalOTHour - this.otHour) * 60;

		this.totalOTHour = this.otHour + ' Hours ' + this.otMinutes + ' Minutes';
		this.points = this.data.poin;
		this.purpose = this.data.purpose;
	}
}
