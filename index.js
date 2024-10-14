const express = require("express");
const app = express();
let port = 8080;
const path = require("path");
const {v4:uuidv4} = require("uuid")
var methodOverride = require('method-override');
app.use(methodOverride('_method'))


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "/views"));
app.set(express.static(path.join(__dirname,"public")))
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`i am listening at ${port}`);
});
app.set("view engine", "ejs");
let posts=[
  {
    id:uuidv4(),
    username:"Doraemon",
    content:"My Body is in Blue colour"
  },
  {  id:uuidv4(),
    username:"Nobita",
    content:"I am the Best friend of doraemon "
  },
  {  id:uuidv4(),
    username:"Shizuka",
    content:"I am Girlfriend of Nobita "
  }
]
app.get("/",(req,res)=>{
  res.send("Server Working Well")

})
app.get("/posts",(req,res)=>{
  res.render("data.ejs",{posts})

})
app.get("/posts/new",(req,res)=>{
  res.render("new.ejs")
})
app.post("/posts",(req,res)=>{
  let{username,content}=req.body
  let id=uuidv4()
  posts.push({username,content,id})
  res.redirect("/posts")
  
})
app.get("/posts/:id",(req,res)=>{
  let{id}=req.params
  let post=posts.find((p)=>id===p.id)
  console.log(post)
  res.render("show.ejs",{post})
  
})

app.patch("/posts/:id",(req,res)=>{
  let {id}=req.params
  let newbody=req.body.content
  let post=posts.find((p)=>id===p.id)
  
 post.content= newbody
  
  res.redirect("/posts")

})
app.get("/posts/:id/edit",(req,res)=>{
  let {id}=req.params
  let post=posts.find((p)=>id===p.id)
  res.render("edit.ejs",{post})

  
})
app.post("/posts/:id", (req, res) => {
  let { id } = req.params;

  // Ensure id is correctly compared (convert both to strings if necessary)
  posts = posts.filter((p) => p.id !== id); // Filter out the post with the matching id

  res.redirect("/posts") // Redirect back to posts after deletion
});
