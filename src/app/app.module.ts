import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { GlobalErrorHandler } from './core/error-handler/global-error-handler';
import { BlockCopyPasteDirective } from './block-copy-paste.directive';
import {MatInputModule} from '@angular/material/input'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule,MAT_DATE_FORMATS,MAT_DATE_LOCALE} from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { MomentUtcDateAdapter } from './moment-utc-date-adapter';
// carbon-components-angular default imports
import { UIShellModule } from 'carbon-components-angular';
import { ListModule } from 'carbon-components-angular';
import { DropdownModule } from 'carbon-components-angular';
import { ModalModule } from 'carbon-components-angular';
import { ModalService, BaseModal } from 'carbon-components-angular';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
// material-angular module
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';

// Carbon Icons
import { Notification20Module } from '@carbon/icons-angular/lib/notification/20';
import { UserAvatar20Module } from '@carbon/icons-angular/lib/user--avatar/20';
import { AppSwitcher20Module } from '@carbon/icons-angular/lib/app-switcher/20';
import { ToastrModule } from 'ngx-toastr';

// Header
import { LogoutModalModule } from './logout-modal/logout-modal.module';
import { HeadersComponent } from './headers/headers.component';

// Angular Google Maps
import { AgmCoreModule } from '@agm/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { DemoUtilsModule } from './demo-utils/module';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';

// Modal
import { SampleModalModule } from './sample-modal/sample-modal.module';
import { CancelModalModule } from './cancel-modal/cancel-modal.module';
import { ShiftChangeModule } from './shift-change/shift-change.module';
import { CreateUpdateShiftModule } from './create-update-shift/create-update-shift.module';
import { ConfirmationModalModule } from './confirmation-modal/confirmation-modal.module';
import { CheckInModule } from './check-in/check-in.module';
import { FinishOvertimeModule } from './finish-overtime/finish-overtime.module';
import { ClaimItemModule } from './claim-item/claim-item.module';
import { DetailRequestModalModule } from './detail-request-modal/detail-request-modal.module';
import { DetailRequestItemModalModule } from './detail-request-item-modal/detail-request-item-modal.module';
import { DetailRequestOvertimeEDModule } from './detail-request-overtime-ed/detail-request-overtime-ed.module';
import { ItemRequestModule } from './item-request/item-request.module';
import { TableApprovalModule } from './table-approval/table-approval.module';
import { MultipleRejectModule } from './multiple-reject/multiple-reject.module';
import { ReviewRequestModule } from './review-request/review-request.module';
import { ReviewOvertimeModule } from './review-overtime/review-overtime.module';
import { ReviewShiftModule } from './review-shift/review-shift.module';
import { ReviewLeaveModule } from './review-leave/review-leave.module';
import { RequestDetailApprovalModule } from './request-detail-approval/request-detail-approval.module';
import { TodayApprovalRevokeModule } from './today-approval/today-approval-revoke.module';
import { DailyModalModule } from './daily-modal/daily-modal.module';
import { DailyLeaveModalModule } from './daily-leave-modal/daily-leave-modal.module';
import { DailySickModalModule } from './daily-sick-modal/daily-sick-modal.module';
import { DisplayImageModalModule } from './display-image-modal/display-image-modal.module';
import { LogModalModule } from './log-modal/log-modal.module';
import { RiskResultModalModule } from './risk-result-modal/risk-result-modal.module';
import { PositionHistoryModule } from './position-history/position-history.module';

export function momentAdapterFactory() {
  return adapterFactory(moment);
};

@NgModule({
	declarations: [
		AppComponent,
		HeadersComponent,
		BlockCopyPasteDirective,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		AppRoutingModule,
		CheckInModule,
		ClaimItemModule,
		DetailRequestModalModule,
		DetailRequestItemModalModule,
		DetailRequestOvertimeEDModule,
		FinishOvertimeModule,
		ItemRequestModule,
		TableApprovalModule,
		MultipleRejectModule,
		ReviewRequestModule,
		ReviewOvertimeModule,
		ReviewShiftModule,
		ReviewLeaveModule,
		RequestDetailApprovalModule,
		CancelModalModule,
		ShiftChangeModule,
		CreateUpdateShiftModule,
		ConfirmationModalModule,
		TodayApprovalRevokeModule,
		LogoutModalModule,
		SampleModalModule,
		DailyModalModule,
		LogModalModule,
		DailyLeaveModalModule,
		DailySickModalModule,
		RiskResultModalModule,
		DisplayImageModalModule,
		UIShellModule,
		Notification20Module,
		UserAvatar20Module,
		AppSwitcher20Module,
		ModalModule,
		ListModule,
		DropdownModule,
		ModalModule,
		MatSliderModule,
		MatMenuModule,
		MatToolbarModule,
		MatDividerModule,
		HttpClientModule,
		PositionHistoryModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatNativeDateModule,
		MatMomentDateModule,
		MatInputModule,
		ToastrModule.forRoot({
			closeButton: true,
			timeOut: 5000,
			disableTimeOut: false,
			tapToDismiss: false,
			positionClass: 'toast-top-center',
			preventDuplicates: true,
		}),
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyBd55pe5Di9_o0R4Gtp1kLjHTs4uz_EHEM'
		  }),
		CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
		
		DemoUtilsModule,
	],
	providers: [
		ModalService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		},
		{
			provide: ErrorHandler,
			useClass: GlobalErrorHandler
		},
	
      	{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
      	{ provide: DateAdapter, useClass: MomentUtcDateAdapter,deps: [MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
		{ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
		{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }

	],
	bootstrap: [
		AppComponent
	]
})

export class AppModule { }
