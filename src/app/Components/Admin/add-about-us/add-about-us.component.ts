import { Component, OnInit } from '@angular/core';
import { AddAboutUs } from '../../../Models/add-about-us';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AboutUsService } from '../../../Services/aboutUs/about-us.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-about-us',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './add-about-us.component.html',
  styleUrl: './add-about-us.component.css',
})
export class AddAboutUSComponent implements OnInit {
  AddAboutUsForm: FormGroup;

  constructor(
    private _AboutUsService: AboutUsService,
    private _router: Router
  ) {
    this.AddAboutUsForm = new FormGroup({
      text: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ,.]{5,500}$'),
      ]),
    });
  }
  ngOnInit() {
    const theme = localStorage.getItem('theme');
    // Check and apply theme from localStorage on init
    if (theme === 'dark' || localStorage.getItem('darkMode') === 'true') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  onSubmit() {
    if (this.AddAboutUsForm.valid) {
      // console.log('data as json', this.ContactUsForm.value);

      this._AboutUsService.AddAboutUs(this.AddAboutUsForm.value).subscribe(
        (response) => {
          //console.log('Add AboutUs successfully:', response);

          setTimeout(() => {
            this._router.navigateByUrl('/home');
          }, 3000);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }
}
