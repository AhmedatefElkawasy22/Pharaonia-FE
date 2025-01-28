import { Component, OnInit } from '@angular/core';
import { DestinationServiceService } from '../../Services/destination-service.service';
import { Destination } from '../../Models/destination';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.css'
})
export class DestinationsComponent implements OnInit {

  Destinations: Destination[] = [];

  constructor(private _DestinationService: DestinationServiceService, private _router: Router) {}

  ngOnInit(): void {
    this._DestinationService.GetDestinations().subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.Destinations = data.map((destination) => ({
          id: destination.id,
          name: destination.name,
          description: destination.description,
          destinationCategory: destination.destinationCategory,
          images: destination.images,
        }));
      },
      error: (err) => {
        console.error('Error fetching destinations:', err);
        this.Destinations = [];
      }
    });
  }

  go(id: number) {
    this._router.navigate(['/destination', id]);
  }
}