import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
	HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constant } from '../utils/constant';
import { ToastService } from '../services/toast.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
currentDate = (new Date().getDate()).toString();
		constructor( private router: Router, private toastService: ToastService ) { }

		intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

				// tslint:disable-next-line:new-parens
				const milliseconds = Math.floor((new Date).getTime() / 1000);
				const token = localStorage.getItem(Constant.KEY_TOKEN);
				const exp = Number(localStorage.getItem(Constant.KEY_EXP));

				// Token Expiry Check

				if (token) {
					if (localStorage.getItem('date') === null) {
							localStorage.setItem('date', this.currentDate);
					}
					if (localStorage.getItem('date') === this.currentDate) {
						if (req.url.search('watson') !== -1 && req.url.search('tutor') === -1) {
							req = req.clone({
								headers: req.headers.set('Authorization', 'Basic YXBpa2V5OlRxNUlycTVld0VUTXZ1RHdFTi0xMXphaTJHemZfMFJ4cmdKdlozeWhEZ21F') });

							return next.handle(req).pipe(
								tap((event: HttpEvent<any>) => {
										if (event instanceof HttpResponse) {

										}
								}, (err: any) => {

								}));
						} else {
							if (milliseconds < exp) {
								req = req.clone({
									headers: req.headers.set('Authorization', 'Bearer ' + token) });

								return next.handle(req).pipe(
									tap((event: HttpEvent<any>) => {
										if (event instanceof HttpResponse) {

										}
									}, (err: any) => {

									}));
							} else {
								this.router.navigate(['/login']);
								localStorage.clear();
								sessionStorage.clear();
								this.toastService.error('Session has been expired');
							}
						}
					} else {
						this.router.navigate(['/login']);
						localStorage.clear();
						sessionStorage.clear();
					}
				} else {
					this.router.navigate(['/login']);
				}
		}
}
