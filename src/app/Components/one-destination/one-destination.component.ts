import { DestinationServiceService } from './../../Services/destination-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  destinationId: number = 0;

  constructor(private route: ActivatedRoute, private destinationService: DestinationServiceService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('DestinationID'); 
    this.destinationId = id ? Number(id) : 0;  
    if (this.destinationId > 0) {
      this.destinationService.GetDestinationById(this.destinationId).subscribe({
        next: (data) => {
          this.destination = data;
        },
        error: (error) => {
          console.error('Error fetching destination data:', error);
        }
      });
    }
  }
}
