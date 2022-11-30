import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import { ManagerService } from '../../core/services/manager.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-vaccine-approval',
	templateUrl: './vaccine-approval.component.html',
	styleUrls: ['./vaccine-approval.component.scss']
})
export class VaccineApprovalComponent implements OnInit {
	public managerList: any;
	public totalEmployee: any;
	public vaccinationCertificate: File;

	constructor(
		private employeeService: EmployeeService,
		private managerService: ManagerService,
		public toastr: ToastrService
	) { }

	ngOnInit() {
		this.managerService.getSubordinatesVaccinationStatus().subscribe(
			response => {
				console.log('Manager Response', response);
				this.managerList = response;
				this.totalEmployee = response.vaccineStatus.none + response.vaccineStatus.pending + response.vaccineStatus.verified;
			},
			error => {
				console.log(error);
		});
	}

	verifyVaccinationCertificate(id) {
		this.managerService.verifySubordinateVaccineCert(id).subscribe(
			response => {
				console.log('Manager Response', response);
				location.reload();
			},
			error => {
				console.log(error);
		});
	}

	downloadCertificate(id) {
		this.employeeService.getVaccinationCertificateByID(id).subscribe(
			response => {
				this.vaccinationCertificate = this.blobToFile(response, 'Vaccination Certificate');
				this.openVaccinationCertificate();
			},
			error => {
				console.log(error);
		});

		this.openVaccinationCertificate();
	}

	public blobToFile = (theBlob: Blob, fileName: string): File => {
		const b: any = theBlob;
		// A Blob() is almost a File() - it's just missing the two properties below which we will add
		console.log(b);
		b.lastModifiedDate = new Date();
		b.name = fileName;

		// Cast to a File() type
		return theBlob as File;
	}

	openVaccinationCertificate() {
		const url = window.URL.createObjectURL(this.vaccinationCertificate);
		window.open(url, '_blank');
	}
}
