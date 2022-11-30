import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable, EMPTY } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ServiceMapping } from '../../../app/core/utils/service.mapping';

@Injectable({
	providedIn: 'root'
})
export class HealthSafetyManagerService {

	constructor(private http: HttpClient) { }

	getHSCDashboard(): Observable<any> {
		const url = environment.baseURL + ServiceMapping.HSC;
		return this.http.get(url);
	}

	getHSCApprovalList(archived, entries, page, status): Observable<any> {
		if (archived === 'Archived') {
			const url = environment.baseURL + ServiceMapping.HSC_APPROVAL + '?entries=' + entries + '&page=' + page + '&status=' + status + '&archived=true';
			return this.http.get(url);
		} else if (archived === 'Today') {
			const url = environment.baseURL + ServiceMapping.HSC_APPROVAL  + '?entries=' + entries + '&page=' + page + '&status=' + status;
			return this.http.get(url);
		}
	}

	getItemRequestDetailById(id): Observable<any> {
		const url = environment.baseURL + ServiceMapping.ITEM_REQUEST_DETAIL + '/' + id;
		return this.http.get(url);
	}

	approveItemRequestDetailById(param): Observable<any> {
		const url = environment.baseURL + ServiceMapping.ITEM_APPROVE;
		return this.http.put(url, param);
	}

	rejectItemRequestDetailById(param): Observable<any> {
		const url = environment.baseURL + ServiceMapping.ITEM_REJECT;
		return this.http.put(url, param);
	}

	revokeRequestItemDetailById(param): Observable<any> {
		const url = environment.baseURL + ServiceMapping.ITEM_REVOKE;
		return this.http.put(url, param);
	}

	viewItemsStock(): Observable<any> {
		const url = environment.baseURL + ServiceMapping.ITEM_STOCK;
		return this.http.get(url);
	}

	updateItemsStock(param): Observable<any> {
		const url = environment.baseURL + ServiceMapping.ITEM_STOCK;
		return this.http.put(url, param);
	}
}
