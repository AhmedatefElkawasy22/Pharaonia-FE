import { Component } from '@angular/core';
import { Router, RouterLink  } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

  constructor(private _router: Router) { }
   
  goHome(){
    if(this._router.url.startsWith('/admin'))
      this._router.navigateByUrl('/admin/home');
    else
      this._router.navigateByUrl('/home');
  }
}
