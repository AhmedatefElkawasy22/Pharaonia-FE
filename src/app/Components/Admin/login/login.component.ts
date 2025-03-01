import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AccountServiceService } from '../../../Services/account/account-service.service';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule,FormsModule, NgIf , NgClass,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    
  UserLoginForm: FormGroup;
  isdark !:boolean

  constructor(
    private _accountService: AccountServiceService,
    private _dialog: MatDialog,
    private _router: Router,
    private _Store: Store<AppState>
  ) {
    this._Store.select(state=>state.theme).subscribe(theme=>{
      this.isdark = theme === 'dark' ? true : false;
    })
    this.UserLoginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
     
    if (this.UserLoginForm.valid) {
      this._accountService.Login(this.UserLoginForm.value).subscribe(
        (data) => {
          this.openAlertDialog('Success', 'wellcome 😊');
          localStorage.setItem('token', data);
            this._accountService.isLoggedin.update(() => true);
            this._router.navigate(['/admin/home']);
        },
        (error) => {
          //  console.log('err', error);
          this.openAlertDialog('Error', error.error);
          this._router.navigate(['/admin/login']);
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
