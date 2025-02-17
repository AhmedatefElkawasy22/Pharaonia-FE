import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AboutUsService } from '../../../Services/aboutUs/about-us.service';
import { Router } from '@angular/router';
import { NgIf, Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-update-about-us',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './update-about-us.component.html',
  styleUrl: './update-about-us.component.css',
})
export class UpdateAboutUSComponent implements OnInit {
  UpdateAboutUsForm: FormGroup;
  oldValue !: string ;

  constructor(
    private _AboutUsService: AboutUsService,
    private _router: Router,
    private _dialog: MatDialog,
    private _location: Location
  ) {
    this.UpdateAboutUsForm = new FormGroup({
      text: new FormControl('', [
        Validators.required,
        Validators.maxLength(1000),
        Validators.minLength(5),
      ]),
    });
  }

  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || localStorage.getItem('darkMode') === 'true') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Fetch old "About Us" text and update form value
    this._AboutUsService.GetAboutUs().subscribe({
      next: (response) => {
        this.UpdateAboutUsForm.patchValue({ text: response });
        this.oldValue = response;
      },
      error: (error) => {
        this.openAlertDialog('Error', 'There is a problem, please try again later');
        setTimeout(() => {
          this._location.back();
        }, 2000);
      }
    });
  }

  onSubmit() {
    if (this.UpdateAboutUsForm.valid && (this.UpdateAboutUsForm.value != this.oldValue)) {
      this._AboutUsService.updateAboutUs(this.UpdateAboutUsForm.value).subscribe({
        next: (response) => {
          this.openAlertDialog('Success', 'Update About Us successfully');
          setTimeout(() => {
            this._router.navigateByUrl('/admin/home');
          }, 3000);
        },
        error: (error) => {
          this.openAlertDialog('Error', 'There is a problem, please try again later');
          setTimeout(() => {
            this._location.back();
          }, 2000);
        }
      });
    }
  }

  openAlertDialog(title: string, message: string) {
    this._dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}