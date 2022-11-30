import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable, EMPTY } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ServiceMapping } from '../../../app/core/utils/service.mapping';

@Injectable({
	providedIn: 'root'
})
export class ManagerService {

	private managerDashboardEmitter: EventEmitter<any> = new EventEmitter();

	constructor(private http: HttpClient) { }

	managerEmitter() {
		return this.managerDashboardEmitter;
	}

	getManagerDashboard(): Observable<any> {
		const url = environment.baseURL + ServiceMapping.MANAGER;
		return this.http.get(url);
	}

	getSiteCoordinatorDashboard(): Observable<any> {
		const url = environment.baseURL + ServiceMapping.SC;
		return this.http.get(url);
	}

	getManagerApprovalList(archived, entries, page, status): Observable<any> {
		if (archived === 'Archived') {
			const url = environment.baseURL + ServiceMapping.MANAGER_APPROVAL + '?entries=' + entries + '&page=' + page + '&status=' + status + '&archived=true';
			return this.http.get(url);
		} else if (archived === 'Today') {
			const url = environment.baseURL + ServiceMapping.MANAGER_APPROVAL + '?entries=' + entries + '&page=' + page + '&status=' + status;
			return this.http.get(url);
		}
	}

	getManagerOvertimeList(archived, entries, page, status): Observable<any> {
		if (archived === 'Archived') {
			const url = environment.baseURL + ServiceMapping.MANAGER_OVERTIME + '?entries=' + entries + '&page=' + page + '&status=' + status + '&archived=true';
			return this.http.get(url);
		} else if (archived === 'Today') {
			const url = environment.baseURL + ServiceMapping.MANAGER_OVERTIME + '?entries=' + entries + '&page=' + page + '&status=' + status;
			return this.http.get(url);
		}
	}

	getManagerAssignmentList(archived, entries, page, status): Observable<any> {
		if (archived === 'Archived') {
			const url = environment.baseURL + ServiceMapping.MANAGER_ASSIGNMENT + '?entries=' + entries + '&page=' + page + '&status=' + status + '&archived=true';
			return this.http.get(url);
		} else if (archived === 'Today') {
			const url = environment.baseURL + ServiceMapping.MANAGER_ASSIGNMENT + '?entries=' + entries + '&page=' + page + '&status=' + status;
			return this.http.get(url);
		}
	}

	getManagerShiftList(archived, entries, page, status): Observable<any> {
		if (archived === 'Archived') {
			const url = environment.baseURL + ServiceMapping.MANAGER_SHIFTS + '?entries=' + entries + '&page=' + page + '&status=' + status + '&archived=true';
			return this.http.get(url);
		} else if (archived === 'Today') {
			const url = environment.baseURL + ServiceMapping.MANAGER_SHIFTS + '?entries=' + entries + '&page=' + page + '&status=' + status;
			return this.http.get(url);
		}
	}

	getManagerLeaveList(archived, entries, page, status): Observable<any> {
		if (archived === 'Archived') {
			const url = environment.baseURL + ServiceMapping.MANAGER_LEAVES + '?entries=' + entries + '&page=' + page + '&status=' + status + '&archived=true';
			return this.http.get(url);
		} else if (archived === 'Today') {
			const url = environment.baseURL + ServiceMapping.MANAGER_LEAVES + '?entries=' + entries + '&page=' + page + '&status=' + status;
			return this.http.get(url);
		}
	}

	getRequestDetailById(id): Observable<any> {
		const url = environment.baseURL + ServiceMapping.TRAVEL_REQUEST_DETAIL + '/' + id;
		return this.http.get(url);
	}

	getOvertimeDetailById(id): Observable<any> {
		const url = environment.baseURL + ServiceMapping.OVERTIME_REQUEST_DETAIL + '/' + id;
		return this.http.get(url);
	}

	getAssignmentDetailById(id): Observable<any> {
		const url = environment.baseURL + ServiceMapping.ASSIGNMENT_REQUEST_DETAIL + '/' + id;
		return this.http.get(url);
	}

	getShiftDetailById(id): Observable<any> {
		const url = environment.baseURL + 'shifting/shift/' + id;
		return this.http.get(url);
	}

	getShiftRequestDetailById(id): Observable<any> {
		const url = environment.baseURL + ServiceMapping.SHIFTING_REQUEST_DETAIL + '/' + id;
		return this.http.get(url);
	}

	getLeaveRequestDetailById(id): Observable<any> {
		const url = environment.baseURL + ServiceMapping.LEAVE_REQUEST + '/' + id;
		return this.http.get(url);
	}

	approveRequestDetailById(param): Observable<any> {
		const url = environment.baseURL + ServiceMapping.TRAVEL_APPROVE;

		return this.http.put(url, param);
	}

	approveOvertimeRequestDetailById(param): Observable<any> {
		const url = environment.baseURL + ServiceMapping.OVERTIME_APPROVE;

		return this.http.put(url, param);
	}

	approveAssignmentRequestDetailById(param): Observable<any> {
		const url = environment.baseURL + ServiceMapping.ASSIGNMENT_APPROVE;

		return this.http.put(url, param);
	}

	approveShiftRequestDetailById(param): Observable<any> {
		const url = environment.baseURL + ServiceMapping.SHIFTING_MANAGER_APPROVE;

		return this.http.put(url, param);
	}

