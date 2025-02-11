import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './Components/Shared/layout/layout.component';
import { HomeComponent } from './Components/home/home.component';
import { OneOfferComponent } from './Components/one-offer/one-offer.component';
import { OffersComponent } from './Components/offers/offers.component';
import { DestinationsComponent } from './Components/destinations/destinations.component';
import { OneDestinationComponent } from './Components/one-destination/one-destination.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { GalleryComponent } from './Components/gallery/gallery.component';
import { LoginComponent } from './Components/Admin/login/login.component';
import { RegisterComponent } from './Components/Admin/register/register.component';
import { AdminLayoutComponent } from './Components/Admin/admin-layout/admin-layout.component';
import { AdminHomeComponent } from './Components/Admin/admin-home/admin-home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UpdateDestinationComponent } from './Components/Admin/update-destination/update-destination.component';
import { UpdateIamgesOfDestinationComponent } from './Components/Admin/update-iamges-of-destination/update-iamges-of-destination.component';
import { AddIamgesOfDestinationComponent } from './Components/Admin/add-iamges-of-destination/add-iamges-of-destination.component';
import { AddDestinationComponent } from './Components/Admin/add-destination/add-destination.component';

export const routes: Routes = [
  {
    path: 'admin/login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    title: 'Admin',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
      { path: 'home', component: AdminHomeComponent, title: 'Admin-Home' },
      { path: 'register', component: RegisterComponent, title: 'Admin-Register' },
      { path: 'destination', component: DestinationsComponent, title: 'All Destinations' },
      { path: 'destination-egypt', component: DestinationsComponent, title: 'Destinations In Egypt', },
      { path: 'destination-outside-egypt', component: DestinationsComponent, title: 'Destinations Outisde Egypt', },
      { path: 'destination/:DestinationID', component: OneDestinationComponent, title: 'Destination', },
      { path: 'update-destination', component:UpdateDestinationComponent,title:"Update Destination"},
      { path: 'update-iamges-of-destination/:DestinationID', component:UpdateIamgesOfDestinationComponent , title : "Update Images of Destination"},
      { path: 'add-images-to-destination/:DestinationID' ,component:AddIamgesOfDestinationComponent,title:"Add Images of Destination"},
      { path: 'add-destination',component:AddDestinationComponent ,title:"Add New Destination"},
      { path: 'offers', component: OffersComponent, title: 'All available offers', },
      { path: 'expired-offers', component: OffersComponent, title: 'All expired offers', },
      { path: 'offer/:offerId', component: OneOfferComponent, title: 'Offer', }
    ]
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      { path: 'offers', component: OffersComponent, title: 'All Offers', },
      { path: 'offer/:offerId', component: OneOfferComponent, title: 'Offer', },
      { path: 'destination', component: DestinationsComponent, title: 'All Destinations', },
      { path: 'destination-egypt', component: DestinationsComponent, title: 'Destinations In Egypt', },
      { path: 'destination-outside-egypt', component: DestinationsComponent, title: 'Destinations Outisde Egypt', },
      { path: 'destination/:DestinationID', component: OneDestinationComponent, title: 'Destination', },
      { path: 'aboutUs', component: AboutUsComponent, title: 'About Us', },
      { path: 'contactUs', component: ContactUsComponent, title: 'Contact Us', },
      { path: 'gallery', component: GalleryComponent, title: 'Gallery', },
    ],
  },
  { path: '**', component: NotFoundComponent, title: 'not-found-page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  //exports: [RouterModule, CommonModule],
})
export class AppRoutingModule { }

