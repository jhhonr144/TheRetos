export interface IProducts {
    id_uid: string;
    id_product?:string;
    name: string;
    path:string;
    category: number;
    marking:string; 
    ticket:number;
    Inventory: number;
    hours_create : string
    date_create : string;
    state : number;

  
}

class Products implements IProducts {

    id_uid: string;
    id_product?:string;
    name: string;
    path:string;
    category: number;
    marking:string; 
    ticket:number;
    Inventory: number;
    hours_create : string
    date_create : string;
    state : number;
    
    constructor() {

    }
}

export default Products;