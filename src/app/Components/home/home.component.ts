import { Destination } from './../../Models/destination';
import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { AboutUsService } from '../../Services/aboutUs/about-us.service';
import { DestinationServiceService } from '../../Services/destination/destination-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [NgFor],
})
export class HomeComponent implements OnInit {
  destinations: Destination[] = [];
  aboutUs: any;

  constructor(private _DestinationService: DestinationServiceService , private _aboutUsService: AboutUsService) {}
  ngOnInit(): void {
    this._DestinationService.GetDestinations().subscribe({
      next: (data) => {
        this.destinations = data;
      },
      error: (err) => {
        //console.error('Error fetching destinations:', err);
      },
    });
    this._aboutUsService.GetAboutUs().subscribe({
      next: (data) => {
        this.aboutUs = data;
      },
      error: (err) => {
        console.error('Error fetching about us:', err);
      },
    });
  }
}
