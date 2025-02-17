import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AboutUsService } from '../../../Services/aboutUs/about-us.service';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-about-us',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgClass],
  templateUrl: './add-about-us.component.html',
  styleUrl: './add-about-us.component.css',
})
export class AddAboutUSComponent implements OnInit {
  AddAboutUsForm: FormGroup;
  IsDark !: boolean;

  constructor(
    private _AboutUsService: AboutUsService,
    private _router: Router,
    private _dialog: MatDialog
  ) {
    this.IsDark = localStorage.getItem('theme') === 'dark';
    this.AddAboutUsForm = new FormGroup({
      text: new FormControl('', [
        Validators.required,
        Validators.maxLength(1000),
        Validators.minLength(5),
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

      this._AboutUsService.AddAboutUs(this.AddAboutUsForm.value).subscribe(
        (response) => {
          this.openAlertDialog('Success', 'Add About US successfully');
          setTimeout(() => {
            this._router.navigateByUrl('/admin/home');
          }, 3000);
        },
        (error) => {
          // console.error('Error:', error);
          this.openAlertDialog('Error', 'Failed to add About US, please try again later');
        }
      );
    }
  }
  openAlertDialog(title: string, message: string) {
    this._dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
