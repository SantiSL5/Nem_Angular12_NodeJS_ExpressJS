import { Category } from "./category";

export class Product {
    slug: string;
    name: string;
    category: string;
    seller: string;
    state: number;
    description: string;
    price: number;
    ubication: string;
    shipping: boolean;
    photo: string;
    dateCreate: string;
    categoryname: Category;
    estado: number;

    constructor( slug: string, name: string, category: string ,seller: string, state: number, price: number, description: string, ubication: string, shipping: boolean, photo: string, dateCreate: string, categoryname: Category, estado:number) {
        this.slug = slug;
        this.name = name;
        this.category = category;
        this.seller = seller;
        this.state = state;
        this.description = description;
        this.ubication = ubication;
        this.price = price;
        this.shipping = shipping;
        this.photo = photo;
        this.dateCreate = dateCreate;
        this.categoryname = categoryname;
        this.estado=estado;
    }
}