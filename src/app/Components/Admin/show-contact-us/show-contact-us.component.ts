import { NgFor, NgIf, Location, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContactUs } from '../../../Models/contact-us';
import { ContactusService } from '../../../Services/contactUs/contactus.service';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-show-contact-us',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './show-contact-us.component.html',
  styleUrl: './show-contact-us.component.css'
})
export class ShowContactUsComponent implements OnInit {

  Contacts: ContactUs[] = []
  constructor(private _ContactUsService: ContactusService, private _router: Router, private _dialog: MatDialog, private _location: Location) { }

  ngOnInit(): void {
    this._ContactUsService.GetAllContact().subscribe({
      next: (data) => {
        if (data != null) {
          data.forEach(c => {
            const date = new Date(c.createdTime);
            c.createdTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
          });

          if (this._router.url === '/admin/view-all-contactus') {
            this.Contacts = data;
          } else {
            this.Contacts = data.filter(c => c.isContacted == false);
          }
        } else {
          this.openAlertDialog("Error", "No data found or a problem occurred, please try again later.");
          setTimeout(() => {
            this._location.back();
          }, 4000);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  markAsContacted(id: number) {
    this._ContactUsService.MarkAsConacted(id).subscribe({
      next: (data) => {
        this.openAlertDialog("Success", "Contact marked as contacted successfully.");
        this.ngOnInit();
      },
      error: (err) => {
        this.openAlertDialog("Error", "An error occurred, try again later.")
      }
    });
  }

  deleteContact(id: number) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message:
          'Are you sure you want to delete this Contact? This action cannot be undone.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._ContactUsService.DeleteContactUs(id).subscribe({
          next: (response) => {
            this.openAlertDialog(
              'Success',
              'the Contact has been deleted successfully'
            );
            this.ngOnInit();
          },
          error: (err) => {
            // console.error('Error occurred during deletion:', err);
            this.openAlertDialog('Error', 'Failed to delete your Contact, please try again later');
          },
        });
      } else {
        // console.log("Deletion canceled by the user.");
      }
    }
    )
  }

  openAlertDialog(title: string, message: string) {
    this._dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }

}
