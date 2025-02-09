import { Component, OnInit, TemplateRef } from '@angular/core';
import { Destination } from '../../Models/destination';
import { NgFor, NgIf, NgIfContext } from '@angular/common';
import { Router } from '@angular/router';
import { DestinationServiceService } from '../../Services/destination/destination-service.service';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.css'
})
export class DestinationsComponent implements OnInit {


  Destinations: Destination[] = [];
  noData!: TemplateRef<NgIfContext<boolean>> | null;

  constructor(private _DestinationService: DestinationServiceService, private _router: Router) { }

  ngOnInit(): void {
    const url = this._router.url;
    // console.log(url);
    if (url === '/destination-egypt')
      this._DestinationService.GetDestinationBasedOnCategory(0).subscribe({
        next: (data) => {
          // console.log('Data received:', data);
          this.Destinations = data
        },
        error: (err) => {
          // console.error('Error fetching destinations:', err);
          this.Destinations = [];
        }
      });
    else if (url === '/destination-outside-egypt')
      this._DestinationService.GetDestinationBasedOnCategory(1).subscribe({
        next: (data) => {
          // console.log('Data received:', data);
          this.Destinations = data
        },
        error: (err) => {
          // console.error('Error fetching destinations:', err);
          this.Destinations = [];
        }
      });
    else {
      this._DestinationService.GetDestinations().subscribe({
        next: (data) => {
          // console.log('Data received:', data);
          this.Destinations = data
        },
        error: (err) => {
          // console.error('Error fetching destinations:', err);
          this.Destinations = [];
        }
      });
    }
  }

  go(DestinationID: number) {
    if (this._router.url.startsWith("/admin"))
      this._router.navigateByUrl(`/admin/destination/${DestinationID}`);
    else
      this._router.navigateByUrl(`/destination/${DestinationID}`);
  }
}
