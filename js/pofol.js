;(function($){
    var pofol = {
        init:function(){
            var that = this;
                that.headerFn();
                that.section1Fn();
                that.section2Fn();
                that.section3Fn();
                that.section4Fn();
                that.footerFn();
        },
        headerFn:function(){
            var $header = $('#header');
            var $nav = $('#nav');
            var $mainBtn = $('#header .main-btn');

            $mainBtn.on({
                mouseenter:function(){
                    $header.addClass('over');
                }
            });
            $nav.on({
                mouseleave:function(){
                    $header.removeClass('over');
                }
            });
        },
        section1Fn:function(){
            var win = $(window);
            var winW = $(window).innerWidth();
            var winH = $(window).innerHeight();
            var $slide = $('#section1 .slide');

            function resizeFn(){
                winW = $(window).innerWidth();
                winH = $(window).innerHeight();

                $slide.css({width:winW,height:winH});
            }

            setTimeout(resizeFn,100);

            win.resize(function(){
                setTimeout(resizeFn,100);
            });
        },
        section2Fn:function(){

        },
        section3Fn:function(){

        },
        section4Fn:function(){

        },
        footerFn:function(){

        }
    }
    pofol.init();
})(jQuery);