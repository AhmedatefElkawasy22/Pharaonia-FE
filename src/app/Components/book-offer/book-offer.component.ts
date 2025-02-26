import { NgClass, NgFor, NgIf ,Location} from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '../../Services/offer/offerService.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { countryCodesData } from '../Shared/helpers';

@Component({
  selector: 'app-book-offer',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgClass,NgFor,FormsModule],
  templateUrl: './book-offer.component.html',
  styleUrl: './book-offer.component.css'
})
export class BookOfferComponent {
  bookOffer: FormGroup;
  isDarkMode !: boolean;
  offerId: number = 0;
  countryCodes : any;
  selectedCountryCode: string = ''; 

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _offerService: OfferService,
    private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _Store: Store<AppState>
  ) {
    this.countryCodes = countryCodesData.countryCodes;
    //check theme
    this._Store.select(state => state.theme).subscribe(theme => {
      this.isDarkMode = theme === 'dark' ? true : false;
    })
    // get id & check it
    const id = this._activatedRoute.snapshot.paramMap.get('offerId');
    this.offerId = id ? Number(id) : 0;
    if (this.offerId == 0) {
      this.openAlertDialog("Error", "An error occurred, try again later.");
      setTimeout(() => {
        this._location.back();
      }, 2000);
    }
    //form
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
