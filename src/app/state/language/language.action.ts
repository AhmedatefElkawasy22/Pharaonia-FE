import { createAction, props } from "@ngrx/store"



export const ChangeLanguage = createAction("ChangeLanguage",props<{lng:string}>());
