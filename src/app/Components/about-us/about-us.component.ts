import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AboutUsService } from '../../Services/aboutUs/about-us.service';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent implements OnInit {
  IsDarkMode!: boolean;
  aboutUs: string = '';

  constructor(private _aboutUsService: AboutUsService,private _Store: Store<AppState>) {
    //check theme
    this._Store.select(state => state.theme).subscribe(theme => {
      this.IsDarkMode = theme === 'dark' ? true : false;
    })
  }

  ngOnInit(): void {
    this._aboutUsService.GetAboutUs().subscribe({
      next: (data) => {
        this.aboutUs = data;
      },
      error: (err) => {
        console.error('Error fetching about us:', err);
      },
    });
          
  }

 
}
