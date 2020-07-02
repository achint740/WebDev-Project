//-----------------------------REQUIRE EXPRESS-----------------------------
const exp = require("express");
const app = exp();
const Users = require('./db').Users;
const Cart = require('./cart').Cart;
const passport = require('./passport');
const session = require('express-session');

let cart_no = 1;


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

//-----------------------------POST REQUEST FOR ADDING TO CART-----------------------------
app.post('/addcart',function(req,res){

    let name = req.body.name;
    let price = +(req.body.price);
    let times = +(req.body.times);
    let msg = "Success";

    Users.findOne({
        where : {
            username : req.user.username
        }
    }).then((val)=>{
        let v = (val.dataValues);
        let my_cart = +(v.cart_id);
        Cart.findOne({
            where : {
                cart_id : my_cart
            }
        }).then((val)=>{
            let n_order = (val.dataValues).order;
            if(n_order.hasOwnProperty(name)){
                msg = "Failure";
                console.log("Sorry,It was an update!");
                res.send(msg);
            }
            else{
                n_order[name] = [price,times];
                console.log(n_order);
                add_util(my_cart,n_order);
                msg = "Success";
                console.log("Addition Done");
                res.send(msg);
            }
        })
    });
});



//-----------------------------POST REQUEST FOR UPDATING CART-----------------------------
app.post('/updatecart',function(req,res){
    let name = req.body.name;
    Users.findOne({
        where : {
            username : req.user.username
        }
    }).then((val)=>{
        let v = (val.dataValues);
        let my_cart = +(v.cart_id);
        Cart.findOne({
            where : {
                cart_id : my_cart
            }
        }).then((val)=>{
            let n_order = (val.dataValues).order;
            let item = n_order[name];
            if(req.body.work=='dec'){
                if(item[1]==1){
                    delete n_order[name];
                }
                else{
                    item[1]--;
                    n_order[name] = item;
                }
            }
            else{
                item[1]++;
                n_order[name] = item;
            }
            add_util(my_cart,n_order);
        });
    });
    res.send('Success');
});




//-----------------------------GET REQUEST FOR FETCHING CART-----------------------------
app.get('/getcart',(req,res)=>{
    Users.findOne({
        where : {
            username : req.user.username
        }
    }).then((val)=>{
        let v = (val.dataValues);
        let my_cart = +(v.cart_id);
        Cart.findOne({
            where : {
                cart_id : my_cart
            }
        }).then((val)=>{
            let n_order = (val.dataValues).order;
            // console.log("Your order is : \n");
            // Object.keys(n_order).forEach((key,index)=>{
            //     console.log(key,n_order[key]);
            // });
            res.send(n_order);
        })
    });
});



//-----------------------------POST REQUEST FOR ADDING A USER-----------------------------
app.post('/signup',(req,res)=>{
    Users.create({
        username : req.body.username,
        password : req.body.password,
        contact : req.body.contact,
        email : req.body.email,
        cart_id : +(cart_no)
    }).then((createdUser)=>{
        Cart.create({
            cart_id : +(cart_no),
            order : {}
        }).then((cart)=>{
            cart_no = cart_no + 1;
            res.redirect('/login');
        })
    })
});




//-----------------------------POST REQUEST FOR LOGIN OF A USER-----------------------------
app.post('/login',passport.authenticate('local', { failureRedirect: '/login' }),function(req,res){
    console.log("User : " + req.user.username + " Has Looged In");
    Users.findOne({
        where : {
            username : req.user.username
        }
    }).then((val)=>{
        let v = (val.dataValues);
        let my_cart = +(v.cart_id);
        Cart.findOne({
            where : {
                cart_id : my_cart
            }
        }).then((val)=>{
            let n_order = (val.dataValues).order;
            n_order = {};
            add_util(my_cart,n_order);
            res.redirect('/menu');
        })
    });
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


//-----------------------------LOCALHOST 5500-----------------------------
app.listen(5500,()=>{
    console.log('Server Started!!');
});

function add_util(my_cart,n_order){
    Cart.update(
        {order : n_order},
        {where : { cart_id : my_cart} }
    )
    .then(function(rowUpdated){
        console.log("Update Done");
    });
}