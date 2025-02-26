import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChangeTheme } from '../../../state/theme/theme.action';
import { AsyncPipe } from '@angular/common';
import { AppState } from '../../../state/app.state';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isDarkMode !: boolean;
  Theme$ !: Observable<string>;

  constructor(private _router: Router,private _store: Store<AppState>) {
    this.Theme$ = this._store.select("theme");
  }

  ngOnInit(): void {
    // Check the saved theme in localStorage
     this.Theme$.subscribe(value => {
      this.isDarkMode = value === 'dark';
      document.documentElement.classList.toggle('dark', value === 'dark');
    });
  }

  toggleDarkMode(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.isDarkMode = isChecked;

    if (isChecked) {
      document.documentElement.classList.add('dark');
      this._store.dispatch(ChangeTheme({theme: 'dark'}));
    } else {
      document.documentElement.classList.remove('dark'); 
      this._store.dispatch(ChangeTheme({theme: 'light'}));
    }
  }


  closeDropdown(detailsElement: HTMLDetailsElement) {
    setTimeout(() => {
      detailsElement.open = false;
    }, 100);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  

}
