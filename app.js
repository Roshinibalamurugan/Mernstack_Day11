// const http=require("http")
// const server=http.createServer()
// server.on("request",(req,res)=>{
//     console.log("requested");
    
// })
// server.listen(269,()=>console.log("server is running"))



//---------------------Custome Event --------------------
/*
const events=require("events")
const customEvent= new events.EventEmitter()
customEvent.on("cs",()=>{
    console.log("cs is called");
  
})
customEvent.emit("cs")
*/


//----------------------------------Express ------------------------------
/*
const express=require("express")
const path=require("path")
const app=express()
app.get("/",(req,res)=>{
    // res.json({ok:true})
    res.status(200).sendFile(__dirname+"/index.html")
})
app.listen(26,()=>{console.log("running");
})
*/



//------------------------API------------------- (in postman call http://localhost:3000/api/v1/products)--------------

//                                                                       API
/*
const express = require("express")
const http = require("http")
const fs = require("fs")
const path = require("path")
const app = express()
app.use(express.json())
const jsonData =JSON.parse( fs.readFileSync(path.join(__dirname,"model","product.json"),"utf8"))     //JSON.parse - to covert json to obj
   method 1 not redusable code
 app.get("/api/v1/products",(req,res)=>{
// res.json(jsonData)
try{
res.status(200).json({
    status : "fullfilled",             //to print data in postman
    count:jsonData.length,
    data:{
        products:jsonData
    }
})
} catch(err){
    res.status(500).json({
        status:"failed",
        message:"error"
    })
}


}
)


app.get("/api/v1/products/:id/:id1?", (req, res) => {          //:id1 - return value of gn id | ? - make :id1 optional
    console.log("yes");                                          // Output in terminal: yes

    let id = req.params.id * 1;                                  // Convert to integer
    let id1 = req.params.id1;                                    // Optional parameter

    try {
        const data = jsonData.find((i) => i.id === id);          // Find product by id
        console.log(data); 
        res.status(200).json({
            status: "fulfilled",
            count: data.length,                                            
            data: {
                product: data
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message:"error"                                   
        });
    }
});


//POST

app.post("/api/v1/products",(req,res)=>{
    // console.log(req.body)
    const id = jsonData.length+1           // to create new id
    const newProduct = {...req.body,id:id}
    jsonData.push(newProduct) 
    fs.writeFile(path.join(__dirname,"model","product.json"),JSON.stringify(jsonData),()=>{})    //to convert obj to json
    res.json({
        status:"fullfilled",
        count:jsonData.length,
        data:{
            product:jsonData
        }
    })
})


app.delete("/api/v1/products/:id",(req,res)=>{
    let id=req.params.id*1
    let deletedJson = jsonData.filter((i)=>i.id!==id)
    fs.writeFile(path.join(__dirname,"model","product.json"),JSON. stringify(deletedJson),()=>{})
    res.status(204)
    res.json()

})


// app.get("/*",(req,res)=>{
//     res.json({
//         status:"failed"                            //http://localhost:3000/api/v1/productsapi means o/p status:"failed"
//     }) 
// })


app.patch("/api/v1/products/:id",(req,res)=>{
    let id = req.params.id*1
    let updateProd = jsonData.find((i)=>i.id===id)
    let index = jsonData.indexOf(updateProd)
    console.log( jsonData[index] );
    jsonData[index] = Object.assign(updateProd,req.body)    //updateProd-target  ,  req.body-value
    fs.writeFile(path.join(__dirname,"model","product.json"),JSON. stringify(jsonData),()=>{})    //to write update in json file
    res.status(200).json({status: "fulfilled" });
    }
)

app.put("/api/v1/products/:id",(req,res)=>{
    let id = req.params.id*1
    let updateProd=jsonData.find((i)=>i.id===id)
    let index = jsonData.indexOf(updateProd)
    console.log( jsonData[index] );
    jsonData[index] =(req.body)                           // req.body - value
    fs.writeFile(path.join(__dirname,"model","product.json"),JSON.stringify(jsonData),()=>{})    //to write update in json file
    try{
    res.status(200).json({
        status:"put updated",
        count:updateProd.length,
        data:{
            product:updateProd
        }
    })
}catch(err){res.json({status:"failed",message:"error"})}
})
*/



//--------method 2
// ------------------------------------------------USE FUNCTION INSTEAD CALL BACK
/*
const express = require("express")
const http = require("http")

const app = express()
const {getProducts, getProduct , post_fun , delete_fun, patch_fun, put_fun}= require("./routeHandler/productFunctions")   //importing 
app.use(express.json())



// app.use((req,res,next)=>{
//     console.log("middleware");
//     next() ;            // to execute following rest functions
// })

app.use(mid)

function mid(req,res,next){
        console.log("middleware");
        // next() ;            // to execute following rest functions
    }

app.get("/api/v1/products",getProducts)
app.get("/api/v1/products/:id/:id1?",getProduct);
app.post("/api/v1/products",post_fun)
app.delete("/api/v1/products/:id",delete_fun)
app.patch("/api/v1/products/:id",patch_fun)
app.put("/api/v1/products/:id",put_fun)
app.listen(3000,()=>{console.log("http://127.0.0.1:3000")})
*/


//----------------------------------Morgan-----------------------------
const express = require("express")
const http = require("http")
const morgan= require("morgan")   //import morgan
const dotenv=require("dotenv")
const app = express()
// const {getProducts, getProduct , post_fun , delete_fun, patch_fun, put_fun}= require("./routeHandler/productFunctions")   //importing 
app.use(express.json())
app.use(morgan("dev"))
const productRoutes=require("./routes/productRoutes")
dotenv.config({path:"./config.env"})
//                                   Route combine
// const productRoutes=express.Router()
app.use("/api/v1/products",productRoutes)

module.exports=app




