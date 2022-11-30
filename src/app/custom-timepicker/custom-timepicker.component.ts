import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-custom-timepicker',
	templateUrl: './custom-timepicker.component.html',
	styleUrls: ['./custom-timepicker.component.scss']
})
export class CustomTimepickerComponent {

	constructor(){}

	@Output() selectedHour = new EventEmitter<any>();
	@Output() selectedMinute = new EventEmitter<any>();

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

	onSelectedHour(event: any) {
		this.selectedHour.emit(event.item.content);
	}

	onSelectedMinute(event: any) {
		this.selectedMinute.emit(event.item.content);
	}
}
