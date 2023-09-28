import cartModel  from "../../mongoDB/models/cart.model.js";
import BasicMongo from "./basicMongo.js";

class CartMongo extends BasicMongo{
        constructor(model){
            super(model)
          }
    }
    
    export const  cartMongo = new  CartMongo(cartModel)
    