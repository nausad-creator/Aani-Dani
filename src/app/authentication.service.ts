import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry, shareReplay } from 'rxjs/operators';
import { FORGOT, USER_RESPONSE } from './interface';
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
    updatedPackagingUlr = '/restaurant/restaurant-update-packing-charges';
    otpVerify = '/users/otp-verification';
    otpResend = '/users/otp-resend';
    userDuplicate = '/users/check-user-duplication';
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

    logout = () => {
        // remove user from local storage to log user out
        sessionStorage.removeItem('USER_LOGGED');
        localStorage.removeItem('USER_LOGGED');
        this.userSubject.next(null);
        if (window.sessionStorage) { sessionStorage.clear(); }
        this.router.navigate(['/'], { replaceUrl: true });
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
