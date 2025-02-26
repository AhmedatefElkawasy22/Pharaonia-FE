import { createAction, props } from "@ngrx/store"

export const ChangeTheme = createAction(
    'Change Theme',
    props<{ theme: string }>()
  );
