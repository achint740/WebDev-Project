// alert('Connected!!');

$('.cnt').hide();

$('.add').on('click',function(){
    let obj = {
        name : ($(this).parent()).siblings(".name").children().text(),
        price : +(($(this).parent()).siblings(".price").children().text()),
        times : +(($(this).parent()).siblings(".cnt").children('.update').text())
    };
    console.log(obj.times);
    $.post('/addcart',obj,(data)=>{
        if(data == 'Success')
            console.log('Yass!!');
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
    if(v == '0')
        $('.cnt').hide();
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