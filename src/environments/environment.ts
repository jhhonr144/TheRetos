// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
   firebaseConfig : {
    apiKey: "AIzaSyD5CZlN-fd2ktM-wDL1dRhdeEqY_LaXLtU",
    authDomain: "theretos-co.firebaseapp.com",
    projectId: "theretos-co",
    storageBucket: "theretos-co.appspot.com",
    messagingSenderId: "321723793847",
    appId: "1:321723793847:web:b9002838dc84f4874c6832",
    measurementId: "G-QNMC0REGBZ"
  },
  baseUrl: "http://localhost:3000/api"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
