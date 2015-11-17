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


  // COUNTDOWN

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


function processResponse(data){
	console.log(data);
	var igFeed = data;

	for(var i = 0; i < 20; i++){
		$("#ig-feed").append("<div><a target='_blank' href='"+igFeed.data[i].link+"'><img class='ig-photo' src='"+igFeed.data[i].images.standard_resolution.url+"'/></a></div>");
	}

	// if next_url exists do another ajax call with THAT URL and then process that data
	if (igFeed.pagination.next_url != "") {
		ajaxCall(igFeed.pagination.next_url);
	}
}

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