import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { shareReplay, retry, catchError, map } from 'rxjs/operators';
import { Banner, Category, Language, Nationality, Orders, ProductList, Upload } from './interface';
const CACHE_SIZE = 1;
@Injectable({
  providedIn: 'root',
})
export class RootService {
  categories$: Observable<Category[]>;
  nationalities$: Observable<Nationality[]>;
  productList$: Observable<ProductList[]>;
  language$: Observable<Language[]>;
  // url's
  languageUrl = '/language/get-language-list';
  categoryUrl = '/category/get-category-list';
  uploadFileUrl = '/users/file-upload';
  productListUrl = '/products/get-product-list';
  ordersUrl = '/orders/my-orders';
  userHomeUrl = '/users/user-home';
  cmsUrl = '/cmspage/get-cmspage';
  faqUrl = '/faq/faq-list';
  nationalityUrl = '/nationality/get-nationality-list';
  // Behavior-subjects
  searchWord: Subject<string | boolean> = new BehaviorSubject<string | boolean>('');
  searchWord$ = this.searchWord.asObservable();

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({}),
  };
  // User
  getSession = (): string | null => {
    return sessionStorage.getItem('Assistant');
  }
  isAuthenticated(): boolean {
    const token = this.getSession();
    return typeof (token) === 'string' ? true : false;
  }
  get language(): Observable<Language[]> {
    if (!this.language$) {
      this.language$ = this.getLanguage().pipe(
        shareReplay(CACHE_SIZE));
    }
    return this.language$;
  }
  home = (temp: string): Observable<{
    banners: Banner[];
    category: Category[];
    bestsealling: ProductList[];
  }[]> => {
    const form = new FormData();
    const json = `[{
     "loginuserID":"${JSON.parse(temp).loginuserID}",
     "languageID":"${JSON.parse(temp).languageID}",
     "cityName":"${JSON.parse(temp).cityName}",
     "latitude":"${JSON.parse(temp).latitude}",
     "longitude":"${JSON.parse(temp).longitude}",
     "apiType":"Android",
     "apiVersion":"1.0"
    }]`;
    form.append('json', json);
    return this.http
      .post<{
        banners: Banner[];
        category: Category[];
        bestsealling: ProductList[];
        message: string;
        status: string;
      }[]>(`${this.userHomeUrl}`, form, this.httpOptions)
      .pipe(map(r => r), shareReplay(), retry(2), catchError(this.handleError));
  }
  getLanguage = (): Observable<Language[]> => {
    const form = new FormData();
    const json = `[{
     "loginuserID":"0",
     "languageID":"1",
     "apiType":"Android",
     "apiVersion":"1.0",
     "page":0,
     "pagesize":10
    }]`;
    form.append('json', json);
    return this.http
      .post<{
        date: Language[];
        message: string;
        status: string;
      }>(`${this.languageUrl}`, form, this.httpOptions)
      .pipe(map(r => r[0].data), shareReplay(), retry(2), catchError(this.handleError));
  }
  get nationality(): Observable<Nationality[]> {
    if (!this.nationalities$) {
      this.nationalities$ = this.getNationality('').pipe(
        shareReplay(CACHE_SIZE));
    }
    return this.nationalities$;
  }
  getNationality = (searchWord: string): Observable<Nationality[]> => {
    const form = new FormData();
    const json = `[{
     "loginuserID":"0",
     "searchWord":"${searchWord}",
     "languageID":"1",
     "apiType":"Android",
     "apiVersion":"1.0"
    }]`;
    form.append('json', json);
    return this.http
      .post<{
        date: Nationality[];
        message: string;
        status: string;
      }>(`${this.nationalityUrl}`, form, this.httpOptions)
      .pipe(map(r => r[0].data), shareReplay(), retry(2), catchError(this.handleError));
  }
  get categories(): Observable<Category[]> {
    if (!this.categories$) {
      this.categories$ = this.getCategories('').pipe(
        shareReplay(CACHE_SIZE));
    }
    return this.categories$;
  }
  getCategories = (searchWord: string): Observable<Category[]> => {
    const form = new FormData();
    const json = `[{
     "loginuserID":"0",
     "searchWord":"${searchWord}",
     "languageID":"1",
     "apiType":"Android",
     "apiVersion":"1.0"
    }]`;
    form.append('json', json);
    return this.http
      .post<{
        date: Category[];
        message: string;
        status: string;
      }>(`${this.categoryUrl}`, form, this.httpOptions)
      .pipe(map(r => r[0].data), shareReplay(), retry(2), catchError(this.handleError));
  }
  productList(temp: string): Observable<ProductList[]> {
    if (!this.productList$) {
      this.productList$ = this.productLists(temp).pipe(
        shareReplay(CACHE_SIZE));
    }
    return this.productList$;
  }
  productLists = (temp: string): Observable<ProductList[]> => {
    const form = new FormData();
    const json = `[{
     "loginuserID":"${JSON.parse(temp).loginuserID}",
     "languageID":"${JSON.parse(temp).languageID}",
     "productID":"${JSON.parse(temp).productID}",
     "subcatID":"${JSON.parse(temp).subcatID}",
     "categoryID":"${JSON.parse(temp).categoryID}",
     "searchkeyword":"${JSON.parse(temp).searchkeyword}",
     "page":"${JSON.parse(temp).page}",
     "pagesize":"${JSON.parse(temp).pagesize}",
     "cityName":"${JSON.parse(temp).cityName}",
     "apiType":"Android",
     "apiVersion":"1.0",
     "minPrice":"${JSON.parse(temp).minPrice}",
     "maxPrice":"${JSON.parse(temp).maxPrice}",
     "sortBy":"${JSON.parse(temp).sortBy}"
    }]`;
    form.append('json', json);
    return this.http
      .post<{
        date: ProductList[];
        message: string;
        status: string;
      }>(`${this.productListUrl}`, form, this.httpOptions)
      .pipe(map(r => r[0].data), shareReplay(), retry(2), catchError(this.handleError));
  }
  orders = (temp: string): Observable<Orders[]> => {
    const form = new FormData();
    const json = `[{
     "orderID":"${JSON.parse(temp).orderID}",
     "restaurantID":"${JSON.parse(temp).restaurantID}",
     "loginuserID":"${JSON.parse(temp).loginuserID}",
     "orderTab":"${JSON.parse(temp).orderTab}",
     "page":"${JSON.parse(temp).page}",
     "apiType":"Android",
     "apiVersion":"1.0",
     "pagesize":"${JSON.parse(temp).pagesize}",
     "userType":"${JSON.parse(temp).userType}",
     "languageID":"${JSON.parse(temp).languageID}",
     "searchkeyword":"${JSON.parse(temp).searchkeyword}"
    }]`;
    form.append('json', json);
    return this.http
      .post<{
        date: Orders[];
        message: string;
        status: string;
      }>(`${this.ordersUrl}`, form, this.httpOptions)
      .pipe(map(r => r[0].data), shareReplay(), retry(2), catchError(this.handleError));
  }
  cms = (code: string): Observable<{
    cmspageName: string;
    cmspageContents: string;
  }> => {
    const form = new FormData();
    const json = `[{
     "loginuserID":"0",
     "languageID":"1",
     "cmspageConstantCode":"${code}",
     "apiType":"Android",
     "apiVersion":"1.0"
    }]`;
    form.append('json', json);
    return this.http
      .post<{
        data: [{
          cmspageName: string;
          cmspageContents: string;
        }],
        status: string;
        message: string
      }[]>(`${this.cmsUrl}`, form, this.httpOptions)
      .pipe(map(r => r[0].data[0]), shareReplay(), retry(2), catchError(this.handleError));
  }
  faqs = (): Observable<{
    faqID: string;
    faqQuestion: string;
    faqAnswer: string;
  }[]> => {
    const form = new FormData();
    const json = `[{
       "languageID":"1",
       "faqtypeID":"",
       "apiVersion":"1.0",
       "apiType":"Android"
    }]`;
    form.append('json', json);
    return this.http
      .post<{
        data: {
          faqID: string;
          faqQuestion: string;
          faqAnswer: string;
        }[],
        status: string;
        message: string
      }[]>(`${this.faqUrl}`, form, this.httpOptions)
      .pipe(map(r => r[0].data), shareReplay(), retry(2), catchError(this.handleError));
  }
  // uploading files
  uploadFile = (fileData: any): Observable<Upload[]> => {
    const form = new FormData();
    const json = `[{
     "loginuserID":"${fileData.loginuserID}",
     "apiType":"Android",
     "apiVersion":"1.0"
    }]`;
    form.append('json', json);
    form.append('FileField', fileData.file);
    form.append('fileName', fileData.fileName);
    form.append('FilePath', fileData.filePath);
    return this.http.post<Upload[]>(`${this.uploadFileUrl}`, form, this.httpOptions)
      .pipe(shareReplay(), retry(2), catchError(this.handleError));
  }
  // ErrorHandling
  handleError = (error: {
    error: { messages: string };
    status: string;
    messsage: string;
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
