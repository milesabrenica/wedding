$(document).ready(function(){
  // SLIDESHOW
  cbpBGSlideshow.init();

  $('body').flowtype({
    minimum   : 500,
    maximum   : 1200,
    minFont   : 12,
    maxFont   : 20,
    fontRatio : 10
  });

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
        }
      }
    });

  // NAVIGATION SCROLL
  var  mn = $(".main-nav"),
  mns = "main-nav-scrolled",
  hdr = $('#homepage').height();

  $(window).scroll(function() {
    
      if( $(this).scrollTop() > hdr ) {
        mn.addClass(mns);
      } 
      else {
      mn.removeClass(mns);
      }
  });  

// var navLinks = $('body').find('.wrap #homepage .main-nav ul li a');

//     navLinks.each(function(index){
        
//         if((index)% 2 === 0){
//             $(this).css({"color": "red"});
//         }
//     });

  // COUNTDOWN

  var fiveSeconds = new Date().getTime() + 5000;
 $('#clock').countdown(fiveSeconds, {elapse: true})
 .on('update.countdown', function(event) {
   var $this = $(this);
   if (event.elapsed) {
     $this.html(event.strftime('<span>Days %D Hours %H Minutes %M Seconds %S</span>'));
   } else {
     $this.html(event.strftime('To end: <span>%H:%M:%S</span>'));
   }
 });

   $('#clock').countdown('2015/09/28', function(event) {
    var $this = $(this).html(event.strftime(
      '<span>%D</span> days '
      + '<span>%H</span> hours '
      + '<span>%M</span> minutes '
      + '<span>%S</span> seconds'
      ));
    }); 

	$('.bxslider').bxSlider();

	$('.bm-cover').click(function() {
      $('.bm-cover').fadeOut('500');
    });

  $('.gm-cover').click(function() {
    $('.gm-cover').fadeOut('500');
  });


  $(".owl-carousel").owlCarousel();

  //make ajax request to instagram, get JSON, dynamically build HTML

	ajaxCall("https://api.instagram.com/v1/tags/happilyeverabrenica/media/recent");

});

$("#ig-feed").on("mouseenter",".ig-thumb-hover", function(){
    // console.log($(this));
    $(this).css("opacity", 1);
});

$("#ig-feed").on("mouseleave",".ig-thumb-hover", function(){
    // console.log($(this));
    $(this).css("opacity", 0);
});

//FULL VIEW ON CLICK

$("#ig-feed").on("click","a.full-view",function(){
  $(".overlay").fadeIn(400);
  $(".fullsize").fadeIn(400);
  $("body").addClass('no_scroll');


  var imgUrl = $(this).parents(".ig-thumb").find(".ig-photo").attr('data-fullres');
  console.log(imgUrl);
  $(".fullsize").find('img').attr('src', imgUrl);
});

//INSTAGRAM LINK ON CLICK
    


$(".close").click(function(){
  $("body").removeClass('no_scroll');
  $(".overlay").fadeOut(400);
  // $(".main-nav, .main-nav-scrolled").fadeIn();
});

$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
        $(".overlay").fadeOut(400);
        $("body").removeClass('no_scroll');
    }
});





function processResponse(data){
    var igFeed = data;
    var limit = igFeed.data.length;

    for(var i = 0; i < limit; i++){    
		$("#ig-feed").append("\
            <div class='ig-thumb'>\
                <div class='ig-thumb-hover'>\
                    <a class='full-view'>Full View</a> &hearts; \
                    <a target='_blank' class='ig-link' href='"+igFeed.data[i].link +"'>Instagram</a>\
                </div>\
                <img class='ig-photo' data-fullres='"+igFeed.data[i].images.standard_resolution.url+"' src='"+igFeed.data[i].images.low_resolution.url+"'/>\
            </div>");
	}

    // console.log(igFeed);
	// if next_url exists do another ajax call with THAT URL and then process that data
	if (igFeed.pagination.next_url) {
		ajaxCall(igFeed.pagination.next_url);

	}
    //else{
 //        //all images are now loaded. loop through them, using i % 3 === 0, create a border around the element.  use $(this)
 //        $(".ig-photo").each(function(index){
 //            if(index % 2 === 0){
 //                $(this).css({"border": "10px solid red" });

 //            }
 //        });

 //    }



};

function ajaxCall(url){

	$.ajax({
		type: "GET",
		url: url,
		data: "access_token=992364.6d08390.2e471e93a5ce42eeb15ab4669a58ca11",
		dataType: "jsonp",
		success: function(serverResponse){
			processResponse(serverResponse);
		}
	});
}