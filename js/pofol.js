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
            var $sec1 = $('#section1');
            var $slideView = $('#section1 .slide-view');
            var $slideWrap = $('#section1 .slide-wrap');
            var $slide = $('#section1 .slide');
            var $pageBtn = $('#section1 .pagenation-btn');
            

            var cnt = 0;
            var n = $('#section1 .slide').length-2; //3
            var setId = null;
            var setId2 = null;

            var touchStart = 0;
            var touchEnd = 0;
            var mouseDown = false;
            var touchYstart = 0;
            var touchYend = 0;

            function resizeFn(){
                winW = $(window).innerWidth();
                winH = $(window).innerHeight();

                $sec1.css({width:winW,height:winH});
                $slide.css({width:winW,height:winH});
            }

            setTimeout(resizeFn,100);

            win.resize(function(){
                setTimeout(resizeFn,100);
            });

            function mainSlideFn(){
                $slideWrap.stop().animate({left:-winW*cnt},600,function(){
                    if(cnt>n-1){cnt=0}
                    if(cnt<0){cnt=n-1}
                    $slideWrap.stop().animate({left:-winW*cnt},0);
                });
            }

            function nextSlideCountFn(){
                cnt++;
                mainSlideFn();
            }

            function prevSlideCountFn(){
                cnt--;
                mainSlideFn();
            }

            $pageBtn.each(function(idx){
                $(this).on({
                    click:function(){
                        pauseTimerFn();
                        cnt = idx;
                        mainSlideFn();
                    }
                });
            });

            $slideView.on({
                mousedown:function(e){
                    mouseDown = 1;
                    e.preventDefault();
                    touchStart = e.pageX;
                    touchYstart = e.pageY;
                },
                touchstart:function(e){
                    mouseDown =1;
                    e.preventDefault();
                    touchStart = e.originalEvent.changedTouches[0].pageX;
                    touchYstart = e.originalEvent.changedTouches[0].pageY;
                },
                mouseup:function(e){
                    e.preventDefault();
                    mouseDown = 0;
                    touchEnd = e.pageX;
                    touchYend = e.pageY;
                    touchSwipeFn();

                    if(touchYstart - touchYend < -50){
                        $('html,body').stop().animate({scrollTop:0},1000);
                    }
                    if(touchYstart - touchYend > 50){
                        $('html,body').stop().animate({scrollTop:$('#section2').offset().top},1000);
                    }
                },
                touchend:function(e){
                    e.preventDefault();
                    mouseDown = 0;
                    touchEnd = e.originalEvent.changedTouches[0].pageX;
                    touchYend = e.originalEvent.changedTouches[0].pageY;
                    console.log(touchYstart,touchYend)
                    touchSwipeFn();
                    //위에서 아래로 터치
                    if(touchYstart - touchYend < -50){ 
                        $('html,body').stop().animate({scrollTop:0},1000);
                    }
                    //아래에서 위로 터치
                    if(touchYstart - touchYend > 50){ 
                        $('html,body').stop().animate({scrollTop:$('#section2').offset().top},1000);
                    }
                },
                mouseleave:function(e){
                    e.preventDefault();
                    if(mouseDown == 1){
                        mouseDown = 0;
                        touchEnd = e.pageX;
                        touchSwipeFn();
                    }
                }
            });

            function touchSwipeFn(){
                //console.log('touchStart',touchStart);
                //console.log('touchEnd',touchEnd);

                if(touchStart-touchEnd>0){
                        pauseTimerFn();
                        if(!$slide.is(':animated')){
                            nextSlideCountFn();
                        }
                }
                if(touchStart-touchEnd<0){
                        pauseTimerFn();
                        if(!$slide.is(':animated')){
                            prevSlideCountFn();
                        }
                }
            }


            function autoTimerFn(){
                setId = setInterval(nextSlideCountFn,6000);
            }

            autoTimerFn();

            function pauseTimerFn(){
                var t = 0;
                clearInterval(setId);
                clearInterval(setId2);
                setId2 = setInterval(function(){
                    t++;
                    if(t>6){
                        t=0;
                        clearInterval(setId);
                        clearInterval(setId2);
                        nextSlideCountFn();
                        autoTimerFn();
                    }
                },1000);
            }

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