import { createReducer, on } from "@ngrx/store";
import { ChangeTheme } from "./theme.action";

let initialState = (localStorage.getItem('theme') || 'light');

export const ThemeReducer = createReducer(
    initialState,
    on(ChangeTheme, (state , {theme}) => theme)
)