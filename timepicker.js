var now = new Date();
var yi = now.getFullYear();
var mi = now.getMonth() + 1;
var di = now.getDate();
var hi = now.getHours();
var letter = (10000*yi) + (100*mi) + (1*di);
var YYYY, MM, DD;

var yy = yi;
var mm = mi;
var dd = di;

var ys = 0;
var ms = 0;
var ds = 0;

// yearbox
    // var select = '<center><select id="year" onchange="yearFunc()">';
    var select = '<center><div id="yearbox" class="sub-container"><div id="contents" class="content"><div id="depth3"><ul class="breadcrumb">';
    select += '<li id="yearcur" class="has-list"><div id="yearcont">'+yi+'년</div>';

    select +='<ol class="sec-depth">';
    for(var i = 0; i <11; i++){

      select += '<li id="y'+(2018-i)+'" value="'+(2018-i)+'"';

      // // if(2018-i == 2017)
      // if(yy == 2018 - i)
      // {
      //   select += ' selected'
      // }

      select += 'onclick="yearFunc('+(2018-i)+')">'+(2018-i)+'년</li>'
    }
    select +='</ol>';

    select +='</li></ul></div></div></div>';

 // monthbox
     select += '<div id="monthbox" class="sub-container"><div id="contents" class="content"><div id="depth3"><ul class="breadcrumb">';
     select += '<li id="monthcur" class="has-list"><div id="monthcont">'+mi+'월</div>';

     select +='<ol class="sec-depth">';
     for(var i = 0; i <12; i++){
       select += '<li id="m'+(i+1)+'" value="'+(i+1)+'"';

      // //  if(i+1 == 1)
      //  if(mm == i + 1)
      //  {
      //    select += ' selected'
      //  }

       select += 'onclick="monthFunc('+(i+1)+')">'+(i+1)+'월</li>'
     }
     select +='</ol>';

     select +='</li></ul></div></div></div>';

  // datebox
         select += '<div id="datebox" class="sub-container"><div id="contents" class="content"><div id="depth3"><ul class="breadcrumb">';
         select += '<li id="datecur" class="has-list"><div id="datecont">'+di+'일</div>';

         select +='<ol class="sec-depth">';
         for(var i = 0; i <31; i++){
           select += '<li id="d'+(i+1)+'" value="'+(i+1)+'"';

          // //  if(i+1 == 2)
          //  if(dd == i + 1)
          //  {
          //    select += ' selected';
          //  }

           select += 'onclick="dateFunc('+(i+1)+')">'+(i+1)+'일</li>';
         }
         select +='</ol>';

         select +='</li></ul></div></div></div>';
    

         // selectbox 초기화
         //select += '<button onclick="goInit()">초기화</button>';
         //select += '<button onclick="goToday()">오늘날짜로</button>';
  select += '</center>';
   $('#timepicker').append(select);
  // document.getElementById("result_tPicker").innerHTML += select;

  function goInit(){
    document.getElementById("yearInit").selected = "true";
    document.getElementById("monthInit").selected = "true";
    document.getElementById("dateInit").selected = "true";

    yy = 0;
    mm = 0;
    dd = 0;

    ys = 0;
    ms = 0;
    ds = 0;

    letter = (10000*yy) + (100*mm) + (1*dd);
    // document.getElementById("result_letter").innerHTML = "letter: " + letter + "<br/>";
    document.getElementById("result_timepicker").innerHTML = "";
    document.getElementById("result_data").innerHTML = "";

  }
  function goToday(){
    document.getElementById("y"+yi).selected = "true";
    document.getElementById("m"+mi).selected = "true";
    document.getElementById("d"+di).selected = "true";

    letter = (10000*yi) + (100*mi) + (1*di);

    yy = yi;
    mm = mi;
    dd = di;

    ys = 1;
    ms = 1;
    ds = 1;

    // document.getElementById("result_letter").innerHTML = "letter: " + letter + "<br/>";
    document.getElementById("result_timepicker").innerHTML = "";
    document.getElementById("result_data").innerHTML = "";
  }


   function yearFunc(y) {
      //  var y = parseInt(document.getElementById("year").value);
      y=parseInt(y);
       // document.getElementById("result_letter").innerHTML = "You selected the year: " + y + "<br/>";
       if(ys + ms + ds == 0)
       {
         letter += (10000*(y-yy));
         yy = y; ys++;
        //  document.getElementById("monthInit").selected = "true";
        $("#monthcont").attr("style", "color:white");
        document.getElementById("monthcont").innerHTML = "월";
        //  document.getElementById("dateInit").selected = "true";
        $("#datecont").attr("style", "color:white");
        document.getElementById("datecont").innerHTML = "일";
         letter -= (100*mm);
         mm = 0;
         letter += (100*mm);

         letter -= (1*dd);
         dd = 0;
         letter += (1*dd);

       }
       else {
         letter += (10000*(y-yy));
         yy = y; ys++;
       }

       $("#yearcont").attr("style", "color:#F4AC1E");
       document.getElementById("yearcont").innerHTML = y+"년";
       $('#yearbox .content').attr("style","height:45px"); 
       $('#yearbox .breadcrumb .has-list').children('.sec-depth').stop().slideUp(200);
       $('#yearbox .breadcrumb .has-list').attr("style","background:url('img/hr/jeju/images/common/list-ico.gif_modified_arrow.png') 100px center no-repeat; background-size:10px 10px");
       $('#yearbox').attr("style","min-height:45px");
      //  document.getElementById("result_letter").innerHTML = "letter: " + letter + "<br/>";
       document.getElementById("result_timepicker").innerHTML = "";
       document.getElementById("result_data").innerHTML = "";
       // 180420 수정부분
       YYYY = (letter -(100*mm) -dd) / 10000;
       MM = (letter - (10000*yy) - dd) / 100;
       DD = letter - (10000*yy) -(100*mm);
       importData_Init(YYYY);
       //180420 원본
      //  importData_Init(letter+'_org');
       // 180420 수정부분 끝



                  
    
   }

   function monthFunc(m) {
      //  var m = parseInt(document.getElementById("month").value);
      m = parseInt(m);
       // document.getElementById("result_letter").innerHTML = "You selected the month: " + m + "<br/>";
       if(ys + ms + ds == 0)
       {
         letter += (100*(m-mm));
         mm = m; ms++;
        //  document.getElementById("yearInit").selected = "true";
        $("#yearcont").attr("style", "color:white");
        document.getElementById("yearcont").innerHTML = "년";
        //  document.getElementById("dateInit").selected = "true";
        $("#datecont").attr("style", "color:white");
        document.getElementById("datecont").innerHTML = "일";

         letter -= (10000*yy);
         yy = 0;
         letter += (10000*yy);

         letter -= (1*dd);
         dd = 0;
         letter += (1*dd);

       }
       else {
         letter += (100*(m-mm));
         mm = m; ms++;

       }
       $("#monthcont").attr("style", "color:#F4AC1E");
       document.getElementById("monthcont").innerHTML = m+"월";
       $('#monthbox .content').attr("style","height:45px"); 
        $('#monthbox .breadcrumb .has-list').children('.sec-depth').stop().slideUp(200);
        $('#monthbox .breadcrumb .has-list').attr("style","background:url('img/hr/jeju/images/common/list-ico.gif_modified_arrow.png') 80px center no-repeat; background-size:10px 10px");
        $('#monthbox').attr("style","min-height:45px");
      //  document.getElementById("result_letter").innerHTML = "letter: " + letter + "<br/>";
       document.getElementById("result_timepicker").innerHTML = "";
       document.getElementById("result_data").innerHTML = "";
       // 180420 수정부분
       YYYY = (letter -(100*mm) -dd) / 10000;
       MM = (letter - (10000*yy) - dd) / 100;
       DD = letter - (10000*yy) -(100*mm);
       importData_Init(YYYY);
       //180420 원본
      //  importData_Init(letter+'_org');
       // 180420 수정부분 끝
   }

   function dateFunc(d) {
      //  var d = parseInt(document.getElementById("date").value);
      d = parseInt(d);
       // document.getElementById("result_letter").innerHTML = "You selected the date: " + d + "<br/>";
       if(ys == 0)
       {
         letter -= (10000*yy);
         yy = yi; ys++;
         letter += (10000*yy);
        //  document.getElementById("y"+yy).selected = "true";
        $("#yearcont").attr("style", "color:#F4AC1E");
        document.getElementById("yearcont").innerHTML = yy+"년";

       }
       if(ms == 0)
       {
         letter -= (100*mm);
         mm = mi; ms++;
         letter += (100*mm);
        //  document.getElementById("m"+mm).selected = "true";
        $("#monthcont").attr("style", "color:#F4AC1E");
        document.getElementById("monthcont").innerHTML = mm+"월";
       }

       letter += (1*(d-dd));
       dd = d; ds++;
       $("#datecont").attr("style", "color:#F4AC1E");
       document.getElementById("datecont").innerHTML = d+"일";
       $('#datebox .content').attr("style","height:45px"); 
        $('#datebox .breadcrumb .has-list').children('.sec-depth').stop().slideUp(200);
        $('#datebox .breadcrumb .has-list').attr("style","background:url('img/hr/jeju/images/common/list-ico.gif_modified_arrow.png') 75px center no-repeat; background-size:10px 10px");
        $('#datebox').attr("style","min-height:45px");
      //  document.getElementById("result_letter").innerHTML = "letter: " + letter + "<br/>";
       document.getElementById("result_timepicker").innerHTML = "";
       document.getElementById("result_data").innerHTML = "";

       // 180420 수정부분
       YYYY = (letter -(100*mm) -dd) / 10000;
       MM = (letter - (10000*yy) - dd) / 100;
       DD = letter - (10000*yy) -(100*mm);
       importData_Init(YYYY);
       //180420 원본
      //  importData_Init(letter+'_org');
       // 180420 수정부분 끝
   }

//////////////날짜 참조!!
// var d = new Date();
// 날짜 = d.getDate()
// 요일 = d.getDay()
// 월 = d.getMonth()
// 연도 = d.getFullYear()
// 시간 = d.getHours()