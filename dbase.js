var x,y,z;
var a,b,c,d;
var sum_on,sum_off;
var timeLoop;
var n_on, n_off;
var e,f,g,h;
var playtLoop;
var playtLoop2;


/// BACK
var now = new Date();
var hi = now.getHours();
var currentSelected_t;
var maxHeight;
var maxHeight2;
var maxHeight3;

// BACK (2)

/// 프론트 ★1번★ 에 필요한 전역변수
var wph_tLoop, wph_pLine, wph_station;
// 여기부터
var height_tLoop, height_pLine, height_station;
// 여기까지만 건들기
var width_tLoop, width_pLine, width_station;

/// 프론트 ★3번★에 필요한 전역변수
var svgStation;

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
//////////////////////함수함수열매 1 -- ImportData //////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function importData_Init(fname) {

var fname;

c= Array.apply(null, new Array()).map(Number.prototype.valueOf,0);
d= Array.apply(null, new Array()).map(Number.prototype.valueOf,0);
sum_on = Array.apply(null, new Array()).map(Number.prototype.valueOf,0);
sum_off = Array.apply(null, new Array()).map(Number.prototype.valueOf,0);
sum_onoff = Array.apply(null, new Array()).map(Number.prototype.valueOf,0);
timeLoop = Array.apply(null, new Array(4)).map(Number.prototype.valueOf,0);
n_on = 0;
n_off = 0;
e = Array.apply(null, new Array()).map(Number.prototype.valueOf,0);
f = Array.apply(null, new Array()).map(Number.prototype.valueOf,0);
g = Array.apply(null, new Array()).map(Number.prototype.valueOf,0);
h = Array.apply(null, new Array()).map(Number.prototype.valueOf,0);
maxHeight = 0;
maxHeight1 = 0;
maxHeight2 = 0;
maxHeight3 = 0;

// step 0. stationIDList 가져오기
$.ajax({
    url: 'data/stationIDList.csv',
    async:false,
    dataType: 'text',
    success:function(response){
      x = response;
    }
  }).done();

  y = successFunction(x,0);
  z = successFunction(x,1);
  // makeTable(y);

// step 1. csv 파일 데이터 가져오기
$.ajax({
    url: 'data/'+fname+'.csv',
    async:false,
    dataType: 'text',
    success:function(response){
      a = response;
      // document.getElementById("result_data").innerHTML = "<h1>"+fname+".csv</h1>";
    }
  }).done().fail(function(){a= Array.apply(null, new Array()).map(Number.prototype.valueOf,0);
      document.getElementById("result_data").innerHTML = "<h1>"+fname+".csv이 존재하지 않아 파일 로드에 실패</h1>";});

  //// step 2. 가져온 데이터(b) 정리하기
    b = successFunction(a,0);
  //// step 3. on끼리(c) 더하기 / off끼리(d) 더하기
  sortOn(b,c,YYYY,MM,DD);
  sortOff(b,d,YYYY,MM,DD);
  //// step 4. c와 d의 average 구하기
  n_on = figureOutAverage_Init(c,sum_on,n_on);
  n_off = figureOutAverage_Init(d,sum_off,n_off);
  //// step 5. 역사별 승차인원, 하차인원 나타내기 e,f 더하는함수만들기





///////////// BACK ☆☆ e는 역ID-승차인원-하차인원 / g는 호선명-승차-하차-합-점유율
for(var j=5; j<25; j++)
{
  getOnOffperStation_Init(e,y,c,d,j);

  for(var i = 0; i<y.length; i++)
  {
  if(maxHeight3 < e[i][1] + e[i][2]){
    maxHeight3 = e[i][1] + e[i][2];
  }    
  }
}

maxHeight3 = (maxHeight3 / (sum_on[25]+sum_off[25]));

set_t(hi); //////// 프론트 ★1번~4번★
currentSelected_t = hi;
// playtLoop2 = setInterval(function(){
//   if(currentSelected_t == 24 || currentSelected_t == 25){
//     currentSelected_t = 5;
//   }
//   else{
//     (currentSelected_t)++;
//   }
//   set_t(currentSelected_t);
// }, -900);
clearInterval(playtLoop2);
playtLoop2 = setInterval(function(){
  if(currentSelected_t == 24 || currentSelected_t == 25){
    currentSelected_t = 5;
  }
  else{
    (currentSelected_t)++;
  }
  set_t(currentSelected_t);
}, 900);
  pushPlayButton();
  } //init함수끝

function playtLoop(){
  playtLoop2 = setInterval(function(){
    if(currentSelected_t == 24 || currentSelected_t == 25){
      currentSelected_t = 5;
    }
    else{
      (currentSelected_t)++;
    }
    set_t(currentSelected_t);
  }, 900);
  pushPlayButton(/*일시정지 버튼*/);
}

function stoptLoop(){
  clearInterval(playtLoop2);
  pushStopButton(/*재생 버튼*/);

}

function pushPlayButton(/*일시정지 버튼*/){ 
  //var button = '<center><img src="img/back_button.png" width="35" onclick="set_t_prev()"> <img src="img/stop_button.png" width="35" onclick="stoptLoop()"> <img src="img/fast_button.png" width="35" onclick="set_t_next()"></center>';
  var button = '<img src="img/stop_button.png" height="33" onclick="stoptLoop()">';
  document.getElementById("result_player").innerHTML = "";
  document.getElementById("result_player").innerHTML = button;
  document.getElementById("result_player").innerHTML += "　<img src='img/total-time.png' height='33' onclick='selectHour(25)'>";
}
function pushStopButton(/*재생버튼*/){ 
  //var button = '<center><img src="img/back_button.png" width="35" onclick="set_t_prev()"> <img src="img/play_button.png" width="35" onclick="playtLoop()"> <img src="img/fast_button.png" width="35" onclick="set_t_next()"></center>';
  var button = '<img src="img/play_button.png" height="33" onclick="playtLoop()">';
  document.getElementById("result_player").innerHTML = "";
  document.getElementById("result_player").innerHTML = button;
  document.getElementById("result_player").innerHTML += "　<img src='img/total-time.png' height='33' onclick='selectHour(25)'>";
}


  ////이제부터는 시간대 선택으로 고고고~~~~
