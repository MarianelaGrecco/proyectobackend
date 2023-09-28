import mongoose from "mongoose";
import productsModel  from "../src/persistencia/mongoDB/models/products.model.js"
import cartModel from "../src/persistencia/mongoDB/models/cart.model.js"



before(async () => {
    await mongoose.connect("mongodb+srv://marianelagrecco:MarG1984@cluster1.ppek3vt.mongodb.net/?retryWrites=true&w=majority")
})

after(async () => {
    mongoose.connection.close()
})

export const dropProducts = async() => {
    await productsModel.collection.drop()
}

export const dropCart = async() => {
    await cartModel.collection.drop()
}

