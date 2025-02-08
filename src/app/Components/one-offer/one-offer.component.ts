import { OfferService } from './../../Services/offer/offerService.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { Subscription } from 'rxjs';
import { Offer } from '../../Models/offer';
//import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-one-offer',
  standalone: true,
 imports : [], // imports: [NgFor, NgIf],
  templateUrl: './one-offer.component.html',
  styleUrls: ['./one-offer.component.css'],
})
export class OneOfferComponent implements OnInit {
  offer: Offer | null = null;
  offerID: number = 0;
  currentIndex: number = 0;
  intervalId: any;

  constructor(
    private route: ActivatedRoute,
    private OfferService: OfferService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('offerID');
    this.offerID = id ? Number(id) : 0;

    if (this.offerID > 0) {
      this.OfferService.GetOfferByID(this.offerID).subscribe({
        next: (data) => {
          console.log(data);
          this.offer = data;
        },
        error: () => {},
      });
    }

        }}