//////// 프론트 ★5번★ 특정시간대 선택했을 때

/////////////////////특정시간대 선택 (f와 h의 쓰임: e와 g랑 유사)
function set_t(t){
    
    /////// 특정시간대 선택 기능
    if(t>=0 && t<5) {
      t = 24;
    }
      getOnOffperStation_Init(e,y,c,d,t);

    // document.getElementById("result_data").innerHTML += "<br/><h3><b>(4)-2 (BEFORE)table f : stationID - on - off, filtered(07AM) </b></h3><br/>";
    // makeTable(f,"result_data");
    percentageofLines(g,e);
    // document.getElementById("result_data").innerHTML += "<br/><h3><b>(5)-2 (BEFORE)table h : Percentage of Lines filtered(07AM) </b></h3><br/>";
    // makeTable(h,"result_data");
      ///////////// station의 max 추출하기
    /// 원형에 새자료 뿌리기
    /// 점유율에 새자료 뿌리기

    maxHeight2 = 0;
    for(var i = 0; i<y.length; i++)
    {
    if(maxHeight2 < e[i][1] + e[i][2]){
      maxHeight2 = e[i][1] + e[i][2];
    }    
    }
    maxHeight2 = (maxHeight2 / (sum_on[25]+sum_off[25]));

    if(t == 25){
      maxHeight = maxHeight2;
    }
    else {
      maxHeight = maxHeight3;
    }
    setSize();
    set_tLoop();
    set_Station();
    set_pLine();

    for(var i=5; i<25; i++)
    {
      document.getElementById("tLoop"+i).setAttribute("style", "fill:#374565;");
    }
    if(t != 25){
    document.getElementById("tLoop"+t).setAttribute("style", "fill:#C7CBCD;");
    }
    
    else {
      for(var i=5; i<25; i++)
    {
      document.getElementById("tLoop"+i).setAttribute("style", "fill:#C7CBCD;");
    }
    }

    currentSelected_t = t;

    var div_test;
    div_test = '<div id="testtest">';
    div_test +='<span class="before"><center><div id="test_header"> <div><div id="test_selected"><font color="#5e7ab5" size="2">선택 시각의 승하차 인원</font><br/>'+(sum_on[t]+sum_off[t]).toLocaleString()+'명</div><div id="test_total"><font color="#5e7ab5" size="2">전체 시간의 승하차 인원</font><br/>'+(sum_on[25]+sum_off[25]).toLocaleString()+'명</div></center></span>';
    div_test += '</div>';
    document.getElementById("result_timeLoop_3").innerHTML = div_test;

}

function set_t_prev(){
  if(currentSelected_t == 5 || currentSelected_t == 25){
    currentSelected_t = 24;
  }
  else{
    (currentSelected_t)--;
  }
  stoptLoop();
  set_t(currentSelected_t);
}

