import { createReducer, on } from "@ngrx/store";
import { ChangeLanguage } from "./language.action";

let initialState = 'EN';

export const LanguageReducer = createReducer(
    initialState,
    on(ChangeLanguage, (state , Actions) => Actions.lng)
        
)