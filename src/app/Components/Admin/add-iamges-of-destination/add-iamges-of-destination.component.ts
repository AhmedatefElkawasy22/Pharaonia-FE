import { Component } from '@angular/core';

@Component({
  selector: 'app-add-iamges-of-destination',
  standalone: true,
  imports: [],
  templateUrl: './add-iamges-of-destination.component.html',
  styleUrl: './add-iamges-of-destination.component.css'
})
export class AddIamgesOfDestinationComponent {
//   UpdateImagesOfDestination: FormGroup;
//   isSubmitting: boolean = false;
//   DestinationID: number = 0;
//   oldImages: Image[] =[];


//   constructor(private fb: FormBuilder,private _location: Location, private _destinationService: DestinationServiceService, private _router: Router, private _dialog: MatDialog,private route: ActivatedRoute) {
//     this.UpdateImagesOfDestination = this.fb.group({
//       Images: this.fb.array([]),
//     });
//   }
//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('DestinationID');
//     this.DestinationID = id ? Number(id) : 0;
//     if(this.DestinationID > 0){
//     this._destinationService.GetImagesOfDestination(this.DestinationID).subscribe({
//       next:(res)=>{
//         this.oldImages = res;
//         // console.log(this.oldImages);
//       }
//     })
//   }else{
//     this.openAlertDialog('Error', 'An error occurred, try again later.');
//     setTimeout(() => {
//       this._location.back();
//     }, 3000);
//   }
// }


//   onSubmit() {
//     if (this.UpdateImagesOfDestination.invalid || this.isSubmitting) {
//       this.openAlertDialog('Error', 'Please enter valid images.');
//       return;
//     }

//     this.isSubmitting = true;
//     const formData = new FormData();

//     this.Images.controls.forEach((control) => {
//       const file = control.value as File;
//       if (file) {
//         formData.append('Images', file);
//       }
//     });

//     this._destinationService.updateImageOfDestination(this.DestinationID,formData).subscribe({
//       next: (res) => {
//         this.openAlertDialog('Success', res);
//         this.isSubmitting = false;
//         this.UpdateImagesOfDestination.reset();
//         this.Images.clear();
//         setTimeout(() => {
//           this._router.navigate(['/admin/destination']);
//         }, 3000);
//       },
//       error: (err) => {
//         this.openAlertDialog('Error', err.error);
//         this.isSubmitting = false;
//       }
//     });
//   }

//   get Images(): FormArray {
//     return this.UpdateImagesOfDestination.get('Images') as FormArray;
//   }

//   addimage(): void {
//     this.Images.push(this.createImageControl());
//   }

//   removeimage(index: number, event: Event): void {
//     event.preventDefault();
//     if (this.Images.length > 1) {
//       this.Images.removeAt(index);
//       this.Images.updateValueAndValidity();
//     }
//   }


//   private createImageControl(): FormControl {
//     return new FormControl(null, Validators.required);
//   }

//   onImageUpload(event: Event, index: number): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       const file = input.files[0];
//       // Validate file type
//       if (!/\.(png|jpg|jpeg)$/i.test(file.name)) {
//         this.openAlertDialog('Error', 'Invalid file type. Please select PNG, JPG, or JPEG.');
//         input.value = ''; // Only reset when there's an error
//         return;
//       }
//       // Assign the selected file to the form control
//       this.Images.at(index).setValue(file);
//       this.Images.markAsTouched();
//       this.UpdateImagesOfDestination.markAsDirty();
//     }
//   }

//   openAlertDialog(title: string, message: string) {
//     this._dialog.open(AlertDialogComponent, {
//       data: { title: title, message: message },
//     });
//   }
// }

}