function set_t_next(){
  if(currentSelected_t == 24 || currentSelected_t == 25){
    currentSelected_t = 5;
  }
  else{
    (currentSelected_t)++;
  }
  stoptLoop();
  set_t(currentSelected_t);
}

  ///////////////////////////////////////////////////함수야함수야
  ///////////////////////////////////////////////////프론트
  ///////////////////////////////////////////////////프론트
  ///////////////////////////////////////////////////함수야함수야
  ///////////////////////////////////////////////////함수야함수야
  ///////////////////////////////////////////////////함수야함수야





  function setSize(){
    //////// 프론트 ★1번★ 먼저 3개 그래프의 사이즈 정하기
    // ★1-1) 변수선언
    wph_tLoop = 1600/250;
    wph_pLine = 900/100;
    wph_station = 600/600;
  
    // 여기부터
    height_tLoop = 66;
    height_pLine = 70;
    height_station = 720;
    // 여기까지만 건들기
  
    width_tLoop = wph_tLoop * height_tLoop;
    width_pLine = wph_pLine * height_pLine;
    width_station = wph_station * height_station;
  
    ///// ★1-2)동적으로 구현되지 않은(html상에 존재하는) svg의 width height 조절
    document.getElementById("svgTimeLoop").setAttribute("width", 1600*(width_tLoop / 1600));
    document.getElementById("svgTimeLoop").setAttribute("height", 250*(height_tLoop / 250));
    // document.getElementById("tLoop_line").setAttribute("x1", 0);
    // document.getElementById("tLoop_line").setAttribute("y1", height_tLoop);
    // document.getElementById("tLoop_line").setAttribute("x2", width_tLoop);
    // document.getElementById("tLoop_line").setAttribute("y2", height_tLoop);
  
      for(var i=5; i<25; i++)
      {
        document.getElementById("tLoop"+i).setAttribute("x", (20+(79*(i-5)))*(width_tLoop / 1600));
        document.getElementById("tLoop"+i).setAttribute("width", 59*(width_tLoop / 1600));
      }
  
      for(var i=1; i<6; i++)
      {
        document.getElementById("pLine_line_x_"+i).setAttribute("y1", 25*(i-1)*(height_pLine/100));
        document.getElementById("pLine_line_x_"+i).setAttribute("x2", 900*(width_pLine/900));
        document.getElementById("pLine_line_x_"+i).setAttribute("y2", 25*(i-1)*(height_pLine/100));
  
      }
  
      
      document.getElementById("svgPofLines").setAttribute("width", 900*(width_pLine/900));
      document.getElementById("svgPofLines").setAttribute("height", 100*(height_pLine/100));
      document.getElementById("pLine_line_x_1").setAttribute("y1", 1*(height_pLine/100));
      document.getElementById("pLine_line_x_1").setAttribute("y2", 1*(height_pLine/100));
      document.getElementById("pLine_line_x_5").setAttribute("y1", 99*(height_pLine/100));
      document.getElementById("pLine_line_x_5").setAttribute("y2", 99*(height_pLine/100));
      for(var i=1; i<9; i++)
      {
        document.getElementById("pLine"+i).setAttribute("cx", 100*i*(width_pLine/900));
        document.getElementById("pLine"+i).setAttribute("cy", 100*(height_pLine/100));
      }
  
  }
  ////////////////////////////////////////////////////////////////

  function selectHour(t)
  {
      set_t(t);
      clearInterval(playtLoop2);
      pushStopButton();
  }
  function set_on(){
    tLoop_on();
    station_on();
  }
  function set_off(){
    tLoop_off();
    station_off();
  }
  function set_onoff(){
    set_tLoop();
    set_Station();
  }
  ////////////////////////////////////////////////////////////////
  function tLoop_on(){
    var maxHeight1 = 0;
    for(var i = 5; i<25; i++)
    {
      if(maxHeight1 < sum_on[i]){
        maxHeight1 = sum_on[i];
      }    
    }
    maxHeight1 = (maxHeight1 / (sum_on[25]));
 
    for(var i = 5; i<25; i++)
    {
      var height = height_tLoop * ((sum_on[i])/(sum_on[25])) * (1/maxHeight1);
      document.getElementById("tLoop"+i).setAttribute("y", height_tLoop-height);      
      document.getElementById("tLoop"+i).setAttribute("height", height);
    }
  }
  function tLoop_off(){
    var maxHeight1 = 0;
    for(var i = 5; i<25; i++)
    {
      if(maxHeight1 < sum_off[i]){
        maxHeight1 = sum_off[i];
      }    
    }
    maxHeight1 = (maxHeight1 / (sum_off[25]));
 
    for(var i = 5; i<25; i++)
    {
      var height = height_tLoop * ((sum_off[i])/(sum_off[25])) * (1/maxHeight1);
      document.getElementById("tLoop"+i).setAttribute("y", height_tLoop-height);      
      document.getElementById("tLoop"+i).setAttribute("height", height);
    }
  }

  function set_tLoop(){
    // document.getElementById("result_timeLoop_2").innerHTML = '';
    // document.getElementById("result_timeLoop_2").innerHTML += '<button onclick="set_on()">승차만</button>';
    // document.getElementById("result_timeLoop_2").innerHTML += '<button onclick="set_off()">하차만</button>';
    // document.getElementById("result_timeLoop_2").innerHTML += '<button onclick="set_onoff()">승차+하차</button><br/><br/><br/>';
    //////// 프론트 ★2번★ <첫번째 그래프> tLoop에 자료 뿌리기
     /// ★2-1) 최댓값 찾아서 그걸 기준으로 높이 재정렬
     var maxHeight1 = 0;
     for(var i = 5; i<25; i++)
     {
       if(maxHeight1 < sum_on[i] + sum_off[i]){
         maxHeight1 = sum_on[i] + sum_off[i];
       }    
     }
     maxHeight1 = (maxHeight1 / (sum_on[25] + sum_off[25]));
  
     for(var i = 5; i<25; i++)
     {
       var height = height_tLoop * ((sum_on[i] + sum_off[i])/(sum_on[25]+sum_off[25])) * (1/maxHeight1);
       document.getElementById("tLoop"+i).setAttribute("y", height_tLoop-height);      
       document.getElementById("tLoop"+i).setAttribute("height", height);
     }
  }
  

  var mouseOverLock = 0;

  function clearStation(){
    mouseOverLock = 0;
    playtLoop();
  }

  var currentSelected_StationIndex;

  function mouseOver(ind){
    if(mouseOverLock == 0){
    currentSelected_StationIndex = ind;
    }
  }

  function mouseOut(){
    if(mouseOverLock == 1){
      mouseOverLock = 0;
      selectHour(currentSelected_t);
    }

  }

  function mouseOnclick(ind){
    mouseOverLock = 1;
    selectHour(currentSelected_t);
    set_Station_selected(ind);
  }



  function set_Station_prev(){
    if(currentSelected_StationIndex == 0){
      currentSelected_StationIndex = (y.length-1);
      mouseOnclick(currentSelected_StationIndex);
    }
    else{
    currentSelected_StationIndex--;
    mouseOnclick(currentSelected_StationIndex);
    }
  }
  function set_Station_next(){
    if(currentSelected_StationIndex == (y.length-1)){
      currentSelected_StationIndex = 0;
      mouseOnclick(currentSelected_StationIndex);
    }
    else{
    currentSelected_StationIndex++;
    mouseOnclick(currentSelected_StationIndex);
    }
  }
  
  function set_Station_selected(ind){
    var divno;
    if(y[ind][0] > 2000){
      divno = y[ind][0]-2000;
    }
    else divno = y[ind][0];

    var div_test;
    div_test = '<div id="testtest">';
    div_test +='<span class="after"><center><div id="test_station"><div id="test_stN" style="position:relative"><svg width="30" height="30"><circle id="abc" cx="15" cy="15" r="15" style="fill:'+colorofLine2[y[ind][1]]+'"/><text x="3" y="19" style="font-size:10pt; fill:#ffffff">'+divno+'</text></svg></div><div id="test_stName">'+z[ind][2]+'</div></div><div id="test_on"><font color="#5e7ab5" size="2">승차인원</font><br/>'+(e[ind][1].toLocaleString())+'명</div><div id="test_off"><font color="#5e7ab5" size="2">하차인원</font><br/>'+(e[ind][2].toLocaleString())+'명</div></center></span>';
    // div_test += '</div>';
    document.getElementById("result_timeLoop_3").innerHTML = div_test;

    currentSelected_StationIndex = ind;
    for(var i = 0; i<y.length; i++)
    {
      document.getElementById("stNon"+e[i][0]+"_2").setAttribute("style", "fill:rgb(25,24,34);");
      document.getElementById("stNoff"+e[i][0]+"_2").setAttribute("style", "fill:rgb(50,51,58);");      
    }

    for(var i = 1; i < 9; i++)
    {
      document.getElementById("lineNonoff"+i).setAttribute("style", "fill:rgb(19,18,26); stroke:rgb(58,55,58);");

      if(parseInt(e[ind][0] / 100) == i){
        document.getElementById("lineNonoff"+i).setAttribute("style", "fill:rgb(19,18,26); stroke-width:4; stroke:rgb("+colorofLine[i]+");");
      }

      if(parseInt(e[ind][0] / 100) == (20+i)){

        document.getElementById("lineNonoff"+i).setAttribute("style", "fill:rgb(19,18,26); stroke-width:4; stroke:rgb("+colorofLine[i]+");");
      }
    }


    document.getElementById("stNon"+e[ind][0]+"_2").setAttribute("style", "fill:#6581C0;");
    document.getElementById("stNoff"+e[ind][0]+"_2").setAttribute("style", "fill:#87CDCD;");
    document.getElementById("stNonoff"+e[ind][0]+"_line").setAttribute("style", "stroke:white; stroke-width:0.3");
    //똥글뱅이 작은거 추가하기
    document.getElementById("stNonoff"+e[ind][0]+"_lcircle").setAttribute("r", 1);
    document.getElementById("stNonoff"+e[ind][0]+"_lcircle").setAttribute("style", "fill:white;");
  }

  var colorofLine = ['255,255,255','13,54,146','51,162,61','254,91,16','0,162,209','139,80,164','197,92,29','84,100,13','241,46,130'];
  var colorofLine2 = ['#ffffff','#0d3692','#33a23d','#fe5d10','#00a2d1','#8b50a4','#c55c1d','#54640d','#f14c82'];

  function set_Station(){
    // document.getElementById("result_timepicker").innerHTML = "";
    // document.getElementById("result_timepicker").innerHTML += '<button onclick="station_on()">승차만</button>';
    // document.getElementById("result_timepicker").innerHTML += '<button onclick="station_off()">하차만</button>';
    // document.getElementById("result_timepicker").innerHTML += '<button onclick="set_Station()">승차+하차</button><br/><br/><br/>';
  
      ///// ★3-3) 승차+하차 뿌리기
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
  // ///승차+하차 시작 아무것도 안건드림
    ////// 승차+하차의 호선띠 만들기
    var lineN = 1;

    var st_theta;
    var st_theta_rad;

    var st_ind = Array.apply(null, new Array(9)).map(Number.prototype.valueOf,-1);
    st_ind[8] =y.length-1;

    for(var i = 0; i<(y.length-1); i++)
    {
      if(parseInt(e[i][0]/100) != parseInt(e[i+1][0]/100)){
        // 다르면 짜르고 다음호선으로 넘어가기, 대응시키기
        st_ind[lineN]=i;
        lineN++; // 아랫줄은 호선구분하려고 임시로해놓은거
        // document.getElementById("stNon"+e[i][0]+"_2").setAttribute("style", "fill:red;");
        // document.getElementById("stNoff"+e[i][0]+"_2").setAttribute("style", "fill:red;");
      }
      
    }

    var st_x;
    var st_r = (width_station/6)-5.7;


/// setstation 바꾼거.svg에 onclick 걸었을때 역선택하기
/// 똥글뱅이 만듦

  svgStation = '<center><svg id="svgStation_onoff" width="'+(width_station*1.2)+'" height="'+(height_station*1.2)+'">';
  svgStation += '<rect x="0" y="0" width="'+(width_station*1.2)+'" height="'+(height_station*1.2)+'" onmouseover="mouseOut()" style="fill:rgb(19,18,26);"/>';
  svgStation += '<g transform="translate('+(width_station*1.2/2)+','+(height_station*1.2/2)+')"><circle id="stNonoff_line_x" cx="0" cy="0" r="'+(width_station/2)+'" style="fill:rgb(19,18,26); stroke:rgb(51,53,84);stroke-width:1"/>';
  
  for(var i = 1; i < 9; i++){

    st_theta = (360/y.length) * (st_ind[i] - st_ind[i-1]);
    st_theta_rad = st_theta * (Math.PI/180);
    st_x = 2*st_r*(Math.sin(st_theta_rad/2));
      svgStation += '<g transform="rotate('+((360/y.length)*(st_ind[i-1])+(st_theta/2)-180)+')">';
        svgStation += '<path id="lineNonoff'+i+'" d="M'+((-1)*st_r*(Math.sin(st_theta_rad/2)))+','+(st_r*(Math.cos(st_theta_rad/2)))+' a'+st_r+','+st_r+' 0 0,0  '+st_x+',0" style="fill:rgb(19,18,26); stroke:rgb('+colorofLine[i]+');stroke-width:1.7" />';
      svgStation += '</g>';
  }
  
  svgStation += '</g>';




  // 승하차 막대그래프 뿌리기
  for(var i = 0; i<y.length; i++){    
      //svgStation += '<g transform="translate('+(width_station*1.2/2)+','+(width_station*1.2/2)+')" onmouseover="mouseOnclick('+i+')" onclick="mouseOnclick('+i+')">';
      svgStation += '<g transform="translate('+(width_station*1.2/2)+','+(width_station*1.2/2)+')" onmouseover="mouseOnclick('+i+')" onmouseout="mouseOut()">';
        svgStation += '<g transform="rotate('+((i*(360/y.length))-90)+')">';
          svgStation += '<line id="stNonoff'+e[i][0]+'_line" x1="'+(width_station/6)+'" y1="0" x2="'+(width_station/2)+'" y2="0" style="stroke:rgb(41,42,67);stroke-width:0.5"/>'; ///축만들기
          svgStation += '<rect id="stNon'+e[i][0]+'_2" x="'+(width_station/6)+'" y="-1" width="'+(width_station/6)+'" height="1.5" style="fill:'; ///승차 막대그래프 그리기
          svgStation += '#6581C0;" />'; //승차
          svgStation += '<rect id="stNoff'+e[i][0]+'_2" x="'+(width_station/3)+'" y="-1" width="'+(width_station/6)+'" height="1.5" style="fill:'; ///하차 막대그래프 그리기
          svgStation += '#87CDCD;" />'; //하차
          svgStation += '<circle id="stNonoff'+e[i][0]+'_lcircle" cx="'+(width_station/2)+'" cy="0" r="0" style=""/>';
        svgStation += '</g>';
      svgStation += '</g>';
    }
  svgStation += '</svg></center>';
  document.getElementById("result_timepicker").innerHTML = svgStation;
  

  for(var i = 0; i<y.length; i++)
  {
    // var height = (width_station/3) * ((e[i][1]+e[i][2])/(sum_on[25]+sum_off[25])) * (1/maxHeight2);
    var height = (width_station/3) * ((e[i][1]+e[i][2])/(sum_on[25]+sum_off[25])) * (1/maxHeight);
    var h_a = e[i][1] / (e[i][1]+e[i][2]);
    var h_b = e[i][2] / (e[i][1]+e[i][2]);
  
    document.getElementById("stNon"+e[i][0]+"_2").setAttribute("width", height*h_a);
    document.getElementById("stNoff"+e[i][0]+"_2").setAttribute("x", (width_station/6)+(height*h_a));      
    document.getElementById("stNoff"+e[i][0]+"_2").setAttribute("width", height*h_b);
  }


  // 마지막역 체크 기능, 호선구분
  // for(var i=0; i<y.length-1; i++){
  //   if(parseInt(e[i][0]/100) != parseInt(e[i+1][0]/100)){
      
  //     document.getElementById("stNon"+e[i][0]+"_2").setAttribute("style", "fill:red;");
  //     document.getElementById("stNoff"+e[i][0]+"_2").setAttribute("style", "fill:red;");

  //   }
  // } //호선구분 끝
  

  ///승차+하차 끝


  

  } //set_Station 끝


  //station event에 따른 함수
      //////// 프론트 ★3번★ <두번째 그래프> station에 자료 뿌리기
      function station_off(){
        // document.getElementById("result_timepicker").innerHTML = "";
        // document.getElementById("result_timepicker").innerHTML += '<button onclick="station_on()">승차만</button>';
        // document.getElementById("result_timepicker").innerHTML += '<button onclick="station_off()">하차만</button>';
        // document.getElementById("result_timepicker").innerHTML += '<button onclick="set_Station()">승차+하차</button><br/><br/><br/>';
      
        /// ★3-2) 하차 뿌리기
        var lineN = 1;

        var st_theta;
        var st_theta_rad;
    
        var st_ind = Array.apply(null, new Array(9)).map(Number.prototype.valueOf,-1);
        var colorofLine = ['255,255,255','13,54,146','51,162,61','254,91,16','0,162,209','139,80,164','197,92,29','84,100,13','241,46,130'];
        st_ind[8] =y.length-1;
    
        for(var i = 0; i<(y.length-1); i++)
        {
          if(parseInt(e[i][0]/100) != parseInt(e[i+1][0]/100)){
            // 다르면 짜르고 다음호선으로 넘어가기, 대응시키기
            st_ind[lineN]=i;
            lineN++; // 아랫줄은 호선구분하려고 임시로해놓은거
            // document.getElementById("stNon"+e[i][0]+"_2").setAttribute("style", "fill:red;");
            // document.getElementById("stNoff"+e[i][0]+"_2").setAttribute("style", "fill:red;");
          }
          
        }
    
        var st_x;
        var st_r = (width_station/6)-3;

    svgStation = '<center><svg id="svgStation_off" width="'+(width_station*1.2)+'" height="'+(height_station*1.2)+'">';
    svgStation += '<g transform="translate('+(width_station*1.2/2)+','+(height_station*1.2/2)+')"><circle id="stNoff_line_x" cx="0" cy="0" r="'+(width_station/2)+'" style="stroke:#37385A;stroke-width:1"/>';

    for(var i = 1; i < 9; i++){

      st_theta = (360/y.length) * (st_ind[i] - st_ind[i-1]);
      st_theta_rad = st_theta * (Math.PI/180);
      st_x = 2*st_r*(Math.sin(st_theta_rad/2));
        svgStation += '<g transform="rotate('+((360/y.length)*(st_ind[i-1])+(st_theta/2)-180)+')">';
          svgStation += '<path id="lineNoff'+i+'" d="M'+((-1)*st_r*(Math.sin(st_theta_rad/2)))+','+(st_r*(Math.cos(st_theta_rad/2)))+' a'+st_r+','+st_r+' 0 0,0  '+st_x+',0" style="stroke:rgb('+colorofLine[i]+');stroke-width:2" />';
        svgStation += '</g>';
    }
    
    svgStation += '</g>';
    
    for(var i = 0; i<y.length; i++){    
        svgStation += '<g transform="translate('+(width_station*1.2/2)+','+(width_station*1.2/2)+')">';
          svgStation += '<g transform="rotate('+((i*(360/y.length))-90)+')">';
            svgStation += '<line id="stNoff'+e[i][0]+'_line" x1="'+(width_station/6)+'" y1="0" x2="'+(width_station/2)+'" y2="0" style="stroke:#37385A;stroke-width:0.5"/>'; ///축만들기
            svgStation += '<rect id="stNoff'+e[i][0]+'" x="'+(width_station/6)+'" y="-1" width="'+(width_station/3)+'" height="1.5" style="fill:'; ///승차 막대그래프 그리기
            svgStation += '#87CDCD;" />'; //하차
          svgStation += '</g>';
        svgStation += '</g>';
      }
    svgStation += '</svg></center>';
    document.getElementById("result_timepicker").innerHTML = svgStation;
    
    var maxHeight2 = 0;
    for(var i = 0; i<y.length; i++)
    {
    if(maxHeight2 < e[i][2]){
      maxHeight2 = e[i][2];
    }    
    }
    maxHeight2 = (maxHeight2 / sum_off[25]);
    
    for(var i = 0; i<y.length; i++)
    {
    var height = (width_station/3) * (e[i][2]/sum_off[25]) * (1/maxHeight2);      
    document.getElementById("stNoff"+e[i][0]).setAttribute("width", height);
    }
    
    
    
    //   ////// 호선띠 만들기 
    //   var lineN = 1;
    //   var st_ind = Array.apply(null, new Array(9)).map(Number.prototype.valueOf,-1);
    //   st_ind[8] =y.length-1;
    //   for(var i = 0; i<(y.length-1); i++)
    //   {
    //     if(parseInt(e[i][0]/100) != parseInt(e[i+1][0]/100)){
    //       // 다르면 짜르고 다음호선으로 넘어가기, 대응시키기
    //       st_ind[lineN]=i;
    //       lineN++; // 아랫줄은 호선구분하려고 임시로해놓은거
    //       // document.getElementById("stNoff"+e[i][0]).setAttribute("style", "fill:red;");
    //     }
        
    //   }
    //   var colorofLine = ['255,255,255','13,54,146','51,162,61','254,91,16','0,162,209','139,80,164','197,92,29','84,100,13','241,46,130'];
    //   var svgLine='<svg id="svgLineoff" width="2208" height="4">';
    //   for(var i = 1; i < 9; i++){
    //     svgLine += '<line id="lineNoff'+i+'" x1="'+(8*(1+st_ind[i-1]))+'" y1="2" x2="'+(8*(1+st_ind[i]))+'" y2="2" style="stroke:rgb('+colorofLine[i]+');stroke-width:4" />';
    //   }
    //   svgLine += '</svg>';
    //   document.getElementById("result_timeline").innerHTML += svgLine;
    
    // ///하차끝
       }
  
  
       function station_on(){
               /// ★3-1) 승차 뿌리기
        //////////////////////승차 하차는 /////////////////////////////////////
              //// 역사별(승차)
    //           document.getElementById("result_timepicker").innerHTML = "";
    //           document.getElementById("result_timepicker").innerHTML += '<button onclick="station_on()">승차만</button>';
    //           document.getElementById("result_timepicker").innerHTML += '<button onclick="station_off()">하차만</button>';
    //           document.getElementById("result_timepicker").innerHTML += '<button onclick="set_Station()">승차+하차</button><br/><br/><br/>';          
    // ///////////////////////////////////////////Group I 시작 
    var lineN = 1;

    var st_theta;
    var st_theta_rad;

    var st_ind = Array.apply(null, new Array(9)).map(Number.prototype.valueOf,-1);
    var colorofLine = ['255,255,255','13,54,146','51,162,61','254,91,16','0,162,209','139,80,164','197,92,29','84,100,13','241,46,130'];
    st_ind[8] =y.length-1;

    for(var i = 0; i<(y.length-1); i++)
    {
      if(parseInt(e[i][0]/100) != parseInt(e[i+1][0]/100)){
        // 다르면 짜르고 다음호선으로 넘어가기, 대응시키기
        st_ind[lineN]=i;
        lineN++; // 아랫줄은 호선구분하려고 임시로해놓은거
        // document.getElementById("stNon"+e[i][0]+"_2").setAttribute("style", "fill:red;");
        // document.getElementById("stNoff"+e[i][0]+"_2").setAttribute("style", "fill:red;");
      }
      
    }

    var st_x;
    var st_r = (width_station/6)-3;



        svgStation = '<center><svg id="svgStation" width="'+(width_station*1.2)+'" height="'+(height_station*1.2)+'">';
        svgStation += '<g transform="translate('+(width_station*1.2/2)+','+(height_station*1.2/2)+')"><circle id="stNon_line_x" cx="0" cy="0" r="'+(width_station/2)+'" style="stroke:#37385A;stroke-width:1"/>';

        for(var i = 1; i < 9; i++){

          st_theta = (360/y.length) * (st_ind[i] - st_ind[i-1]);
          st_theta_rad = st_theta * (Math.PI/180);
          st_x = 2*st_r*(Math.sin(st_theta_rad/2));
            svgStation += '<g transform="rotate('+((360/y.length)*(st_ind[i-1])+(st_theta/2)-180)+')">';
              svgStation += '<path id="lineNon'+i+'" d="M'+((-1)*st_r*(Math.sin(st_theta_rad/2)))+','+(st_r*(Math.cos(st_theta_rad/2)))+' a'+st_r+','+st_r+' 0 0,0  '+st_x+',0" style="stroke:rgb('+colorofLine[i]+');stroke-width:2" />';
            svgStation += '</g>';
        }
        
        svgStation += '</g>';

        for(var i = 0; i<y.length; i++){    
            svgStation += '<g transform="translate('+(width_station*1.2/2)+','+(width_station*1.2/2)+')">';
              svgStation += '<g transform="rotate('+((i*(360/y.length))-90)+')">';
                svgStation += '<line id="stNon'+e[i][0]+'_line" x1="'+(width_station/6)+'" y1="0" x2="'+(width_station/2)+'" y2="0" style="stroke:#37385A;stroke-width:0.5"/>'; ///축만들기
                svgStation += '<rect id="stN'+e[i][0]+'" x="'+(width_station/6)+'" y="-1" width="'+(width_station/3)+'" height="1.5" style="fill:'; ///승차 막대그래프 그리기
                svgStation += '#6581C0;" />'; //승차
              svgStation += '</g>';
            svgStation += '</g>';
          }
        svgStation += '</svg></center>';
        document.getElementById("result_timepicker").innerHTML = svgStation;
        
      var maxHeight2 = 0;
      for(var i = 0; i<y.length; i++)
      {
        if(maxHeight2 < e[i][1]){
          maxHeight2 = e[i][1];
        }    
      }
      maxHeight2 = (maxHeight2 / sum_on[25]);
    
      for(var i = 0; i<y.length; i++)
      {
        var height = (width_station/3) * (e[i][1]/sum_on[25]) * (1/maxHeight2);
        // document.getElementById("stN"+e[i][0]).setAttribute("x", 200-height);      
        document.getElementById("stN"+e[i][0]).setAttribute("width", height);
      }
    ///////////////////////////////////////////Group I 끝
    
    //       ////// 호선띠 만들기 (추후에 원형으로)
    //       var lineN = 1;
    //       var st_ind = Array.apply(null, new Array(9)).map(Number.prototype.valueOf,-1);
    //       st_ind[8] =y.length-1;
    //       for(var i = 0; i<(y.length-1); i++)
    //       {
    //         if(parseInt(e[i][0]/100) != parseInt(e[i+1][0]/100)){
    //           // 다르면 짜르고 다음호선으로 넘어가기, 대응시키기
    //           st_ind[lineN]=i;
    //           lineN++; // 아랫줄은 호선구분하려고 임시로해놓은거
    //           // document.getElementById("stN"+e[i][0]).setAttribute("style", "fill:red;");
    //         }
            
    //       }
    //       var colorofLine = ['255,255,255','13,54,146','51,162,61','254,91,16','0,162,209','139,80,164','197,92,29','84,100,13','241,46,130'];
    //       var svgLine='<svg id="svgLine" width="2208" height="4">';
    //       for(var i = 1; i < 9; i++){
    //         svgLine += '<line id="lineN'+i+'" x1="'+(8*(1+st_ind[i-1]))+'" y1="2" x2="'+(8*(1+st_ind[i]))+'" y2="2" style="stroke:rgb('+colorofLine[i]+');stroke-width:4" />';
    //       }
    //       svgLine += '</svg>';
    //       document.getElementById("result_timepicker").innerHTML += svgLine;
    
    // //////승차끝
    
    
  
       }





  function set_pLine(){
    //////// 프론트 ★4번★ <세번째 그래프> pLine에 자료 뿌리기
       ///// ★4-1) 최댓값 계산하기
       /////호선별 점유율
       var maxRadius = 0;
       for(var i = 1 ; i < 9; i++)
       {
         if(maxRadius < g[i][4] )
         {
           maxRadius = g[i][4];
         }
   
       }
       maxRadius = (maxRadius / g[9][4]);
   
       ///// ★4-2) 그래프 뿌리기
       for(var i = 1; i < 9; i++)
       {
         var radius = (height_pLine/2) * 1.5 * (g[i][4]/g[9][4]) * (1/maxRadius);
         document.getElementById("pLine"+i).setAttribute("r", radius);
       }    
      
   }



