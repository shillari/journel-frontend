import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { response } from "express";
import { catchError, Observable, tap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JournelService {
  private apiUrl = 'http://localhost:8081/api/v1';

  constructor(private http: HttpClient) { }

  /**
   * Logs in the user
   * 
   * @param email 
   * @param password 
   * @returns the response from server API.
   */
  login(email: string, password: string): Observable<any> {
    const userDetails = {
      'email': email,
      'password': password
    }

    return this.http.post(this.apiUrl + '/auth/authenticate', userDetails).pipe(
      tap((response: any) => localStorage.setItem('token', response.token)),
      catchError((err) => this.handleError(err))
    );
  }

  /**
   * Signup an user.
   * 
   * @param email 
   * @param username 
   * @param password 
   * @returns the response from server API.
   */
  register(email: string, username: string, password: string): Observable<any> {
    const userDetails = {
      'email': email,
      'username': username,
      'password': password
    }

    return this.http.post(this.apiUrl + '/auth/register', userDetails).pipe(
      catchError(err => this.handleError(err))
    );
  }

  /**
   * Get Entry by Id and UserId
   * 
   * @param userId 
   * @param entryId 
   * @returns the response from server API.
   */
  getEntryById(userId: number, entryId: number): Observable<any> {
    return this.http.get(this.apiUrl + '/entry',
      {
        params: new HttpParams({
          fromObject: { userId: userId, entryId: entryId }
        })
      }
    ).pipe(
      catchError(err => {
        console.log('Error to get entry: ' + entryId
          + '. ' + err);
        return throwError(() => new Error('Error to get entry: ' + entryId
          + '. ' + err));
      })
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body: ${error.error}`
      );
    }
    return throwError(() => error);
  }
}