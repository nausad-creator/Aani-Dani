import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry, shareReplay } from 'rxjs/operators';
import { ADDRESS, FORGOT, USER_RESPONSE } from './interface';
import * as moment from 'moment';
export enum Role {
    Restaurant = 'Restaurant',
    Manager = 'Manager'
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    // urls
    registration = '/users/user-registration';
    login = '/users/user-login';
    forget = '/users/user-forgot-password';
    reset = '/users/reset-password';
    changeUrl = '/users/user-change-password';
    updatedPackagingUlr = '/restaurant/restaurant-update-packing-charges';
    otpVerify = '/users/otp-verification';
    otpResend = '/users/otp-resend';
    userDuplicate = '/users/check-user-duplication';
    userUpdateUrl = '/users/user-update-profile';
    userUpdateSettingsUrl = '/users/user-update-settings';
    addAddressUrl = '/useraddress/add-address';
    editAddressUrl = '/useraddress/update-address';
    deleteAddressUrl = '/useraddress/delete-address';
    defaulAddressUrl = '/useraddress/set-default-address';
    // user-subject
    private userSubject: BehaviorSubject<USER_RESPONSE>;
    public user: Observable<USER_RESPONSE>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<USER_RESPONSE>(JSON.parse(sessionStorage.getItem('USER_LOGGED')));
        this.user = this.userSubject.asObservable();
    }

    httpOptions = {
        headers: new HttpHeaders({}),
    };

    get userValue(): USER_RESPONSE {
        return this.userSubject.value;
    }

    signIn = (item: string): Observable<{
        data: USER_RESPONSE[];
        status: string;
        message: string;
    }> => {
        const form = new FormData();
        const json = `[{
            "languageID":"${JSON.parse(item).languageID}",
            "userMobile":"${JSON.parse(item).userMobile}",
            "userPassword":"${JSON.parse(item).userPassword}",
            "apiType":"Android",
            "apiVersion":"1.0"
        }]`;
        form.append('json', json);
        return this.http
            .post<{
                data: USER_RESPONSE[];
                status: string;
                message: string;
            }[]>(this.login, form, this.httpOptions)
            .pipe(map(r => r[0]), shareReplay(), retry(2), catchError(this.handleError));
    }

    forgot = (item: string): Observable<FORGOT> => {
        const form = new FormData();
        const json = `[{
            "userEmail":"${JSON.parse(item).userEmail}",
            "userCountryCode":"${JSON.parse(item).userCountryCode}",
            "languageID":"${JSON.parse(item).languageID}",
            "userMobile":"${JSON.parse(item).userMobile}",
            "apiType":"Android",
            "apiVersion":"1.0"
        }]`;
        form.append('json', json);
        return this.http
            .post<FORGOT[]>(this.forget, form, this.httpOptions)
            .pipe(map(r => r[0]), shareReplay(), retry(2), catchError(this.handleError));
    }

    otpVerification = (item: string): Observable<USER_RESPONSE> => {
        const form = new FormData();
        const json = `[{
            "languageID":"${JSON.parse(item).languageID}",
            "loginuserID":"${JSON.parse(item).loginuserID}",
            "userOTP":"${JSON.parse(item).userOTP}",
            "userDeviceID": "xczxcxzczxczxcxcxc",
            "apiType":"Android",
            "apiVersion":"1.0"
        }]`;
        form.append('json', json);
        return this.http
            .post<{
                data: USER_RESPONSE[];
                status: string;
                message: string;
            }[]>(this.otpVerify, form, this.httpOptions)
            .pipe(map(r => r[0].data[0]), shareReplay(), retry(2), catchError(this.handleError));
    }

    otpResendVerification = (item: string): Observable<string> => {
        const form = new FormData();
        const json = `[{
            "languageID":"${JSON.parse(item).languageID}",
            "loginuserID":"${JSON.parse(item).loginuserID}",
            "userMobile":"${JSON.parse(item).userMobile}",
            "apiType":"Android",
            "apiVersion":"1.0"
        }]`;
        form.append('json', json);
        return this.http
            .post<{
                status: string;
                message: string;
            }[]>(this.otpResend, form, this.httpOptions)
            .pipe(map(r => r[0].status), shareReplay(), retry(2), catchError(this.handleError));
    }

    resetPassword = (item: string): Observable<USER_RESPONSE> => {
        const form = new FormData();
        const json = `[{
            "loginuserID":"${JSON.parse(item).loginuserID}",
            "languageID":"${JSON.parse(item).languageID}",
            "userNewPassword":"${JSON.parse(item).userNewPassword}",
            "apiType":"Android",
            "apiVersion":"1.0"
        }]`;
        form.append('json', json);
        return this.http
            .post<{
                data: USER_RESPONSE[];
                status: string;
                message: string;
            }[]>(this.reset, form, this.httpOptions)
            .pipe(map(r => r[0].data[0]), shareReplay(), retry(2), catchError(this.handleError));
    }

    changePassword = (item: string): Observable<{
        status: string;
        message: string;
    }> => {
        const form = new FormData();
        const json = `[{
            "loginuserID":"${JSON.parse(item).loginuserID}",
            "languageID":"${JSON.parse(item).languageID}",
            "userCurrentPassword":"${JSON.parse(item).userCurrentPassword}",
            "userNewPassword":"${JSON.parse(item).userNewPassword}",
            "apiType":"Android",
            "apiVersion":"1.0"
        }]`;
        form.append('json', json);
        return this.http
            .post<{
                status: string;
                message: string;
            }[]>(this.changeUrl, form, this.httpOptions)
            .pipe(map(r => r[0]), shareReplay(), retry(2), catchError(this.handleError));
    }

    signup = (item: string): Observable<{
        data: USER_RESPONSE[];
        status: string;
        message: string;
    }> => {
        const form = new FormData();
        const json = `[{
            "languageID":"${JSON.parse(item).languageID}",
            "userFullName":"${JSON.parse(item).userFullName}",
            "userEmail":"${JSON.parse(item).userEmail}",
            "nationalityID":"${JSON.parse(item).nationalityID}",
            "userDOB":"${JSON.parse(item).userDOB}",
            "userMobile":"${JSON.parse(item).userMobile}",
            "userDeviceType":"Android",
            "userDeviceID":"xczxcxzczxczxcxcxc",
            "apiType":"Android",
            "apiVersion":"1.0",
            "userSignedRefKey":"",
            "userPassword":"${JSON.parse(item).userPassword}"
        }]`;
        form.append('json', json);
        return this.http
            .post<{
                data: USER_RESPONSE[];
                status: string;
                message: string;
            }[]>(this.registration, form, this.httpOptions)
            .pipe(map(r => r[0]), shareReplay(), retry(2), catchError(this.handleError));
    }

    checkDuplication = (item: string): Observable<{
        status: string;
        message: string;
    }> => {
        const form = new FormData();
        const json = `[{
            "loginuserID":"${JSON.parse(item).loginuserID}",
            "languageID":"${JSON.parse(item).languageID}",
            "userEmail":"${JSON.parse(item).userEmail}",
            "userMobile":"${JSON.parse(item).userMobile}",
            "apiType":"Android",
            "apiVersion":"1.0"
        }]`;
        form.append('json', json);
        return this.http
            .post<{
                status: string;
                message: string;
            }[]>(this.userDuplicate, form, this.httpOptions)
            .pipe(map(r => r[0]), shareReplay(), retry(2), catchError(this.handleError));
    }

    updateProfile = (item: string): Observable<{
        data: USER_RESPONSE[];
        status: string;
        message: string;
    }> => {
        const form = new FormData();
        const json = `[{
            "languageID":"${JSON.parse(item).languageID}",
            "loginuserID":"${JSON.parse(item).loginuserID}",
            "userFullName":"${JSON.parse(item).userFullName}",
            "userEmail":"${JSON.parse(item).userEmail}",
            "nationalityID":"${JSON.parse(item).nationalityID}",
            "userDOB":"${moment(moment(`${JSON.parse(item).userDOB}`).toDate(), 'YYYY-MM-DD').format('YYYY-MM-DD')}",
            "userMobile":"${JSON.parse(item).userMobile}",
            "userDeviceType":"Android",
            "userDeviceID":"xczxcxzczxczxcxcxc",
            "apiType":"Android",
            "apiVersion":"1.0",
            "userProfilePicture":"${JSON.parse(item).userProfilePicture}"
        }]`;
        form.append('json', json);
        return this.http
            .post<{
                data: USER_RESPONSE[];
                status: string;
                message: string;
            }[]>(`${this.userUpdateUrl}`, form, this.httpOptions)
            .pipe(map(r => r[0]), shareReplay(), retry(2), catchError(this.handleError));
    }

    updateSettings = (temp: string): Observable<{
        data: USER_RESPONSE[];
        status: string;
        message: string;
    }> => {
        const form = new FormData();
        const json = `[{
            "loginuserID":"${JSON.parse(temp).loginuserID}",
            "userEmailNotification":"${JSON.parse(temp).userEmailNotification}",
            "userSMSNotification":"${JSON.parse(temp).userSMSNotification}",
            "userPushNotification":"${JSON.parse(temp).userPushNotification}",
            "apiType":"Android",
            "apiVersion":"1.0",
            "languageID":"1"
        }]`;
        form.append('json', json);
        return this.http
            .post<{
                data: USER_RESPONSE[];
                status: string;
                message: string;
            }[]>(`${this.userUpdateSettingsUrl}`, form, this.httpOptions)
            .pipe(map(r => r[0]), shareReplay(), retry(2), catchError(this.handleError));
    }

    addAddress = (temp: string): Observable<{
        data: ADDRESS[];
        status: string;
        message: string;
    }> => {
        const form = new FormData();
        const json = `[{
              "languageID":"${JSON.parse(temp).languageID}",
              "loginuserID":"${JSON.parse(temp).loginuserID}",
              "addressTitle":"${JSON.parse(temp).addressTitle}",
              "addressBuildingName":"${JSON.parse(temp).addressBuildingName}",
              "addressBlockNo":"${JSON.parse(temp).addressBlockNo}",
              "addressStreetName":"${JSON.parse(temp).addressStreetName}",
              "cityName":"${JSON.parse(temp).cityName}",
              "countryName":"${JSON.parse(temp).countryName}",
              "countryID":"${JSON.parse(temp).countryID}",
              "addressPincode":"${JSON.parse(temp).addressPincode}",
              "addressLandmark":"${JSON.parse(temp).addressLandmark}",
              "addressType":"${JSON.parse(temp).addressType}",
              "addressIsDefault":"${JSON.parse(temp).addressIsDefault}",
              "addressLati":"${JSON.parse(temp).addressLati}",
              "addressLongi":"${JSON.parse(temp).addressLongi}",
              "addressMobile":"${JSON.parse(temp).addressMobile}",
              "apiType":"Android",
              "apiVersion":"1.0"
        }]`;
        form.append('json', json);
        return this.http
            .post<{
                data: ADDRESS[];
                status: string;
                message: string;
            }[]>(`${this.addAddressUrl}`, form, this.httpOptions)
            .pipe(map(r => r[0]), shareReplay(), retry(2), catchError(this.handleError));
    }

    editAddress = (temp: string): Observable<{
        data: ADDRESS[];
        status: string;
        message: string;
    }> => {
        const form = new FormData();
        const json = `[{
              "languageID":"${JSON.parse(temp).languageID}",
              "loginuserID":"${JSON.parse(temp).loginuserID}",
              "addressID":"${JSON.parse(temp).addressID}",
              "addressTitle":"${JSON.parse(temp).addressTitle}",
              "addressBuildingName":"${JSON.parse(temp).addressBuildingName}",
              "addressBlockNo":"${JSON.parse(temp).addressBlockNo}",
              "addressStreetName":"${JSON.parse(temp).addressStreetName}",
              "cityName":"${JSON.parse(temp).cityName}",
              "countryName":"${JSON.parse(temp).countryName}",
              "countryID":"${JSON.parse(temp).countryID}",
              "addressPincode":"${JSON.parse(temp).addressPincode}",
              "addressLandmark":"${JSON.parse(temp).addressLandmark}",
              "addressType":"${JSON.parse(temp).addressType}",
              "addressIsDefault":"${JSON.parse(temp).addressIsDefault}",
              "addressLati":"${JSON.parse(temp).addressLati}",
              "addressLongi":"${JSON.parse(temp).addressLongi}",
              "addressMobile":"${JSON.parse(temp).addressMobile}",
              "apiType":"Android",
              "apiVersion":"1.0"
        }]`;
        form.append('json', json);
        return this.http
            .post<{
                data: ADDRESS[];
                status: string;
                message: string;
            }[]>(`${this.editAddressUrl}`, form, this.httpOptions)
            .pipe(map(r => r[0]), shareReplay(), retry(2), catchError(this.handleError));
    }

    setDefault = (temp: string): Observable<{
        status: string;
        message: string;
    }> => {
        const form = new FormData();
        const json = `[{
            "addressID":"${JSON.parse(temp).addressID}",
            "loginuserID":"${JSON.parse(temp).loginuserID}",
            "languageID":"${JSON.parse(temp).languageID}",
            "apiType":"Android",
            "apiVersion":"1.0"
        }]`;
        form.append('json', json);
        return this.http
            .post<{
                status: string;
                message: string;
            }[]>(`${this.defaulAddressUrl}`, form, this.httpOptions)
            .pipe(map(r => r[0]), shareReplay(), retry(2), catchError(this.handleError));
    }

    deleteAddress = (temp: string): Observable<{
        status: string;
        message: string;
    }> => {
        const form = new FormData();
        const json = `[{
            "addressID":"${JSON.parse(temp).addressID}",
            "loginuserID":"${JSON.parse(temp).loginuserID}",
            "languageID":"${JSON.parse(temp).languageID}",
            "apiType":"Android",
            "apiVersion":"1.0"
        }]`;
        form.append('json', json);
        return this.http
            .post<{
                status: string;
                message: string;
            }[]>(`${this.deleteAddressUrl}`, form, this.httpOptions)
            .pipe(map(r => r[0]), shareReplay(), retry(2), catchError(this.handleError));
    }

    logout = () => {
        // remove user from local storage to log user out
        sessionStorage.removeItem('USER_LOGGED');
        localStorage.removeItem('USER_LOGGED');
        this.userSubject.next(null);
        if (window.sessionStorage) { sessionStorage.clear(); }
        if (this.router.url.startsWith('/user')) {
            this.router.navigate(['/'], { replaceUrl: true });
        }
    }

    updateUser = (user: USER_RESPONSE) => {
        this.userSubject.next(user);
    }

    // ErrorHandling
    handleError = (error: {
        error: { messages: string };
        status: any;
        messsage: any;
    }) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.messages;
        } else {
            errorMessage = `Error Code : ${error.status}\nMessage : ${error.messsage}`;
        }
        return throwError(errorMessage);
    }
}
