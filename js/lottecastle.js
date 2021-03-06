;(function($){
    var lotte = {
        btn:0,
        init:function(){
            var that = this;
                that.loadFn();
                that.cookieFn();
                that.sectionMoveFn();
                that.asideFn();
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
        cookieFn:function(){
            var start = null;
            var end = null;

            function getCookieFn(name){
                var cookie = document.cookie.split(';');

                for(i in cookie){
                    cookie[i] = cookie[i].trim();

                    start = 0;
                    end = cookie[i].indexOf('=');
                    if(cookie[i].slice(start,end)===name){
                        start = cookie[i].indexOf('=')+1;
                        return cookie[i].slice(start);
                    }
                }
                return '';
            }

            function openPopFn(){
                var isCookie = getCookieFn('popup20210531');
                if(isCookie != 'no'){
                    window.open('popup20210531.html','popup20210531','width=500, height=800, top=100, left=50');
                }
            }

            openPopFn();
        },
        sectionMoveFn:function(){
            var win = $(window);
            var winW = $(window).innerWidth();
            var winH = $(window).innerHeight();
            var $main = $('#main');
            var $header = $('#header');
            var $section = $('#main .section');
            var n = $('#main .section').length; //3
            var cnt = 0; //????????? ?????????
            var wheelDelta = 0;
            var wheel = true;

            function resizeFn(){
                winW = $(window).innerWidth();
                winH = $(window).innerHeight();
                if(winH>700){
                    wheel = true;
                    mouseWheelFn();
                }
                if(winH<=700 || winW<=770){
                    wheel = false;
                    mouseWheelFn();
                }
            }

            setTimeout(resizeFn,100);

            $(window).resize(function(){
                setTimeout(resizeFn,100);
            });

            function mouseWheelFn(){
                if(wheel === true){
                    win.off('scroll');
                    $main.on('mousewheel DOMMouseScroll', function(e){
                        e.preventDefault();
                            //console.log(e) => ????????????????????? -120, ?????????????????? 120
                            if(e.originalEvent.wheelDelta){ //??????????????? ?????? ?????? ????????????
                                wheelDelta = e.originalEvent.wheelDelta;
                            }
                            else{
                                wheelDelta = e.detail*-1; //???????????????
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
                }

                else {
                    $main.off('mousewheel DOMMouseScroll');
                    win.on('scroll', function(){
                        if($(this).scrollTop() <= 10){
                            $('#header').removeClass('addHide');
                        } else {
                            $('#header').addClass('addHide');
                        }
                    });
                }

            }
        },
        asideFn:function(){
            var winH = $(window).innerHeight();
            var $html = $('html');
            var $subShow = $('#wrap .sub-show');
            var $login = $('#login');
            var $loginBtn = $('#aside .login');
            var $loginClsBtn = $('#login .close-btn');

            var $search = $('#search');
            var searchH = winH;
            var $searchBtn = $('#aside .search');
            var $searchClsBtn = $('#search .close-btn');
            var $selBtn = $('#search .sel-btn');
            var $resetBtn = $('#search .reset-btn');

            var $selDt = $('#search dt');
            var $selDd = $('#search dd');
            var pc = 0;
            var mo = 0;
            var cn = 0;

            function resizeFn(){
                winH = $(window).innerHeight();

                if($(window).innerWidth()>1020){
                    pc = 1;
                    mo = 0;
                    if($login.hasClass('addActive') || $search.hasClass('addActive')){
                        $html.addClass('prevenScrl');
                    }
                    searchH = 'auto';
                    
                    searchPcFn();
                }
                else{
                    searchH = winH;
                    pc = 0;
                    mo = 1;
                    if($login.hasClass('addActive') || $search.hasClass('addActive')){
                        $html.addClass('prevenScrl');
                    }
                    searchMoFn();
                }
                $search.css({height:searchH});
            }

            setTimeout(resizeFn,100);

            $(window).resize(function(){
                setTimeout(resizeFn,100);
            });

            /* ????????? */
            $loginBtn.on({
                click:function(e){
                    e.preventDefault();
                    $html.addClass('addSub');
                    $subShow.addClass('addAsideActive');
                    $login.addClass('addActive');
                }
            });
            $loginClsBtn.on({
                click:function(e){
                    e.preventDefault();
                    $html.removeClass('addSub');
                    $html.removeClass('prevenScrl'); //??????????????? headerFn????????? addSub??? ????????????????????? ??????(?????? ????????????????????? ???????????????)
                    $subShow.removeClass('addAsideActive');
                    $login.removeClass('addActive');
                }
            });


            /* ?????? */
            $searchBtn.on({
                click:function(e){
                    e.preventDefault();
                    $html.addClass('addSub');
                    $subShow.addClass('addAsideActive');
                    $search.addClass('addActive');
                }
            });
            $searchClsBtn.on({
                click:function(e){
                    e.preventDefault();
                    $html.removeClass('addSub');
                    $html.removeClass('prevenScrl'); //??????????????? headerFn????????? addSub??? ????????????????????? ??????(?????? ????????????????????? ???????????????)
                    $subShow.removeClass('addAsideActive');
                    $search.removeClass('addActive');
                }
            });
            $selBtn.each(function(idx){
                $(this).on({
                    click:function(e){
                        e.preventDefault();
                        $(this).toggleClass('isSelect');
                    }
                });
            }); 

            $resetBtn.on({
                click:function(e){
                    e.preventDefault();
                    $selBtn.removeClass('isSelect');
                }
            });

            function searchMoFn(){
                $selDd.stop().hide();
                $selDt.removeClass('addDepth');
            }

            $selDt.each(function(idx){
                $(this).on({
                    click:function(e){
                        e.preventDefault();
                        if(cn !== idx){ //???????????? ???????????? ????????? ????????? ?????????????????? ????????????!
                            $selDd.stop().slideUp(300);
                        }
                        if(!$selDt.eq(idx).hasClass('addDepth')){ //????????? ????????? ????????? ?????????
                            $selDt.removeClass('addDepth');
                        }

                        $(this).next().stop().slideToggle(300);
                        $(this).toggleClass('addDepth');
                        cn = idx;
                    }
                });
            });

            function searchPcFn(){
                $selDd.stop().show();
                $selDt.removeClass('addDepth');
            }
            
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


            var pc = 0;
            var mo = 0;

            function pcEventFn(){
                //moblie???????????? pc??? ????????? ??? ?????????
                $header.removeClass('over');
                $html.removeClass('addSub');
                $subShow.removeClass('addSubActive'); //?????? ????????????
                $mobileBtn.removeClass('addClick');
                $sub.stop().hide();
                $mClose.removeClass('addDepth');

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
                    $subShow.toggleClass('addSubActive'); //?????? ????????????
                    $(this).toggleClass('addClick');
                }
            });

            $mainBtn.each(function(idx){
                $(this).on({
                    click:function(e){
                        e.preventDefault();
                        if(mo==1){
                            $sub.stop().slideUp(300);
                            if(!$mainBtn.eq(idx).children().hasClass('addDepth')){ //????????? ????????? ????????? ?????????
                                $mainBtn.children().removeClass('addDepth')
                            }
                            $(this).next().stop().slideToggle(300); //????????????
                           
                            $(this).children().toggleClass('addDepth'); //???????????? +?????? ????????????
                        }
                    }
                })
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
            var $pageBtn = $('#section1 .pagenation-btn');
            

            var cnt = 0;
            var n = $('#section1 .slide').length-2; //3
            var setId = null;
            var setId2 = null;


            function resizeFn(){
                winW = $(window).innerWidth();
                winH = $(window).innerHeight();

                if(winH < 600){
                    winH = 600;
                }
                $sec1.css({width:winW,height:winH});
                $slide.css({width:winW,height:winH});
            }

            setTimeout(resizeFn,100);

            win.resize(function(){
                setTimeout(resizeFn,100);
            });

            //??????????????? ???????????????
            $slide.eq(1).addClass('addSlide');
            $con.addClass('addAni');
            function mainSlideFn(){
                //?????????
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

                $slide.eq(cnt+1).addClass('addSlide');
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
            var $basicBg = $('#section2 .basic-bg');
            var $salesSlide = $('#section2 .sales-slide');
            var $topTxt = $('#section2 .top-txt');
            var topTxtH = winH * 0.309597523;
            var slideW = $('#section2 .sales-slide').innerWidth();
            var $bg = $('#section2 .bg');
            
            var $slideUl = $('#section2 .content > ul');
            var $prevBtn = $('#section2 .prev-btn');
            var $nextBtn = $('#section2 .next-btn');
            var cnt = 0;
            var i = 0; //????????????????????? ???????????? ???????????? ??????

            function resizeColContrlFn(){
                if(winW > 1800){ //4?????? ??? ??????
                    cnt > 3 ? cnt=3:cnt; //??????????????? ?????? ????????? ??????
                    i = 3;
                }
                else if(winW > 1020){ //3?????? ??? ??????
                    cnt > 4 ? cnt=4:cnt;
                    i = 4;
                }
                else if(winW > 770){ //2?????? ??? ??????
                    cnt > 5 ? cnt=5:cnt;
                    i = 5;
                }
                else {  //1?????? ??? ??????
                    cnt > 6 ? cnt=6:cnt;
                    i = 6;
                }
            }

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
                setTimeout(mainSlideFn,100); //???????????????????????? ????????? ?????? ??????
            });

            function mainSlideFn(){
                slideW = $('#section2 .sales-slide').innerWidth();
                $slideUl.stop().animate({left:-slideW * cnt},400);
                
                if(cnt==0){
                    $prevBtn.css({opacity:.5,cursor:'default'});
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
                //console.log(cnt)
                mainSlideFn();
            }

            function prevCountFn(){
                cnt --;
                if(cnt<0){cnt=0}
                mainSlideFn();
            }

            $prevBtn.on({
                click:function(e){
                    e.stopImmediatePropagation();
                    if(!$slideUl.is(':animated')){
                        //chk --;
                        prevCountFn();
                    }
                }
            });

            $nextBtn.on({
                click:function(e){
                    e.stopImmediatePropagation();
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
                        $bg.eq(idx).stop().animate({opacity:1},300);
                    },
                    mouseleave:function(){
                        $salesSlide.removeClass('addMouseOver');
                        $bg.stop().animate({opacity:0},1000);
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
                
                if(winW <= 770 || winH <= 700){
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
    lotte.init();
})(jQuery);