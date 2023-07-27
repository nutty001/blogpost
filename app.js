//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "This is a simple website created to study the working of database.";
const contactContent = "Pratikthapa328@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://pratikthapa:N222nutty@cluster0.hjuzoqp.mongodb.net/blogDB");

const postSchema={
  title:String,
  content:String
};

const Post = mongoose.model("Post", postSchema);




app.get("/", function(req, res){

  Post.find({}) 
  .then (function(posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
  
});


app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save() .then(()=>{
      res.redirect("/");
    }) .catch((err)=>{
      console.log(err);
    })
  });



app.get("/posts/:postid", function(req, res){
  const requestedPostid = req.params.postid;
  const requestedTitle = _.lowerCase(req.params.postName);

Post.findOne({_id: requestedPostid})
.then(function(post){
  res.render("post", {
    title: post.title,
    content: post.content
  });
});

});
app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


let port=process.env.PORT;
if(port==null || port==""){
  port=3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});
