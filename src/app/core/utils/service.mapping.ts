export enum ServiceMapping {
		// Watson
		WATSON_SESSION = 'watson/session',
		WATSON_CHAT = 'watson/chat',
		WATSON_TUTOR_DONE = 'watson/tutor/done',
		WATSON_GET_LOCATION = 'watson/getlocations',

		// Location
		LOCATION = 'utils/locations',

		// Destinations
		DESTINATION = 'utils/destinations',

		// Users
		USERS = 'users',
		DAILY_STATUS = 'users/status',
		REPORT = 'users/report',

		// Travels
		TRAVEL_REQUEST = 'travels/request',

		// Items
		ITEMS = 'items',

		// Overtime
		OVERTIME = 'overtime',

		// Assignment
		ASSIGNMENT = 'assignment',

		// Manager Dashboard
		MANAGER = 'manager',

		// Site Coordinator Dashboard
		SC = 'sc',
		SC_SEAT = 'sc/seat',

		// Health and Care Dashboard
		HSC = 'hsc',

		// Manager Approval
		MANAGER_APPROVAL = 'manager/approvals',

		// Manager Overtime
		MANAGER_OVERTIME = 'manager/overtimes',

		// Manager Assignment
		MANAGER_ASSIGNMENT = 'manager/assignments',

		// Manager Shifts
		MANAGER_SHIFTS = 'manager/shifts',

		// Manager Leaves
		MANAGER_LEAVES = 'manager/leaves',

		// Manager Shift Upload Approval
		MANAGER_UPLOAD = 'manager/uploads',

		// SC Approval
		SC_APPROVAL = 'sc/approvals',

		// SC Approval
		HSC_APPROVAL = 'hsc/approvals',

		// Travel Request Detail
		TRAVEL_REQUEST_DETAIL = 'travels/request',

		// Travel Request Approve
		TRAVEL_APPROVE = 'travels/approve',

		// Travel Request Reject
		TRAVEL_REJECT = 'travels/reject',

		// Travel Request Revoke
		TRAVEL_REVOKE = 'travels/revoke',

		// Travel Check In
		TRAVEL_CHECK_IN = 'travels/checkin',

		// Travel Check Out
		TRAVEL_CHECK_OUT = 'travels/checkout',

		// Item Request Detail
		ITEM_REQUEST_DETAIL = 'items/request',

		ITEM_STOCK = 'items/stock',

		ITEM_APPROVE = 'items/approve',

		ITEM_REJECT = 'items/reject',

		ITEM_REVOKE = 'items/revoke',

		// Assignment Request Detail
		ASSIGNMENT_REQUEST_DETAIL = 'assignment/request',

		ASSIGNMENT_APPROVE = 'assignment/approve',

		ASSIGNMENT_REJECT = 'assignment/reject',

		ASSIGNMENT_CANCEL = 'assignment/cancel',

		ASSIGNMENT_CHECK_OUT = 'assignment/finish',

		ED_ASSIGNMENT_SUMMARY = 'assignment/ed/WAsummary',

		ED_CONVERTED_ASSIGNMENT_SUMMARY = 'assignment/ed/WAConvertedsummary',

		// Overtime Request Detail
		OVERTIME_REQUEST_DETAIL = 'overtime/request',

		OVERTIME_APPROVE = 'overtime/approve',

		OVERTIME_REJECT = 'overtime/reject',

		OVERTIME_CANCEL = 'overtime/cancel',

		OVERTIME_CHECK_OUT = 'overtime/finish',

		ED_OVERTIME_SUMMARY = 'overtime/ed/OTsummary',

		ED_CONVERTED_OVERTIME_SUMMARY = 'overtime/ed/OTsummaryConverted',

		// Shifting Request Detail
		SHIFTING_REQUEST_DETAIL = 'shifting/request',

		SHIFTING_MANAGER_APPROVE = 'shifting/manager/approve',

		SHIFTING_MANAGER_REJECT = 'shifting/manager/reject',

		SHIFTING_CANCEL = 'shifting/employee/cancel',

		SHIFTING = 'shifting/shift',

		SHIFTING_EMPLOYEE = 'shifting/employee',

		SHIFTING_SUB = 'shifting/substitute',

		SHIFTING_EXCEL = 'shifting/excel',

		SHIFTING_UPLOAD = 'shifting/upload',

		SHIFTING_UPLOAD_APPROVE = 'shifting/upload/approve',

		SHIFTING_UPLOAD_REJECT = 'shifting/upload/reject',

		SHIFTING_DOWNLOADEXCELSHIFT = 'shifting/downloadexcelshift',

		USERS_REQUEST_HISTORY = 'users/request',

		USERS_STATUS_HISTORY = 'users/status',

		USERS_POSITION_HISTORY = 'tracing/history',

		GET_OTP = 'users/otp',

		GET_LETTER = 'users/letter',

		GET_PLAZA_ACCESS = 'users/plaza',

		NOTIF = 'notifs',

		ITEM_RECEIVED = 'items/received',

		ITEM_CANCEL = 'items/cancel',

		TRAVEL_CANCEL = 'travels/cancel',

		RESERVATION_DETAIL = 'reservation/me',

		RELEASE_RESERVATION = 'reservation/release',

		// MINIGAME

		SUBMIT_SCORE = 'score/submit',

		LEADERBOARD = 'score/high',

		// LEAVE

		LEAVE_ANNUAL = 'leave/annual',

		LEAVE_APPROVE = 'leave/approve',

		LEAVE_CANCEL = 'leave/cancel',

		LEAVE_DAYOFF = 'leave/dayoff',

		LEAVE_REJECT = 'leave/reject',

		LEAVE_REQUEST = 'leave/request',

		LEAVE_TYPE = 'leave/type',

		LEAVE_END_DATE = 'leave/generate-end',

		LEAVE_HISTORY = 'leave/history',

		// Carousel

		CAROUSEL = 'carousel',

		CAROUSEL_ALL = 'carousel/all',

		CAROUSEL_RECENT = 'carousel/recent',

		CAROUSEL_PAGINATION = 'carousel/pagination'
}
