export interface Product {
    ProductId?: string;
    ImageUrl?: string;
    ProductName: string;
    RetailerPrice: number;
    SalesPrice: number;
    QuantityInStock: number;
    Category: string;
    ProductBrand: string;
    ProductStatus?: string;
    ProductUnitType: string;
    ProductDescription: string;
    CartQty?:number;
}
