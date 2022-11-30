import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable, EMPTY } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ServiceMapping } from '../../../app/core/utils/service.mapping';

@Injectable({
	providedIn: 'root'
})

export class ChatbotService {
	constructor (private http: HttpClient) { }

	getNewSessionId(): Observable<any> {
		const url = environment.baseURL + ServiceMapping.WATSON_SESSION;
		return this.http.get(url);
	}

	userInput(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.WATSON_CHAT;
		return this.http.post(url, param);
	}

	tutorDone(): Observable<any> {
		const url = environment.baseURL + ServiceMapping.WATSON_TUTOR_DONE;
		return this.http.put(url, null);
	}

	sendReport(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.REPORT;
		const formData = new FormData();
		if (param.file !== '' && param.file !== null && param.file !== undefined) {
			formData.append('file', param.file, param.file.name);
		}
		formData.append('emails', param.emails);
		formData.append('description', param.description);
		formData.append('error', param.error);
		return this.http.post(url, formData);
	}

	getLocations(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.WATSON_GET_LOCATION;
		return this.http.post(url, param);
	}

}
