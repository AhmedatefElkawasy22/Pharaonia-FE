import { OfferService } from './../../Services/offer/offerService.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offer } from '../../Models/offer';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-one-offer',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './one-offer.component.html',
  styleUrls: ['./one-offer.component.css'],
})
export class OneOfferComponent implements OnInit {
  offer!: Offer;
  offerID: number = 0;
  currentIndex: number = 0;
  intervalId: any;

  constructor(
    private route: ActivatedRoute,
    private OfferService: OfferService
  ) {}
  getFormattedDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-GB');
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('offerId');
    this.offerID = id ? Number(id) : 0;

    if (this.offerID > 0) {
      this.OfferService.GetOfferByID(this.offerID).subscribe({
        next: (data) => {
          console.log(data);
          this.offer = data;
        },
        error: () => {},
      });
      this.startAutoScroll();
    }
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
        (this.currentIndex + 1) % (this.offer?.images?.length || 0);
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
