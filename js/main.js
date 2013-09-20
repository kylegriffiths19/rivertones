$(document).ready(function(){

 //Script to highlight current links 
    
         function highlightLink(){
            $('.site-nav li:contains("Home")').addClass('highlight');
            $(document).ready(function(){
                var str=location.href.toLowerCase();
                $(".site-nav li a").each(function() {
                    if (str.indexOf(this.href.toLowerCase()) > -1) {
                         $("li.highlight").removeClass("highlight");
                         $(this).parent().addClass("highlight");
                    }
                 });
                 })
        }

        //creates smooth animated scroll effect
        function animateScroll(){
            $(document).ready(function(){
                $('a[href*=#]:not([href=#])').click(function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
                || location.hostname == this.hostname) {

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
}
    //reveals more events in list
    function revealEvents(){
        $(document).ready(function(){
            $("#view-more-events").find("span").hide();
            $("#view-more-events a").click(function(){
                $(this).next().fadeIn();
                $(this).fadeOut();
            });
        });
    }

    function buttonHighlight(){
        $document.ready(function(){
            $("a.btn").hover(function(){
                addClass("button-highlight");
            });
        })
    }
    //function calls

    highlightLink();
    animateScroll();
    revealEvents();
    buttonHighlight();
    });
    

