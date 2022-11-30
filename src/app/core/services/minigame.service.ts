import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable, EMPTY } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ServiceMapping } from '../../../app/core/utils/service.mapping';

@Injectable({
	providedIn: 'root'
})

export class MinigameService {
	constructor (private http: HttpClient) { }

	submitScore(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.SUBMIT_SCORE;
		return this.http.post(url, param);
	}

	getLeaderboard(minigameID: any, stageID?: any): Observable<any> {
		let url;
		if (stageID != "" && stageID != null && stageID != undefined) {
			url = environment.baseURL + ServiceMapping.LEADERBOARD + '?minigame-id=' + minigameID + '&stage-id=' + stageID;
		} else {
			url = environment.baseURL + ServiceMapping.LEADERBOARD + '?minigame-id=' + minigameID;
		}
		return this.http.get(url);
	}

}
