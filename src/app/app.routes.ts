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
import { BookOfferComponent } from './Components/book-offer/book-offer.component';
import { UpdateOfferComponent } from './Components/Admin/update-offer/update-offer.component';
import { UpdateImagesOfOfferComponent } from './Components/Admin/update-images-of-offer/update-images-of-offer.component';
import { AddImagesToOfferComponent } from './Components/Admin/add-images-to-offer/add-images-to-offer.component';
import { AddOfferComponent } from './Components/Admin/add-offer/add-offer.component';
import { ForgotPasswordComponent } from './Components/Admin/forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './Components/Admin/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './Components/Admin/reset-password/reset-password.component';
import { ShowContactUsComponent } from './Components/Admin/show-contact-us/show-contact-us.component';
import { ShowImagesOfGalleryComponent } from './Components/Admin/show-images-of-gallery/show-images-of-gallery.component';
import { AddImagesToGalleryComponent } from './Components/Admin/add-images-to-gallery/add-images-to-gallery.component';

export const routes: Routes = [
  {
    path: 'admin/login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'admin/forgot-password',
    component: ForgotPasswordComponent,
    title: 'Forgot Password',
  },
  {
    path: 'admin/verify-otp',
    component: VerifyOtpComponent,
    title: 'verify OTP',
  },
  {
    path: 'admin/reset-password',
    component: ResetPasswordComponent,
    title: 'Reset Password',
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
      { path: 'offer/:offerId', component: OneOfferComponent, title: 'Offer', },
      { path: 'update-offer', component:UpdateOfferComponent,title:"Update Offer"},
      { path: 'update-iamges-of-offer/:offerId', component:UpdateImagesOfOfferComponent , title : "Update Images of Offer"},
      { path: 'add-images-to-offer/:offerId' ,component:AddImagesToOfferComponent,title:"Add Images of Offer"},
      { path: 'add-offer',component:AddOfferComponent ,title:"Add New Offer"}, 
      {path: 'view-all-contactus',component:ShowContactUsComponent,title:"View All Contact Us"},  
      {path: 'view-Not-contacted-contactus',component:ShowContactUsComponent,title:"View Not contacted Contact Us"},  
      {path: 'show-images-of-gallery',component:ShowImagesOfGalleryComponent,title:"Show Images Of Gallery"},
      {path:'add-images-to-gallery',component:AddImagesToGalleryComponent,title:"Add Images To Gallery"}
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
      { path: 'book-offer/:offerId', component: BookOfferComponent, title: 'Book Offer', }
    ],
  },
  { path: '**', component: NotFoundComponent, title: 'not-found-page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  //exports: [RouterModule, CommonModule],
})
export class AppRoutingModule { }

