$("#menu-button").click(function(event){
    event.preventDefault();
   $("#menu-list").slideToggle();
});

$(window).resize(function() {
   if ($(window).width() >= 830) { 
        $("#menu-list").show();
   }
   else {
        $("#menu-list").hide();
   }
});
