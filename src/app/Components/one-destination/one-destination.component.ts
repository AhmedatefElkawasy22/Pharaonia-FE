import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Destination } from '../../Models/destination';
import { NgFor, NgIf, NgIfContext } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccountServiceService } from '../../Services/account/account-service.service';
import { DestinationServiceService } from '../../Services/destination/destination-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-one-destination',
  standalone: true,
  imports: [NgFor, NgIf,RouterLink],
  templateUrl: './one-destination.component.html',
  styleUrl: './one-destination.component.css',
})
export class OneDestinationComponent implements OnInit {

  destination: Destination | null = null;
  destinationId: number = 0;
  currentIndex: number = 0;
  intervalId: any;
  noData!: TemplateRef<NgIfContext<boolean>> | null;
  Admin: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private destinationService: DestinationServiceService,
    private _accountService: AccountServiceService,
    private _router: Router,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('DestinationID');
    this.destinationId = id ? Number(id) : 0;
    if (this.destinationId > 0) {
      this.destinationService.GetDestinationById(this.destinationId).subscribe({
        next: (data) => {
          //console.log(data);
          this.destination = data;
        },
        error: (error) => {
          //console.error('Error fetching destination data:', error);
        },
      });
      this.startAutoScroll();
    }
    this.Admin = this._accountService.isLoggedin() && this._router.url.startsWith('/admin');
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoScroll(): void {
    if (this.intervalId) {
      return;
    }

    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % (this.destination?.imagePath?.length || 0);
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
          'Are you sure you want to delete this destination? This action cannot be undone.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.destinationService.DeleteDestination(this.destinationId).subscribe({
          next: (response) => {
            this.openAlertDialog(
              'Success',
              'the destination has been deleted successfully'
            );
            setTimeout(() => {
              this._router.navigateByUrl('/admin/destination');
            }, 3000);
          },
          error: (err) => {
            // console.error('Error occurred during deletion:', err);
            this.openAlertDialog('Error', 'Failed to delete your destination, please try again later');
          },
        });
      } else {
        // console.log("Deletion canceled by the user.");
      }
    }
  )}

  Update(){
    this._router.navigate(['/admin/update-destination'], {
      state: { destination: this.destination },
    });
  }

  openAlertDialog(title: string, message: string) {
    this._dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }

}