////////////////////////////////////////////////////////////////////////
/////////////////////////////함수함수열매///////////////////////////////
///////////////////////sortOn, sortOff 함수 ver2.
function sortOn(b,c, YYYY, MM, DD){
  var n = 0;

  /* YYYY 정해짐, MM= 0, DD = 0 => 20160000 b[i][0] == YYYY
    YYYY 정해짐, MM 정해짐, DD = 0 => 20160100 b[i][0] == YYYY && b[i][1] == MM
    보류) YYYY=0, MM 정해짐, DD = 0 => 300 b[i][1] == MM 12개년이라서 문제가 생김 이건일단 보류

  */
  if(DD == 0){

    if(MM == 0){ //특정연도평균
      for(var i = 0; i<b.length; i++)
      {
        if(b[i][4] == 1 && b[i][0] == YYYY){
              c[n] = b[i];
              n++;
        }
      }
    }

    else if(YYYY != 0){ //특정(연도및월)평균
      for(var i = 0; i<b.length; i++)
      {
        if(b[i][4] == 1 && b[i][0] == YYYY && b[i][1] == MM){
              c[n] = b[i];
              n++;
        }
      }
    }
    else { //특정월(11개년짜리)평균 , 보류하기

    }
  }

  else{
    for(var i = 0; i<b.length; i++)
    {
      if(b[i][4] == 1 && b[i][0] == YYYY && b[i][1] == MM && b[i][2] == DD){
            c[n] = b[i];
            n++;
      }
    }
  }

}

