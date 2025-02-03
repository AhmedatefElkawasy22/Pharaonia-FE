import { DestinationServiceService } from './../../Services/destination-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Destination } from '../../Models/destination';

@Component({
  selector: 'app-one-destination',
  standalone: true,
  imports: [],
  templateUrl: './one-destination.component.html',
  styleUrl: './one-destination.component.css',
})
export class OneDestinationComponent implements OnInit {
  destination: Destination | null = null;
   destinationId: number | null = null;
   router : any;


  constructor(private route: ActivatedRoute, private destinationService: DestinationServiceService, Router:Router) {}

  ngOnInit(): void {
     this.destinationId = Number(this.route.snapshot.paramMap.get('id'));


    this.destinationService.GetDestinationById(this.destinationId).subscribe({
      next: (data) => {
        this.destination = data;
      },
      error: (error) => {
        console.error('Error fetching destination data:', error);
      },
      // complete: () => {
      //   console.log('Fetching destination data completed.');
      // },
    });
    this.router.navigate(['/one-destination', this.destinationId]);

  }
}
