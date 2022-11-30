import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable, EMPTY } from 'rxjs';
import { environment, environmentSurvey } from '../../../environments/environment';
import { ServiceMapping } from '../../../app/core/utils/service.mapping';

@Injectable({
	providedIn: 'root'
})

export class EmployeeService {
	private userTypeEmitter: EventEmitter<any> = new EventEmitter();

	private enableHeaderEmitter: EventEmitter<any> = new EventEmitter();

	private disableHeaderEmitter: EventEmitter<any> = new EventEmitter();


	constructor (private http: HttpClient) { }

	setDailyStatus(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.DAILY_STATUS;
		return this.http.post(url, param);
	}

	getEmployeeData(): Observable<any> {
		const url = environment.baseURL + ServiceMapping.USERS;
		return this.http.get(url);
	}

	updateEmployeeData(param: any ): Observable<any> {
		const url = environment.baseURL + ServiceMapping.USERS;
		return this.http.put(url, param);
	}

	changeTypeEmitter() {
		return this.userTypeEmitter;
	}

	headerStatusEmitter() {
		return this.enableHeaderEmitter;
	}

	headerStatusTrueEmitter() {
		return this.disableHeaderEmitter;
	}

	getUserDashboard(): Observable<any> {
		const url = environment.baseURL + ServiceMapping.USERS;
		return this.http.get(url);
	}

	createTravelRequest(param: any ): Observable<any> {
		const url = environment.baseURL + ServiceMapping.TRAVEL_REQUEST;
		return this.http.post(url, param);
	}

	searchDistrict(district?: string): Observable<any> {
		const url = environment.baseURL + ServiceMapping.LOCATION + '?location=' + district;

		return this.http.get(url);
	}

	searchDestination(destination?: string, filter?: string): Observable<any> {
		let url;
		if (filter) {
			url = environment.baseURL + ServiceMapping.DESTINATION + '?destination=' + destination + '&filter=' + filter;
		} else {
			url = environment.baseURL + ServiceMapping.DESTINATION + '?destination=' + destination;
		}

		return this.http.get(url);
	}

	requestItems(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.ITEMS + '/request';

		return this.http.post(url, param);
	}

	requestOvertime(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.OVERTIME + '/request';

		return this.http.post(url, param);
	}

	requestAssignment(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.ASSIGNMENT + '/request';

		return this.http.post(url, param);
	}

	checkIn(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.TRAVEL_CHECK_IN;

		return this.http.put(url, param);
	}

	checkOut(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.TRAVEL_CHECK_OUT;

		return this.http.put(url, param);
	}

	checkOutOvertime(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.OVERTIME_CHECK_OUT;

		return this.http.put(url, param);
	}

	checkOutAssignment(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.ASSIGNMENT_CHECK_OUT;

		return this.http.put(url, param);
	}

	claimItem(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.ITEM_RECEIVED;

		return this.http.put(url, param);
	}

	cancelItem(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.ITEM_CANCEL;

		return this.http.put(url, param);
	}

	cancelTravel(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.TRAVEL_CANCEL;

		return this.http.put(url, param);
	}

	getRequestDetail(id: string): Observable<any> {
		const url = environment.baseURL + ServiceMapping.TRAVEL_REQUEST_DETAIL + '/' + id;
		return this.http.get(url);
	}

	getItemRequestDetail(id: string): Observable<any> {
		const url = environment.baseURL + ServiceMapping.ITEM_REQUEST_DETAIL + '/' + id;
		return this.http.get(url);
	}

	getRequestHistory(entries, page): Observable<any> {
		const url = environment.baseURL + ServiceMapping.USERS_REQUEST_HISTORY + '?entries=' + entries + '&page=' + page;
		return this.http.get(url);
	}

	getPositionHistory(year, month): Observable<any> {
		const url = environment.baseURL + ServiceMapping.USERS_POSITION_HISTORY + '?year=' + year + '&month=' + month;
		return this.http.get(url);
	}

	getStatusSummary(year, month): Observable<any> {
		const url = environment.baseURL + ServiceMapping.USERS_STATUS_HISTORY + '?month=' + month + '&year=' + year;
		return this.http.get(url);
	}

	getOvertimeSummary(entries, page, year, month): Observable<any> {
		const url = environment.baseURL + ServiceMapping.ED_OVERTIME_SUMMARY + '?entries=' + entries + '&page=' + page + '&year=' + year + '&month=' + month;
		return this.http.get(url);
	}

