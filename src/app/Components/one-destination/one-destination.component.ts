import { DestinationServiceService } from './../../Services/destination-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-one-destination',
  standalone: true,
  imports: [],
  templateUrl: './one-destination.component.html',
  styleUrl: './one-destination.component.css',
})
export class OneDestinationComponent implements OnInit {
  destination: any;
   destinationId: number | null = null;
  // Destination: any = {};

  constructor(private route: ActivatedRoute, private destinationService: DestinationServiceService) {}

  ngOnInit(): void {
     this.destinationId = Number(this.route.snapshot.paramMap.get('id'));


    this.destinationService.GetDestinationById(this.destinationId).subscribe({
      next: (data) => {
        this.destination = data;
      },
      error: (error) => {
        console.error('Error fetching destination data:', error);
      },
      complete: () => {
        console.log('Fetching destination data completed.');
      },
    });

  }
}
