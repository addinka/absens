// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false,
	baseURL: 'https://now.ibm-jti.com/workforce-dev/api/v1/',
	ssoJTI: 'https://now.ibm-jti.com/workforce-dev/api/v1/auth/sso/jti',
	ssoIBM: 'https://now.ibm-jti.com/workforce-dev/api/v1/auth/sso/ibm'

	// OKD Base URL
	// baseURL: 'https://now.ibm-jti.com/workforce-dev-okd/api/v1/',
	// ssoJTI: 'https://now.ibm-jti.com/workforce-dev-okd/api/v1/auth/sso/jti',
	// ssoIBM: 'https://now.ibm-jti.com/workforce-dev-okd/api/v1/auth/sso/ibm'
};

export const environmentSurvey = {
	production: false,
	baseURL: 'https://now.ibm-jti.com/jti-survey-dev/api/v1/template/vaccine_survey',
	response: 'https://now.ibm-jti.com/jti-survey-dev/api/v1/template/response',
};
