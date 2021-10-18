export class Product {
    slug: string;
    name: string;
    seller: string;
    state: number;
    description: string;
    price: number;
    ubication: string;
    shipping: boolean;
    issold: boolean;
    photo: string;
    dateCreate: string;

    constructor( slug: string, name: string, seller: string, state: number, price: number, description: string, ubication: string, shipping: boolean, issold: boolean, photo: string, dateCreate: string ) {
        this.slug = slug;
        this.name = name;
        this.seller = seller;
        this.state = state;
        this.description = description;
        this.ubication = ubication;
        this.price = price;
        this.shipping = shipping;
        this.issold = issold;
        this.photo = photo;
        this.dateCreate = dateCreate;
    }
}