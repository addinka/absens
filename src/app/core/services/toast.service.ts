import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ToastService {

	constructor(private toastrService: ToastrService) { }

	success(message: string) {
		this.toastrService.success(message, 'Success');
	}

	error(message: string) {
		this.toastrService.error(message, 'Error');
	}
}
