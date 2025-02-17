import { Component } from '@angular/core';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { GalleryService } from '../../../Services/gallery/gallery.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { Gallery } from '../../../Models/gallery';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-show-images-of-gallery',
  standalone: true,
  imports: [NgIf,NgFor,RouterLink],
  templateUrl: './show-images-of-gallery.component.html',
  styleUrl: './show-images-of-gallery.component.css'
})
export class ShowImagesOfGalleryComponent {
  Images: Gallery[] = [];
  isLocked = false;
  selectedImage: Gallery | null = null;

  constructor( private _galleryService: GalleryService, private _router: Router, private _dialog: MatDialog) {
    
  }
  
  showOverlay(image: Gallery): void {
    this.selectedImage = image;
  }

  closeOverlay(): void {
    this.selectedImage = null;
  }


  toggleLock(): void {
    this.isLocked = !this.isLocked;
  }

  ngOnInit(): void {
      this.getIamegs();
  }

  getIamegs(): void {
    this._galleryService.GetGallery().subscribe({
      next: (res) => {
          this.Images = res;
      },
      error: (err) => {
        this.openAlertDialog('Error', 'An error occurred or the gallery do not contain images.');
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
       this._galleryService.DeleteAllImagesFromGallery().subscribe({
          next: (response) => {
            this.openAlertDialog(
              'Success',
              'all images has been deleted successfully'
            );
            setTimeout(() => {
               this.getIamegs();
            }, 2000);
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
        this._galleryService.DeleteImage(id).subscribe({
          next: (response) => {
            this.openAlertDialog(
              'Success',
              'the image has been deleted successfully'
            );
            setTimeout(() => {
               this.getIamegs();
            }, 2000);
          },
          error: (err) => {
            // console.error('Error occurred during deletion:', err);
            this.openAlertDialog('Error', 'Failed to delete your image, please try again later');
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
