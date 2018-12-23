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
        mouseDrag: false
    });
    
    
    $(".testimonial-slider").owlCarousel({
        items: 1,
        loop: true,
        mouseDrag: false,
        responsive:{
            0: {
                nav: false,
                dots: true
            },
            767: {
                nav: true
            }
        }
    });

    $(".testimony-btn").on('click', function(){
        var $self = $(this);
        var $parent = $($self.parent());
        var $hidden = ($parent.find('.testimony-hidden'));
        if ($hidden.hasClass('open')){
            $hidden.removeClass('open');
            $self.text('Подробнее');
        } else {
            $hidden.addClass('open');
            $self.text('Скрыть');
        }
    });

    $("#lightgallery").lightGallery();
});