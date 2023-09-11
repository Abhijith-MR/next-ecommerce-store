export interface Product {
    id: string;
    category: Category;
    name: string;
    price: string;
    isFeatured: boolean;
    size: Size;
    color: Color;
    images: Image[];
    dimensions: {
      length: string;
      width: string;
      height: string;
    };
    attributes: Attribute[];
  };

  export interface Attribute {
    options: string[];
    name: string;
  }
  
  export interface Image {
    id: string;
    src: string;
    color: Color;
  }
  
  export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
  };
  
  export interface Category {
    id: string;
    name: string;
    billboard: Billboard;
  };
  
  export interface Size {
    id: string;
    name: string;
    value: string;
  };
  
  export interface Color {
    id: string;
    name: string;
    value: string;
  };