//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This is a daily blog created by me (Mohamed Yassine Yahyaoui). I made it in order to learn how to generate HTML markup with plain JavaScript using the Embedded JavaScript templating EJS. There is a compose link in the navigation bar if you want to add a post and you will figure everything out on your own 😁 .";
const aboutContent = "A web developer passionate to learn everything, especially business management and finance skills. I would rather know a little about a lot than study more and more about less and less 😀.";
const contactContent = "Here are some links to reach me 😊.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts,
    title: posts.title,
    content: posts.content
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle) {
      res.render("post", {title: post.title, content: post.content});
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
