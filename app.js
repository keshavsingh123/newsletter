//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
});
app.post("/",function(req,res){
    
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;
    
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
                
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    
    
        const url="https://us18.api.mailchimp.com/3.0/lists/dd61405f13";
        
        const option={
            method:"POST",
            auth:"keshav1:131de9d0b948ab028d241beef31cff96-us18"
        }
           const request= https.request(url,option,function(response){
               
     if(response.statusCode===200){
       res.sendFile(__dirname +"/success.html");
      }else{
      res.sendFile(__dirname+"/failure.html");
               }
           
               
 response.on("data",function(data){
      console.log(JSON.parse(data));
        })
        
    });
  request.write(jsonData);
    request.end();
        
    
});
app.post("/failure",function(req,res){
    res.redirect("/");
});

 function emitWarning(uid, reason) { 
   const warning = new Error( 
     `Unhandled promise rejection (rejection id: ${uid}): ` + 
     safeToString(reason)); 
   warning.name = 'UnhandledPromiseRejectionWarning'; 
   warning.id = uid; 
   try { 
     if (reason instanceof Error) { 
       warning.stack = reason.stack; 
     } 
   } catch (err) { 
     // ignored 
   } 
   process.emitWarning(warning); 
   if (!deprecationWarned) { 
     deprecationWarned = true; 
     process.emitWarning( 
       'Unhandled promise rejections are deprecated. In the future, ' + 
       'promise rejections that are not handled will terminate the ' + 
       'Node.js process with a non-zero exit code.', 
       'DeprecationWarning', 'DEP0018'); 
   } 
 } 
app.listen(process.env.PORT ||  3000,function(){ //process.env.PORT ||
    console.log("server is running on port 3000");
});
//131de9d0b948ab028d241beef31cff9
//list Id dd61405f13