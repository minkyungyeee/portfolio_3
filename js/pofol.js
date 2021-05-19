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
            var $con = $('#section1 .text-box .con');
            var $con1 = $('#section1 .text-box .con1');
            var $con2 = $('#section1 .text-box .con2');
            var $con3 = $('#section1 .text-box .con3');
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

            //첫슬라이드 스케일조절
            $slide.eq(1).addClass('addSlide');
            $con.addClass('addAni');
            function mainSlideFn(){
                //초기화
                $slide.removeClass('addSlide');
                $con.removeClass('addAni');
                $slideWrap.stop().animate({left:-winW*cnt},600,function(){
                    if(cnt>n-1){cnt=0}
                    if(cnt<0){cnt=n-1}
                    $slideWrap.stop().animate({left:-winW*cnt},0);
                    
                });
                addClassFn();
                pageBtnColorEventFn();
            }

            function addClassFn(){
                if(cnt>n-1){cnt=0}
                if(cnt<0){cnt=n-1}
                //slide.eq(1,2,3)에만 addClass될꺼 => 실제 0,1,2,3,4있음
                //cnt는 0,1,2 반복
                $slide.eq(cnt+1).addClass('addSlide');
                // $con1.css({opacity:1}).stop().animate({top:0},400,function(){
                //     $con2.css({opacity:1}).stop().animate({top:0},600,function(){
                //         $con3.css({opacity:1}).stop().animate({top:0},800)
                //     });
                // });
                $con.addClass('addAni');
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
                setId = setInterval(nextSlideCountFn,8000);
            }

            autoTimerFn();

            function pauseTimerFn(){
                var t = 0;
                clearInterval(setId);
                clearInterval(setId2);
                setId2 = setInterval(function(){
                    t++;
                    if(t>=8){
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
            var $basicBg = $('#section2 basic-bg');
            var $salesSlide = $('#section2 .sales-slide');
            var slideW = $('#section2 .sales-slide').innerWidth();
            var $bg = $('#section2 .bg');
            
            var $slideUl = $('#section2 .content > ul');
            var $prevBtn = $('#section2 .prev-btn');
            var $nextBtn = $('#section2 .next-btn');
            var cnt = 0;

            function resizeFn(){
                winW = $(window).innerWidth();
                winH = $(window).innerHeight();

                $sec2.css({width:winW,height:winH});
            }

            setTimeout(resizeFn,100);

            win.resize(function(){
                setTimeout(resizeFn,100);
            });

/*             function mainSlideFn(){
                slideW = $('#section2 .sales-slide').innerWidth();
                $slideUl.css({transform:'translate3d(' + -33.3333+'%'*cnt + ',0,0)'})
            }

            function nextCountFn(){
                cnt ++;
                mainSlideFn();
            }

            function prevCountFn(){
                cnt --;
                mainSlideFn();
            }

            $prevBtn.on({
                click:function(){
                    if(!$slideUl.is(':animated')){
                        prevCountFn();
                    }
                }
            });

            $nextBtn.on({
                click:function(){
                    if(!$slideUl.is(':animated')){
                        nextCountFn();
                    }
                }
            }); */

            $salesSlide.each(function(idx){
                $(this).on({
                    mouseenter:function(){
                        $salesSlide.removeClass('addMouseOver');
                        $basicBg.addClass('addMouseOver');
                        $(this).addClass('addMouseOver');
                        $bg.stop().animate({opacity:0},600);
                        $bg.eq(idx).stop().animate({opacity:1},600);
                    },
                    mouseleave:function(){
                        $salesSlide.removeClass('addMouseOver');
                        $bg.stop().animate({opacity:0},1000);
                        //$basicBg.stop().animate({opacity:0},300);
                        $basicBg.removeClass('addMouseOver');
                        
                    }
                });
            });
        },
        section3Fn:function(){
            var win = $(window);
            var winW = $(window).innerWidth();
            var winH = $(window).innerHeight();
            var $sec3 = $('#section3');
            var $listBox = $('#section3 .list-box')

            function resizeFn(){
                winW = $(window).innerWidth();
                winH = $(window).innerHeight();

                $sec3.css({width:winW,height:winH});
            }

            setTimeout(resizeFn,100);

            win.resize(function(){
                setTimeout(resizeFn,100);
            });

            function mouseOverFn(){
                $('.line:nth-child(1)').stop().animate({left:-100+'%'},0);
                $('.line:nth-child(2)').stop().animate({top:-100+'%'},0);
                $('.line:nth-child(3)').stop().animate({right:-100+'%'},0);
                $('.line:nth-child(4)').stop().animate({bottom:-100+'%'},0);

                $('.line:nth-child(1)').stop().animate({left:100+'%'},600,function(){
                    $('.line:nth-child(2)').stop().animate({top:100+'%'},600,function(){
                        $('.line:nth-child(3)').stop().animate({right:100+'%'},600,function(){
                            $('.line:nth-child(4)').stop().animate({bottom:100+'%'},600)
                        });
                    });
                });
            }

            $listBox.each(function(idx){
                $(this).on({
                    mouseenter:function(){

                    }
                });
            });
        },
        footerFn:function(){
            var $familyBtn = $('#footer .family-btn');
            var $familySiteBox = $('#footer .family-site-box');

            $familyBtn.on({
                click:function(){
                    $familySiteBox.toggleClass('addChk');
                }
            })
        }
    }
    pofol.init();
})(jQuery);