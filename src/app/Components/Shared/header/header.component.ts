import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private _router: Router) {}




  goToDestinationsOutsideEgypt() {
    throw new Error('Method not implemented.');
  }

  goToDestinationsInEgypt() {
    throw new Error('Method not implemented.');
  }
  goToAllDestinations() {
   this._router.navigate(['/destination']);
  }

}
