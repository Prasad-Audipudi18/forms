const express=require('express')
const mysql=require('mysql')
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json())
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:"signup"
})
app.post('/register',(req,res)=>{
    const dbQuery="INSERT INTO login(`firstname`,`lastname`,`mobile`,`email`,`password`) VALUES(?)"; //backticks are very important cause it will identify as  columns
    const values=[
        req.body.fname,
        req.body.lname,
        req.body.number,
        req.body.email,
        req.body.password
    ]
    db.query(dbQuery,[values],(err,data)=>{
        if(err){
          console.log(err)
            res.send(err)
        }
        else{
            console.log(data)
            res.send(data)
        }
    })
})

app.post('/log',  async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password
    console.log("entered into login")
    const dbQuery=`select * from login where 'email'=${email} and 'password'=${password}`; //backticks are very important cause it will identify as  columns
   
    db.query(dbQuery,async (err,data)=>{
        console.log('db Query is',dbQuery)
        if(err){
          
            res.send(err)
            console.log(err)
            console.log('error')
            
        }
        else{
            console.log("data block")
            res.send(data)
        }
    })
  

})


app.post('/login',(req,res)=>{
   const email=req.body.email;
   const password=req.body.password
    const dbQuery="select * from login where email=? and password=?"; //backticks are very important cause it will identify as  columns
   
    db.query(dbQuery,[email,password],(err,data)=>{
        console.log('dbQuery is',dbQuery)
        if(err){
          console.log('error block')
            res.send(err)
        }
        else{
            if (data.length == 0) {
 
                res.json({ success: false, message: 'Invalid email or password' });
              } else if (data.length == 1){
               
                res.json({ success: true, message: 'Valid user' });
              }          
        }
    })
})


app.listen(8081,()=>{
    console.log('listening')
})