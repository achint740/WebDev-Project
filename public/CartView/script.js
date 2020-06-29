function loginCheck(){
    $.get('/checkUser',(data)=>{
        if(data.username!=undefined){
            return true;
        }
        else{
            alert("False");
            return false;
        }
    })
}

$(document).ready(()=>{
    $.get('/profile',(data)=>{
        if(data.username!=undefined){
            console.log("Welcome " + data.username);
        }
        else{
            alert("Please Login");
            document.location.href='/login';
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

