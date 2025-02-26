import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'; 
import { FormsModule } from '@angular/forms';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ThemeReducer } from './state/theme/theme.reducer';
import { provideEffects } from '@ngrx/effects';
import { ThemeEffect } from './state/theme/theme.effect';
import { LanguageReducer } from './state/language/language.reducer';
import { LanguageEffect } from './state/language/language.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(StoreModule.forRoot({})), // it make sure store works before effects
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations(), 
    importProvidersFrom(FormsModule),
    provideStore({ theme: ThemeReducer, language: LanguageReducer }),
    provideEffects([ThemeEffect,LanguageEffect]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ]
};
