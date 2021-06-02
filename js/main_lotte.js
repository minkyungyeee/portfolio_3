;(function($){
    var lotte = {
        btn:0,
        init:function(){
            var that = this;
                that.sectionMoveFn();
                that.asideFn();
                that.headerFn();
                that.footerFn();
                that.preReadyFn();
        },
        sectionMoveFn:function(){
            var $htmlBody = $('html,body');
            var scrollPrev = 0;
            var scrollCurrent = 0;
            var win = $(window);
            var result = null;
            //var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
            var sclH = $(window).scrollTop() + $(window).height();
            var footT = $("#footer").offset().top;

            function wheelPositionFn(){
                result = scrollPrev - scrollCurrent > 0 ? 'up' : 'down'

                return {
                    result,scrollPrev,scrollCurrent
                }
            }

            win.scroll(function(){
                //scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
                sclH = $(window).scrollTop() + $(window).height();
                footT = $("#footer").offset().top;
                scrollCurrent = $(this).scrollTop();

                wheelPositionFn();

                if(scrollCurrent <= 10){
                    $('#header').removeClass('addHide');
                    $('#header').removeClass('addBg');
                    $('#goTop').stop().animate({opacity:0},400).css({display:'none'});
                } else {
                    if(result === 'down'){
                        $('#header').addClass('addHide');
                        $('#header').removeClass('addBg');
                        $('#goTop').stop().animate({opacity:1},400).css({display:'inline-block'});
                        if(sclH >= footT){
                            $('#goTop').css({position:'absolute'});
                        } else {
                            $('#goTop').css({position:'fixed'});
                        }
                    }
                    if (result === 'up'){
                        $('#header').removeClass('addHide');
                        $('#header').addClass('addBg');
                        if(sclH < footT){
                            $('#goTop').css({position:'fixed'});
                        }
                    }
                }

                scrollPrev = scrollCurrent;
            });

            $('#goTop').on({
                click:function(e){
                    e.preventDefault();
                    $htmlBody.stop().animate({scrollTop:0},1000,'easeInOutExpo')
                }
            })
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

            var $selDl = $('#search .srch-sel dl');
            var selDlH = $('#search .srch-sel dl').innerHeight();
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
                    $html.removeClass('prevenScrl');
                    $subShow.removeClass('addAsideActive');
                    $login.removeClass('addActive');
                }
            });

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
                    $html.removeClass('prevenScrl');
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
            })
            /* 전체클릭하면 그 줄 다 선택:if문,idx넘버로 컨트롤하기 or 전체btn클릭하면 부모인 dd에 애드클래스되어서 모든버튼 칠해지게하기 두가지중하나로 나중에 구현,,여유되면 
            선택된항목 필터링영역도 만들기 */
            console.log($selBtn.length)

            function searchPcFn(){
                $selDd.stop().show();
                $selDt.removeClass('addDepth');
            }

            function searchMoFn(){
                $selDd.stop().hide();
                $selDt.removeClass('addDepth');
            }

            $selDt.each(function(idx){
                $(this).on({
                    click:function(e){
                        e.preventDefault();
                        if(cn !== idx){
                            $selDd.stop().slideUp(300);
                        }
                        if(!$selDt.eq(idx).hasClass('addDepth')){ //다른거 누르면 무조건 초기화
                            $selDt.removeClass('addDepth');
                        }

                        $(this).next().stop().slideToggle(300);
                        $(this).toggleClass('addDepth');
                        cn = idx;
                    }
                });
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


            var pc = 0;
            var mo = 0;

            function pcEventFn(){
                //moblie상태에서 pc로 갓을때 다 초기화
                $header.removeClass('over');
                $html.removeClass('addSub');
                $subShow.removeClass('addSubActive'); //검은 배경추가
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
        },
        footerFn:function(){
            var $familyBtn = $('#footer .family-btn');
            var $familySiteBox = $('#footer .family-site-box');

            $familyBtn.on({
                click:function(){
                    $familySiteBox.toggleClass('addChk');
                }
            })
        },
        preReadyFn:function(){
            var $preReady = $('#preReady');
            var $video = $('#readyMovie');

            
            var winW = $(window).innerWidth();
            var winH = $(window).innerHeight();

            function resizeFn(){
                winW = $(window).innerWidth();
                winH = $(window).innerHeight();

                if(winH < 600){
                    winH = 600
                }

                $preReady.css({height:winH});
                $video.css({width:winW,height:'auto'})

            }

            setTimeout(resizeFn,100);

            $(window).resize(function(){
                setTimeout(resizeFn,100);
            });
        }
    }
    lotte.init();
})(jQuery);