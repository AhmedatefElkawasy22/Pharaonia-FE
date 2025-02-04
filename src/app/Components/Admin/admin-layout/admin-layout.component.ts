import { Component } from '@angular/core';
import { FooterComponent } from "../../Shared/footer/footer.component";
import { AdminHeaderComponent } from "../admin-header/admin-header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [FooterComponent, AdminHeaderComponent,RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
