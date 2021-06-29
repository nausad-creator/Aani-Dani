import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { shareReplay, retry, catchError, map } from 'rxjs/operators';
import { Category, Language, ProductList, Upload } from './interface';
const CACHE_SIZE = 1;
@Injectable({
  providedIn: 'root',
})
export class RootService {
  categories$: Observable<Category[]>;
  productList$: Observable<ProductList[]>;
  language$: Observable<Language[]>;
  // url's
  languageUrl = '/language/get-language-list';
  categoryUrl = '/category/get-category-list';
  uploadFileUrl = '/users/file-upload';
  productListUrl = '/products/get-product-list';
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
  // uploading files
  uploadFile = (fileData: any): Observable<Upload[]> => {
    const form = new FormData();
    const json = `[{
      "loginuserID":"${fileData.loginuserID}",
      "apiType": "Android",
      "apiVersion": "1.0"
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
