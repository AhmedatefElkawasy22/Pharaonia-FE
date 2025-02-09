import { Component } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { Destination } from '../../../Models/destination';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf , Location, NgClass} from '@angular/common';
import { AlertDialogComponent } from '../../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DestinationServiceService } from '../../../Services/destination/destination-service.service';

@Component({
  selector: 'app-update-destination',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule ,  NgClass],
  templateUrl: './update-destination.component.html',
  styleUrls: ['./update-destination.component.css'],
})
export class UpdateDestinationComponent {
  destination !: Destination ;
  UpdateDestination: FormGroup;
  isDarkMode :boolean;

  constructor(private _activatedRoute: ActivatedRoute,private _router:Router,private _dialog: MatDialog,private _location:Location,private _destiantionService: DestinationServiceService) {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    if (history.state.destination) {
      this.destination = history.state.destination ;
    }
    else{
      this.openAlertDialog('Error','A problem occurred, try again later.');
      setTimeout(() => {
        this._location.back();
      }, 4000);
    }

    this.UpdateDestination = new FormGroup({
      name: new FormControl(this.destination.name, [
        Validators.required,
        Validators.pattern('^[a-zA-Z\\s]{3,50}$'),
      ]),
      description: new FormControl(this.destination.description, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500),
      ]),
      destinationCategory: new FormControl(
        this.destination.destinationCategory === 'InEgypt' ? 0 : 1,
        [Validators.required]
      ),
    });
  }

  onSubmit() {
    if (this.UpdateDestination.valid) {
      this.UpdateDestination.get('destinationCategory')?.setValue(this.UpdateDestination.get('destinationCategory')?.value === '1' ? 1 : 0);
      this._destiantionService.UpdateDestination(this.destination.id,this.UpdateDestination.value).subscribe({
        next:(res)=>{
          this.openAlertDialog('Success',res);
          setTimeout(() => {
            this._router.navigate([`/admin/destination/${this.destination.id}`]);
          }, 3000);
        },
        error:(err)=>{
           console.log(err);
          this.openAlertDialog('Error', err.error);
        }
      })
    }
    else{
      this.openAlertDialog('Error','Please fill in the data correctly.');
    }
  }

  openAlertDialog(title: string, message: string) {
    this._dialog.open(AlertDialogComponent, {
      data: { title: title, message: message },
    });
  }
}
