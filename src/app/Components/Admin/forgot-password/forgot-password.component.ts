import { Component } from '@angular/core';
import { AccountServiceService } from '../../../Services/account/account-service.service';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountServiceService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.forgotPasswordForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  async sendOtp() {
    if (this.forgotPasswordForm.invalid) {
      Object.keys(this.forgotPasswordForm.controls).forEach(key => {
        const control = this.forgotPasswordForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
      return;
    }

    this.isSubmitting = true;
    this.accountService.ForgotPassword(this.forgotPasswordForm.value.email).subscribe(
      (res)=>{
        this.openAlertDialog("Success", res);
        localStorage.setItem("email", this.forgotPasswordForm.value.email);
        this.isSubmitting = false;
        setTimeout(() => {
          this.router.navigate(['/admin/verify-otp']);
        }, 3000);
      }
      ,(error)=>{
        console.error(error);
        this.openAlertDialog("Error", error.error);
        this.isSubmitting = false;
      }
    )

  }

  openAlertDialog(title: string, message: string) {
    this.dialog.open(AlertDialogComponent, {
      data: { title, message },
      width: '300px'
    });
  }
}
