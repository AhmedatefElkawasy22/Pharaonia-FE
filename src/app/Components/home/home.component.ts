import { Destination } from './../../Models/destination';
import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { AboutUsService } from '../../Services/aboutUs/about-us.service';
import { DestinationServiceService } from '../../Services/destination/destination-service.service';
import { Router, RouterLink } from '@angular/router';
import { Offer } from '../../Models/offer';
import { OfferService } from '../../Services/offer/offerService.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [NgFor,NgIf,RouterLink],
})
export class HomeComponent implements OnInit {

  destinations: Destination[] = [];
  offers: Offer[] = [];
  aboutUs: string = '';

  constructor(private _DestinationService: DestinationServiceService , private _aboutUsService: AboutUsService,private _offerService: OfferService) {}
  ngOnInit(): void {
    this._DestinationService.GetDestinations().subscribe({
      next: (data) => {
        this.destinations = data;
      },
      error: (err) => {
        //console.error('Error fetching destinations:', err);
      },
    });
    this._offerService.GetAvailableOffers().subscribe({
      next: (data) => {
        this.offers = data;
      },
      error: (err) => {
        //console.error('Error fetching offers:', err);
      },
    });
    this._aboutUsService.GetAboutUs().subscribe({
      next: (data) => {
        this.aboutUs = data;
      },
      error: (err) => {
        // console.error('Error fetching about us:', err);
      },
    });
  }
}
