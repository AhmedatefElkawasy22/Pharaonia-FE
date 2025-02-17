import { Component } from '@angular/core';

@Component({
  selector: 'app-show-images-of-gallery',
  standalone: true,
  imports: [],
  templateUrl: './show-images-of-gallery.component.html',
  styleUrl: './show-images-of-gallery.component.css'
})
export class ShowImagesOfGalleryComponent {
  DestinationID: number = 0;
  oldImages: Image[] = [];
  isLocked = false;
  selectedImage: Image | null = null;

  constructor(private _location: Location, private _destinationService: DestinationServiceService, private _router: Router, private _dialog: MatDialog, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('DestinationID');
    this.DestinationID = id ? Number(id) : 0;
  }
  
  showOverlay(image: Image): void {
    this.selectedImage = image;
  }

  closeOverlay(): void {
    this.selectedImage = null;
  }


  toggleLock(): void {
    this.isLocked = !this.isLocked;
  }
  ngOnInit(): void {
    if (this.DestinationID > 0) {
      this.getIamegs();
    } else {
      this.openAlertDialog('Error', 'An error occurred, try again later.');
      setTimeout(() => {
        this._location.back();
      }, 3000);
    }
  }

  getIamegs(): void {
    this._destinationService.GetImagesOfDestination(this.DestinationID).subscribe({
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
       this._destinationService.DeleteAllImagesFromDestination(this.DestinationID).subscribe({
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
        this._destinationService.DeleteImageFromDestination(id).subscribe({
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
