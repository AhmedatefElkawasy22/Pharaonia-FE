export interface Offer {
  id: number;
  nameOfDestination: string;
  description: string;
  price: number;
  images: string[];
  offerDuration: string;
  expireOn: string;
  expired: boolean;
  durationOfExpiration:string;
}
