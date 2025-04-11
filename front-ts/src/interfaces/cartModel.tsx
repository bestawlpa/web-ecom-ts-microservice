// cartmodel

export interface Product {
    product_name: string;
    images: string[];
    price: number;
    stock: number;
}

export interface CartItem {
    _id: string;
    userId: string;
    items: {
        _id: string;
        productId: string;
        product: Product;
        quantity: number;
    }[];
}

export interface SelectedItem {
  itemId: string;
  productId: string;
  product: Product;
  quantity: number;
}