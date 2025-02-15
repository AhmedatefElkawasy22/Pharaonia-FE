import { Component } from '@angular/core';
import { AccountServiceService } from '../../../Services/account/account-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  
  ResetPasswordForm: FormGroup;

  constructor(
    private _accountService: AccountServiceService,
    private _router: Router,
    private _dialog: MatDialog
  ) {
    this.ResetPasswordForm = new FormGroup(
      {
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8), 
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-={}|\\[\\]:";\'<>?,./]).{8,}$'
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }
  //ensure password and confirmPassword match
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return newPassword && confirmPassword && newPassword !== confirmPassword ? { passwordMismatch: true }: null;
  };
 
  ngOnInit() {
    const theme = localStorage.getItem('theme');
    // Check and apply theme from localStorage on init
    if (theme === 'dark' || localStorage.getItem('darkMode') === 'true') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  
  // Toggle dark mode on button click
  toggleDarkMode() {
    const isDarkMode = document.documentElement.classList.toggle('dark');
    // Store the current mode in localStorage
    localStorage.setItem('darkMode', isDarkMode.toString());
    // Optionally, store the theme key for easier access
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }
  
  
  onSubmit() {
    if (!this.ResetPasswordForm.valid)
   {
    this.openAlertDialog('Error', 'Please fill in the data correctly.');
   }

    const token = localStorage.getItem("tokenReset");
    const email = localStorage.getItem("email");
    if(!token || token==="" || !email || email==="")
    {
      this.openAlertDialog("Error","A problem occurred, try again later.")
      setTimeout(() => {
        this._router.navigateByUrl("/admin/forgot-password");
      }, 3000);
    }
    const Body = {
      ...this.ResetPasswordForm.value,
      token: token,
      email: email
    }
      this._accountService.ResetPassword(Body).subscribe(
        (response) => {
          // console.log('Reset Password successfully:', response );
          this.openAlertDialog(
            'Success',
            response 
          );
          localStorage.removeItem("tokenReset");
          localStorage.removeItem("email");
          setTimeout(() => {
            this._router.navigateByUrl('/admin/login');
          }, 4000);
          
        },
        (error) => {
          // console.error('Reset Password failed:', error);
          this.openAlertDialog(
            'Error',
            error.error
          );
        }
      );
    
  }

  openAlertDialog(title: string, message: string) {
    this._dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
