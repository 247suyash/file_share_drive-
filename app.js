const routes = require("./routes");
require('dotenv').config()
const express = require('express');
const { engine } = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const Handlebars = require("handlebars");
const  path  = require('path');
const session = require('express-session');
const { default: mongoose } = require("mongoose");
const flash = require("connect-flash");

const app = express(); 

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SESSION_SECRATE,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },

}))
app.use(session({
  secret:'this session use for flash',
  resave:false,
  saveUninitialized:true
}))
// app.use(cookieParser('keyboard cat'));
  app.use(flash());
// create server code start here  
const port = process.env.PORT
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
//create server code end here



mongoose 
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connected successfully..."))
  .catch(console.log);


// handlebars code start here
app.engine(".hbs", engine({
    extname: ".hbs",
    defaultLayout: "main",
    handlebars:allowInsecurePrototypeAccess(Handlebars),

  })
)
app.set("view engine", ".hbs");   //Sets our app to use the handlebars engine
app.use(express.urlencoded({ extended: false })) // use for getting form url data encoded
app.set("views", path.join(__dirname, "views"))  //Sets handlebars configurations 
app.use(express.static(path.join(__dirname, 'uploads')));

// handle bars code end here


app.use(routes);
app.use(express.json());
