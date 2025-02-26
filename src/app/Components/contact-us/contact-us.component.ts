import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { ContactusService } from '../../Services/contactUs/contactus.service';
import { ContactUs } from '../../Models/contact-us';
import { countryCodesData } from '../Shared/helpers';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgFor, FormsModule,NgClass],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent implements OnInit {
  countryCodes: any;
  ContactUsForm: FormGroup;
  codeOfCountry: string = '';
  contactUsData: ContactUs[] = [];
  isdark !:boolean

  constructor(
    private _ContactusService: ContactusService,
    private _router: Router,
    private _dialog: MatDialog,
    private _Store: Store<AppState>
  ) {
    this.countryCodes = countryCodesData.countryCodes;
    //check theme
    this._Store.select(state=>state.theme).subscribe(theme=>{
      this.isdark = theme === 'dark' ? true : false;
    })
    this.ContactUsForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]{3,50}$'),
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10,15}$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [
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
    if (this.ContactUsForm.valid) {
      const phoneNumber = this.ContactUsForm.get('phone')?.value;
      const modifiedPhoneNumber = phoneNumber
        ? this.codeOfCountry + phoneNumber
        : '';
      const originalPhoneNumber = phoneNumber;

      this.ContactUsForm.get('phone')?.setValue(modifiedPhoneNumber);

      // console.log('data as json', this.ContactUsForm.value);

      this._ContactusService.AddContactUs(this.ContactUsForm.value).subscribe(
        (response) => {
          //console.log('Admin registered successfully:', response);
          this.openAlertDialog('Success', "Your contact request has been received, you will be contacted.");
          setTimeout(() => {
            this._router.navigateByUrl('/home');
          }, 3000);
        },
        (error) => {
        // console.error('contact failed:', error);
          this.openAlertDialog('Error', "An error occurred, try again later.");
          // Reset the phone number back to the original value
          this.ContactUsForm.get('phone')?.setValue(originalPhoneNumber);
        }
      );
    } else {
      this.openAlertDialog('Error', 'Please fill in the data correctly.');
    }
  }

  openAlertDialog(title: string, message: string) {
    this._dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
