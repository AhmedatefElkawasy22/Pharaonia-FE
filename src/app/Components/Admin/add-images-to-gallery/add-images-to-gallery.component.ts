import { Component } from '@angular/core';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { NgFor, NgIf,Location, NgClass } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GalleryService } from '../../../Services/gallery/gallery.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-images-to-gallery',
  standalone: true,
  imports: [NgIf,NgFor,ReactiveFormsModule,NgClass],
  templateUrl: './add-images-to-gallery.component.html',
  styleUrl: './add-images-to-gallery.component.css'
})
export class AddImagesToGalleryComponent {
  AddImagesToGallery: FormGroup;
  isSubmitting: boolean = false;
  isDarkMode!: boolean

  constructor(private fb: FormBuilder, private _location: Location, private _galleryService: GalleryService, private _router: Router, private _dialog: MatDialog, private _Store: Store<AppState>) {
    //check theme
    this._Store.select(state => state.theme).subscribe(theme => {
      this.isDarkMode = theme === 'dark' ? true : false;
    })
    //form
    this.AddImagesToGallery = this.fb.group({
      Images: this.fb.array([this.createImageControl()]),
    });
  }

  onSubmit() {
    if (this.AddImagesToGallery.invalid || this.isSubmitting) {
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

    this._galleryService.AddImages(formData).subscribe({
      next: (res) => {
        this.openAlertDialog('Success', res);
        this.isSubmitting = false;
        this.AddImagesToGallery.reset();
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
    return this.AddImagesToGallery.get('Images') as FormArray;
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
      this.AddImagesToGallery.markAsDirty();
    }
  }

  openAlertDialog(title: string, message: string) {
    this._dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
