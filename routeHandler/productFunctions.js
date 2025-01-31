//from app.js 


//                                               USE FUNCTION INSTEAD CALL BACK

const fs = require("fs")
const path = require("path")

const jsonData =JSON.parse( fs.readFileSync(path.join(__dirname,"..","model","product.json"),"utf8"))     //JSON.parse - to covert json to obj


const getProducts = (req,res)=>{
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





const getProduct =  (req, res) => {          //:id1 - return value of gn id | ? - make :id1 optional
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
}


const post_fun = (req,res)=>{
    // console.log(req.body)
    const id = jsonData.length+1           // to create new id
    const newProduct = {...req.body,id:id}
    jsonData.push(newProduct) 
    fs.writeFile(path.join(__dirname,"..","model","product.json"),JSON.stringify(jsonData),()=>{})    //to convert obj to json
    res.json({
        status:"fullfilled",
        count:jsonData.length,
        data:{
            product:jsonData
        }
    })
}




const delete_fun = (req,res)=>{
    let id=req.params.id*1
    let deletedJson = jsonData.filter((i)=>i.id!==id)
    fs.writeFile(path.join(__dirname,"..","model","product.json"),JSON. stringify(deletedJson),()=>{})
    res.status(204)
    res.json()

}




const patch_fun = (req,res)=>{
    let id = req.params.id*1
    let updateProd = jsonData.find((i)=>i.id===id)
    let index = jsonData.indexOf(updateProd)
    console.log( jsonData[index] );
    jsonData[index] = Object.assign(updateProd,req.body)     //updateProd - target |  req.body - value
    fs.writeFile(path.join(__dirname,"..","model","product.json"),JSON. stringify(jsonData),()=>{})    //to write update in json file
    try{
    res.status(200).json({
        status:"patch updated",
        count:updateProd.length,
        data:{
            product:updateProd
        }
    })
}catch(err){res.json({status:"failed",message:"error"})}
    
}



const put_fun = (req,res)=>{
    let id = req.params.id*1
    let updateProd=jsonData.find((i)=>i.id===id)
    let index = jsonData.indexOf(updateProd)
    console.log( jsonData[index] );
    jsonData[index] =(req.body)                           // req.body - value
    fs.writeFile(path.join(__dirname,"..","model","product.json"),JSON. stringify(jsonData),()=>{})    //to write update in json file
    try{
    res.status(200).json({
        status:"put updated",
        count:updateProd.length,
        data:{
            product:updateProd
        }
    })
}catch(err){res.json({status:"failed",message:"error"})}
}

const validate=(req,res,next)=>{
    let body = req.body
    let header=req.headers
    console.log(header);
    if(header.token!=="Pass"){
        return res.json({
            status:"fail",
            message:"unauth acess"
        })
    }
    if(!body.name || !body.count){
        return res.json({
            status:"fail",
            message:"bad request"
        })
    }
    next()
}

const idvalidator=(req,res,next,value)=>{
    value=value*1
    const item=jsonData.find((item)=>item.id===value)
    if(!item){    
        res.status(400).json({
        status:"failed",
        message:"no product found"
    })}
}

module.exports = {getProducts, getProduct, post_fun, delete_fun, patch_fun, put_fun, validate,idvalidator}         // named export