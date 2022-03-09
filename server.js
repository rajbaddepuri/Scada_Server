
//Installed express,multer,cors,nodeman
//Concurrently for starting the nodemon server.js and react-scripts 
//npm i express multer cors nodemon concurrently 

//react-toastify
//reactstrap
import express from 'express';
import multer  from 'multer';
import diskStorage from 'multer';
import  MulterError  from 'multer';
import cors from 'cors';
import * as fs from 'fs';
import axios from 'axios'

//var express = require('express');
var app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false})); 

// app.get('/', function (req, res) {

//     console.log("entered into my sql api")
    
   
//     const sql = require("mssql");

//     // config for your database
//     var config = {
//         user: 'sa',
//         password: 'scada@123',
//         server: 'localhost', 
//         database: 'ECDBAZE' 
//     };

//     // connect to your database
//     sql.connect(config, function (err) {
    
//         if (err) console.log(err);

//         // create Request object
//         var request = new sql.Request();
           
//         // query to the database and get the records
//         request.query('select * from UserDetails', function (err, recordset) {
            
//             if (err) console.log(err)

//             // send records as a response
//             res.send(recordset);
            
//         });
//     });
// });



//Upload Xml File------------------------------------------------------------------------------------
var storage =  multer.diskStorage({
    destination: function (req, file, cb) {

        //To Syatem Path
   //cb(null, 'E:/ecscada (2)/PocessFlowModels/Pages')
    //  //To Project Path
    cb(null, 'src/Pages/Xml/Xml')
   //  cb(null,'public/assets/XmlPictures')
  },
  filename: function (req, file, cb) {
    //   cb(null, Date.now() + '-' +file.originalname )
    cb(null,file.originalname)
  }
})

var upload = multer({ storage:storage }).single('file')

app.post('/uploadFile',function(req, res) {
    console.log("Upload Called")
   
    console.log(req.file)
    console.log(req.body.file)
    upload(req, res, function (err) {
           if (err instanceof MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)
    })
});

//Upload Image File------------------------------------------------------------------------------------
var imagestorage = diskStorage({
    destination: function (req, file, cb) {
    cb(null,'public/assets/XmlPictures')
  },
  filename: function (req, file, cb) {
    //   cb(null, Date.now() + '-' +file.originalname )
    cb(null,file.originalname)
  }
})


var imageuploader = multer({ storage: imagestorage }).single('file')
//Upload Image File-------------------------------------
app.post('/uploadImageFile',function(req, res) {

   
    console.log("Upload Image Called")
    console.log(req.file)
    imageuploader(req, res, function (err) {
           if (err instanceof MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)
    })
});


//Delete Xml  File--------------------------------------
app.post('/deleteFile',function(req , res) {
    console.log("Delete Called")
    console.log(req.body.file)
        //const path = 'E:/ecscada (2)/PocessFlowModels/Pages/'+req.body.file;
        const path = 'src/Pages/Xml/Xml/'+req.body.file;
                try {
                fs.unlinkSync(path)
                res.send({
                    deleted:true,
                });
                //file removed
                } catch(err) {
                console.error(err)
                res.send({
                    deleted:false,
                });
                }
});


app.get("/home",(req,res)=>{
    console.log("Calling")
    res.send({
        received:false,
        data:"this is Home page",
    });
});


app.listen(8000, function() {
    console.log('App running on port 8000');
});


//.............. for creating folader inside the project..........///

app.post('/ProjectFolader',function(req , res) {
    console.log("Project folader name called")
   var pathname = 'E:/ecscada (2)/ECSCADA Web Server/src/Pages/Project/'+req.body.file;
   console.log(pathname)
       

        fs.mkdir(pathname,function(err){
            if(err){
                console.log(err)
            }
            else{
                console.log("Project folader created succesfully")
            }
        })
               
});




////////...............to genarate reports......///////

        app.post('/Reports',function(req , res) {
            console.log("Project folader name called")

            fs.readdir(req.body.file,function(err,files){
                //var pathname = ' E:/ecscada (2)/scada/public/assets/pdf';
               
                // fs.writeFile(pathname,{
                    
                // })..
                var temp = []

                 files.map((a)=>{
                    temp.push(a.filter("30-09-2021"))
                })
                    console.log(temp)
                if(err){
                    return console.log("error")
                }
                res.send({
                    data:files
                })
                // const path = require("path")
                // const pathtofile = path.join(req.body.file,files)
                // const path

           
       
     
    }) 
    });
    
    //To create Txt file
    app.post('/TrendData',function(req , res) {
      
        console.log("To create data txt file")
    //     console.log(req.body.data)
    //     fs.appendFile('data.txt',req.body.data, function (err) {
    //   if (err) throw err;
    //   console.log('Updated!');
    // })
    var data = fs.readFileSync('data.txt', 'utf8');
    console.log(data); 
        
    
    
});
app.get('/HelloWorld', (req, res) => {
    var data = fs.readFileSync('data.txt', 'utf8');
    //console.log(data); 
    res.send(JSON.stringify(data));
});

//   // To Read Txt file
  app.post('/TrendData',function(req , res) {
    console.log("To Read data txt file")
    console.log(req.body.data)
    fs.readFile('data.txt', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(req.body.data);
        console.log(res.end())
        return res.end();
      });
});



