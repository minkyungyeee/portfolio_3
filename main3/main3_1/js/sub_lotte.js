;(function($){
    var lotte = {
        btn:0,
        init:function(){
            var that = this;
                that.section2Fn();
        },
        section2Fn:function(){
            var winW = $(window).innerWidth();
            var $tbody = $('.lotte-board tbody');
            var $pageNumBox = $('.pagenation-box .page-num-box');
            var $firstPrevBtn = $('.pagenation-box .first-prev-btn');
            var $prevBtn = $('.pagenation-box .prev-btn');
            var $lastNextBtn = $('.pagenation-box .last-next-btn');
            var $nextBtn = $('.pagenation-box .next-btn');
            var $pageBtn = $('.pagenation-box .page-btn');

            var a = [];
            var txt = '';
            var total = null;
            var list = 6; //힌페이지에 보일 목록수
            var pageList = 10; //페이지버튼 묶음안에 버튼 수
            var totalPageNum = Math.ceil(total/list);
            var pageGroupNum = Math.ceil(totalPageNum/pageList);

            var listStartNum = 0;
            var listEndNum = list;

            var cnt = 0;
            var groupStartNum = null; //페이지번호 시작 숫자
            var groupEndNum = null; //페이지번호 끝 숫자

            function resizeFn(){
                winW = $(window).innerWidth();
                if(winW>500){
                    list = 6;
                    pageList =10;
                } else {
                    list = 7;
                    pageList = 5;
                }
                ajaxRunFn();
            }

            setTimeout(resizeFn,100);

            $(window).resize(function(){
                setTimeout(resizeFn,100);
            });

            function ajaxRunFn(){
                $.ajax({
                    url:'./data/notice.json',
                    dataType:'json',
                    success:function(result){
                        $.each(result.notice,function(idx,obj){
                            a[idx] = [];
                            a[idx][0] = obj.No;
                            a[idx][1] = obj.제목;
                            a[idx][2] = obj.날짜;
                            a[idx][3] = obj.조회수;
                        });

                        total = a.length;

                        function listOutputFn(){
                            txt = '';
                            $tbody.empty();
                            for(var i=listStartNum;i<listEndNum;i++){
                                txt += '<tr>';
                                for(var j=0;j<4;j++){
                                    txt += '<td>' + a[i][j] + '</td>'
                                }
                                txt += '</tr>';
                            }
                            $tbody.html(txt);
                            totalPageNum = Math.ceil(total/list);
                            pageGroupNum = Math.ceil(totalPageNum/pageList);
                        }

                        listOutputFn();

                        function pageNationFn(){
                            $pageNumBox.html(' ');
                            txt = '';
                            groupStartNum = cnt * pageList;
                            groupEndNum = groupStartNum + pageList;

                            if(groupEndNum > totalPageNum){
                                groupEndNum = totalPageNum;
                            }
                            for(var i=groupStartNum;i<groupEndNum;i++){
                                if(i % pageList === 0){
                                    txt += '<a href="#" class="page-btn addClick">'+ (i+1) + '</a>'
                                } else {
                                    txt += '<a href="#" class="page-btn">'+ (i+1) + '</a>'
                                }
                            }

                            $pageNumBox.html(txt);
                            $pageBtn = $('.pagenation-box .page-btn');
                            listStartNum = (parseInt($pageBtn.eq(0).text())-1) * list;
                            listEndNum = listStartNum + list;
                            if(listEndNum > total){
                                listEndNum = total;
                            }
                            pageBtnClickFn();
                            listOutputFn();
                        }

                        pageNationFn();
                        
                        $firstPrevBtn.on({
                            click:function(e){
                                e.preventDefault();
                                cnt = 0;
                                pageNationFn();
                            }
                        });

                        $prevBtn.on({
                            click:function(e){
                                e.preventDefault();
                                cnt--;
                                if(cnt<0){cnt=0}
                                pageNationFn();
                            }
                        });

                        $nextBtn.on({
                            click:function(e){
                                e.preventDefault();
                                cnt++;
                                if(cnt>pageGroupNum-1){
                                    cnt = pageGroupNum-1;
                                    return;
                                }
                                pageNationFn();
                            }
                        });

                        $lastNextBtn.on({
                            click:function(e){
                                e.preventDefault();
                                cnt = pageGroupNum-1;
                                pageNationFn();
                            }
                        })

                        function pageBtnClickFn(){
                            $pageBtn.each(function(idx){
                                $(this).on({
                                    click:function(e){
                                        e.preventDefault();
                                        $pageBtn.removeClass('addClick');
                                        listStartNum = (parseInt($(this).text())-1) * list;
                                        listEndNum = listStartNum + list;
                                        if(listEndNum > total){
                                            listEndNum = total;
                                        }

                                        $(this).addClass('addClick');
                                        listOutputFn();
                                    }
                                });
                            });
                        }


                    },
                    error:function(e){
                        alert('ajax error!!!');
                        console.log(e);
                    }
                });
            }

            setTimeout(ajaxRunFn,100);

        }
    }
    lotte.init();
})(jQuery);