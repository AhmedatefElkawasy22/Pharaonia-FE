import {  NgFor, NgIf ,Location } from '@angular/common';
import { Component } from '@angular/core';
import { Image } from '../../../Models/image';
import { OfferService } from '../../../Services/offer/offerService.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';


@Component({
  selector: 'app-update-images-of-offer',
  standalone: true,
  imports: [NgIf,NgFor,RouterLink],
  templateUrl: './update-images-of-offer.component.html',
  styleUrl: './update-images-of-offer.component.css'
})
export class UpdateImagesOfOfferComponent {
  offerId: number = 0;
  oldImages: Image[] = [];
  isLocked = false;
  selectedImage: Image | null = null;

  constructor(private _location: Location, private _offerService: OfferService,  private _router: Router, private _dialog: MatDialog, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('offerId');
    this.offerId = id ? Number(id) : 0;
  }
  
  showOverlay(image: Image): void {
    this.selectedImage = image;
  }

  closeOverlay(): void {
    this.selectedImage = null;
  }

  ngOnInit(): void {
    if (this.offerId > 0) {
      this.getIamegs();
    } else {
      this.openAlertDialog('Error', 'An error occurred, try again later.');
      setTimeout(() => {
        this._location.back();
      }, 3000);
    }
  }

  getIamegs(): void {
    this._offerService.GetImagesOfOffer(this.offerId).subscribe({
      next: (res) => {
        if (res != null)
          this.oldImages = res;
        // console.log(this.oldImages);
      },
      error: (err) => {
        this.openAlertDialog('Error', 'An error occurred or the destinations do not contain images.');
      }
    })
  }


  deleteAllImages() {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message:
          'Are you sure you want to delete all images? This action cannot be undone.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
       this._offerService.DeleteAllImagesFromOffer(this.offerId).subscribe({
          next: (response) => {
            this.openAlertDialog(
              'Success',
              'all images has been deleted successfully'
            );
            setTimeout(() => {
               this.getIamegs();
            }, 3000);
          },
          error: (err) => {
            // console.error('Error occurred during deletion:', err);
            this.openAlertDialog('Error', 'Failed to delete the images, please try again later');
          },
        });
      }
    });
  }

  
  deleteImage(id: number) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message:
          'Are you sure you want to delete this Image? This action cannot be undone.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._offerService.DeleteImageFromOffer(id).subscribe({
          next: (response) => {
            this.openAlertDialog(
              'Success',
              'the destination has been deleted successfully'
            );
            setTimeout(() => {
               this.getIamegs();
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
    )
  }

  openAlertDialog(title: string, message: string) {
    this._dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
