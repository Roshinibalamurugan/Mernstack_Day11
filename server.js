const app=require("./app")
// console.log(process.env.PORT);  //o/p 4000

let port=process.env.PORT ||3000   // if not 4000 then it defaultlly run 3000 when port is not given

app.listen(3000,()=>{console.log("http://127.0.0.1:3000")})