function sortOff(b,d, YYYY, MM, DD){
  n = 0;

  /* YYYY 정해짐, MM= 0, DD = 0 => 20160000 b[i][0] == YYYY
    YYYY 정해짐, MM 정해짐, DD = 0 => 20160100 b[i][0] == YYYY && b[i][1] == MM
    보류) YYYY=0, MM 정해짐, DD = 0 => 300 b[i][1] == MM 12개년이라서 문제가 생김 이건일단 보류

  */
  if(DD == 0){

    if(MM == 0){ //특정연도평균
      for(var i = 0; i<b.length; i++)
      {
        if(b[i][4] == 0 && b[i][0] == YYYY){
              d[n] = b[i];
              n++;
        }
      }
    }

    else if(YYYY != 0){ //특정(연도및월)평균
      for(var i = 0; i<b.length; i++)
      {
        if(b[i][4] == 0 && b[i][0] == YYYY && b[i][1] == MM){
              d[n] = b[i];
              n++;
        }
      }
    }
    else { //특정월(11개년짜리)평균 , 보류하기

    }
  }

  else{
    for(var i = 0; i<b.length; i++)
    {
      if(b[i][4] == 0 && b[i][0] == YYYY && b[i][1] == MM && b[i][2] == DD){
            d[n] = b[i];
            n++;
      }
    }
  }

}

