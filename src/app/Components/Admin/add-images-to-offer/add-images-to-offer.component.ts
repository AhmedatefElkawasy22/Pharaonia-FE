import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OfferService } from '../../../Services/offer/offerService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgClass, NgIf, Location, NgFor } from '@angular/common';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-images-to-offer',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, ReactiveFormsModule],
  templateUrl: './add-images-to-offer.component.html',
  styleUrl: './add-images-to-offer.component.css'
})
export class AddImagesToOfferComponent {
  AddImagesToOffer: FormGroup;
  isSubmitting: boolean = false;
  isDarkMode!: boolean
  offerId!: number;

  constructor(private fb: FormBuilder, private _location: Location, private _offerService: OfferService, private _router: Router, private _dialog: MatDialog, private _activatedRoute: ActivatedRoute, private _Store: Store<AppState>) {
    //get id & check on it 
    const id = this._activatedRoute.snapshot.paramMap.get('offerId');
    this.offerId = id ? Number(id) : 0;
    if (this.offerId == 0) {
      this.openAlertDialog("Error", "An error occurred, try again later.");
      setTimeout(() => {
        this._location.back();
      }, 2000);
    }
    //cehck theme
    this._Store.select(state => state.theme).subscribe(theme => {
      this.isDarkMode = theme === 'dark' ? true : false;
    })
    //form
    this.AddImagesToOffer = this.fb.group({
      Images: this.fb.array([]),
    });
  }



  onSubmit() {
    if (this.AddImagesToOffer.invalid || this.isSubmitting) {
      this.openAlertDialog('Error', 'Please enter valid images.');
      return;
    }

    this.isSubmitting = true;
    const formData = new FormData();

    this.Images.controls.forEach((control) => {
      const file = control.value as File;
      if (file) {
        formData.append('Images', file);
      }
    });

    this._offerService.AddImagesToOffer(this.offerId, formData).subscribe({
      next: (res) => {
        this.openAlertDialog('Success', res);
        this.isSubmitting = false;
        this.AddImagesToOffer.reset();
        this.Images.clear();
        setTimeout(() => {
          this._location.back();
        }, 3000);
      },
      error: (err) => {
        this.openAlertDialog('Error', err.error);
        this.isSubmitting = false;
      }
    });
  }

  get Images(): FormArray {
    return this.AddImagesToOffer.get('Images') as FormArray;
  }

  addimage(): void {
    this.Images.push(this.createImageControl());
  }

  removeimage(index: number, event: Event): void {
    event.preventDefault();
    if (this.Images.length > 1) {
      this.Images.removeAt(index);
      this.Images.updateValueAndValidity();
    }
  }


  private createImageControl(): FormControl {
    return new FormControl(null, Validators.required);
  }

  onImageUpload(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Validate file type
      if (!/\.(png|jpg|jpeg)$/i.test(file.name)) {
        this.openAlertDialog('Error', 'Invalid file type. Please select PNG, JPG, or JPEG.');
        input.value = ''; // Only reset when there's an error
        return;
      }
      // Assign the selected file to the form control
      this.Images.at(index).setValue(file);
      this.Images.markAsTouched();
      this.AddImagesToOffer.markAsDirty();
    }
  }

  openAlertDialog(title: string, message: string) {
    this._dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
