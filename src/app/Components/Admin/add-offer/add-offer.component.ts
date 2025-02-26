import { Component } from '@angular/core';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OfferService } from '../../../Services/offer/offerService.service';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-offer',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './add-offer.component.html',
  styleUrl: './add-offer.component.css'
})
export class AddOfferComponent {
  AddOffer: FormGroup;
  isDarkMode!: boolean;

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _offerService: OfferService,
    private fb: FormBuilder,
    private _Store: Store<AppState>
  ) {
    //cehck theme
    this._Store.select(state => state.theme).subscribe(theme => {
      this.isDarkMode = theme === 'dark' ? true : false;
    })
    //form
    this.AddOffer = this.fb.group({
      NameOfDestination: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]{3,50}$')]],
      Description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]],
      Price: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]],
      OfferExpirationNumber: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
      TypeOfOfferExpirationDate: ['0', [Validators.required]],
      OfferDurationNumber: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
      TypeOfOfferDuration: ['0', [Validators.required]],
      Images: this.fb.array([this.createImageControl()])
    });
  }

  onSubmit() {
    if (this.AddOffer.invalid ) {
      this.openAlertDialog('Error', 'Please fill all the fields correctly.');
      return;
    }

    const formData = new FormData();

    formData.append('NameOfDestination', this.AddOffer.value.NameOfDestination);
    formData.append('Description', this.AddOffer.value.Description);
    formData.append('Price', this.AddOffer.value.Price);
    formData.append('OfferExpirationNumber', this.AddOffer.value.OfferExpirationNumber);
    formData.append('TypeOfOfferExpirationDate', this.AddOffer.value.TypeOfOfferExpirationDate);
    formData.append('OfferDurationNumber', this.AddOffer.value.OfferDurationNumber);
    formData.append('TypeOfOfferDuration', this.AddOffer.value.TypeOfOfferDuration);

    this.Images.controls.forEach((control) => {
      const file = control.value as File;
      if (file) {
        formData.append('Images', file);
      }
    });

    this._offerService.AddOffer(formData).subscribe({
      next: (res) => {
        this.openAlertDialog('Success', res);
        this.AddOffer.reset();
        this.Images.clear();
        setTimeout(() => {
          this._router.navigate(['/admin/offers']);
        }, 3000);
      },
      error: (err) => {
        this.openAlertDialog('Error', err.error);
      }
    });
  }

  get Images(): FormArray {
    return this.AddOffer.get('Images') as FormArray;
  }

  addimage(): void {
    this.Images.push(this.createImageControl());
  }

  removeimage(index: number, event: Event): void {
    event.preventDefault();
    if (this.Images.length > 1) {
      this.Images.removeAt(index);
    } else {
      this.Images.at(index).reset();
    }
  }
  


  private createImageControl(): FormControl {
    return new FormControl(null, Validators.required);
  }

  onImageUpload(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
  
      // File Type Check
      if (!/\.(png|jpg|jpeg)$/i.test(file.name)) {
        this.openAlertDialog('Error', 'Invalid file type. Please select PNG, JPG, or JPEG.');
        input.value = '';
        return;
      }
  
      // File Size Check (e.g., max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        this.openAlertDialog('Error', 'File size must be less than 2MB.');
        input.value = '';
        return;
      }
  
      this.Images.at(index).setValue(file);
    }
  }
  

  openAlertDialog(title: string, message: string) {
    this._dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
