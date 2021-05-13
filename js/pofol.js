;(function($){
    var pofol = {
        init:function(){
            var that = this;
                that.sectionMoveFn();
                that.headerFn();
                that.section1Fn();
                that.section1NoticeFn();
                that.section2Fn();
                that.section3Fn();
                that.section4Fn();
                that.footerFn();
        },
        sectionMoveFn:function(){
            var $section = $('#main .section');
            var n = $('#main .section').length; //3
            var wheelDelta = 0;

            $section.each(function(idx){
                $(this).on('mousewheel DOMMouseScroll', function(e){
                    e.preventDefault();
                    //console.log(e) => 아래로움직이면 -120, 위로움직이면 120
                    if(e.originalEvent.wheelDelta){ //파이어폭스 제외 모든 브라우저
                        wheelDelta = e.originalEvent.wheelDelta;
                    }
                    else{
                        wheelDelta = e.detail*-1; //파이어폭스
                    }

                    n = $('#main .section').length;
                    if(wheelDelta < 0){     //마우스 다운
                        if(idx<n-1){    //내려갈 공간이있다면
                            if(!$('html,body').is(':animated')){
                                $('html,body').stop().animate({scrollTop:$(this).next().offset().top},600,'easeInSine');
                            }
                        }
                    }
                    else {     //마우스 업
                        if(idx>0){
                            if(!$('html,body').is(':animated')){
                                $('html,body').stop().animate({scrollTop:$(this).prev().offset().top},600,'easeInSine');
                            }
                        }
                    }
                });
            });
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
                pageBtnColorEventFn();
            }

            function nextSlideCountFn(){
                cnt++;
                mainSlideFn();
            }

            function prevSlideCountFn(){
                cnt--;
                mainSlideFn();
            }

            function pageBtnColorEventFn(){
                var z = cnt;
                if(z>2){z=0}
                $pageBtn.removeClass('addSvg');
                $pageBtn.eq(z).addClass('addSvg');
            }

            pageBtnColorEventFn();

            $pageBtn.each(function(idx){
                $(this).on({
                    click:function(){
                        pauseTimerFn();
                        cnt = idx;
                        mainSlideFn();
                    }
                });
            });

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
                    if(t>=6){
                        t=0;
                        clearInterval(setId);
                        clearInterval(setId2);
                        nextSlideCountFn();
                        autoTimerFn();
                    }
                },1000);
            }

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
        },
        section1NoticeFn:function(){
            //notice-rolling
            var $noticeRolling = $('#section1 .notice-rolling');
            var $noCntroBox = $('#section1 .notice-controller-box');
            var $proBar= $('#section1 .progress-bar');
            var $controllBtn = $('#section1 .controll-btn');

            var n = $('#section1 .notice-rolling').length; //6
            var cnt = 0;
            var next = [];
            var setId = null;
            var setId2 = null;
            var setId3 = null;

            function mainNextSlideFn(){
                $noCntroBox.removeClass('addRolling');
                clearTimeout(setId);
                for(var i=0;i<n;i++){
                    next[i] = i;
                }//next[0,1,2,3,4,5]
                var imsi = next.pop();
                    next.unshift(imsi); //next[5,0,1,2,3,4]
                for(var i=0;i<cnt;i++){
                    var imsi = next.shift();
                        next.push(imsi);
                }

                for(var i=0;i<n;i++){
                    $noticeRolling.eq(next[i]).stop().animate({top:100*i},0).animate({top:100*(i-1)},600);
                }
                
                
                proBarFn();
            }

            function proBarFn(){
                setId = setTimeout(function(){
                    $noCntroBox.addClass('addRolling');
                },0);
            }

            proBarFn();

            function nextSlideCountFn(){
                cnt ++;
                if(cnt>n-1){cnt=0}
                mainNextSlideFn();
            }

            function autoPlay(){
                setId2 = setInterval(nextSlideCountFn,6000);
            }

            autoPlay();

            $controllBtn.on({
                click:function(){
                    $(this).toggleClass('addPause');
                    pauseTimerFn();
                }
            });

            function pauseTimerFn(){
                if($controllBtn.hasClass('addPause')){
                    clearTimeout(setId);
                    clearInterval(setId2);
                }
                else if(!$controllBtn.hasClass('addPause')){
                    nextSlideCountFn();
                    autoPlay();
                }
            }
        },
        section2Fn:function(){
            var win = $(window);
            var winW = $(window).innerWidth();
            var winH = $(window).innerHeight();
            var $sec2 = $('#section2');

            function resizeFn(){
                winW = $(window).innerWidth();
                winH = $(window).innerHeight();

                $sec2.css({width:winW,height:winH});
            }

            setTimeout(resizeFn,100);

            win.resize(function(){
                setTimeout(resizeFn,100);
            });
        },
        section3Fn:function(){
            var win = $(window);
            var winW = $(window).innerWidth();
            var winH = $(window).innerHeight();
            var $sec3 = $('#section3');

            function resizeFn(){
                winW = $(window).innerWidth();
                winH = $(window).innerHeight();

                $sec3.css({width:winW,height:winH});
            }

            setTimeout(resizeFn,100);

            win.resize(function(){
                setTimeout(resizeFn,100);
            });
        },
        section4Fn:function(){

        },
        footerFn:function(){

        }
    }
    pofol.init();
})(jQuery);