const express = require(`express`)
const app = express();
const userModel = require('./models/user')
const postModel = require(`./models/post`)

const path = require('path')

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set(express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
  res.send('Home')
});

app.get('/create',async function(req,res){
  let createdUser = await userModel.create({
    username:'sudhanshu',
    age:21,
    email:'sudhanshu@gmail.com'
  });
  res.send(createdUser)
})

app.get('/post/create',async function(req,res){
  let post =  await postModel.create({
    postdata:'This is my post quote',
    user:'665c59405bcc8f5fca98d0b3'
  })
  let user = await userModel.findOne({_id:'665c59405bcc8f5fca98d0b3'});
  user.posts.push(post._id);
  await user.save();
  res.send({post,user})
})

app.listen(3000);