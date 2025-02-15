import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { AccountServiceService } from '../../../Services/account/account-service.service';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { interval, Subscription, takeWhile } from 'rxjs';
import { FormsModule  } from '@angular/forms';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent implements AfterViewInit,OnDestroy  {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  isSubmitting = false;
  isResending = false;
  cooldownTime = 0;
  private timerSubscription?: Subscription;
  private readonly COOLDOWN_DURATION = 120;
  
  constructor(
    private accountService: AccountServiceService,
    private dialog: MatDialog,
    private location: Location,
    private router: Router
  ) {
    const cooldownEndTime = localStorage.getItem('otpCooldownEnd');
    if (cooldownEndTime) {
      const remainingTime = Math.ceil((parseInt(cooldownEndTime) - Date.now()) / 1000);
      if (remainingTime > 0) {
        this.startCooldownTimer(remainingTime);
      } else {
        localStorage.removeItem('otpCooldownEnd');
      }
    }
  }

  ngOnDestroy() {
    this.timerSubscription?.unsubscribe();
  }

  private startCooldownTimer(duration: number) {
    this.cooldownTime = duration;
    
    // Store the cooldown end time
    const endTime = Date.now() + (duration * 1000);
    localStorage.setItem('otpCooldownEnd', endTime.toString());

    this.timerSubscription?.unsubscribe();
    this.timerSubscription = interval(1000)
      .pipe(takeWhile(() => this.cooldownTime > 0))
      .subscribe(() => {
        this.cooldownTime--;
        if (this.cooldownTime === 0) {
          localStorage.removeItem('otpCooldownEnd');
        }
      });
  }

  ngAfterViewInit() {
    // Focus first input on component load
    setTimeout(() => {
      this.otpInputs.first.nativeElement.focus();
    });
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      input.value = '';
      return;
    }

    input.classList.add('valid');
    // Move to next input if value is entered
    if (value && index < 5) {
      this.otpInputs.get(index + 1)?.nativeElement.focus();
    }
    
    // Auto verify if all inputs are filled
    if (this.isOTPComplete()) {
      this.verifyOTP();
    }
  }

  isInputFilled(index: number): boolean {
    const input = this.otpInputs?.get(index)?.nativeElement as HTMLInputElement;
    return input?.value?.length > 0;
  }
  
  onKeyDown(event: KeyboardEvent, index: number) {
    // Handle backspace
    if (event.key === 'Backspace') {
      const input = this.otpInputs.get(index)?.nativeElement as HTMLInputElement;
      input.classList.remove('valid');
      if (!input.value && index > 0) {
        this.otpInputs.get(index - 1)?.nativeElement.focus();
      }
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text');
    if (!pastedData) return;

    const numbers = pastedData.replace(/\D/g, '').slice(0, 6);
    this.otpInputs.forEach((input, index) => {
      input.nativeElement.value = numbers[index] || '';
    });

    if (this.isOTPComplete()) {
      this.verifyOTP();
    }
  }

  private isOTPComplete(): boolean {
    return this.getOTPValue().length === 6;
  }

  private getOTPValue(): string {
    return this.otpInputs
      ? this.otpInputs.map(input => input.nativeElement.value).join('')
      : '';
  }

  private clearOTPInputs() {
    this.otpInputs.forEach(input => input.nativeElement.value = '');
    this.otpInputs.first.nativeElement.focus();
  }

  async verifyOTP() {
    const otp = this.getOTPValue();
    if (otp.length !== 6) {
      this.openAlertDialog("Error", "Please enter a valid 6-digit OTP.");
      return;
    }

    const email = localStorage.getItem('email');
    if (!email) {
      this.openAlertDialog("Error", "There was a problem verifying OTP.");
      setTimeout(() => {
        this.location.back();
      }, 3000);
      return;
    }

    this.isSubmitting = true;
    try {
      const response = await this.accountService.VerifyOTP({ email, otp }).toPromise();
      this.openAlertDialog("Success", "OTP verified successfully.");
      localStorage.setItem("tokenReset", response);
      this.router.navigate(['/admin/reset-password']);
    } catch (error: any) {
      this.openAlertDialog("Error", error.error);
      this.clearOTPInputs();
    } finally {
      this.isSubmitting = false;
    }
  }

  async resetOTP() {
    if (this.cooldownTime > 0) {
      this.openAlertDialog("Info", `Please wait ${this.cooldownTime} seconds before requesting a new OTP.`);
      return;
    }

    const email = localStorage.getItem('email');
    if (!email) {
      this.openAlertDialog("Error", "There was a problem resending OTP.");
      setTimeout(() => {
        this.location.back();
      }, 3000);
      return;
    }

    this.isResending = true;
    try {
      const response = await this.accountService.ForgotPassword(email).toPromise();
      this.openAlertDialog("Success", response);
      this.clearOTPInputs();
      this.startCooldownTimer(this.COOLDOWN_DURATION);
    } catch (error: any) {
      this.openAlertDialog("Error", error.error);
    } finally {
      this.isResending = false;
    }
  }


  openAlertDialog(title: string, message: string) {
    this.dialog.open(AlertDialogComponent, {
      data: { title, message },
      width: '300px'
    });
  }

}
