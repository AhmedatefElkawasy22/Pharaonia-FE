import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Offer } from '../../Models/offer';
import { OfferService } from './../../Services/offer/offerService.service';
import { NgIf, NgIfContext } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-one-offer',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './one-offer.component.html',
  styleUrl: './one-offer.component.css',
})
export class OneOfferComponent implements OnInit {
  offer: Offer | null = null;
  offerId: number = 0;
  currentIndex: number = 0;
  intervalId: any;


  constructor(
    private _activatedRoute: ActivatedRoute,
    private offerService: OfferService
  ) {}

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('offerId');
     //console.log('offerID', id);

    this.offerId = id ? Number(id) : 0;

    if (this.offerId > 0) {
      this.offerService.GetOfferByID(this.offerId).subscribe({
        next: (data) => {
          //console.log(data);
          this.offer = data;
        },
        error: (error) => {
          //console.error('Error fetching offer data:', error);
        },
      });

    }
      this.startAutoScroll();

  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoScroll(): void {
    if (this.intervalId) {
      return;
    }
    this.intervalId = setInterval(() => {
      this.currentIndex =
        (this.currentIndex + 1) % (this.offer?.images.length || 0);
      this.scrollToSlide(this.currentIndex);
    }, 4000);
  }

  stopAutoScroll(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  scrollToSlide(index: number, event?: Event): void {
    if (event) {
      event.preventDefault();
      this.stopAutoScroll();
    }

    const element = document.getElementById('slide' + (index + 1));

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    this.currentIndex = index;
  }
}
