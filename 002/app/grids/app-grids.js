var grids={};

$(function(){
  var MAX_ITEM=12;
  var SELECTOR='.grid-box-item';
  var DISPBOX='#box-info';
  
  //$('#box-info').click(function(){ms_tts('#box-info');});
  grids.func={};//函数
  grids.disp={};//正在显示的控制数据
  grids.data=[];//内容数据
  
  
  grids.disp.selector=SELECTOR;
  grids.disp.maxItem=MAX_ITEM;
  
  //----------------------------------
  
  grids.func.dispGroup=function (g) {
    grids.disp.group=g;
    grids.disp.groupSize=grids.data[g].length;
    if(grids.disp.groupSize>grids.disp.maxItem) {
      grids.disp.groupSize=grids.disp.maxItem;
    }
    $(grids.disp.selector).removeClass(' type-text type-link type-none');
    console.log('disp g='+g+',gs='+grids.disp.groupSize+',MAX='+grids.disp.maxItem);
    if(grids.disp.groupSize<grids.disp.maxItem) {
      var i=grids.disp.groupSize;
      for(;i<grids.disp.maxItem;i++) {
        grids.disp.el[i].addClass('type-none').html('');
      }
    }
    grids.data[g].forEach(function(v,i,a){grids.func.dispItem(v,i)});
    
    grids.func.setActive(1);
  };
  
  grids.func.dispItem=function (d,i) {
    if(i>=grids.disp.maxItem)return;
    grids.disp.el[i].html(d.text).attr('did',d.did).addClass('type-'+d.type);
  };
  
  grids.func.setActive=function(n) {
    if(n>=grids.disp.groupSize)n=0;
    if(n<0)n=grids.disp.groupSize-1;
    grids.disp.activeItem=n;
    $(grids.disp.selector).removeClass('active-box');
    grids.disp.el[n].addClass('active-box');
    return n;
  };
  
  /********************************
   item-id:
   text:
   item-type: 'link', 'text'
   link-to:   
   *********************************/
  grids.func.runItem=function(k) {
    if(k>=grids.disp.groupSize)return;
    var d=grids.data[grids.disp.group][k];//data obj
    if(d.type=='link') {
      grids.func.dispGroup(d.link);
    } else {
      grids.disp.infoBox.html(d.text);
    }
  };
  
  
  /********************************
  //使用三个键，1左，2下，3右
  *********************************/
  grids.func.onKey=function (k) {
    switch(k) {
      case 1:
        grids.func.setActive(grids.disp.activeItem-1);
        break;
      case 2:
        grids.func.runItem(grids.disp.activeItem);
        break;
      case 3:
        grids.func.setActive(grids.disp.activeItem-0+1);//要先-0，否则会变成字符串
        break;
      default:
        return false;
    }
    return true;
  };
  
  
  //=========================================
  
  grids.func.initDisp=function(){
    grids.disp.infoBox=$(DISPBOX);
    var el=$(grids.disp.selector);
    grids.disp.el=[];
    el.each(function(i){grids.disp.el[i]=$(this).attr('box-index',i)});
    el.mouseover(function(){var n=$(this).attr('box-index');if(n>=grids.disp.groupSize)return;grids.func.setActive(n);})
      .click(function(){var n=$(this).attr('box-index');if(n>=grids.disp.groupSize)return;grids.func.runItem(grids.func.setActive(n))});
    ;
  
    //使用三个键，1左，2下，3右
    $(document).unbind('keyup')
      .bind('keyup','left',function(){return grids.func.onKey(1)})
      .bind('keyup','down',function(){return grids.func.onKey(2)})
      .bind('keyup','right',function(){return grids.func.onKey(3)})
    ;
    grids.func.dispGroup(1);
  };
});



/*
  function ms_tts(selector) {
    var voice = new ActiveXObject("SAPI.SpVoice");
    voice.Speak("Microsoft Surface is cool!");
  }
  function google_tts(selector) {
    var txt=$(selector).html();
    txt='abc';
    var url='http://translate.google.com/translate_tts?ie=UTF-8&tl=zh-CN&q='+txt;
    
    var htm='<video controls="" autoplay="" name="media"><source src="'+url+
    '" type="audio/mpeg"></video>';
    $(selector).append($(htm));
    
  }
//*/


















