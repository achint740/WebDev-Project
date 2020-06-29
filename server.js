//-----------------------------REQUIRE EXPRESS-----------------------------
const exp = require("express");
const app = exp();
const Users = require('./db').Users;
const passport = require('./passport');
const session = require('express-session');




//----------------------------------------------------------
app.use(exp.json())
app.use(exp.urlencoded({extended:true}))




//----------------------------- USE EXPRESS SESSION -----------------------------
app.use(session({
    secret : 'qwertyuiop',
    resave: false,
    saveUninitialized: true,
}));



//----------------------------- INITIALIZE PASSPORT -----------------------------
app.use(passport.initialize());
app.use(passport.session());




//-----------------------------LOAD SITE ON REQUEST TO '/' -----------------------------
app.use('/',exp.static(__dirname + '/public'));




//-----------------------------LOAD MENU ON REQUEST TO '/Menu' -----------------------------
app.use('/menu',exp.static(__dirname + '/public/Menu'));




//-----------------------------LOAD CART ON REQUEST TO '/CartView' -----------------------------
app.use('/cartview',exp.static(__dirname + '/public/CartView'));




//-----------------------------LOAD SignUp Page ON REQUEST TO '/signup' -----------------------------
app.use('/signup',exp.static(__dirname + '/public/SignUp'));




//-----------------------------LOAD Login Page ON REQUEST TO '/login' -----------------------------
app.use('/login',exp.static(__dirname + '/public/Login'));




//-----------------------------Initially, CART = EMPTY ----------------------------
let cart = [];
// let total = 0;




//-----------------------------POST REQUEST FOR ADDING TO CART-----------------------------
app.post('/addcart',function(req,res){
    // if(!req.user)
    //     res.redirect('/login');

    let flag = 1;
    for(i=0;i<cart.length;i++){
        if(cart[i].name == req.body.name){
            flag=0;
            break;
        }
    }
    let msg = 'Failure';
    if(flag == 1){
        cart.push(
            {
                name : req.body.name,
                price : +(req.body.price),
                times : +(req.body.times)
            }
        );
       msg = 'Success';
    }
    
    // total = total + req.query.price;
    res.send(msg);
});




//-----------------------------POST REQUEST FOR UPDATING CART-----------------------------
app.post('/updatecart',function(req,res){
    // if(!req.user)
    //     res.redirect('/login');
    for(i=0;i<cart.length;i++){
        if(cart[i].name == req.body.name){
            //Work According to Instruction Passed
            if(req.body.work == 'dec')
                cart[i].times--;
            else    
                cart[i].times++;
            if(cart[i].times == 0)
                cart.splice(i,1);
            break;
        }
    }
    res.send('Success');
});




//-----------------------------GET REQUEST FOR FETCHING CART-----------------------------
app.get('/getcart',(req,res)=>{
    // if(!req.user)
    //     res.redirect('/login');
    res.send(cart);
});



//-----------------------------POST REQUEST FOR ADDING A USER-----------------------------
app.post('/signup',(req,res)=>{
    Users.create({
        username : req.body.username,
        password : req.body.password,
        contact : req.body.contact,
        email : req.body.email
    }).then((createdUser)=>{
        res.redirect('/login');
    })
});




//-----------------------------POST REQUEST FOR LOGIN OF A USER-----------------------------
app.post('/login',passport.authenticate('local', { failureRedirect: '/login' }),function(req,res){
    console.log(req.user.username);
    res.redirect('/menu');
    // res.send(req.user.username);
});

app.get('/profile',(req,res)=>{
    res.send(req.user);
});

//-----------------------------POST REQUEST FOR LOGOUT OF A USER-----------------------------

app.get("/logout",function(req,res){
    // console.log("Logging out : " + req.user.username);
    req.logout();
    res.redirect("/");
});


//-----------------------------FOR ALL OTHER REQUESTS-----------------------------
app.get('*',(req,res)=>{
    res.send('Not Found!!');
});

//--------------------------------Check User-------------------------------------
app.get('/checkUser',(req,res)=>{
    if(req.user)
    {
        return res.send(req.user);
    }
    else
    {
        return res.send(null)
    }
})


//-----------------------------LOCALHOST 5500-----------------------------
app.listen(5500,()=>{
    console.log('Server Started!!');
});


