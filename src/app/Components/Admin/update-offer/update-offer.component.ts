import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OfferService } from '../../../Services/offer/offerService.service';
import { Offer } from '../../../Models/offer';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { NgIf,Location, NgClass } from '@angular/common';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-update-offer',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule,NgClass],
  templateUrl: './update-offer.component.html',
  styleUrl: './update-offer.component.css'
})
export class UpdateOfferComponent {
  UpdateOffer !: FormGroup;
  isDarkMode !: boolean;
  Offer!: Offer;

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _offerService: OfferService,
    private fb: FormBuilder,
    private _location: Location,
    private _Store: Store<AppState>
  ) {
    //check theme
    this._Store.select(state => state.theme).subscribe(theme => {
      this.isDarkMode = theme === 'dark' ? true : false;
    })
    
    this.Offer = history.state.offer ;
    if (!this.Offer) {
      this.openAlertDialog('Error', 'A problem occurred, try again later.');
      this._location.back();
      return;
    }
    const OfferExpirationNumber = this.Offer.durationOfExpiration.split(' ')[0];
    const TypeOfOfferExpirationDate = this.Offer.durationOfExpiration.split(' ')[1] === 'Days' ? '0' : '1';
    const OfferDurationNumber = this.Offer.offerDuration.split(' ')[0]; 
    const TypeOfOfferDuration = this.Offer.offerDuration.split(' ')[1] === 'Days' ? '0' : '1';
    this.UpdateOffer = this.fb.group({
      NameOfDestination: [this.Offer.nameOfDestination, [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]{3,50}$')]],
      Description: [this.Offer.description, [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
      Price: [this.Offer.price, [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]],
      OfferExpirationNumber: [OfferExpirationNumber, [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
      TypeOfOfferExpirationDate: [TypeOfOfferExpirationDate, [Validators.required]],
      OfferDurationNumber: [OfferDurationNumber, [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
      TypeOfOfferDuration: [TypeOfOfferDuration, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.UpdateOffer.invalid ) {
      this.openAlertDialog('Error', 'Please fill all the fields correctly.');
      return;
    }
    this.UpdateOffer.get('TypeOfOfferExpirationDate')?.setValue(Number(this.UpdateOffer.get('TypeOfOfferExpirationDate')?.value));
    this.UpdateOffer.get('TypeOfOfferDuration')?.setValue(Number(this.UpdateOffer.get('TypeOfOfferDuration')?.value));

    this._offerService.updateOffer(this.UpdateOffer.value,this.Offer.id).subscribe({
      next: (res) => {
        this.openAlertDialog('Success', res);
        setTimeout(() => {
          this._router.navigate(['/admin/offer',this.Offer.id]);
        }, 3000);
      },
      error: (err) => {
        this.openAlertDialog('Error', err.error);
        this.UpdateOffer.get('TypeOfOfferExpirationDate')?.setValue(String(this.UpdateOffer.get('TypeOfOfferExpirationDate')?.value));
        this.UpdateOffer.get('TypeOfOfferDuration')?.setValue(String(this.UpdateOffer.get('TypeOfOfferDuration')?.value));
      }
    });
  }


  openAlertDialog(title: string, message: string) {
    this._dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }

}
