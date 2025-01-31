// MORE SIMPLER   -   from app.js
const express = require("express")
const {getProducts, getProduct , post_fun , delete_fun, patch_fun, put_fun, validate,idvalidator}= require("../routeHandler/productFunctions")   //importing 

const productRoutes=express.Router()
productRoutes.param("id",idvalidator)    //after idvalidator)

productRoutes.route("/").get(getProducts).post(validate,post_fun)
productRoutes.route("/:id").get(getProduct).delete(delete_fun).patch(patch_fun).put(put_fun)

module.exports=productRoutes