	getConvertedOvertimeSummary(entries, page, year, month): Observable<any> {
		const url = environment.baseURL +
			ServiceMapping.ED_CONVERTED_OVERTIME_SUMMARY + '?entries=' + entries + '&page=' + page + '&year=' + year + '&month=' + month;
		return this.http.get(url);
	}

	getWorkAssignmentSummary(entries, page, year, month): Observable<any> {
		const url = environment.baseURL + ServiceMapping.ED_ASSIGNMENT_SUMMARY + '?entries=' + entries + '&page=' + page + '&year=' + year + '&month=' + month;
		return this.http.get(url);
	}

	getConvertedWorkAssignmentSummary(entries, page, year, month): Observable<any> {
		const url = environment.baseURL +
			ServiceMapping.ED_CONVERTED_ASSIGNMENT_SUMMARY + '?entries=' + entries + '&page=' + page + '&year=' + year + '&month=' + month;
		return this.http.get(url);
	}

	getLeaveHistory(year, month): Observable<any> {
		const url = environment.baseURL + ServiceMapping.LEAVE_HISTORY + '?month=' + month + '&year=' + year;
		return this.http.get(url);
	}

	// Start of notification related functions //
	getNotifications(): Observable<any> {
		const url = environment.baseURL + ServiceMapping.NOTIF;
		return this.http.get(url);
	}

	deleteAllNotifications(role: string): Observable<any> {
		const url = environment.baseURL + ServiceMapping.NOTIF + '?role=' + role;
		return this.http.delete(url);
	}

	toggleReadNotifications(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.NOTIF + '/' + param;
		return this.http.put(url, '');
	}

	deleteNotificationById(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.NOTIF + '/' + param;
		return this.http.delete(url);
	}
	// End of notification related functions //

	getOTP(): Observable<any> {
		const url = environment.baseURL + ServiceMapping.GET_OTP;

		return this.http.get(url);
	}

	getReservationDetail(): Observable<any> {
		const url = environment.baseURL + ServiceMapping.RESERVATION_DETAIL;

		return this.http.get(url);
	}

	releaseReservation(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.RELEASE_RESERVATION;

		return this.http.post(url, param);
	}

	getDocument(params): Observable<Blob> {
		const url = environment.baseURL + ServiceMapping.GET_LETTER;

		const httpOptions = {
			responseType: 'blob' as 'blob',
			params: params
		};

		return this.http.get(url, httpOptions);
	}

	getPlazaAccess(): Observable<Blob> {
		const url = environment.baseURL + ServiceMapping.GET_PLAZA_ACCESS;

		const httpOptions = {
			responseType: 'blob' as 'blob',
		};

		 return this.http.get(url, httpOptions);
	}

	getRiskCalculation(param: any): Observable<any> {
		const url = 'https://now.ibm-jti.com/covid-calculator-dev/api/v1/train';

		return this.http.post(url, param);
	}

	getOvertimeCount(): Observable<any> {
		const url = environment.baseURL + ServiceMapping.OVERTIME + '/count';
		return this.http.get(url);
	}

	getAssignmentCount(): Observable<any> {
		const url = environment.baseURL + ServiceMapping.ASSIGNMENT + '/count';
		return this.http.get(url);
	}

	getVaccinationSurveyData(): Observable<any> {
		const url = environmentSurvey.baseURL;
		return this.http.get(url);
	}

	getIndividualVaccinationData(param: any): Observable<any> {
		const url = environmentSurvey.response + '/vaccine_survey/' + param;
		return this.http.get(url, param);
	}

	getAllVaccinationData(): Observable<any> {
		const url = environmentSurvey.response + '/vaccine_survey/me';
		return this.http.get(url);
	}

	submitVaccinationSurvey(param: any): Observable<any> {
		const url = environmentSurvey.response;

		return this.http.post(url, param);
	}

	editReservation(id: any, param: any): Observable<any> {
		const url = environmentSurvey.response + '/vaccine_survey/' + id;

		return this.http.put(url, param);
	}

	deleteReservation(id): Observable<any> {
		const url = environmentSurvey.response + '/vaccine_survey/' + id;

		return this.http.delete(url);
	}

	getMyShift(): Observable<any> {
		const url = environment.baseURL + ServiceMapping.SHIFTING + '/employee';
		return this.http.get(url);
	}

	getEmployeeShift(id): Observable<any> {
		const url = environment.baseURL + ServiceMapping.SHIFTING + '/all';
		return this.http.post(url, id);
	}

