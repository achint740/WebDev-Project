// alert('Connected!!');
function loginCheck(){
    $.get('/checkUser',(data)=>{
        if(!data){
            return true
        }
        else{
            return false
        }
    })
}

$(()=>{
    $("#logout").hide();
    $.get('/profile',(data)=>{
        if(data.username!=undefined){
            console.log("Welcome " + data.username);
            $('#login123')
                .text(data.username)
                .attr("href","#")
            $("#logout").show();
        }
        else{
            console.log("Please Login");
        }
    });
});

$('.cnt').hide();

$('.add').on('click',function(){
    let ans=loginCheck()
    if(!ans){
       return document.location.href='/login'
    }
    let obj = {
        name : ($(this).parent()).siblings(".name").children().text(),
        price : +(($(this).parent()).siblings(".price").children().text()),
        times : +(($(this).parent()).siblings(".cnt").children('.update').text())
    };
    // console.log(obj.times);
    $.post('/addcart',obj,(data)=>{
        if(data == 'Success'){
            console.log('Yass!!');
        }
        else{
            // console.log('Msg was Failure');
            let obj_new = {
                name : obj.name,
                price : obj.price,
                work : 'inc'
            }
            $.post('/updatecart',obj_new,(data)=>{
                if(data == 'Success')
                    console.log('Update Successfull');
            })
        }
    });
    $(this).parent().siblings('.cnt').show();
});

$('.dec').on('click',function(){
    let v = $(this).parent().children('.update').text();
    v--;
    console.log(v);
    $(this).parent().children('.update').text(v);
    let obj = {
        name : ($(this).parent()).siblings('.name').children().text(),
        price : +(($(this).parent()).siblings(".price").children().text()),
        work : 'dec'
    };
    $.post('/updatecart',obj,(data)=>{
        if(data == 'Success')
            console.log('Update Successfull');
    });
    if(v == '0'){
        $(this).parent().children('.update').text("1");
        $(this).parent('.cnt').hide();
    }

});

$('.inc').on('click',function(){
    let v = $(this).parent().children('.update').text();
    v++;
    console.log(v);
    $(this).parent().children('.update').text(v);
    let obj = {
        name : ($(this).parent()).siblings('.name').children().text(),
        price : +(($(this).parent()).siblings(".price").children().text()),
        work : 'inc'
    };
    $.post('/updatecart',obj,(data)=>{
        if(data == 'Success')
            console.log('Update Successfull');
    });
});

$("#logout").on('click',function(){
    $.get("/logout",(data)=>{
        console.log(data);
    });
});

