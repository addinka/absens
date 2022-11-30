import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable, EMPTY } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ServiceMapping } from '../../../app/core/utils/service.mapping';

@Injectable({
	providedIn: 'root'
})

export class SiteManagerService {

	constructor(private http: HttpClient) { }

	getSiteCoordinatorApprovalList(archived, entries, page, status): Observable<any> {
		if (archived === 'Archived') {
			const url = environment.baseURL + ServiceMapping.SC_APPROVAL + '?entries=' + entries + '&page=' + page + '&status=' + status + '&archived=true';
			return this.http.get(url);
		} else if (archived === 'Today') {
			const url = environment.baseURL + ServiceMapping.SC_APPROVAL + '?entries=' + entries + '&page=' + page + '&status=' + status;
			return this.http.get(url);
		}
	}

	updateSiteStatus(param): Observable<any> {
		const url = environment.baseURL + ServiceMapping.SC + '/destination';
		return this.http.put(url, param);
	}

	seatingAvailability(tomorrow?): Observable<any> {
		let url = environment.baseURL + ServiceMapping.SC_SEAT;
		if (tomorrow === 'true') {
			url = environment.baseURL + ServiceMapping.SC_SEAT + '?tomorrow=' + tomorrow;
		}
		return this.http.get(url);
	}

	manageSeating(param): Observable<any> {
		const url = environment.baseURL + ServiceMapping.SC_SEAT;
		return this.http.put(url, param);
	}
}

