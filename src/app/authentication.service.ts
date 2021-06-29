import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
export enum Role {
    Restaurant = 'Restaurant',
    Manager = 'Manager'
}
export class User {
    restaurantAddress: string;
    restaurantCreatedDate: string;
    restaurantDineinService: string;
    restaurantEmail: string;
    restaurantFavoriteCount: string;
    restaurantFssiLicNo: string;
    restaurantGST: string;
    restaurantID: string;
    restaurantLogo: string;
    restaurantMarkup: string;
    restaurantMobile: string;
    restaurantName: string;
    restaurantPackingCharges: string;
    restaurantPickupService: string;
    restaurantTables: string;
    restaurantTagLine: string;
    workinghours: WorkingHour[];
    role: Role;
}
interface Restaurant {
    restaurantAddress: string;
    restaurantCreatedDate: string;
    restaurantDineinService: string;
    restaurantEmail: string;
    restaurantFavoriteCount: string;
    restaurantFssiLicNo: string;
    restaurantGST: string;
    restaurantID: string;
    restaurantLogo: string;
    restaurantMarkup: string;
    restaurantMobile: string;
    restaurantName: string;
    restaurantPackingCharges: string;
    restaurantPickupService: string;
    restaurantTables: string;
    restaurantTagLine: string;
    workinghours: WorkingHour[];
}
interface WorkingHour {
    restwhID: string;
    restwhDay: string;
    restwhStartTime: string;
    restwhEndTime: string;
    restwhStartInterval: string;
    restwhEndInterval: string;
}
interface Manager {
    managerID: string;
    restaurantID: string;
    managerName: string;
    managerEmail: string;
    managerMobile: string;
    managerAlternateContact: string;
    managerPassword: string;
    managerAddress: string;
    managerProfilePicture: string;
    countryID: string;
    cityID: string;
    managerOtherInfo: string;
    managerStatus: string;
    managerCreatedDate: string;
    managerLastLoginDate: string;
    managerOTP: string;
    managerMobileVerified: string;
    managerToken: string;
    managerTokenExpiredDateTime: string;
    managerLogo: string;
    restaurantName: string;
    restaurantMobile: string;
    restaurantEmail: string;
    restaurantPassword: string;
    restaurantGST: string;
    restaurantTagLine: string;
    restaurantAddress: string;
    restaurantLatitude: string;
    restaurantLongitude: string;
    restaurantLogo: string;
    restaurantTables: string;
    restaurantStatus: string;
    restaurantVerified: string;
    restaurantFavoriteCount: string;
    restaurantGSTPer: string;
    restaurantPackingCharges: string;
    restaurantCreatedDate: string;
    restaurantToken: string;
    restaurantTokenExpiredDateTime: string;
    restaurantOTP: string;
    restaurantMobileVerified: string;
    restaurantPickupService: string;
    restaurantDineinService: string;
    restaurantMarkup: string;
    resturantLastLoginDate: string;
    restaurantFssiLicNo: string;
    restaurantFssiLicImage: string;
    managerTables: string;
    workinghours: WorkingHour[];
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    // urls
    loginUrl = '/restaurant/restaurant-login-password';
    loginManagerUrl = '/restaurant/manager-login-password';
    dineIncheckedUrl = '/restaurant/restaurant-update-dinein-service';
    pickUpcheckedUrl = '/restaurant/restaurant-update-pickup-service';
    updatedPackagingUlr = '/restaurant/restaurant-update-packing-charges';
    addWrUrl = '/restaurant/add-working-hours';
    editWrUrl = '/restaurant/edit-working-hours';
    // user-subject
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('Menu')));
        this.user = this.userSubject.asObservable();
    }

    httpOptions = {
        headers: new HttpHeaders({}),
    };

    get userValue(): User {
        return this.userSubject.value;
    }

    signIn = (item: string): Observable<{
        status: string;
        message: string;
    }> => {
        const form = new FormData();
        const json = `[{
          "restaurantMobile":"${JSON.parse(item).restaurantMobile}",
          "languageID":"${JSON.parse(item).languageID}",
          "restaurantPassword":"${JSON.parse(item).restaurantPassword}",
          "userDeviceID":"token",
          "apiType":"Android",
          "apiVersion":"1.0"
        }]`;
        form.append('json', json);
        return this.http
            .post<{
                data: Restaurant[];
                status: string;
                message: string;
            }[]>(environment.apiBaseUrl + this.loginUrl, form, this.httpOptions)
            .pipe(map(r => {
                sessionStorage.setItem('Menu', JSON.stringify({
                    restaurantAddress: r[0].data[0].restaurantAddress,
                    restaurantCreatedDate: r[0].data[0].restaurantCreatedDate,
                    restaurantDineinService: r[0].data[0].restaurantDineinService,
                    restaurantEmail: r[0].data[0].restaurantEmail,
                    restaurantFavoriteCount: r[0].data[0].restaurantFavoriteCount,
                    restaurantFssiLicNo: r[0].data[0].restaurantFssiLicNo,
                    restaurantGST: r[0].data[0].restaurantGST,
                    restaurantID: r[0].data[0].restaurantID,
                    restaurantLogo: r[0].data[0].restaurantLogo,
                    restaurantMarkup: r[0].data[0].restaurantMarkup,
                    restaurantMobile: r[0].data[0].restaurantMobile,
                    restaurantName: r[0].data[0].restaurantName,
                    restaurantPackingCharges: r[0].data[0].restaurantPackingCharges,
                    restaurantPickupService: r[0].data[0].restaurantPickupService,
                    restaurantTables: r[0].data[0].restaurantTables,
                    restaurantTagLine: r[0].data[0].restaurantTagLine,
                    workinghours: r[0].data[0].workinghours,
                    role: Role.Restaurant
                }));
                this.userSubject.next({
                    restaurantAddress: r[0].data[0].restaurantAddress,
                    restaurantCreatedDate: r[0].data[0].restaurantCreatedDate,
                    restaurantDineinService: r[0].data[0].restaurantDineinService,
                    restaurantEmail: r[0].data[0].restaurantEmail,
                    restaurantFavoriteCount: r[0].data[0].restaurantFavoriteCount,
                    restaurantFssiLicNo: r[0].data[0].restaurantFssiLicNo,
                    restaurantGST: r[0].data[0].restaurantGST,
                    restaurantID: r[0].data[0].restaurantID,
                    restaurantLogo: r[0].data[0].restaurantLogo,
                    restaurantMarkup: r[0].data[0].restaurantMarkup,
                    restaurantMobile: r[0].data[0].restaurantMobile,
                    restaurantName: r[0].data[0].restaurantName,
                    restaurantPackingCharges: r[0].data[0].restaurantPackingCharges,
                    restaurantPickupService: r[0].data[0].restaurantPickupService,
                    restaurantTables: r[0].data[0].restaurantTables,
                    restaurantTagLine: r[0].data[0].restaurantTagLine,
                    workinghours: r[0].data[0].workinghours,
                    role: Role.Restaurant
                });
                return {
                    status: r[0].status,
                    message: r[0].message
                };
            }), shareReplay(), retry(2), catchError(this.handleError));
    }

    signInManager = (item: string): Observable<{
        status: string;
        message: string;
    }> => {
        const form = new FormData();
        const json = `[{
          "managerMobile":"${JSON.parse(item).managerMobile}",
          "languageID":"${JSON.parse(item).languageID}",
          "managerPassword":"${JSON.parse(item).managerPassword}",
          "userDeviceID":"token",
          "apiType":"Android",
          "apiVersion":"1.0"
        }]`;
        form.append('json', json);
        return this.http
            .post<{
                data: Manager[];
                status: string;
                message: string;
            }[]>(environment.apiBaseUrl + this.loginManagerUrl, form, this.httpOptions)
            .pipe(map(r => {
                sessionStorage.setItem('Menu', JSON.stringify({
                    restaurantAddress: r[0].data[0].restaurantAddress,
                    restaurantCreatedDate: r[0].data[0].restaurantCreatedDate,
                    restaurantDineinService: r[0].data[0].restaurantDineinService,
                    restaurantEmail: r[0].data[0].restaurantEmail,
                    restaurantFavoriteCount: r[0].data[0].restaurantFavoriteCount,
                    restaurantFssiLicNo: r[0].data[0].restaurantFssiLicNo,
                    restaurantGST: r[0].data[0].restaurantGST,
                    restaurantID: r[0].data[0].restaurantID,
                    restaurantLogo: r[0].data[0].restaurantLogo,
                    restaurantMarkup: r[0].data[0].restaurantMarkup,
                    restaurantMobile: r[0].data[0].restaurantMobile,
                    restaurantName: r[0].data[0].restaurantName,
                    restaurantPackingCharges: r[0].data[0].restaurantPackingCharges,
                    restaurantPickupService: r[0].data[0].restaurantPickupService,
                    restaurantTables: r[0].data[0].restaurantTables,
                    restaurantTagLine: r[0].data[0].restaurantTagLine,
                    workinghours: r[0].data[0].workinghours,
                    role: Role.Manager
                }));
                this.userSubject.next({
                    restaurantAddress: r[0].data[0].restaurantAddress,
                    restaurantCreatedDate: r[0].data[0].restaurantCreatedDate,
                    restaurantDineinService: r[0].data[0].restaurantDineinService,
                    restaurantEmail: r[0].data[0].restaurantEmail,
                    restaurantFavoriteCount: r[0].data[0].restaurantFavoriteCount,
                    restaurantFssiLicNo: r[0].data[0].restaurantFssiLicNo,
                    restaurantGST: r[0].data[0].restaurantGST,
                    restaurantID: r[0].data[0].restaurantID,
                    restaurantLogo: r[0].data[0].restaurantLogo,
                    restaurantMarkup: r[0].data[0].restaurantMarkup,
                    restaurantMobile: r[0].data[0].restaurantMobile,
                    restaurantName: r[0].data[0].restaurantName,
                    restaurantPackingCharges: r[0].data[0].restaurantPackingCharges,
                    restaurantPickupService: r[0].data[0].restaurantPickupService,
                    restaurantTables: r[0].data[0].restaurantTables,
                    restaurantTagLine: r[0].data[0].restaurantTagLine,
                    workinghours: r[0].data[0].workinghours,
                    role: Role.Manager
                });
                return {
                    status: r[0].status,
                    message: r[0].message
                };
            }), shareReplay(), retry(2), catchError(this.handleError));
    }

    dineInChecked = (data: string): Observable<{
        status: string;
        message: string;
    }> => {
        const form = new FormData();
        const json = `[{
          "loginrestaurantID":"${JSON.parse(data).loginrestaurantID}",
          "restaurantDineinService":"${JSON.parse(data).restaurantDineinService}",
          "apiType":"android",
          "apiVersion":"1.0",
          "page":"0",
          "pagesize":"10",
          "languageID":"1"
        }]`;
        form.append('json', json);
        return this.http
            .post<{
                data: Restaurant[];
                status: string;
                message: string;
            }[]>(`${environment.apiBaseUrl}${this.dineIncheckedUrl}`, form, this.httpOptions)
            .pipe(map(r => {
                sessionStorage.setItem('Menu', JSON.stringify({
                    restaurantAddress: r[0].data[0].restaurantAddress,
                    restaurantCreatedDate: r[0].data[0].restaurantCreatedDate,
                    restaurantDineinService: r[0].data[0].restaurantDineinService,
                    restaurantEmail: r[0].data[0].restaurantEmail,
                    restaurantFavoriteCount: r[0].data[0].restaurantFavoriteCount,
                    restaurantFssiLicNo: r[0].data[0].restaurantFssiLicNo,
                    restaurantGST: r[0].data[0].restaurantGST,
                    restaurantID: r[0].data[0].restaurantID,
                    restaurantLogo: r[0].data[0].restaurantLogo,
                    restaurantMarkup: r[0].data[0].restaurantMarkup,
                    restaurantMobile: r[0].data[0].restaurantMobile,
                    restaurantName: r[0].data[0].restaurantName,
                    restaurantPackingCharges: r[0].data[0].restaurantPackingCharges,
                    restaurantPickupService: r[0].data[0].restaurantPickupService,
                    restaurantTables: r[0].data[0].restaurantTables,
                    restaurantTagLine: r[0].data[0].restaurantTagLine,
                    workinghours: r[0].data[0].workinghours,
                    role: Role.Restaurant
                }));
                this.userSubject.next({
                    restaurantAddress: r[0].data[0].restaurantAddress,
                    restaurantCreatedDate: r[0].data[0].restaurantCreatedDate,
                    restaurantDineinService: r[0].data[0].restaurantDineinService,
                    restaurantEmail: r[0].data[0].restaurantEmail,
                    restaurantFavoriteCount: r[0].data[0].restaurantFavoriteCount,
                    restaurantFssiLicNo: r[0].data[0].restaurantFssiLicNo,
                    restaurantGST: r[0].data[0].restaurantGST,
                    restaurantID: r[0].data[0].restaurantID,
                    restaurantLogo: r[0].data[0].restaurantLogo,
                    restaurantMarkup: r[0].data[0].restaurantMarkup,
                    restaurantMobile: r[0].data[0].restaurantMobile,
                    restaurantName: r[0].data[0].restaurantName,
                    restaurantPackingCharges: r[0].data[0].restaurantPackingCharges,
                    restaurantPickupService: r[0].data[0].restaurantPickupService,
                    restaurantTables: r[0].data[0].restaurantTables,
                    restaurantTagLine: r[0].data[0].restaurantTagLine,
                    workinghours: r[0].data[0].workinghours,
                    role: Role.Restaurant
                });
                return {
                    status: r[0].status,
                    message: r[0].message
                };
            }), retry(2), shareReplay(), catchError(this.handleError));
    }

    pickUpChecked = (data: string): Observable<{
        status: string;
        message: string;
    }> => {
        const form = new FormData();
        const json = `[{
          "loginrestaurantID":"${JSON.parse(data).loginrestaurantID}",
          "restaurantPickupService":"${JSON.parse(data).restaurantPickupService}",
          "apiType":"android",
          "apiVersion":"1.0",
          "page":"0",
          "pagesize":"10",
          "languageID":"1"
        }]`;
        form.append('json', json);
        return this.http
            .post<{
                data: Restaurant[];
                status: string;
                message: string;
            }[]>(`${environment.apiBaseUrl}${this.pickUpcheckedUrl}`, form, this.httpOptions)
            .pipe(map(r => {
                sessionStorage.setItem('Menu', JSON.stringify({
                    restaurantAddress: r[0].data[0].restaurantAddress,
                    restaurantCreatedDate: r[0].data[0].restaurantCreatedDate,
                    restaurantDineinService: r[0].data[0].restaurantDineinService,
                    restaurantEmail: r[0].data[0].restaurantEmail,
                    restaurantFavoriteCount: r[0].data[0].restaurantFavoriteCount,
                    restaurantFssiLicNo: r[0].data[0].restaurantFssiLicNo,
                    restaurantGST: r[0].data[0].restaurantGST,
                    restaurantID: r[0].data[0].restaurantID,
                    restaurantLogo: r[0].data[0].restaurantLogo,
                    restaurantMarkup: r[0].data[0].restaurantMarkup,
                    restaurantMobile: r[0].data[0].restaurantMobile,
                    restaurantName: r[0].data[0].restaurantName,
                    restaurantPackingCharges: r[0].data[0].restaurantPackingCharges,
                    restaurantPickupService: r[0].data[0].restaurantPickupService,
                    restaurantTables: r[0].data[0].restaurantTables,
                    restaurantTagLine: r[0].data[0].restaurantTagLine,
                    workinghours: r[0].data[0].workinghours,
                    role: Role.Restaurant
                }));
                this.userSubject.next({
                    restaurantAddress: r[0].data[0].restaurantAddress,
                    restaurantCreatedDate: r[0].data[0].restaurantCreatedDate,
                    restaurantDineinService: r[0].data[0].restaurantDineinService,
                    restaurantEmail: r[0].data[0].restaurantEmail,
                    restaurantFavoriteCount: r[0].data[0].restaurantFavoriteCount,
                    restaurantFssiLicNo: r[0].data[0].restaurantFssiLicNo,
                    restaurantGST: r[0].data[0].restaurantGST,
                    restaurantID: r[0].data[0].restaurantID,
                    restaurantLogo: r[0].data[0].restaurantLogo,
                    restaurantMarkup: r[0].data[0].restaurantMarkup,
                    restaurantMobile: r[0].data[0].restaurantMobile,
                    restaurantName: r[0].data[0].restaurantName,
                    restaurantPackingCharges: r[0].data[0].restaurantPackingCharges,
                    restaurantPickupService: r[0].data[0].restaurantPickupService,
                    restaurantTables: r[0].data[0].restaurantTables,
                    restaurantTagLine: r[0].data[0].restaurantTagLine,
                    workinghours: r[0].data[0].workinghours,
                    role: Role.Restaurant
                });
                return {
                    status: r[0].status,
                    message: r[0].message
                };
            }), retry(2), shareReplay(), catchError(this.handleError));
    }

    updatePackaging = (data: string): Observable<{
        status: string;
        message: string;
    }> => {
        const form = new FormData();
        const json = `[{
            "restaurantPackingCharges":"${JSON.parse(data).restaurantPackingCharges && JSON.parse(data).restaurantPackingCharges !== '0' ? JSON.parse(data).restaurantPackingCharges.trim() : '00'}",
            "loginrestaurantID":"${JSON.parse(data).loginrestaurantID}",
            "languageID":"${JSON.parse(data).languageID}",
            "apiType":"Android",
            "apiVersion":"1.0"
        }]`;
        form.append('json', json);
        return this.http
            .post<{
                data: Restaurant[];
                status: string;
                message: string;
            }[]>(`${environment.apiBaseUrl}${this.updatedPackagingUlr}`, form, this.httpOptions)
            .pipe(map(r => {
                sessionStorage.setItem('Menu', JSON.stringify({
                    restaurantAddress: r[0].data[0].restaurantAddress,
                    restaurantCreatedDate: r[0].data[0].restaurantCreatedDate,
                    restaurantDineinService: r[0].data[0].restaurantDineinService,
                    restaurantEmail: r[0].data[0].restaurantEmail,
                    restaurantFavoriteCount: r[0].data[0].restaurantFavoriteCount,
                    restaurantFssiLicNo: r[0].data[0].restaurantFssiLicNo,
                    restaurantGST: r[0].data[0].restaurantGST,
                    restaurantID: r[0].data[0].restaurantID,
                    restaurantLogo: r[0].data[0].restaurantLogo,
                    restaurantMarkup: r[0].data[0].restaurantMarkup,
                    restaurantMobile: r[0].data[0].restaurantMobile,
                    restaurantName: r[0].data[0].restaurantName,
                    restaurantPackingCharges: r[0].data[0].restaurantPackingCharges,
                    restaurantPickupService: r[0].data[0].restaurantPickupService,
                    restaurantTables: r[0].data[0].restaurantTables,
                    restaurantTagLine: r[0].data[0].restaurantTagLine,
                    workinghours: r[0].data[0].workinghours,
                    role: Role.Restaurant
                }));
                this.userSubject.next({
                    restaurantAddress: r[0].data[0].restaurantAddress,
                    restaurantCreatedDate: r[0].data[0].restaurantCreatedDate,
                    restaurantDineinService: r[0].data[0].restaurantDineinService,
                    restaurantEmail: r[0].data[0].restaurantEmail,
                    restaurantFavoriteCount: r[0].data[0].restaurantFavoriteCount,
                    restaurantFssiLicNo: r[0].data[0].restaurantFssiLicNo,
                    restaurantGST: r[0].data[0].restaurantGST,
                    restaurantID: r[0].data[0].restaurantID,
                    restaurantLogo: r[0].data[0].restaurantLogo,
                    restaurantMarkup: r[0].data[0].restaurantMarkup,
                    restaurantMobile: r[0].data[0].restaurantMobile,
                    restaurantName: r[0].data[0].restaurantName,
                    restaurantPackingCharges: r[0].data[0].restaurantPackingCharges,
                    restaurantPickupService: r[0].data[0].restaurantPickupService,
                    restaurantTables: r[0].data[0].restaurantTables,
                    restaurantTagLine: r[0].data[0].restaurantTagLine,
                    workinghours: r[0].data[0].workinghours,
                    role: Role.Restaurant
                });
                return {
                    status: r[0].status,
                    message: r[0].message
                };
            }), retry(2), shareReplay(), catchError(this.handleError));
    }

    addWorkingHour = (data: string): Observable<{
        status: string;
        message: string;
    }> => {
        const form = new FormData();
        const json = `[{
          "languageID":"${JSON.parse(data).languageID}",
          "loginrestaurantID":"${JSON.parse(data).loginrestaurantID}",
          "apiType":"Android",
          "apiVersion":"1.0",
          "wokinghrs":${JSON.stringify(JSON.parse(data).wokinghrs)}
        }]`;
        form.append('json', json);
        return this.http
            .post<{
                data: Restaurant[];
                status: string;
                message: string;
            }[]>(`${environment.apiBaseUrl}${this.addWrUrl}`, form, this.httpOptions)
            .pipe(map(r => {
                sessionStorage.setItem('Menu', JSON.stringify({
                    restaurantAddress: r[0].data[0].restaurantAddress,
                    restaurantCreatedDate: r[0].data[0].restaurantCreatedDate,
                    restaurantDineinService: r[0].data[0].restaurantDineinService,
                    restaurantEmail: r[0].data[0].restaurantEmail,
                    restaurantFavoriteCount: r[0].data[0].restaurantFavoriteCount,
                    restaurantFssiLicNo: r[0].data[0].restaurantFssiLicNo,
                    restaurantGST: r[0].data[0].restaurantGST,
                    restaurantID: r[0].data[0].restaurantID,
                    restaurantLogo: r[0].data[0].restaurantLogo,
                    restaurantMarkup: r[0].data[0].restaurantMarkup,
                    restaurantMobile: r[0].data[0].restaurantMobile,
                    restaurantName: r[0].data[0].restaurantName,
                    restaurantPackingCharges: r[0].data[0].restaurantPackingCharges,
                    restaurantPickupService: r[0].data[0].restaurantPickupService,
                    restaurantTables: r[0].data[0].restaurantTables,
                    restaurantTagLine: r[0].data[0].restaurantTagLine,
                    workinghours: r[0].data[0].workinghours,
                    role: Role.Restaurant
                }));
                this.userSubject.next({
                    restaurantAddress: r[0].data[0].restaurantAddress,
                    restaurantCreatedDate: r[0].data[0].restaurantCreatedDate,
                    restaurantDineinService: r[0].data[0].restaurantDineinService,
                    restaurantEmail: r[0].data[0].restaurantEmail,
                    restaurantFavoriteCount: r[0].data[0].restaurantFavoriteCount,
                    restaurantFssiLicNo: r[0].data[0].restaurantFssiLicNo,
                    restaurantGST: r[0].data[0].restaurantGST,
                    restaurantID: r[0].data[0].restaurantID,
                    restaurantLogo: r[0].data[0].restaurantLogo,
                    restaurantMarkup: r[0].data[0].restaurantMarkup,
                    restaurantMobile: r[0].data[0].restaurantMobile,
                    restaurantName: r[0].data[0].restaurantName,
                    restaurantPackingCharges: r[0].data[0].restaurantPackingCharges,
                    restaurantPickupService: r[0].data[0].restaurantPickupService,
                    restaurantTables: r[0].data[0].restaurantTables,
                    restaurantTagLine: r[0].data[0].restaurantTagLine,
                    workinghours: r[0].data[0].workinghours,
                    role: Role.Restaurant
                });
                return {
                    status: r[0].status,
                    message: r[0].message
                };
            }), retry(2), shareReplay(), catchError(this.handleError));
    }

    editWorkingHour = (data: string): Observable<{
        status: string;
        message: string;
    }> => {
        const form = new FormData();
        const json = `[{
          "languageID":"${JSON.parse(data).languageID}",
          "loginrestaurantID":"${JSON.parse(data).loginrestaurantID}",
          "apiType": "Android",
          "apiVersion": "1.0",
          "wokinghrs":${JSON.stringify(JSON.parse(data).wokinghrs)}
        }]`;
        form.append('json', json);
        return this.http
            .post<{
                data: Restaurant[];
                status: string;
                message: string;
            }[]>(`${environment.apiBaseUrl}${this.editWrUrl}`, form, this.httpOptions)
            .pipe(map(r => {
                sessionStorage.setItem('Menu', JSON.stringify({
                    restaurantAddress: r[0].data[0].restaurantAddress,
                    restaurantCreatedDate: r[0].data[0].restaurantCreatedDate,
                    restaurantDineinService: r[0].data[0].restaurantDineinService,
                    restaurantEmail: r[0].data[0].restaurantEmail,
                    restaurantFavoriteCount: r[0].data[0].restaurantFavoriteCount,
                    restaurantFssiLicNo: r[0].data[0].restaurantFssiLicNo,
                    restaurantGST: r[0].data[0].restaurantGST,
                    restaurantID: r[0].data[0].restaurantID,
                    restaurantLogo: r[0].data[0].restaurantLogo,
                    restaurantMarkup: r[0].data[0].restaurantMarkup,
                    restaurantMobile: r[0].data[0].restaurantMobile,
                    restaurantName: r[0].data[0].restaurantName,
                    restaurantPackingCharges: r[0].data[0].restaurantPackingCharges,
                    restaurantPickupService: r[0].data[0].restaurantPickupService,
                    restaurantTables: r[0].data[0].restaurantTables,
                    restaurantTagLine: r[0].data[0].restaurantTagLine,
                    workinghours: r[0].data[0].workinghours,
                    role: Role.Restaurant
                }));
                this.userSubject.next({
                    restaurantAddress: r[0].data[0].restaurantAddress,
                    restaurantCreatedDate: r[0].data[0].restaurantCreatedDate,
                    restaurantDineinService: r[0].data[0].restaurantDineinService,
                    restaurantEmail: r[0].data[0].restaurantEmail,
                    restaurantFavoriteCount: r[0].data[0].restaurantFavoriteCount,
                    restaurantFssiLicNo: r[0].data[0].restaurantFssiLicNo,
                    restaurantGST: r[0].data[0].restaurantGST,
                    restaurantID: r[0].data[0].restaurantID,
                    restaurantLogo: r[0].data[0].restaurantLogo,
                    restaurantMarkup: r[0].data[0].restaurantMarkup,
                    restaurantMobile: r[0].data[0].restaurantMobile,
                    restaurantName: r[0].data[0].restaurantName,
                    restaurantPackingCharges: r[0].data[0].restaurantPackingCharges,
                    restaurantPickupService: r[0].data[0].restaurantPickupService,
                    restaurantTables: r[0].data[0].restaurantTables,
                    restaurantTagLine: r[0].data[0].restaurantTagLine,
                    workinghours: r[0].data[0].workinghours,
                    role: Role.Restaurant
                });
                return {
                    status: r[0].status,
                    message: r[0].message
                };
            }), retry(2), shareReplay(), catchError(this.handleError));
    }

    logout = () => {
        // remove user from local storage to log user out
        sessionStorage.removeItem('Menu');
        this.userSubject.next(null);
        if (window.sessionStorage) { sessionStorage.clear(); }
        this.router.navigate(['/'], { replaceUrl: true });
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
