$(()=>{
    $("#logout").hide();
    $.get('/profile',(data)=>{
        if(data.username!=undefined){
            alert("Welcome " + data.username);
            $('#login123')
                .text(data.username)
                .attr("href","#")
            $("#logout").show();
        }
        else{
            alert("Logged Out Successfully");
        }
    });
});

$("#logout").on('click',function(){
    $.get("/logout",(data)=>{
        console.log(data);
    });
});