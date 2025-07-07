import { Component, inject } from '@angular/core';
import { from, mergeMap, Subject, switchMap, toArray } from 'rxjs';

import { UserService } from './user.service';

@Component({
  standalone: true,
  selector: 'app',
  template: `
    <button (click)="save$.next()">Сохранить</button>

    @if (results) { 
      <div>
        <ul>
          @for(result of results; track $index) {
            <li>
              id {{arrayId[$index]}}: {{result ? "успех" : "ошибка"}}
            </li>
          }
        </ul>
      </div>
     }
  `,
  providers: [UserService],
})
export class AppComponent {
  protected readonly save$: Subject<void> = new Subject<void>();

  protected readonly arrayId: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  private readonly userService: UserService = inject(UserService);

  protected results: boolean[] | null = null;

  constructor() {
    this.save$
      .pipe(
        switchMap(() =>
          from(this.arrayId).pipe(
            mergeMap((id) => this.userService.saveUserById(id)),
            toArray()
          )
        )
      )
      .subscribe(results => {
        this.results = results
        console.log(results)
      });
  }
}
