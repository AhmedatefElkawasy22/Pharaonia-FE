import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AboutUsService } from '../../../Services/aboutUs/about-us.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  IsFoundAboutUs !: boolean;
  constructor(private _aboutusService: AboutUsService, private _dialog: MatDialog) {
    this._aboutusService.GetAboutUs().subscribe(
      (res) => {
        this.IsFoundAboutUs = true;
      },
      (err) => {
        this.IsFoundAboutUs = false;
      }
    )
  }

  deleteAboutUs() {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message:
          'Are you sure you want to delete About Us? This action cannot be undone.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._aboutusService.DeleteAboutUs().subscribe({
          next: (response) => {
            this.openAlertDialog(
              'Success',
              'About-Us has been deleted successfully'
            );
            this.IsFoundAboutUs = false;
          },
          error: (err) => {
            // console.error('Error occurred during deletion:', err);
            this.openAlertDialog('Error', 'Failed to delete About US, please try again later');
          },
        });
      } else {
        // console.log("Deletion canceled by the user.");
      }
    })
  }

  openAlertDialog(title: string, message: string) {
    this._dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }

}