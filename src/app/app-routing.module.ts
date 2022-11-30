import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeadersComponent } from './headers/headers.component';

const routes: Routes = [
	{ path: '', component: HeadersComponent, children: [
			{ path: '', redirectTo: '/login', pathMatch: 'full' },
			{ path: 'login',
				loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
			},
			{
				path: 'daily-checkup',
				loadChildren: () => import ('./daily-checkup/daily-checkup.module').then(m => m.DailyCheckupModule)
			},
			{
				path: 'mini-game',
				loadChildren: () => import ('./mini-game/mini-game.module').then(m => m.MiniGameModule)
			},
			{
				path: 'dashboard',
				loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'create-travel-request',
				loadChildren: () => import('./create-travel-request/create-travel-request.module').then(m => m.CreateTravelRequestModule)
			},
			{
				path: 'account',
				loadChildren: () => import('./account-settings/account-settings.module').then(m => m.AccountSettingsModule)
			},
			{
				path: 'create-health-request',
				loadChildren: () => import('./create-health-request/create-health-request.module').then(m => m.CreateHealthRequestModule)
			},
			{
				path: 'create-overtime-request',
				loadChildren: () => import('./create-overtime-request/create-overtime-request.module').then(m => m.CreateOvertimeRequestModule)
			},
			{
				path: 'create-work-assignment-request',
				loadChildren: () => import('./create-work-assignment-request/create-work-assignment-request.module')
					.then(m => m.CreateWorkAssignmentRequestModule)
			},
			{
				path: 'create-leave-request',
				loadChildren: () => import('./create-leave-request/create-leave-request.module').then(m => m.CreateLeaveRequestModule)
			},
			{
				path: 'table-approval',
				loadChildren: () => import('./table-approval/table-approval.module').then(m => m.TableApprovalModule)
			},
			{
				path: 'view-request-history',
				loadChildren: () => import('./view-request-history/view-request-history.module').then(m => m.ViewRequestHistoryModule)
			},
			{
				path: 'shift-assignment-history',
				loadChildren: () => import('./shift-assignment-history/shift-assignment-history.module').then(m => m.ShiftAssignmentHistoryModule)
			},
			{
				path: 'position-history',
				loadChildren: () => import('./position-history/position-history.module').then(m => m.PositionHistoryModule)
			},
			{
				path: 'chatbot',
				loadChildren: () => import('./chatbot/chatbot.module').then(m => m.ChatbotModule)
			},
			{
				path: 'detail-request',
				loadChildren: () => import('./detail-request/detail-request.module').then(m => m.DetailRequestModule)
			},
			{
				path: 'detail-request-item',
				// tslint:disable-next-line:max-line-length
				loadChildren: () => import('./detail-request-item/detail-request-item.module').then(m => m.DetailRequestItemModule)
			},
			{
				path: 'detail-request-approve',
				// tslint:disable-next-line:max-line-length
				loadChildren: () => import('./detail-request-approve/detail-request-approve.module').then(m => m.DetailRequestApproveModule)
			},
			{
				path: 'detail-request-item-approve',
				// tslint:disable-next-line:max-line-length
				loadChildren: () => import('./detail-request-item-approve/detail-request-item-approve.module').then(m => m.DetailRequestItemApproveModule)
			},
			{
				path: 'detail-request-overtime',
				// tslint:disable-next-line:max-line-length
				loadChildren: () => import('./detail-request-overtime/detail-request-overtime.module').then(m => m.DetailRequestOvertimeModule)
			},
			{
				path: 'detail-request-overtime-approve',
				// tslint:disable-next-line:max-line-length
				loadChildren: () => import('./detail-request-overtime-approve/detail-request-overtime-approve.module').then(m => m.DetailRequestOvertimeApproveModule)
			},
			{
				path: 'detail-request-shift-approve',
				// tslint:disable-next-line:max-line-length
				loadChildren: () => import('./detail-request-shift-approve/detail-request-shift-approve.module').then(m => m.DetailRequestShiftApproveModule)
			},
			{
				path: 'detail-request-leave',
				// tslint:disable-next-line:max-line-length
				loadChildren: () => import('./detail-request-leave/detail-request-leave.module').then(m => m.DetailRequestLeaveModule)
			},
			{
				path: 'item-stock',
				// tslint:disable-next-line:max-line-length
				loadChildren: () => import('./item-stock/item-stock.module').then(m => m.ItemStockModule)
			},
			{
				path: 'site-management',
				// tslint:disable-next-line:max-line-length
				loadChildren: () => import('./site-management/site-management.module').then(m => m.SiteManagementModule)
			},
			{
				path: 'seating-management',
				// tslint:disable-next-line:max-line-length
				loadChildren: () => import('./seating-management/seating-management.module').then(m => m.SeatingManagementModule)
			},
			{
				path: 'risk-calculator',
				// tslint:disable-next-line:max-line-length
				loadChildren: () => import('./risk-calculator/risk-calculator.module').then(m => m.RiskCalculatorModule)
			},
			{
				path: 'survey-page',
				// tslint:disable-next-line:max-line-length
				loadChildren: () => import('./survey-page/survey-page.module').then(m => m.SurveyPageModule)
			},
			{
				path: 'shift-schedule',
				// tslint:disable-next-line:max-line-length
				loadChildren: () => import('./shift-schedule/shift-schedule.module').then(m => m.ShiftScheduleModule)
			},
			{
				path: 'shift-assignment',
				// tslint:disable-next-line:max-line-length
				loadChildren: () => import('./shift-assignment/shift-assignment.module').then(m => m.ShiftAssignmentModule)
			},
			{
				path: 'overtime-details',
				// tslint:disable-next-line:max-line-length
				loadChildren: () => import('./overtime-details/overtime-details.module').then(m => m.OvertimeDetailsModule)
			},
			{
				path: 'status-details',
				loadChildren: () => import('./status-details/status-details.module').then(m => m.StatusDetailsModule)
			},
			{
				path: 'shift-excel-approval',
				loadChildren: () => import('./shift-excel-approval/shift-excel-approval.module').then(m => m.ShiftExcelApprovalModule)
			},
			{
				path: 'vaccine-approval',
				loadChildren: () => import('./vaccine-approval/vaccine-approval.module').then(m => m.VaccineApprovalModule)
			},
			{
				path: 'leave-details',
				loadChildren: () => import('./leave-details/leave-details.module').then(m => m.LeaveDetailsModule)
			},
			{
				path: 'event-see-more',
				loadChildren: () => import('./event-see-more/event-see-more.module').then(m => m.EventSeeMoreModule)
			},
			{
				path: 'event-detail',
				loadChildren: () => import('./event-detail/event-detail.module').then(m => m.EventDetailModule)
			}
		]
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
