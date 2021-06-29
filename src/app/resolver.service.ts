import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, shareReplay } from 'rxjs/operators';
import { Category } from './interface';
const CACHE_SIZE = 1;
@Injectable()
export class CategoryResolver implements Resolve<Observable<Category[]>> {
  categories$: Observable<Category[]>;
  categoryUrl = '/category/get-category-list';

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({}),
  };
  resolve(): Observable<Category[]> {
    return this.categories;
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