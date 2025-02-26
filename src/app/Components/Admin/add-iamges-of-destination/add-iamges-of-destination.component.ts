import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DestinationServiceService } from '../../../Services/destination/destination-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgFor, Location, NgIf, NgClass } from '@angular/common';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-add-iamges-of-destination',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, ReactiveFormsModule],
  templateUrl: './add-iamges-of-destination.component.html',
  styleUrl: './add-iamges-of-destination.component.css'
})
export class AddIamgesOfDestinationComponent {
  AddImagesToDestination: FormGroup;
  isSubmitting: boolean = false;
  isDarkMode!: boolean
  DestinationID!: number;

  constructor(private fb: FormBuilder, private _location: Location, private _destinationService: DestinationServiceService, private _router: Router, private _dialog: MatDialog, private route: ActivatedRoute, private _Store: Store<AppState>) {
    //get & check on id  
    const id = this.route.snapshot.paramMap.get('DestinationID');
    this.DestinationID = id ? Number(id) : 0;
    if (this.DestinationID == 0) {
      this.openAlertDialog("Error", "An error occurred, try again later.");
      setTimeout(() => {
        this._location.back();
      }, 2000);
    }
    //check theme
    this._Store.select(state => state.theme).subscribe(theme => {
      this.isDarkMode = theme === 'dark' ? true : false;
    })
    //form
    this.AddImagesToDestination = this.fb.group({
      Images: this.fb.array([]),
    });
  }



  onSubmit() {
    if (this.AddImagesToDestination.invalid || this.isSubmitting) {
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

    this._destinationService.AddImageToDestination(this.DestinationID, formData).subscribe({
      next: (res) => {
        this.openAlertDialog('Success', res);
        this.isSubmitting = false;
        this.AddImagesToDestination.reset();
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
    return this.AddImagesToDestination.get('Images') as FormArray;
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
      this.AddImagesToDestination.markAsDirty();
    }
  }

  openAlertDialog(title: string, message: string) {
    this._dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}


