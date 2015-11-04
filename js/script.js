$(document).ready(function(){

  
//NAV LINKS
  $(function() {
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
  });

// NAVIGATION SCROLL
  var  mn = $(".main-nav"),
  mns = "main-nav-scrolled",
  hdr = $('#homepage').height();

  $(window).scroll(function() {
    console.log($(this).scrollTop(), hdr);
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

// HOMEPAGE SLIDESHOW

  $(document).ready(function(){
    $('.bxslider').bxSlider();
  });

// ENTOURAGE
  $(document).ready(function() {
    $('.bm-cover').click(function() {
      $('.bm-cover').fadeOut('500');
    });
    $('.gm-cover').click(function() {
      $('.gm-cover').fadeOut('500');
    });
  });

// PROPOSAL
  $(document).ready(function() {
    $(".owl-carousel").owlCarousel();   
  });

});
