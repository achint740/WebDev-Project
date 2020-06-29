function loginCheck(){
    $.get('/checkUser',(data)=>{
        if(data){
            return true;
        }
        else{
            return false;
        }
    })
}

$(document).ready(()=>{
    let ans=loginCheck()
    if(!ans){
       alert("Please Login");
       return document.location.href='/login'
    }
    $.get('/profile',(data)=>{
        if(data.username!=undefined){
            console.log("Welcome " + data.username);
        }
        else{
        
        }
    });
    $("#cart")
         .hide()
         .click();
});

function refresh(){
    let total = 0;
    $('#mycart tr').remove();
    $.get('/getcart',(data)=>{
        let i = 1;
        for(let y of data){
            $('#mycart').append(
                $('<tr>').append(
                    `<td>${i}. </td>`,
                    `<td>${y.name}(X  ${y.times})</td>`,
                    // 'X  ',
                    // y.times,
                    // ')  =  Rs.',
                    `<td>${(y.price*y.times)}</td>`
                )
            )
            i++;
            total+=(y.price*y.times);
            // console.log(typeof(y.times));
        }
        if(total>0)
            $('.bg-text').append(`<h4>Your Total Is :  <b>${total}</b></h4>`);
        else    
            $('.bg-text').append('You havent ordered any food yet');
    });
};

