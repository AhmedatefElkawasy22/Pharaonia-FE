import { OfferService } from './../../Services/offer/offerService.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Offer } from '../../Models/offer';
import { NgFor, NgIf ,Location} from '@angular/common';
import { AccountServiceService } from '../../Services/account/account-service.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-one-offer',
  standalone: true,
  imports: [NgIf, NgFor,RouterLink],
  templateUrl: './one-offer.component.html',
  styleUrls: ['./one-offer.component.css'],
})
export class OneOfferComponent implements OnInit {
  offer!: Offer;
  offerID: number = 0;
  currentIndex: number = 0;
  intervalId: any;
   IsAdmin !: boolean;
   expired !: boolean;
  constructor(
    private route: ActivatedRoute,
    private OfferService: OfferService,
    private _router: Router,
    private _accountService: AccountServiceService,
    private _dialog: MatDialog,
    private _location: Location
  ) {
    this.IsAdmin = this._accountService.isTokenValid() && this._router.url.startsWith('/admin');

  }

  getFormattedDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-GB');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('offerId');
    this.offerID = id ? Number(id) : 0;

    if (this.offerID > 0) {
      this.OfferService.GetOfferByID(this.offerID).subscribe({
        next: (data) => {
          // console.log(data);
          this.offer = data;
          
        },
        error: () => {},
      });
      this.startAutoScroll();
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoScroll(): void {
    if (this.intervalId) {
      return;
    }

    this.intervalId = setInterval(() => {
      this.currentIndex =
        (this.currentIndex + 1) % (this.offer?.images?.length || 0);
      this.scrollToSlide(this.currentIndex);
    }, 4000);
  }

  stopAutoScroll(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  scrollToSlide(index: number, event?: Event): void {
    if (event) {
      event.preventDefault();
      this.stopAutoScroll();
    }

    const element = document.getElementById('slide' + (index + 1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    this.currentIndex = index;
  }
  

  Delete() {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message:
          'Are you sure you want to delete this Offer? This action cannot be undone.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.OfferService.DeleteOffer(this.offerID).subscribe({
          next: (response) => {
            this.openAlertDialog(
              'Success',
              'the Offer has been deleted successfully'
            );
            setTimeout(() => {
              this._location.back();
            }, 3000);
          },
          error: (err) => {
            // console.error('Error occurred during deletion:', err);
            this.openAlertDialog('Error', 'Failed to delete your Offer, please try again later');
          },
        });
      } else {
        // console.log("Deletion canceled by the user.");
      }
    }
  )}

  Update(){
    this._router.navigate(['/admin/update-offer'], {
      state: { offer: this.offer },
    });
  }

  Reactive()
  {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Reactive',
        message:
          'Are you sure you want to Reactive this Offer? This action cannot be undone.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.OfferService.ReactiveOffer(this.offerID).subscribe({
          next: (response) => {
            this.openAlertDialog(
              'Success',
              'the Offer has been Reactive successfully'
            );
            setTimeout(() => {
              this._router.navigate(['/admin/offers']);
            }, 3000);
          },
          error: (err) => {
            // console.error('Error occurred during deletion:', err);
            this.openAlertDialog('Error', 'Failed to Reactive your Offer, please try again later');
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
