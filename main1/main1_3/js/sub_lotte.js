;(function($){
    var lotte = {
        btn:0,
        init:function(){
            var that = this;
                that.section1Fn();
                that.section2Fn();
                that.section3Fn();
                that.sclEventFn();
        },
        section1Fn:function(){

        },
        section2Fn:function(){
            var winW = $(window).innerWidth();
            var winH = $(window).innerHeight();
            var slideW = winW * 0.924855491;

            var $subSec2 = $('#subMain #section2');
            var $slideView = $('#subMain #section2 .slide-view');
            var $slideWrap = $('#subMain #section2 .slide-wrap');
            var $slide = $('#subMain #section2 .slide');
            var $prevBtn = $('#subMain #section2 .prev-btn');
            var $nextBtn = $('#subMain #section2 .next-btn');
            var $pageBtn = $('#subMain #section2 .page-btn');
            var cnt = 0;
            var n = $('#subMain #section2 .slide').length-2;
            var r = winW * 0.018392013; /* slide 양옆 1903px기준 35px씩 더 보임 */


            function resizeFn(){
                winW = $(window).innerWidth();
                slideW = winW * 0.924855491;
                r = winW * 0.018392013;

                $slideWrap.css({width:slideW*14,marginLeft:-(slideW-(r*2))});
                $slide.css({width:slideW});
            }

            setTimeout(resizeFn,100);

            $(window).resize(function(){
                setTimeout(resizeFn,100);
            });

            function mainSlideFn(){
                $slideWrap.stop().animate({left:-slideW*cnt},600,function(){
                    if(cnt>n-1){cnt=0}
                    if(cnt<0){cnt=n-1}
                    $slideWrap.stop().animate({left:-slideW*cnt},0)
                });

                pagenationColorFn();
            }

            function nextSlideCountFn(){
                cnt ++;
                mainSlideFn();
            }

            function prevSlideCountFn(){
                cnt --;
                mainSlideFn();
            }

            $nextBtn.on({
                click:function(e){
                    e.preventDefault();
                    if(!$slideWrap.is(':animated')){
                        nextSlideCountFn();
                    }
                }
            });

            $prevBtn.on({
                click:function(e){
                    e.preventDefault();
                    if(!$slideWrap.is(':animated')){
                        prevSlideCountFn();
                    }
                }
            });

            /* 페이지네이션 */
            function pagenationColorFn(){
                var z = cnt;
                if(z>n-1){z=0}
                $pageBtn.removeClass('addClick');
                $pageBtn.eq(z).addClass('addClick');
            }

            pagenationColorFn();

            $pageBtn.each(function(idx){
                $(this).on({
                    click:function(){
                        if(cnt>idx){
                            cnt = idx;
                            mainSlideFn();
                        }
                        if(cnt<idx){
                            cnt = idx;
                            mainSlideFn();
                        }
                    }
                })
            });
            
            /* 터치스와이프 */
            $slideView.swipe({
                swipeLeft:function(){
                    if(!$slideWrap.is(':animated')){
                        nextSlideCountFn();
                    }
                },
                swipeRight:function(){
                    if(!$slideWrap.is(':animated')){
                        prevSlideCountFn();
                    }
                }
            });
        },
        section3Fn:function(){
            var $galBtn = $('#subMain #section3 .gallery-nav-btn');
            var $galBox = $('#subMain #section3 .gallery-wrap > ul');
            var $galList = $('.gallery-wrap > ul .gallery');
            var n = $('.gallery-wrap > ul .gallery').length; //12

            var winW = $(window).innerWidth();
            var galBoxW = $('#subMain #section3 .gallery-wrap > ul').innerWidth();
            var cols = 3;
            var galW = galBoxW/cols;
            var galHRate = 1.27;
            var galH = galW * galHRate;
            var rows = Math.ceil(n/cols);
            var isBtn = 0;

            var hide = [];
            var show = [];
            var k = -1;

            var $link = $('#subMain #section3 .gal-content .link');
            var $imgBox = $('#subMain #section3 .gal-con-box')

            function responseGalFn(){
                winW = $(window).innerWidth();
                galBoxW = $('#subMain #section3 .gallery-wrap > ul').innerWidth();
                if(winW > 980){
                    cols = 3;
                } else if(winW > 500){
                    cols = 2;
                } else {cols = 1;}

                galW = galBoxW/cols;
                galH = galW * galHRate;

                if(isBtn === 0){
                    hide = [];
                    show = [0,1,2,3,4,5,6,7,8,9,10,11];
                } else if(isBtn === 1){
                    hide = [2,3,4,5,8,9,10,11];
                    show = [0,1,6,7];
                } else if(isBtn === 2){
                    hide = [0,1,3,4,5,6,7,9,10,11];
                    show = [2,8];
                } else if(isBtn === 3){
                    hide = [0,1,2,5,6,7,8,11];
                    show = [3,4,9,10];
                } else if(isBtn === 4){
                    hide = [0,1,2,3,4,6,7,8,9,10];
                    show = [5,11];
                }

                n = show.length;
                rows = Math.ceil(n/cols);
                $galBox.css({height:galH*rows});
                $galList.css({width:galW, height:galH});

                //hide 제어문
                $.each(hide,function(idx){
                    $galList.eq(hide[idx]).stop().hide();
                });

                //show 제어문
                k=-1;
                for(var i=0;i<rows;i++){
                    for(var j=0;j<cols;j++){
                        k++;
                        if(k>=n){
                            break
                        } else {$galList.eq(show[k]).stop().show().animate({left:galW*j, top:galH*i},300)}
                    }
                }

                //addClass반복문
            }

            setTimeout(responseGalFn,100);

            $(window).resize(function(){
                setTimeout(responseGalFn,100);
            });

            $galBtn.each(function(idx){
                $(this).on({
                    click:function(e){
                        e.preventDefault();
                        isBtn = idx;
                        responseGalFn();
                        $galBtn.removeClass('isActive');
                        $(this).addClass('isActive');
                    }
                })
            });

            $link.on({
                mouseenter:function(e){
                    e.preventDefault();
                    $imgBox.removeClass('addHover');
                    $(this).prev().addClass('addHover');
                },
                mouseleave:function(e){
                    e.preventDefault();
                    $imgBox.removeClass('addHover');
                }
            });
        },
        sclEventFn:function(){
            var $gal = $('.gallery-wrap > ul .gallery');
            var setId = null;

            $(window).scroll(function(){
                if($(window).scrollTop() >= $('#section3').offset().top-400){
                    var ms = 200;
                    $gal.each(function(idx){
                        var that = $(this);
                        setId = setTimeout(function(){
                            that.addClass('addScrl')
                        },ms*idx);
                    });
                }
                else if($(window).scrollTop()<=500){
                    clearTimeout(setId);
                }
            });
        }
    }
    lotte.init();
})(jQuery);