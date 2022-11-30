import { Component, Injector } from '@angular/core';
import { BaseModal } from 'carbon-components-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChatbotService } from '../../core/services/chatbot.service';
@Component({
	selector: 'app-log-modal',
	templateUrl: './log-modal.component.html',
	styleUrls: ['./log-modal.component.scss']
})
export class LogModalComponent extends BaseModal {
	lastUserInput: string;
	logMessage: string;
	feedback: string;
	devEmail = 'melvin@ibm-jti.com';
	files = new Set();
	file: any;
	constructor(
		protected injector: Injector,
		private router: Router,
		public toastr: ToastrService,
		public chatbotService: ChatbotService
	) {
		super();
		this.logMessage = this.injector.get('logMessage');
		this.lastUserInput = this.injector.get('lastUserInput');
	}

	showSuccess(msg) {
		this.toastr.success(msg);
	}

	showError(errorMessage) {
		this.toastr.error(errorMessage);
	}

	sendLog() {
		const devEmails = [];
		devEmails.push(this.devEmail);

		// Email Oscar
		devEmails.push('faction_ceyah@live.com');

		// Email Kevin
		devEmails.push('chrisayrton@icloud.com');

		if (this.files !== undefined && this.files !== null) {
			const it = this.files.values();
			if (it.next().value === undefined) {
				this.file = '';
			} else {
				this.file = it.next().value;
			}
		} else {
			this.file = '';
		}

		this.chatbotService.sendReport(
			{
				'file': this.file.file,
				'emails': devEmails,
				'description': this.feedback,
				'error': this.logMessage
			}
		)
		.subscribe(
			response => {
				console.log(response);
				this.showSuccess('Thanks for your feedback');
			},
			error => {
				console.log(error);
				this.showError(error.error);
		});
	}

	navigate() {
		const userType = localStorage.getItem('userType');
		this.router.navigate(['/dashboard'], {
			queryParams: {
				userType : userType,
			}
		});
	}

}
