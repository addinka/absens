import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'carbon-components-angular';
import { EmployeeService } from '../../app/core/services/employee.service';
import { FunService } from '../../app/core/services/fun.service';
import { LogoutModalComponent } from '../logout-modal/logout-modal/logout-modal.component';

@Component({
	selector: 'app-headers',
	templateUrl: './headers.component.html',
	styleUrls: ['./headers.component.scss']
})

export class HeadersComponent implements OnInit {

	userTypes: any[] = [false, false, false, false];
	href = '';
	notifications = [];
	unreadNotifExists = false;
	isDisabled = false;

	constructor(
		public router: Router,
		public modalService: ModalService,
		public activatedRoute: ActivatedRoute,
		public employeeService: EmployeeService,
		private funService: FunService,
	) { }

	ngOnInit() {

		this.activatedRoute.queryParams.subscribe(params => {
			const token = params.token;

			if (token !== undefined) {
				const decodedToken = this.funService.getDecodedAccessToken(token);
				localStorage.setItem('token', token);
				localStorage.setItem('exp', decodedToken.exp);
			}

			this.userTypes = [false, false, false, false];
			this.employeeService.getUserDashboard()
				.subscribe(
					response => {
						console.log(response);
						if (response.isSC === 'Y') {
							this.userTypes[0] = true;
						}
						if (response.isHSC === 'Y') {
							this.userTypes[1] = true;
						}
						if (response.isManager === 'Y') {
							this.userTypes[2] = true;
						}
						if (response.isEventAdmin === 'Y') {
							this.userTypes[3] = true;
						}
					},
					error => {
						console.log(error);
					}
				);

			const userType = localStorage.getItem('userType');
			if (userType === '' || userType === null || userType === undefined) {
				localStorage.setItem('userType', 'user');
			}

			this.getAllNotifs();
		});
	}

	openModal() {
		this.modalService.create({
			component: LogoutModalComponent,
			inputs: {}
		});
	}

	changeUser(userType) {
		localStorage.setItem('userType', userType);
		this.employeeService.changeTypeEmitter().emit();
		this.href = this.router.url;
		if (this.href !== '/dashboard') {
			this.router.navigate(['/dashboard'], {
				queryParams: {
					userType: userType,
				}
			});
		}
	}

	getAllNotifs() {
		this.notifications = [];
		this.unreadNotifExists = false;
		const userType = localStorage.getItem('userType');
		this.employeeService.getNotifications()
			.subscribe(
				response => {
					if (response !== null) {
						for (let i = 0; i < response.length; i++) {
							if (userType === response[i].role) {
								const notif = response[i];
								if (response[i].read === 'N') {
									this.unreadNotifExists = true;
								}
								this.notifications.push(notif);
							}
						}
					}
				}
			);
	}

	navigateViaNotif(refID, message) {
		const userType = localStorage.getItem('userType');
		const subStr = message.split(' ');
		console.log(subStr[1]);

		if (userType === 'user' && subStr[1] === 'overtime') {
			this.router.navigate(['/detail-request-overtime'], {
				queryParams: {
					id: refID,
					type: 'overtime'
				}
			}).then(() => {
				window.location.reload();
			});
		} else if (userType === 'user' && subStr[1] === 'work') {
			this.router.navigate(['/detail-request-overtime'], {
				queryParams: {
					id: refID,
					type: 'work'
				}
			}).then(() => {
				window.location.reload();
			});
		} else if (userType === 'user' && subStr[1] === 'leave') {
			this.router.navigate(['/detail-request-leave'], {
				queryParams: {
					id: refID,
					type: 'leave'
				}
			}).then(() => {
				window.location.reload();
			});
		} else if (userType === 'user' && (subStr[1] === 'shifting' || subStr[1] === 'shift') ) {
			this.router.navigate(['/detail-request-shift-approve'], {
				queryParams: {
					id: refID,
					type: 'user'
				}
			}).then(() => {
				window.location.reload();
			});
		} else if (userType !== 'user' && subStr[1] === 'overtime') {
			this.router.navigate(['/detail-request-overtime-approve'], {
				queryParams: {
					id: refID,
					type: 'overtime'
				}
			}).then(() => {
				window.location.reload();
			});
		} else if (userType !== 'user' && subStr[1] === 'work') {
			this.router.navigate(['/detail-request-overtime-approve'], {
				queryParams: {
					id: refID,
					type: 'work'
				}
			}).then(() => {
				window.location.reload();
			});
		} else if (userType !== 'user' && (subStr[0] === 'Leave' || subStr[1] === 'leave')) {
			this.router.navigate(['/detail-request-leave'], {
				queryParams: {
					id: refID,
					type: 'leave-approval'
				}
			}).then(() => {
				window.location.reload();
			});
		} else if (userType !== 'user' && (subStr[1] === 'shift' || subStr[0] === 'shifting')) {
			this.router.navigate(['/detail-request-shift-approve'], {
				queryParams: {
					id: refID,
					type: 'manager'
				}
			}).then(() => {
				window.location.reload();
			});
		} else if (userType === 'user' && subStr[1] !== 'travel') {
			this.router.navigate(['/detail-request-item'], {
				queryParams: {
					id: refID,
				}
			}).then(() => {
				window.location.reload();
			});
		} else if (userType === 'user' && subStr[1] === 'travel') {
			this.router.navigate(['/detail-request'], {
				queryParams: {
					id: refID,
				}
			}).then(() => {
				window.location.reload();
			});
		} else if (userType !== 'user' && subStr[1] !== 'travel') {
			this.router.navigate(['/detail-request-item-approve'], {
				queryParams: {
					id: refID,
				}
			}).then(() => {
				window.location.reload();
			});
		} else if (userType !== 'user' && subStr[1] === 'travel') {
			this.router.navigate(['/detail-request-approve'], {
				queryParams: {
					id: refID,
				}
			}).then(() => {
				window.location.reload();
			});
		}
	}

	flagNotif(event, _id, i) {
		event.stopPropagation();
		event.preventDefault();
		this.unreadNotifExists = false;
		if (this.notifications[i].read === 'Y') {
			this.notifications[i].read = 'N';
			this.unreadNotifExists = true;
		} else {
			this.notifications[i].read = 'Y';
			for (let j = 0; j < this.notifications.length; j++) {
				if (this.notifications[j].read === 'N') {
					this.unreadNotifExists = true;
				}
			}
		}
		this.employeeService.toggleReadNotifications(_id)
			.subscribe(
				response => {
					console.log(response);
				}
			);
	}

	deleteNotif(event, _id, i) {
		event.stopPropagation();
		event.preventDefault();
		this.notifications.splice(i, 1);
		this.employeeService.deleteNotificationById(_id)
			.subscribe(
				response => {
					console.log(response);
				}
			);
	}

	deleteAllNotifs(event) {
		event.stopPropagation();
		event.preventDefault();
		const userType = localStorage.getItem('userType');
		this.notifications = [];
		this.employeeService.deleteAllNotifications(userType)
			.subscribe(
				response => {
					console.log(response);
				}
			);
	}

	goToDashboard() {
		if (this.router.url.match(/login/gi) || this.router.url.match(/daily-checkup/gi)) {
			this.isDisabled = true;
		}

		if (this.isDisabled === false) {
			this.router.navigate(['/dashboard']);
		}
	}
}
