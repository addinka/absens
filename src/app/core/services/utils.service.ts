import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable, EMPTY } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ServiceMapping } from '../utils/service.mapping';

@Injectable({
	providedIn: 'root'
})

export class UtilsService {
	googleAPIKey = 'AIzaSyBd55pe5Di9_o0R4Gtp1kLjHTs4uz_EHEM';

	constructor(
 	private http: HttpClient) { }

	searchDestination (destination?: string, filter?: string): Observable<any> {
		const url = environment.baseURL + ServiceMapping.DESTINATION + '?destination=' + destination + '&filter=' + filter;
		return this.http.get(url);
	}

	getTimeFormat(input) {
		if (input !== undefined) {
			console.log(input);
			let time;

			if (input.length === 7) {
				time = input.replace(',  ', ':');
			} else {
				time = input.replace(', ', ':');
			}

			console.log(time);

			const hour = time.split(':')[0];

			console.log(hour);

			const minutes = time.split(':')[1];
			console.log(minutes);

			let realHour = '';
			let realMinutes = '';

			if (hour < 10) {
				if (hour.length < 2) {
					realHour = '0' + hour;
				} else {
					realHour = hour;
				}
			} else {
				realHour = hour;
			}

			if (minutes < 10 && minutes !== '00') {
				realMinutes = '0' + minutes;
			} else {
				realMinutes = minutes;
			}

			const displayHour = (realHour + ':' + realMinutes);
			return displayHour;
		}
	}

	getTimeFormatV2(input) {
		if (input !== undefined) {
			const hours = input.getHours();
			const minutes = input.getMinutes();
			let realMinutes = '';
			let realHours = '';
			const realDate = '';
			const realMonth = '';

			if (minutes < 10) {
				realMinutes = '0' + minutes;
			} else {
				realMinutes = minutes.toString();
			}

			if (hours < 10) {
				realHours = '0' + hours;
			} else {
				realHours = hours.toString();
			}

			const displayTime = (realHours + ':' + realMinutes);
			return displayTime;
		}
	}

	getDateFormat(input) {
		if (input !== undefined) {
			const date = input.getDate();
			const month = Number(input.getMonth()) + 1;
			const year = input.getFullYear();

			let realDate = '';
			let realMonth = '';

			if (date < 10) {
			  realDate = '0' + date;
			} else {
			  realDate = date.toString();
			}

			if (month < 10) {
			  realMonth = '0' + month;
			} else {
			  realMonth = month.toString();
			}

			const displayDateTime = (realMonth + '/' + realDate + '/' + year);
			return displayDateTime;
		}
	}

	getDateTimeFormat(input) {
		if (input !== undefined) {
			const date = input.getDate();
			const month = Number(input.getMonth()) + 1;
			const year = input.getFullYear();
			const hours = input.getHours();
			const minutes = input.getMinutes();
			let realMinutes = '';
			let realHours = '';
			let realDate = '';
			let realMonth = '';

			if (minutes < 10) {
				realMinutes = '0' + minutes;
			} else {
				realMinutes = minutes.toString();
			}

			if (hours < 10) {
				realHours = '0' + hours;
			} else {
				realHours = hours.toString();
			}

			if (date < 10) {
			  realDate = '0' + date;
			} else {
			  realDate = date.toString();
			}

			if (month < 10) {
			  realMonth = '0' + month;
			} else {
			  realMonth = month.toString();
			}

			const displayDateTime = (realMonth + '/' + realDate + '/' + year + ' ' + realHours + ':' + realMinutes);
			return displayDateTime;
		}
	}

	async getInternetTime() {
		try {
			const response = await fetch('https://world-clock.p.rapidapi.com/json/utc/now', {
			'method': 'GET',
			'headers': {
				'x-rapidapi-key': '18dad37058mshe3cb65b5ca8c067p1a2f97jsn7be82498c7d1',
				'x-rapidapi-host': 'world-clock.p.rapidapi.com'
			}
		});

		const currentTime = await response.json();
		return currentTime;
		} catch (error) {
			console.error(error);
		}
	}

	async getAddress(lat, long) {
		const apiKey = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=' + this.googleAPIKey;

		try {
			const response = await fetch(apiKey, {
				'method': 'GET'
		});

		const address = await response.json();
		return address;
		} catch (error) {
			console.error(error);
		}
	}
}