//////////////////////////////////ver 1.
// function sortOn(b,c){
//   var n = 0;
//   for(var i = 0; i<b.length; i++)
//   {
//     if(b[i][4] == 1){
//           c[n] = b[i];
//           n++;
//     }
//   }
// }

// function sortOff(b,d){
//   n = 0;
//   for(var i = 0; i<b.length; i++)
//   {
//     if(b[i][4] == 0){
//           d[n] = b[i];
//           n++;
//     }
//   }
// }

///////////////////////figureOutAverage 함수
function figureOutAverage_Init(c, sum_on, n_on){
  var avg_on = [];
  n_on = c.length;

////////////////////////////////////////sum 및 average 초기화
  for(var j = 0; j<26; j++)
  {
    sum_on[j] = 0;
    avg_on[j] = 0;
  }

  //////////////////////////////////////// sum에 더해주기
  for(var i = 0; i<c.length; i++)
  {
    for(var j = 0; j<26; j++)
    {
      sum_on[j] += c[i][j];
    }
  }

//////////////////////////////////////////////////////average 산출하기
  // for(var j = 0; j<26; j++)
  // {
  //   avg_on[j] = Math.round(sum_on[j] / n_on) ;
  // }

  return n_on;
}

///////////////////////getOnOffperStation 함수(Init, Add)
function getOnOffperStation_Init(e,y,c,d,t){
  var t;
  for(var i = 0; i < y.length; i++)
  {
    e[i] = Array.apply(null, new Array(3)).map(Number.prototype.valueOf,0);
    e[i][0] = y[i][0];
  }

  for(var i = 0; i < c.length; i++)
  {
    for(var j= 0; j<e.length; j++)
    {
      if(e[j][0] == c[i][3])
      {
        e[j][1] += c[i][t];
      }
    }
  }

  for(var i = 0; i < d.length; i++)
  {
    for(var j= 0; j<e.length; j++)
    {
      if(e[j][0] == d[i][3])
      {
        e[j][2] += d[i][t];
      }
    }
  }

}

