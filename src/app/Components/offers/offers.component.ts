import { OfferService } from '../../Services/offer/offerService.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgIfContext } from '@angular/common';
import { Offer } from '../../Models/offer';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  imports: [NgFor, NgIf, CommonModule, RouterLink],
  standalone: true,
})
export class OffersComponent implements OnInit {
  Offers: Offer[] = [];
  noData!: TemplateRef<NgIfContext<boolean>> | null;

  constructor(private offerService: OfferService, private router: Router) { }


  OfferDetail(id: number): void {
    this.router.navigate(['/offer', id]);
  }



  ngOnInit(): void {
    this.offerService.GetAvailableOffers().subscribe({
      next: (data) => {
        this.Offers = data;
      },
      error: (err) => {
        //console.error('Error fetching offers:', err);
        this.Offers = [];
      },
    });
  }
}
