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
  imports: [NgFor, NgIf, RouterLink],
})
export class HomeComponent implements OnInit {

  destinations: Destination[] = [];
  offers: Offer[] = [];
  aboutUs: string = '';

  constructor(private _DestinationService: DestinationServiceService, private _offerService: OfferService) {
    this.aboutUs = "Explore the World with the Best Travel Deals! 🌍✈️ Welcome to our tourism platform, your gateway to discovering the most breathtaking destinations in Egypt and beyond! Whether you dream of exploring the wonders of the Pyramids and the Nile or embarking on an exciting journey to top global destinations, we are here to make your travel experience unforgettable,Exclusive offers and discounts on travel packages,Real images and detailed insights for every destination,Start your journey now and let us be your guide to a world full of adventures and discoveries! 🚀🌴";
  }
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
  }
}
