import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public saveUserById(id: number): Observable<boolean> {
    return of(id % 2 === 0).pipe(delay(300));
  }
}
