import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ChangeLanguage } from './language.action';

@Injectable()
export class LanguageEffect {
  actions$ = inject(Actions)

  saveLanguage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ChangeLanguage),
        tap(action => {
          localStorage.setItem('language', action.lng);
        })
      ),
    { dispatch: false } // This effect does not dispatch an action
  );
}
