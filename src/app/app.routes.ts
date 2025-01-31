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

export const routes: Routes = [
  {
    path: 'admin/login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'admin/register',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'offers',
        component: OffersComponent,
        title: 'All Offers',
      },
      {
        path: 'offer/:offerId',
        component: OneOfferComponent,
        title: 'Offer',
      },
      {
        path: 'destination',
        component: DestinationsComponent,
        title: 'All Destinations',
      },
      {
        path: 'destination/:destinationId',
        component: OneDestinationComponent,
        title: 'Destination',
      },
      {
        path: 'aboutUs',
        component: AboutUsComponent,
        title: 'About Us',
      },
      {
        path: 'contactUs',
        component: ContactUsComponent,
        title: 'Contact Us',
      },
      {
        path: 'gallery',
        component: GalleryComponent,
        title: 'Gallery',
      },
    ],
  },
  { path: '**', component: NotFoundComponent, title: 'not-found-page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

