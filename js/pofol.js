;(function($){
    var pofol = {
        init:function(){
            var that = this;
                that.loadFn();
                that.sectionMoveFn();
                that.headerFn();
                that.section1Fn();
                that.section1NoticeFn();
                that.section2Fn();
                that.section3Fn();
                that.footerFn();
        },
        loadFn:function(){
            var $loadBox = $('#wrap .load-box');
            var $html = $('html');

            $(document).ready(function(){
                //$loadBox.css({display:'block'}).stop().animate({opacity:0},0).animate({opacity:1},400)
                $html.addClass('prevenScrl');
                $loadBox.stop().fadeIn(300);

                setTimeout(function(){
                    $loadBox.stop().fadeOut(200);
                },1000);

                setTimeout(function(){
                    $html.removeClass('prevenScrl');
                },1100)
            });

            
        },
        sectionMoveFn:function(){
            var winH = $(window).innerHeight();
            var $main = $('#main');
            var $header = $('#header');
            var $section = $('#main .section');
            var n = $('#main .section').length; //3
            var cnt = 0; //스크롤 카운트
            var wheelDelta = 0;

            $main.on('mousewheel DOMMouseScroll', function(e){
                e.preventDefault();
                //console.log(e) => 아래로움직이면 -120, 위로움직이면 120
                if(e.originalEvent.wheelDelta){ //파이어폭스 제외 모든 브라우저
                    wheelDelta = e.originalEvent.wheelDelta;
                }
                else{
                    wheelDelta = e.detail*-1; //파이어폭스
                }

                n = $('#main .section').length;

                if(!$('html,body').is(':animated')){
                    if(wheelDelta < 0){
                        cnt ++;
                        $header.addClass('addHide');
                        if(cnt<n){
                            $('html,body').stop().animate({scrollTop:$section.eq(cnt).offset().top},600,'easeInSine');
                        }
                        else{
                            cnt = n-1;
                        }
                    }
                    else {
                        cnt--;
                        $header.removeClass('addHide');
                        if(cnt<0){cnt=0;}
                        $('html,body').stop().animate({scrollTop:$section.eq(cnt).offset().top},600,'easeInSine');
                    }
                }
            });
        },
        headerFn:function(){
            var $html = $('html');
            var $header = $('#header');
            var $nav = $('#nav');
            var $sub = $('#nav .sub');
            var $mainBtn = $('#header .main-btn');
            var $mobileBtn = $('#header .mobile-btn');
            var $mClose = $('#nav .m-close')
            var $subShow = $('#wrap .sub-show');

            var $login = $('#login');
            var $loginBtn = $('#aside .login');
            var $loginClsBtn = $('#login .close-btn');
            var pc = 0;
            var mo = 0;

            function pcEventFn(){
                //moblie상태에서 pc로 갓을때 다 초기화
                $header.removeClass('over');
                $html.removeClass('addSub');
                $subShow.removeClass('addSubActive'); //검은 배경추가
                $mobileBtn.removeClass('addClick');
                $mClose.removeClass('addDepth')

                $nav.css({display:'inline-block'});

                $mainBtn.on({
                    mouseenter:function(){
                        $header.addClass('over');
                        $sub.stop().show();
                    }
                });
                $nav.on({
                    mouseleave:function(){
                        $header.removeClass('over');
                        $sub.stop().hide();
                    }
                });
            }

            function mobileEventFn(){
                //$sub.stop().hide(); 이거있으면 리사이즈될때마다 서브가 사라져버려서 없앰

                $mainBtn.off('mouseenter');
                $nav.off('mouseleave');
            }

            function pcMoEventFn(){
                if($(window).innerWidth()>1020){
                    pc = 1;
                    mo = 0;
                    pcEventFn();
                }
                else{
                    pc = 0;
                    mo = 1;
                    mobileEventFn();
                }
            }

            setTimeout(pcMoEventFn,100);
            $(window).resize(function(){
                setTimeout(pcMoEventFn,100);
            });

            $mobileBtn.on({
                click:function(e){
                    e.preventDefault();
                    $header.toggleClass('over');
                    $html.toggleClass('addSub');
                    $subShow.toggleClass('addSubActive'); //검은 배경추가
                    $(this).toggleClass('addClick');
                }
            });

            $mainBtn.each(function(idx){
                $(this).on({
                    click:function(e){
                        e.preventDefault();
                        if(mo==1){
                            $sub.stop().slideUp(300);
                            if(!$mainBtn.eq(idx).children().hasClass('addDepth')){ //다른거 누르면 무조건 초기화
                                $mainBtn.children().removeClass('addDepth')
                            }
                            $(this).next().stop().slideToggle(300); //서브메뉴
                           
                            $(this).children().toggleClass('addDepth'); //서브메뉴 +기호 모양변경
                        }
                    }
                })
            });

            $loginBtn.on({
                click:function(e){
                    e.preventDefault();
                    $subShow.addClass('addAsideActive');
                    $login.addClass('addActive');
                }
            });
            $loginClsBtn.on({
                click:function(e){
                    e.preventDefault();
                    $subShow.removeClass('addAsideActive');
                    $login.removeClass('addActive');
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

            $slideView.swipe({
                swipeLeft:function(){
                    if(!$slideWrap.is(':animated')){
                        pauseTimerFn()
                        nextSlideCountFn();
                    }
                },
                swipeRight:function(){
                    if(!$slideWrap.is(':animated')){
                        pauseTimerFn()
                        prevSlideCountFn();
                    }
                }
            });
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
            var sec2H = winH;
            var $basicBg = $('#section2 basic-bg');
            var $salesSlide = $('#section2 .sales-slide');
            var $topTxt = $('#section2 .top-txt');
            var topTxtH = winH * 0.309597523;
            var slideW = $('#section2 .sales-slide').innerWidth();
            var $bg = $('#section2 .bg');
            
            var $slideUl = $('#section2 .content > ul');
            var $prevBtn = $('#section2 .prev-btn');
            var $nextBtn = $('#section2 .next-btn');
            var cnt = 0;
            var i = 0; //화면크기에따른 슬라이드 횟수제한 변수

            function resizeColContrlFn(){
                if(winW > 1800){ //4개씩 한 화면
                    i = 3;
                }
                else if(winW > 1020){ //3개씩 한 화면
                    i = 4;
                }
                else if(winW > 770){ //2개씩 한 화면
                    i = 5;
                }
                else {  //1개씩 한 화면
                    i = 6;
                }
            }

/*             function resizeHeiContrlFn(){
                if(winH < 600){
                    slideH = 600
                }
            } */

            function resizeFn(){
                winW = $(window).innerWidth();
                winH = $(window).innerHeight();
                slideW = $('#section2 .sales-slide').innerWidth();
                sec2H = winH;

                if(winH < 800){
                    sec2H = 800
                }
                //$sec2.css({width:winW,height:winH});
                $sec2.css({width:winW,height:sec2H});

                if(winW > 1700){ //H;300px
                    topTxtH = winH * 0.309597523;
                }
                else if(winW > 1280){ //h:250px
                    topTxtH = winH * 0.257997936;
                }
                else{   //h:200px
                    topTxtH = winH * 0.206398349;
                }
                $topTxt.css({height:topTxtH});

                resizeColContrlFn();
            }

            setTimeout(resizeFn,100);

            win.resize(function(){
                setTimeout(resizeFn,100);
                setTimeout(mainSlideFn,100); //리사이즈될때마다 넓이값 맞게 움직
                //$slideUl.stop().animate({left:-slideW * cnt},0)
            });

            function mainSlideFn(){
                slideW = $('#section2 .sales-slide').innerWidth();
                $slideUl.stop().animate({left:-slideW * cnt})
                console.log(i,cnt)
                if(cnt==0){
                    $prevBtn.css({opacity:0.5,cursor:'default'});
                }
                if(cnt>0 && cnt<i){
                    $prevBtn.css({opacity:1,cursor:'pointer'});
                    $nextBtn.css({opacity:1,cursor:'pointer'});
                }
                if(cnt==i){
                    $nextBtn.css({opacity:.5,cursor:'default'});
                    $prevBtn.css({opacity:1,cursor:'pointer'});
                }
            }

            function nextCountFn(){
                cnt ++;
                if(cnt>i){cnt=i}
                mainSlideFn();
            }

            function prevCountFn(){
                cnt --;
                if(cnt<0){cnt=0}
                mainSlideFn();
            }

            $prevBtn.on({
                click:function(){
                    if(!$slideUl.is(':animated')){
                        //chk --;
                        prevCountFn();
                    }
                }
            });

            $nextBtn.on({
                click:function(){
                    if(!$slideUl.is(':animated')){
                        //chk ++;
                        nextCountFn();
                    }
                }
            });

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
            var sec3H = winH
            var $listBox = $('#section3 .list-box')

            function resizeFn(){
                winW = $(window).innerWidth();
                winH = $(window).innerHeight();
                sec3H = winH

                $sec3.css({width:winW,height:sec3H});
                
                if(winW <= 770){
                    $sec3.css({height:'auto'});
                }

                
            }

            setTimeout(resizeFn,100);

            win.resize(function(){
                setTimeout(resizeFn,100);
            });

            $listBox.each(function(idx){
                $(this).on({
                    mouseenter:function(){
                        $listBox.removeClass('addLine');
                        $(this).addClass('addLine');
                    },
                    mouseleave:function(){
                        $(this).removeClass('addLine');
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