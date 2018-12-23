$(document).ready( function () {
    var $toggler = $('.nav-toggler');
    $toggler.click(function () {
        console.log('hi');
        var $target = $($(this).attr('data-target'));
        $target.toggleClass('open');
    });

    $(".carousel .owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        // mouseDrag: false,
        // touchDrag: false,
        // autoplay: true,
        // autoplayTimeout: 5000
        
    });
    
    
    $(".testimonial-slider").owlCarousel({
        items: 1,
        loop: true,
        nav: true,
    });

    $("#lightgallery").lightGallery();
});