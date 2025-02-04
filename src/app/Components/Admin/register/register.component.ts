import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountServiceService } from '../../../Services/account/account-service.service';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgFor, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  countryCodes = [
    { name: 'United States', code: '+1' },
    { name: 'United Kingdom', code: '+44' },
    { name: 'Egypt', code: '+20' },
    { name: 'Germany', code: '+49' },
    { name: 'India', code: '+91' },
    { name: 'Australia', code: '+61' },
    { name: 'Canada', code: '+1' },
    { name: 'France', code: '+33' },
    { name: 'Italy', code: '+39' },
    { name: 'Spain', code: '+34' },
    { name: 'Netherlands', code: '+31' },
    { name: 'Brazil', code: '+55' },
    { name: 'Russia', code: '+7' },
    { name: 'South Africa', code: '+27' },
    { name: 'Japan', code: '+81' },
    { name: 'China', code: '+86' },
    { name: 'Mexico', code: '+52' },
    { name: 'Saudi Arabia', code: '+966' },
    { name: 'Turkey', code: '+90' },
    { name: 'Sweden', code: '+46' },
    { name: 'Norway', code: '+47' },
    { name: 'Finland', code: '+358' },
    { name: 'Denmark', code: '+45' },
    { name: 'Belgium', code: '+32' },
    { name: 'Austria', code: '+43' },
    { name: 'Switzerland', code: '+41' },
    { name: 'New Zealand', code: '+64' },
    { name: 'Singapore', code: '+65' },
    { name: 'Hong Kong', code: '+852' },
    { name: 'Philippines', code: '+63' },
    { name: 'Malaysia', code: '+60' },
    { name: 'Thailand', code: '+66' },
    { name: 'Vietnam', code: '+84' },
    { name: 'Pakistan', code: '+92' },
    { name: 'Bangladesh', code: '+880' },
    { name: 'Iran', code: '+98' },
    { name: 'Iraq', code: '+964' },
    { name: 'Egypt', code: '+20' },
    { name: 'Jordan', code: '+962' },
    { name: 'Qatar', code: '+974' },
    { name: 'UAE', code: '+971' },
    { name: 'Kuwait', code: '+965' },
    { name: 'Oman', code: '+968' },
    { name: 'Lebanon', code: '+961' },
    { name: 'Bahrain', code: '+973' },
    { name: 'Ukraine', code: '+380' },
    { name: 'Serbia', code: '+381' },
    { name: 'Croatia', code: '+385' },
    { name: 'Slovenia', code: '+386' },
    { name: 'Slovakia', code: '+421' },
    { name: 'Czech Republic', code: '+420' },
    { name: 'Hungary', code: '+36' },
    { name: 'Estonia', code: '+372' },
    { name: 'Latvia', code: '+371' },
    { name: 'Lithuania', code: '+370' },
    { name: 'Iceland', code: '+354' },
    { name: 'Malta', code: '+356' },
    { name: 'Cyprus', code: '+357' },
    { name: 'Georgia', code: '+995' },
    { name: 'Armenia', code: '+374' },
    { name: 'Azerbaijan', code: '+994' },
    { name: 'Bosnia and Herzegovina', code: '+387' },
    { name: 'Macedonia', code: '+389' },
    { name: 'Albania', code: '+355' },
    { name: 'Moldova', code: '+373' },
    { name: 'Belarus', code: '+375' },
    { name: 'Kazakhstan', code: '+7' },
    { name: 'Uzbekistan', code: '+998' },
    { name: 'Tajikistan', code: '+992' },
    { name: 'Kyrgyzstan', code: '+996' },
    { name: 'Turkmenistan', code: '+993' },
    { name: 'Afghanistan', code: '+93' },
    { name: 'Mongolia', code: '+976' },
    { name: 'South Korea', code: '+82' },
    { name: 'Taiwan', code: '+886' },
    { name: 'Macau', code: '+853' },
    { name: 'Brunei', code: '+673' },
    { name: 'Laos', code: '+856' },
    { name: 'Cambodia', code: '+855' },
    { name: 'Myanmar', code: '+95' },
    { name: 'Nepal', code: '+977' },
    { name: 'Bhutan', code: '+975' },
    { name: 'Maldives', code: '+960' },
    { name: 'Zimbabwe', code: '+263' },
    { name: 'Kenya', code: '+254' },
    { name: 'Nigeria', code: '+234' },
    { name: 'Ghana', code: '+233' },
    { name: 'Uganda', code: '+256' },
    { name: 'Tanzania', code: '+255' },
    { name: 'Rwanda', code: '+250' },
    { name: 'Sudan', code: '+249' },
    { name: 'Angola', code: '+244' },
    { name: 'Namibia', code: '+264' },
    { name: 'Zambia', code: '+260' },
    { name: 'Botswana', code: '+267' },
    { name: 'Congo', code: '+243' },
    { name: 'Ivory Coast', code: '+225' },
    { name: 'Senegal', code: '+221' },
    { name: 'Cameroon', code: '+237' },
    { name: 'Togo', code: '+228' },
    { name: 'Burkina Faso', code: '+226' },
    { name: 'Mali', code: '+223' },
    { name: 'Niger', code: '+227' },
    { name: 'Chad', code: '+235' },
    { name: 'Somalia', code: '+252' },
  ];
  UserRegisterForm: FormGroup;
  codeOfCountry: string = '';

  constructor(
    private _accountService: AccountServiceService,
    private _router: Router,
    private dialog: MatDialog
  ) {
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
    if (this.UserRegisterForm.valid) {
      const phoneNumber = this.UserRegisterForm.get('PhoneNumber')?.value;
      const modifiedPhoneNumber = phoneNumber
        ? this.codeOfCountry + phoneNumber
        : '';
      const originalPhoneNumber = phoneNumber;

      this.UserRegisterForm.get('PhoneNumber')?.setValue(modifiedPhoneNumber);

      console.log("data as json", this.UserRegisterForm.value)

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
          console.error('Registration failed:', error);
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
