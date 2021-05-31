;(function($){
    var lotte = {
        btn:0,
        init:function(){
            var that = this;
                that.section2Fn();
        },
        section2Fn:function(){
            var $prevBtn = $('.calender .prev-btn');
            var $nextBtn = $('.calender .next-btn');
            var $td = $('.calender .cal-gap .cal-wrap > table tr td');
            var $chkMonth = $('.select-wrap > .day-box .month ');
            var $chkDay = $('.select-wrap > .day-box .day');

            var today = null;
            var year = null;
            var month = null;
            var date = null;
            var day = null;

            var lastDate = null;
            var firstDay = null;
            var col = null;
            var prevLastDate = null;
            var cnt = 0;

            var y = 0;
            var m = 0;

            today = new Date();
            year = today.getFullYear();
            month = today.getMonth()+1;
            date = today.getDate();
            day = today.getDay();

            function calendarFn(y,m){
                // 누적초기화
                col = null;
                prevLastDate = null;
                cnt = 0;
                $('caption').html(y+'년 '+m+'월');

                firstDay = new Date(y+'-'+m+'-1').getDay(); //해당 달의 1일의 요일인덱스값 받아오기
                col = firstDay;
                prevLastDate = new Date(y,m-1,0).getDate();
                lastDate = new Date(y,m,0).getDate(); //해당달의 마지막 날짜
                
                //현재 달력채우기
                for(var i=1;i<=lastDate;i++){
                    if(col !== null){
                        $td.eq(col).html(i);
                        if(year == y && month==m){
                            if(date == i){
                                $td.eq(col).addClass('now');
                            }
                        } else{$td.removeClass('now');}

                        col++;
                    }
                }

                //이전달빈칸채우기
                for(var i=firstDay-1;i>=0;i--){
                    $td.eq(i).html(prevLastDate).addClass('color');
                    prevLastDate--;
                }
                //다음달빈칸채우기
                for(var i=col;i<$td.length;i++){
                    cnt ++;
                    $td.eq(i).html(cnt).addClass('color');
                }
            }

            calendarFn(year,month);

            y = year;
            m = month;

            $nextBtn.on({
                click:function(){
                    m++;
                    if(m>12){
                        y++;
                        m=1;
                    }
                    $td.removeClass('color');
                    $td.removeClass('click');
                    calendarFn(y,m);
                }
            });
            $prevBtn.on({
                click:function(){
                    m--;
                    if(m<1){
                        y--;
                        m=12;
                    }
                    $td.removeClass('color');
                    $td.removeClass('click');
                    calendarFn(y,m);
                }
            });

            $td.on({
                click:function(){
                    if($(this).hasClass('color')){

                    }
                    else {
                        $td.removeClass('click');
                        $td.removeClass('now');
                        $(this).addClass('click');
                        $chkDay.html($(this).html());
                        $chkMonth.html(m)
                    }
                }
            });
        },
    }
    lotte.init();
})(jQuery);