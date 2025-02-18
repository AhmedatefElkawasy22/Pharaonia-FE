import { Component } from '@angular/core';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { BookOffer } from '../../../Models/book-offer';
import { NgClass, NgFor, NgIf, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OfferService } from '../../../Services/offer/offerService.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-show-bookings-of-offers',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, RouterLink],
  templateUrl: './show-bookings-of-offers.component.html',
  styleUrl: './show-bookings-of-offers.component.css'
})
export class ShowBookingsOfOffersComponent {
  bookings: BookOffer[] = []
  constructor(private _offerService: OfferService, private _router: Router, private _dialog: MatDialog, private _location: Location, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this._router.url.startsWith("/admin/all-bookings-of-offers-based-on-offer")) {
      const offerId = this._activatedRoute.snapshot.params['offerId'];
      if (offerId != null && offerId > 0) {
        this._offerService.GetBookingsByOfferId(offerId).subscribe({
          next: (data) => {
            if (data != null) {
              data.forEach(c => {
                const date = new Date(c.createdTime);
                const ArrivalDate = new Date(c.arrivalDate);
                const DepartureDate = new Date(c.departureDate);
                c.createdTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
                c.arrivalDate = `${ArrivalDate.getDate().toString().padStart(2, '0')}-${(ArrivalDate.getMonth() + 1).toString().padStart(2, '0')}-${ArrivalDate.getFullYear()}`;
                c.departureDate = `${DepartureDate.getDate().toString().padStart(2, '0')}-${(DepartureDate.getMonth() + 1).toString().padStart(2, '0')}-${DepartureDate.getFullYear()}`;
              });
              this.bookings = data;
            } else {
              this.openAlertDialog("Error", "No data found or a problem occurred, please try again later.");
              setTimeout(() => {
                this._location.back();
              }, 3000);
            }
          }
        });
      }
      else {
        this.openAlertDialog("Error", "problem occurred, please try again later.");
        setTimeout(() => {
          this._location.back();
        }, 3000);
      }
    } else {
      this._offerService.GetAllBookings().subscribe({
        next: (data) => {
          if (data != null) {
            data.forEach(c => {
              const date = new Date(c.createdTime);
              const ArrivalDate = new Date(c.arrivalDate);
              const DepartureDate = new Date(c.departureDate);
              c.createdTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
              c.arrivalDate = `${ArrivalDate.getDate().toString().padStart(2, '0')}-${(ArrivalDate.getMonth() + 1).toString().padStart(2, '0')}-${ArrivalDate.getFullYear()}`;
              c.departureDate = `${DepartureDate.getDate().toString().padStart(2, '0')}-${(DepartureDate.getMonth() + 1).toString().padStart(2, '0')}-${DepartureDate.getFullYear()}`;
            });

            if (this._router.url === '/admin/all-bookings-of-offers') {
              this.bookings = data;
            } else if (this._router.url === '/admin/not-contacted-bookings-of-offers') {
              this.bookings = data.filter(c => c.isContacted == false);
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
  }

  markAsContacted(id: number) {
    this._offerService.MarkOnBookOfferIsContacted(id).subscribe({
      next: (res) => {
        this.openAlertDialog("Success", res);
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
          'Are you sure you want to delete this booking of the offer? This action cannot be undone.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._offerService.DeleteBookOffer(id).subscribe({
          next: (response) => {
            this.openAlertDialog(
              'Success',
              response
            );
            this.ngOnInit();
          },
          error: (err) => {
            // console.error('Error occurred during deletion:', err);
            this.openAlertDialog('Error', 'Failed to delete your booking the offer, please try again later');
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
