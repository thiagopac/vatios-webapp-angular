// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  appVersion: 'v1.0.0',
  adminAuthDataKey: 'admin-auth-data-key-em-prod',
  adminUserDataKey: 'admin-user-data-key-em-prod',
  userDataKey: 'user-data-key-em-prod',
  hostUrl: 'https://url-do-app-em-prod/',
  apiUrl: 'https://url-da-api-em-prod:3333/api',
  binanceExplorerUrl: 'https://bscscan.com',
  smartContractAddress: '',
  socketUrl: 'https://url-do-socket-io-em-prod', //socket.io url === api url sem  /api
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
