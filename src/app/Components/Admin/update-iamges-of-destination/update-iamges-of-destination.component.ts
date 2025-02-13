import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DestinationServiceService } from '../../../Services/destination/destination-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { Image } from '../../../Models/image';

@Component({
  selector: 'app-update-iamges-of-destination',
  standalone: true,
  imports: [],
  templateUrl: './update-iamges-of-destination.component.html',
  styleUrl: './update-iamges-of-destination.component.css'
})
export class UpdateIamgesOfDestinationComponent implements OnInit {

  DestinationID: number = 0;
  oldImages: Image[] =[];


  constructor(private fb: FormBuilder,private _location: Location, private _destinationService: DestinationServiceService, private _router: Router, private _dialog: MatDialog,private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('DestinationID');
    this.DestinationID = id ? Number(id) : 0;
    if(this.DestinationID > 0){
    this._destinationService.GetImagesOfDestination(this.DestinationID).subscribe({
      next:(res)=>{
        this.oldImages = res;
        // console.log(this.oldImages);
      }
    })
  }else{
    this.openAlertDialog('Error', 'An error occurred, try again later.');
    setTimeout(() => {
      this._location.back();
    }, 3000);
  }
}

  openAlertDialog(title: string, message: string) {
    this._dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