	submitShiftSwitchRequest(param): Observable<any> {
		const url = environment.baseURL + '/shifting/request';
		return this.http.post(url, param);
	}

	acceptShift(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.SHIFTING_SUB + '/accept';

		return this.http.put(url, param);
	}

	rejectShift(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.SHIFTING_SUB + '/reject';

		return this.http.put(url, param);
	}

	approveEmployeeShift(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.SHIFTING_EMPLOYEE + '/approve';

		return this.http.put(url, param);
	}

	rejectEmployeeShift(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.SHIFTING_EMPLOYEE + '/reject';

		return this.http.put(url, param);
	}

	uploadVaccinationCertificate(file: any) {
		const url = environment.baseURL + ServiceMapping.USERS + '/vaccine-cert';
		const payload = new FormData();

		if (file.file !== undefined) {
			payload.append('file', file.file);
		}

		return this.http.post(url, payload);
	}

	getVaccinationCertificate(): Observable<Blob> {
		const url = environment.baseURL + ServiceMapping.USERS + '/vaccine-cert';
		return this.http.get(url, { responseType: 'blob' });
	}

	getVaccinationCertificateByID(id): Observable<Blob> {
		const url = environment.baseURL + ServiceMapping.USERS + '/vaccine-cert/' + id;

		return this.http.get(url, { responseType: 'blob' as 'blob' });
	}

	getLeaveTypes(): Observable<any> {
		const url = environment.baseURL + ServiceMapping.LEAVE_TYPE;
		return this.http.get(url);
	}

	createLeaveRequest(param: any ): Observable<any> {
		const url = environment.baseURL + ServiceMapping.LEAVE_REQUEST;
		return this.http.post(url, param);
	}

	cancelLeaveRequest(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.LEAVE_CANCEL;

		return this.http.put(url, param);
	}

	getAnnualLeave(): Observable<any> {
		const url = environment.baseURL + ServiceMapping.LEAVE_ANNUAL;
		return this.http.get(url);
	}

	getDayoffs(): Observable<any> {
		const url = environment.baseURL + ServiceMapping.LEAVE_DAYOFF;
		return this.http.get(url);
	}

	generateEndDate(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.LEAVE_END_DATE;

		return this.http.post(url, param);
	}

	getAllBanners(): Observable<any> {
		const url = environment.baseURL + ServiceMapping.CAROUSEL_ALL;
		return this.http.get(url);
	}

	getRecentBanners(): Observable<any> {
		const url = environment.baseURL + ServiceMapping.CAROUSEL_RECENT;
		return this.http.get(url);
	}

	getBannerByID(id: string): Observable<any> {
		const url = environment.baseURL + ServiceMapping.CAROUSEL + '/' + id;
		return this.http.get(url);
	}

	getBannerByPage(page = 1, entries = 5, recent = false): Observable<any> {
		let url;
		if (recent) {
			url = environment.baseURL + ServiceMapping.CAROUSEL_PAGINATION + '?page=' + page + '&entries=' + entries + '&recent=true';
		} else {
			url = environment.baseURL + ServiceMapping.CAROUSEL_PAGINATION + '?page=' + page + '&entries=' + entries + '&recent=false';
		}

		return this.http.get(url);
	}

	createBanner(param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.CAROUSEL;
		const payload = new FormData();

			payload.append('description', param.description);
			payload.append('eventDate', param.eventDate);
			payload.append('eventLink', param.eventLink);
			payload.append('eventLocation', param.eventLocation);
			payload.append('eventTime', param.eventTime);
			payload.append('eventType', param.eventType);
			payload.append('image', param.image);
			payload.append('title', param.title);

		return this.http.post(url, payload);
	}

	editBanner(id: any, param: any): Observable<any> {
		const url = environment.baseURL + ServiceMapping.CAROUSEL + '/' + id;
		const payload = new FormData();

		payload.append('description', param.description);
		payload.append('eventDate', param.eventDate);
		payload.append('eventLink', param.eventLink);
		payload.append('eventLocation', param.eventLocation);
		payload.append('eventTime', param.eventTime);
		payload.append('eventType', param.eventType);
		payload.append('image', param.image);
		payload.append('title', param.title);

		return this.http.put(url, payload);
	}

	deleteBanner(id): Observable<any> {
		const url = environment.baseURL + ServiceMapping.CAROUSEL + '/' + id;

		return this.http.delete(url);
	}
}
