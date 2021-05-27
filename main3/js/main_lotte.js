;(function($){
    var lotte = {
        btn:0,
        init:function(){
            var that = this;
                that.sectionMoveFn();
                that.asideFn();
                that.headerFn();
                that.footerFn();
        },
        sectionMoveFn:function(){

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

            function resizeFn(){
                winH = $(window).innerHeight();
                if($(window).innerWidth()>1020){
                    pc = 1;
                    mo = 0;
                    searchH = 'auto';
                    searchPcFn();
                }
                else{
                    searchH = winH;
                    pc = 0;
                    mo = 1;
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

            function searchMoFn(){
                
                $selDd.stop().hide();
                $selDt.removeClass('addDepth');
                console.log(mo)
                if(mo == 1){
                    $selDt.each(function(idx){
                        $(this).on({
                            click:function(e){
                                e.preventDefault();
                                $selDd.stop().slideUp(300);
                                if(!$selDt.eq(idx).hasClass('addDepth')){ //다른거 누르면 무조건 초기화
                                    $selDt.removeClass('addDepth');
                                }
    
                                $(this).next().stop().slideToggle(300);
                                $(this).toggleClass('addDepth');
                            }
                        });
                    });
                }
            }

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
        }
    }
    lotte.init();
})(jQuery);