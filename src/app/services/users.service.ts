import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorHandlerService } from './error-handler-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:5276/api/';

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'Users').pipe(
      catchError(this.handleError.bind(this))
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + 'Users/' + id).pipe(
    catchError(this.handleError.bind(this))
  );
  }
  
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'Users', user).pipe(
    catchError(this.handleError.bind(this))
  );
  }
  
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.apiUrl + 'Users/' + user.id, user).pipe(
    catchError(this.handleError.bind(this))
  );
  }
  
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + 'Users/' + id).pipe(
    catchError(this.handleError.bind(this))
  );
  }

  
  private handleError(error: HttpErrorResponse) {
    this.errorHandler.handleError(error);
    return throwError(error);
  }
}