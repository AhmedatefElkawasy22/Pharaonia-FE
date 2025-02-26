import { NgClass, NgFor, NgIf } from '@angular/common';
import {  Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { DestinationServiceService } from '../../../Services/destination/destination-service.service';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-destination',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgFor, NgClass],
  templateUrl: './add-destination.component.html',
  styleUrl: './add-destination.component.css'
})
export class AddDestinationComponent {
  AddDestination: FormGroup;
  isDarkMode !: boolean;
  isSubmitting: boolean = false;

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _destinationService: DestinationServiceService,
    private fb: FormBuilder,
    private _Store: Store<AppState>
  ) {
    //check theme
    this._Store.select(state=>state.theme).subscribe(theme=>{
      this.isDarkMode = theme === 'dark' ? true : false;
    })

    this.AddDestination = this.fb.group({
      Name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]{3,50}$')]],
      Description: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(1000)]],
      DestinationCategory: ['0', [Validators.required]],
      Images: this.fb.array([this.createImageControl()]),
    });
  }

  onSubmit() {
    if (this.AddDestination.invalid || this.isSubmitting) {
      this.openAlertDialog('Error', 'Please fill all the fields correctly.');
      return;
    }

    this.isSubmitting = true;
    const formData = new FormData();

    formData.append('Name', this.AddDestination.value.Name);
    formData.append('Description', this.AddDestination.value.Description);
    formData.append('DestinationCategory', this.AddDestination.value.DestinationCategory);

    this.Images.controls.forEach((control) => {
      const file = control.value as File;
      if (file) {
        formData.append('Images', file);
      }
    });

    this._destinationService.AddDestination(formData).subscribe({
      next: (res) => {
        this.openAlertDialog('Success', res);
        this.isSubmitting = false;
        this.AddDestination.reset();
        this.Images.clear();
        setTimeout(() => {
          this._router.navigate(['/admin/destination']);
        }, 3000);
      },
      error: (err) => {
        this.openAlertDialog('Error', err.error);
        this.isSubmitting = false;
      }
    });
  }

  get Images(): FormArray {
    return this.AddDestination.get('Images') as FormArray;
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
      this.AddDestination.markAsDirty();
    }
  }

  openAlertDialog(title: string, message: string) {
    this._dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
