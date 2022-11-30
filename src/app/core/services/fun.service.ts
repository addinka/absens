import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
	providedIn: 'root'
})
export class FunService {
	getDecodedAccessToken(token: string): any {
		try {
			return jwt_decode(token);
			// tslint:disable-next-line:variable-name
		} catch (Error) {
			return null;
		}
	}
}
