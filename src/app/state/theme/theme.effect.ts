import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ChangeTheme } from './theme.action';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class ThemeEffect {
  actions$ = inject(Actions);

  saveTheme$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ChangeTheme), 
      tap(action => {
        localStorage.setItem('theme', action.theme);
      })
    ),
    { dispatch: false } // No further action is dispatched
  );
}
