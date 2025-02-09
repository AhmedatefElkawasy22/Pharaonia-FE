import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-add-destination',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule,NgFor,NgClass],
  templateUrl: './add-destination.component.html',
  styleUrl: './add-destination.component.css'
})
export class AddDestinationComponent {
  AddDestination: FormGroup;
   isDarkMode :boolean;

  constructor(private _router:Router,private _dialog: MatDialog) {
     this.isDarkMode = localStorage.getItem('theme') === 'dark';

    this.AddDestination = new FormGroup({
      Name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]{3,50}$'),
      ]),
      Description: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]{5,500}$'),
      ]),
      DestinationCategory: new FormControl(
        0,
        [Validators.required]
      ),
      Images: new FormArray([new FormControl('', [
        Validators.required,
        Validators.pattern(/\.(png|jpg|jpeg)$/i)
      ])]),
    });
    this.addimage();
  }

  onSubmit() {
    if (this.AddDestination.valid) {
      console.log('Updated Data:', this.AddDestination.value);
      // Handle form submission logic (API call or local update)
    }
  }

  Images() {
    return this.AddDestination.get('Images') as FormArray;
  }

  addimage() {
      this.Images().push(
        new FormControl('', [
          Validators.required,
          Validators.pattern(/\.(png|jpg|jpeg)$/i) 
        ])
      );
    }
    removeimage(i: number) {
      this.Images().removeAt(i);
    }

  openAlertDialog(title: string, message: string) {
    this._dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
