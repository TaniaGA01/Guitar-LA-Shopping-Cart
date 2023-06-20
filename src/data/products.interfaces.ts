export interface ProductsElement {
    id:     number;
    name: string;
    image: string;
    description: string;
    price: number;
}
export interface ProductQuantity{
    data:ProductsElement;
    quantity: number;
}