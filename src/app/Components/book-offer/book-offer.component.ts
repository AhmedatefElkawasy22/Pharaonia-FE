import { NgClass, NgFor, NgIf ,Location} from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '../../Services/offer/offerService.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-book-offer',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgClass,NgFor,FormsModule],
  templateUrl: './book-offer.component.html',
  styleUrl: './book-offer.component.css'
})
export class BookOfferComponent {
  bookOffer: FormGroup;
  isDarkMode: boolean;
  offerId: number = 0;
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
  selectedCountryCode: string = '';

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _offerService: OfferService,
    private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _location: Location
  ) {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    const id = this._activatedRoute.snapshot.paramMap.get('offerId');
    this.offerId = id ? Number(id) : 0;
    if (this.offerId == 0) {
      this.openAlertDialog("Error", "An error occurred, try again later.");
      setTimeout(() => {
        this._location.back();
      }, 2000);
    }
    this.bookOffer = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]{3,50}$')]],
      email: ['', [Validators.email, Validators.required]],
      nationality: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]{3,100}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      arrivalDate: ['', [Validators.required, this.dateValidator()]],
      departureDate: ['', [Validators.required, this.dateValidator()]],
      numberOfAllPeople: [1, [Validators.required, Validators.min(1), Validators.max(1000), Validators.pattern('^[0-9]{1,2}$')]],
      numberOfChildren: [0, [Validators.required, Validators.min(0), Validators.max(1000), Validators.pattern('^[0-9]{1,2}$')]],
      requirements: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ,.]{5,3000}$')]],  
    },{  validators: [this.dateRangeValidator, this.validateChildrenCount] });
  }

   // Custom validator for dates
   private dateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (inputDate < today) {
        return { pastDate: true };
      }
      return null;
    };
  }

  // Custom validator for date range
  private dateRangeValidator(formGroup: AbstractControl): ValidationErrors | null {
    const arrival = formGroup.get('arrivalDate')?.value;
    const departure = formGroup.get('departureDate')?.value;
  
    if (arrival && departure) {
      const arrivalDate = new Date(arrival);
      const departureDate = new Date(departure);
  
      if (departureDate < arrivalDate) {
        return { invalidDateRange: true };
      }
    }
    return null;
  }
  
  // Custom validator for children count
  private validateChildrenCount(formGroup: AbstractControl): ValidationErrors | null {
    const totalPeople = formGroup.get('numberOfAllPeople')?.value || 0;
    const children = formGroup.get('numberOfChildren')?.value || 0;

    if (children > totalPeople) {
      return { invalidChildrenCount: true };
    }
    return null;
  }

  onSubmit() {
    if (this.bookOffer.invalid) {
      this.openAlertDialog('Error', 'Please fill all the fields correctly.');
      return;
    }
 
    const phoneNumber = this.bookOffer.get('phoneNumber')?.value;
    const modifiedPhoneNumber = phoneNumber
      ? this.selectedCountryCode + phoneNumber
      : '';
    const originalPhoneNumber = phoneNumber;

    this.bookOffer.get('phoneNumber')?.setValue(modifiedPhoneNumber);

    this._offerService.AddBookingoffer(this.offerId,this.bookOffer.value).subscribe({
      next: (res) => {
        this.openAlertDialog('Success', 'The offer has been booked successfully, you will be contacted.');
        setTimeout(() => {
          this._router.navigate(['/home']);
        }, 3000);
      },
      error: (err) => {
        this.openAlertDialog('Error',"There was a problem, try again.");
        this.bookOffer.get('phoneNumber')?.setValue(
          originalPhoneNumber
        );
      }
    });
  }


  openAlertDialog(title: string, message: string) {
    this._dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