///////////////////////percentageofLines 함수
function percentageofLines(g,e){
  for(var i = 0 ; i < 9; i++)
  {
    g[i] = Array.apply(null, new Array(5)).map(Number.prototype.valueOf,0);
    g[i][0] = i;

    for(var j = 0; j<e.length; j++)
    {
        // document.write("<br/>test01: "+ f[j][0] +", test02: " + (f[j][0] % 100) +"<br/>");
        if(parseInt(e[j][0] / 100) == i){
          g[i][1] += e[j][1];
          g[i][2] += e[j][2];
        }

        if(parseInt(e[j][0] / 100) == (20+i)){
          g[i][1] += e[j][1];
          g[i][2] += e[j][2];
        }
    }
    g[i][3] = g[i][1] + g[i][2];
  }

    g[9] = Array.apply(null, new Array(5)).map(Number.prototype.valueOf,0);
    g[9][0] = "sum";
    for(var i = 0; i<9; i++)
    {
      g[9][1] += g[i][1];
      g[9][2] += g[i][2];
      g[9][3] += g[i][3];
    }

    for(var i = 0; i<=9; i++)
    {
      g[i][4] = (100 * (g[i][3]/ g[9][3]));
    }

}

///////////////////////successFunction 함수, makeTable 함수

// function successFunction(data, string) { //ver.2
//   var result = data.split(/\r?\n|\r/);
//   var i, j;
//   var cnt = 0;
//   if(string == 1){
//     for (i = 0; i < result.length; i++) {

