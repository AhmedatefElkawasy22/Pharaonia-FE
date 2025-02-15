import { OfferService } from '../../Services/offer/offerService.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgIfContext } from '@angular/common';
import { Offer } from '../../Models/offer';
import { Router } from '@angular/router';
import { AccountServiceService } from '../../Services/account/account-service.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  imports: [NgFor, NgIf, CommonModule],
  standalone: true,
})
export class OffersComponent implements OnInit {
  Offers: Offer[] = [];
  noData!: TemplateRef<NgIfContext<boolean>> | null;
  IsAdmin !: boolean;

  constructor(private _accountService: AccountServiceService, private offerService: OfferService, private router: Router) {
    this.IsAdmin = this._accountService.isTokenValid() && this.router.url.startsWith('/admin');
  }


  OfferDetail(id: number): void {
    this.router.navigate(['/offer', id]);
  }



  ngOnInit(): void {
    if (this.IsAdmin && this.router.url === "/admin/expired-offers") {
      this.offerService.getExpiredOffers().subscribe({
        next: (data) => {
          if (data != null)
            this.Offers = data;
        },
        error: (err) => {
          //console.error('Error fetching offers:', err);
        },
      });
    }
    else {
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


  View(id : number)
  {
      if(this.IsAdmin)
        this.router.navigate(['/admin/offer', id]);
      else
        this.router.navigate(['/offer', id]);
  }
}
