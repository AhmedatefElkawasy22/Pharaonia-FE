import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountServiceService } from '../../../Services/account/account-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';
import { countryCodesData } from '../../Shared/helpers';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgFor, FormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent   {
  countryCodes : any;
  UserRegisterForm: FormGroup;
  codeOfCountry: string = '';
  isDarkMode!:boolean;

  constructor(
    private _accountService: AccountServiceService,
    private _router: Router,
    private dialog: MatDialog,
    private _Store: Store<AppState>
  ) {
    this.countryCodes= countryCodesData.countryCodes;
    //check theme
    this._Store.select(state=>state.theme).subscribe(theme=>{
      this.isDarkMode = theme === 'dark' ? true : false;
    })
    //form
    this.UserRegisterForm = new FormGroup(
      {
        Name: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]{3,50}$'),
          Validators.minLength(5),
          Validators.maxLength(50),
        ]),
        PhoneNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]{10,15}$'),
        ]),
        Email: new FormControl('', [Validators.required, Validators.email]),
        Password: new FormControl('', [
          Validators.required,
          Validators.minLength(8), 
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-={}|\\[\\]:";\'<>?,./]).{8,}$'
          ),
        ]),
        ConfirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }
  
  //ensure password and confirmPassword match
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('Password')?.value;
    const confirmPassword = control.get('ConfirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword ? { passwordMismatch: true }: null;
  };
  
  onSubmit() {
    if (this.UserRegisterForm.valid) {
      const phoneNumber = this.UserRegisterForm.get('PhoneNumber')?.value;
      const modifiedPhoneNumber = phoneNumber
        ? this.codeOfCountry + phoneNumber
        : '';
      const originalPhoneNumber = phoneNumber;

      this.UserRegisterForm.get('PhoneNumber')?.setValue(modifiedPhoneNumber);

      // console.log("data as json", this.UserRegisterForm.value)

      this._accountService.register(this.UserRegisterForm.value).subscribe(
        (response) => {
          console.log('Admin registered successfully:', response );
          this.openAlertDialog(
            'Success',
            response 
          );
          setTimeout(() => {
            this._router.navigateByUrl('/admin');
          }, 5000);
          
        },
        (error) => {
          // console.error('Registration failed:', error);
          this.openAlertDialog(
            'Error',
            error.error
          );
          // Reset the phone number back to the original value
          this.UserRegisterForm.get('PhoneNumber')?.setValue(
            originalPhoneNumber
          );
        }
      );
    } else { 
      this.openAlertDialog('Error', 'Please fill in the data correctly.');
    }
  }

  openAlertDialog(title: string, message: string) {
    this.dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
