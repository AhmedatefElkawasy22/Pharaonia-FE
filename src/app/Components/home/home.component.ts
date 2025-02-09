import { Component, OnInit } from '@angular/core';
import { DestinationServiceService } from '../../Services/destination.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  destinations: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

 constructor(
    //private _DestinationService: DestinationServiceService,

  ) {}
  ngOnInit(): void {
   // this.fetchDestinations();
  }

//   fetchDestinations(): void {
//     this.destinationService.getDestinations().subscribe({
//       next: (data) => {
//         this.destinations = data;

//       },
//       error: (err) => {
//         this.errorMessage = 'Failed to load destinations. Please try again.';

//       },
//     });
//   }
//
}