	approveLeaveRequestDetailById(param): Observable<any> {
		const url = environment.baseURL + ServiceMapping.LEAVE_APPROVE;

		return this.http.put(url, param);
	}

	rejectRequestDetailById(param): Observable<any> {
		const url = environment.baseURL + ServiceMapping.TRAVEL_REJECT;

		return this.http.put(url, param);
	}

	rejectOvertimeRequestDetailById(param): Observable<any> {
		const url = environment.baseURL + ServiceMapping.OVERTIME_REJECT;

		return this.http.put(url, param);
	}

	rejectAssignmentRequestDetailById(param): Observable<any> {
		const url = environment.baseURL + ServiceMapping.ASSIGNMENT_REJECT;

		return this.http.put(url, param);
	}

	rejectShiftRequestDetailById(param): Observable<any> {
		const url = environment.baseURL + ServiceMapping.SHIFTING_MANAGER_REJECT;

		return this.http.put(url, param);
	}

	rejectLeaveRequestDetailById(param): Observable<any> {
		const url = environment.baseURL + ServiceMapping.LEAVE_REJECT;

		return this.http.put(url, param);
	}

	cancelOvertime(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.OVERTIME_CANCEL;

		return this.http.put(url, param);
	}

	cancelAssignment(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.ASSIGNMENT_CANCEL;

		return this.http.put(url, param);
	}

	cancelShift(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.SHIFTING_CANCEL;

		return this.http.put(url, param);
	}

	cancelLeave(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.LEAVE_CANCEL;

		return this.http.put(url, param);
	}

	assignShift(param): Observable<any> {
		const url = environment.baseURL + '/shifting/manager/assign';
		return this.http.post(url, param);
	}

	createShift(param): Observable<any> {
		const url = environment.baseURL + '/shifting/shift';
		return this.http.post(url, param);
	}

	updateShift(id: any, param: any): Observable<any> {
		const url = environment.baseURL + 'shifting/shift/' + id;

		return this.http.put(url, param);
	}

	deleteShift(id): Observable<any> {
		const url = environment.baseURL + 'shifting/shift/' + id;

		return this.http.delete(url);
	}

	getAllShiftName(param): Observable<any> {
		const url = environment.baseURL + '/shifting/shift/namashift';
		return this.http.post(url, param);
	}

	getAllEmployees(param): Observable<any> {
		const url = environment.baseURL + '/manager/employees';
		return this.http.post(url, param);
	}

	getAssignmentHistory(param): Observable<any> {
		const url = environment.baseURL + '/manager/assignedshifts';
		return this.http.post(url, param);
	}

	revokeRequestDetailById(param): Observable<any> {
		const url = environment.baseURL + ServiceMapping.TRAVEL_REVOKE;

		return this.http.put(url, param);
	}

	getVaccinationCertificateByID(id): Observable<Blob> {
		const url = environment.baseURL + ServiceMapping.USERS + '/vaccine-cert/' + id;
		return this.http.get(url, { responseType: 'blob' });
	}

	downloadShiftExcel(): Observable<Blob> {
		const url = environment.baseURL + ServiceMapping.SHIFTING_DOWNLOADEXCELSHIFT;
		return this.http.get(url, { responseType: 'blob' as 'blob' });
	}

	postUserDataExcelFile(data: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.SHIFTING_UPLOAD;

		const payload = new FormData();

		if (data !== undefined) {
			payload.append('file', data);
		}

		return this.http.post(url, payload);
	}

	downloadUploadedExcel(id): Observable<Blob> {
		const url = environment.baseURL + ServiceMapping.SHIFTING_EXCEL + '/' + id;

		return this.http.get(url, { responseType: 'blob' as 'blob' });
	}

	approveExcelUpload(param): Observable<any> {
		const url = environment.baseURL + ServiceMapping.SHIFTING_UPLOAD_APPROVE;

		return this.http.put(url, param);
	}

	rejectExcelUpload(param): Observable<any> {
		const url = environment.baseURL + ServiceMapping.SHIFTING_UPLOAD_REJECT;

		return this.http.put(url, param);
	}

	getUploadRequestById(id): Observable<any> {
		const url = environment.baseURL + ServiceMapping.SHIFTING_UPLOAD + '/' + id;

		return this.http.get(url);
	}

	getManagerUploadRequests(archived, entries, page, status): Observable<any> {
		if (archived === 'Archived') {
			const url = environment.baseURL + ServiceMapping.MANAGER_UPLOAD + '?entries=' + entries + '&page=' + page + '&status=' + status + '&archived=true';
			return this.http.get(url);
		} else if (archived === 'Today') {
			const url = environment.baseURL + ServiceMapping.MANAGER_UPLOAD + '?entries=' + entries + '&page=' + page + '&status=' + status;
			return this.http.get(url);
		}
	}

	getSubordinatesVaccinationStatus(): Observable<any> {
		const url = environment.baseURL + ServiceMapping.MANAGER + '/vaccines';
		return this.http.get(url);
	}

	verifySubordinateVaccineCert(id): Observable<any> {
		const url = environment.baseURL + ServiceMapping.MANAGER + '/verify-vaccine/' + id;
		return this.http.get(url);
	}
}