//       result[i] = result[i].split(',');
//           // ver.2 의 역할: 여기서 필터링
//     if(result[i][1] == "1" && result[i][2] == "1"){
//       result_2[cnt] = result[i];
//       cnt++;
//     }
//     }
    
//   } //if(string == 1) 조건문 끝!

//   else {
//     for (i = 0; i < result.length; i++) {

//       result[i] = result[i].split(',');
//       var sum = result[i].length;
//       result_2[i][sum] = 0;

//       for (j = 0; j < result[i].length; j++) {
//         result[i][j] = parseInt(result[i][j]); // (1) 추가작업 1: 정수로 변환

//           // ver.2 의 역할: 여기서 필터링
//         if(result[i][1] == 1 && result[i][2] == 1){
//           result_2[cnt] = result[i];
//           cnt++;
//         }

//           // (2) 추가작업 2: 합계 구하기
//           if (j > 4 && j <25){
//             result_2[(cnt-1)][sum] += (result_2[(cnt-1)][j]);
//           }
//       } //이중for문 끝

//     }
//   }

//     return result_2;
// }

  function successFunction(data, string) {
    var result = data.split(/\r?\n|\r/);
    var i, j;
    if(string == 1){
      for (i = 0; i < result.length; i++) {

        result[i] = result[i].split(',');

        // var sum = result[i].length;
        // result[i][sum] = 0;
  
        // for (j = 0; j < result[i].length; j++) {
        //   result[i][j] = parseInt(result[i][j]); // (1) 추가작업 1: 정수로 변환
        //     // (2) 추가작업 2: 합계 구하기
        //     if (j > 4 && j <25){
        //       result[i][sum] += (result[i][j]);
        //     }
        // } //이중for문 끝
  
      }
    }

    else {
      for (i = 0; i < result.length; i++) {

        result[i] = result[i].split(',');
        var sum = result[i].length;
        result[i][sum] = 0;
  
        for (j = 0; j < result[i].length; j++) {
          result[i][j] = parseInt(result[i][j]); // (1) 추가작업 1: 정수로 변환
            // (2) 추가작업 2: 합계 구하기
            if (j > 4 && j <25){
              result[i][sum] += (result[i][j]);
            }
        } //이중for문 끝
  
      }
    }

      return result;
  }

  function makeTable(data,where) {
    var table = '<table>';
    var i, j;
  for (i = 0; i < data.length; i++) {
      if (i === 0) {
        table += '<thead>';
        table += '<tr>';
      } else {
        table += '<tr>';
      }

      for (j = 0; j < data[i].length; j++) {

        if (i === 0) {
          table += '<th>';
          table += data[i][j];
          table += '</th>';
        } else {
          table += '<td>';
          table += data[i][j];
          table += '</td>';
        }
      } //이중for문 끝



      if (i === 0) {
        table += '</tr>';
        table += '</thead>';
        table += '<tbody>';
      } else {
        table += '</tr>';
      }
    }
    table += '</tbody>';
    table += '</table>';
    //$('body').append(table);
  document.getElementById(where).innerHTML += table;
  }