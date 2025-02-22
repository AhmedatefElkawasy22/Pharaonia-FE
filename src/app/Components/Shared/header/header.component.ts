import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isDarkMode: boolean = false;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    // Check the saved theme in localStorage
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.isDarkMode = true;
      document.documentElement.classList.add('dark');
    } else {
      this.isDarkMode = false;
      document.documentElement.classList.remove('dark');
    }
  }

  toggleDarkMode(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.isDarkMode = isChecked;

    if (isChecked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
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
