$(document).ready(function () {
    var $html = $('html, body');
    var $window = $(window);
    function windowWidth() {
        return $window.innerWidth();
    }

    var $header = $('.header');
    var $nav = $('.nav');
    var navFixedStatus = false;

    $window.scroll(function () {
        if (scrollY > $header.height() && navFixedStatus == false){
            $nav.addClass('fixed');
        } else {
            $nav.removeClass('fixed');
        }
    });


    $(".header-carousel").owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        navText: ['<i class="icon-arrow"></i>', '<i class="icon-arrow_right"></i>'],
        animateOut: "fadeOut",
        animateIn: "fadeIn",
        mouseDrag: false,
        touchDrag: false,
        autoplay: true,
        autoplayTimeout: 5000,
        fallbackEasing: 'fade'
        
    });

    function scrollTo(jQObject, time){
        $html.animate({
            scrollTop: jQObject.offset().top,
        }, time);
    }
    
    $("[data-toggler]").click(function(){
        var $self = $(this);
        var $parent = $($self.attr('data-parent'));
        var width = windowWidth();
        if ($parent.hasClass('search_open') == false){
            $self.toggleClass('active');
            $html.toggleClass('nav_open');
            if (width < 991) {
                scrollTo($('.nav'), 150);
            }
        } else {
            $html.removeClass('nav_open');
            $self.removeClass('active');
            $parent.removeClass('search_open');
        }
    });
    
    $('.nav-search button').click(function(event){
        var $self = $(this);
        var $parent = $($self.attr('data-parent'));
        var width = windowWidth();
        if (width > 1199) {
            if ($parent.hasClass('search_open') == false){
                event.preventDefault();
                $parent.addClass('search_open');
                $html.addClass('nav_open');
            }
        }
    });

    $("[data-picker]").datepicker();
    
    var placeholderShort = false;
    function placeholderAdapt() {
        var input = $('.nav-search input[type="search"]');
        var width = windowWidth();
        if (width < 360 && placeholderShort == false) {
            input.attr('placeholder', 'Город или регион');
            placeholderShort = true;
        } else if (width > 360 && placeholderShort == true) {
            input.attr('placeholder', 'Город, регион или ключевое слово');
            placeholderShort = false;
        }
    }

    $window.on('resize', placeholderAdapt);
    $window.on('load', placeholderAdapt);

    var $discountedTours = $("[data-discount]");
    $discountedTours.each(function(){
        var $self = $(this);
        $self.css("position", "relative");
        var amount = $self.attr('data-discount');
        $self.append("<p class='discount'>" + "скидка <b>-" + amount + "</b>%" +"</p>")
    });

    $(".news-carousel").owlCarousel({
        loop: true,
        dots: true,
        autoHeight: true,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2,
                margin: 7
            },
            997: {
                items: 1
            }

        }
    });

    $(".reviews-carousel").owlCarousel({
        loop: true,
        autoHeight: true,
        responsiveClass: true,
        responsiveBaseElement: 'body',
        responsive: {
            0: {
                items: 1,
                nav: false,
                margin: 0,
                autoplay: false
            },
            992: {
                items: 2,
                nav: true,
                navText: ['<i class="icon-arrow"></i>', '<i class="icon-arrow_right"></i>'],
                margin: 30,
                autoplayHoverPause: true,
                autoplay: true,
                autoplayTimeout: 8000,
            },
        }
            
    });
});