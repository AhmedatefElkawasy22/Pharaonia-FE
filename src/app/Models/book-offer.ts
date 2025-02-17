export interface BookOffer {
    id: number,
    name: string,
    email: string,
    phoneNumber: string,
    nationality: string,
    arrivalDate: string,
    departureDate: string,
    numberOfAllPeople: number,
    numberOfChildren: number,
    createdTime: string,
    offer: { 
        id: number,
        nameOfDestination: string,
        description: string,
        price: number,
        offerExpirationNumber: number,
        typeOfOfferExpirationDate: number,
        offerDurationNumber: number,
        typeOfOfferDuration: number,
        expireOn: string,
        images: string[]
    }
}
