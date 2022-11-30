import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	value = '';
	isLogin = false;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		) { }


	ngOnInit() {
		const milliseconds = Math.floor((new Date).getTime() / 1000);
		const token = localStorage.getItem('token');
		const exp = Number(localStorage.getItem('exp'));
		console.log(token);
		if (token !== null && exp > milliseconds) {
			this.router.navigate(['/dashboard']);
		} else {
			this.isLogin = true;
		}
	}

	update(value: string) {
		this.value = value;
		console.log(this.value);
	}

	onLogin(email: string) {
		/* const res = value.split('@')[1];
		console.log(res);
		if (res === 'ibm-jti.com') {
			window.location.href = environment.ssoJTI;
		} else {
			if (res.includes('ibm')) {
				window.location.href = environment.ssoIBM;
			} else {
				this.router.navigate(['/login']);
			}
		} */

		if (email === 'jti') {
			window.location.href = environment.ssoJTI;
		} else {
			if (email === 'ibm') {
				window.location.href = environment.ssoIBM;
			} else {
				this.router.navigate(['/login']);
			}
		}
	}
}
