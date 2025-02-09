import { Destination } from './../../Models/destination';
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
  destinations: Destination[] = [];

  constructor(private _DestinationService: DestinationServiceService) {}
  ngOnInit(): void {
    this._DestinationService.GetDestinations().subscribe((data) => {
      this.destinations = data;
    });
    // getAllDestinations() {
    //   this.http.get<Destination[]>('${environment.BaseURL}/Get-All-Destinations').subscribe(
    //     (data) => {
    //       this.destinations = data;
    //     },
    //     () => {
    //       //console.error('Error fetching destinations:', error);
    //     }
    //     );
    //   }
  }
}
