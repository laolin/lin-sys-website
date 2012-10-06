/*

电话：

 打电话 http://192.168.1.2:2012/call/callphone
  POST{number:13818720287}
  
 挂断电话 http://192.168.1.2:2012/call/endcallphone
  POST{number:13818720287}
  
  ==================================================
  
短信：
 
 删除一条短信 http://192.168.1.2:2012/messages/remove?deletetype=id&value=1539
 设置N条为已读 http://192.168.1.2:2012/messages/setread?messageId=1537,1535,

 发短信 http://192.168.1.100:2012/messages/send
  POST{ number: num, message: msg}
  
2) 列出短信
 列出未读短信：http://192.168.1.100:2012/messages/list?listtype=folder&value=unread
 列出和某号码的短信： http://192.168.1.100:2012/messages/list?listtype=contact&value=1386098979
 。。。

1) 首页 列出总信息 http://192.168.1.2:2012/messages/listdir
  cata: [{id:0, tt:文件夹模式, ph:, num:0, url:-#-#-},…]
    0: {id:0, tt:文件夹模式, ph:, num:0, url:-#-#-}
    1: {id:1, tt:未读短信, ph:, num:1, url:listtype=folder&value=unread}
    2: {id:2, tt:收件箱, ph:, num:1055, url:listtype=folder&value=inbox}
    3: {id:3, tt:已发送, ph:, num:283, url:listtype=folder&value=sent}
    4: {id:4, tt:全部短信, ph:, num:1338, url:listtype=folder&value=all}
    5: {id:5, tt:会话模式(最近8个), ph:, num:0, url:-#-#-}
    6: {id:6, tt:10086700, ph:10086700, num:7, url:listtype=contact&value=10086700}
    7: {id:7, tt:57516956666, ph:57516956666, num:29, url:listtype=contact&value=57516956666}
    8: {id:8, tt:林建洪, ph:13860989791, num:41, url:listtype=contact&value=13860989791}
    9: {id:9, tt:10086, ph:10086, num:199, url:listtype=contact&value=10086}
    10: {id:10, tt:01956100039, ph:01956100039, num:4, url:listtype=contact&value=01956100039}
    11: {id:11, tt:周萧涔, ph:15002102927, num:11, url:listtype=contact&value=15002102927}
    12: {id:12, tt:06575586266, ph:06575586266, num:1, url:listtype=contact&value=06575586266}
    13: {id:13, tt:郭建团, ph:13609566550, num:3, url:listtype=contact&value=13609566550}
*/



var smsMain={};

$(function(){
  var MAX_ITEM=12;
  var SELECTOR='.grid-box-item';
  var DISPBOX='#box-info';
  
  //$('#box-info').click(function(){ms_tts('#box-info');});
  smsMain.func={};//函数
  smsMain.disp={};//正在显示的控制数据
  smsMain.data={};//内容数据
  
  
  
  smsMain.disp.selector=SELECTOR;
  
  smsMain.data.urlPhone='http://192.168.x.x:2012/';//在app-sms.php生成的js代码里设置正确值
  smsMain.data.urlLocal='xx/api-sms.php';//在app-sms.php生成的js代码里设置正确值
  
  /********
   * url: http://192.168.1.100:2012/messages/send
   * num: 接收短信的电话号码
   * msg: 征短信内容
   * callback: 发送完处理返回数据的调用的函数（目前看：发送成功返回的数据是一个字节“1”，失败是两个字节“-1”）
   *   (callback这个参数 可能不灵，暂时不要用)
   *   (原因就是和list_sms一样的，ajax不能跨域，所以发送出去了，但是收不到回应）
   ********/
 
  //$_g_sms_server='http://127.0.0.1/'; //测试时可以自己服务器里建个messages/send的地址，免得每次都要发真的短信
  smsMain.func.send_sms=function(num,msg,  callback) {
    url=smsMain.data.urlPhone+'messages/send'; //url可以默认一个固定值
    if(typeof(num)=='undefined')return -101;
    if(typeof(msg)=='undefined')return -102;
    $.post(url,{ number: num, message: msg},function(data){if(typeof(callback)!='undefined')callback(data)});
  }


  /*******************
   * 列出和某号码的短信： http://192.168.1.100:2012/messages/list?listtype=contact&value=1386098979
   *************************/
  //最近的50条 
  smsMain.func.list_sms=function(num,    url, callback ) {
    url=smsMain.data.urlLocal;
    //上面这一行：由于跨域名访问ajax大部分浏览器是不行的，所以做了个php页面代理一下
    //如果有些版本的IE，可能不用代理也行，那上一行的地址改成这个就行了： $_g_sms_server+'messages/list'
    
    
    if(typeof(num)=='undefined')return -101;
    $.getJSON(url,{ listtype: 'contact', value: num},function(data){if(typeof(callback)!='undefined')callback(data)} );
  }
  
  
  /*******************
   * 列出未读短信：http://192.168.1.100:2012/messages/list?listtype=folder&value=unread
   *************************/
  smsMain.func.list_unread_sms=function(    url, callback ) {
    url=smsMain.data.urlLocal;
    //上面这一行：由于跨域名访问ajax大部分浏览器是不行的，所以做了个php页面代理一下
    //如果有些版本的IE，可能不用代理也行，那上一行的地址改成这个就行了： $_g_sms_server+'messages/list'
    
    $.getJSON(url,{ listtype: 'folder', value: 'unread'},function(data){if(typeof(callback)!='undefined')callback(data)} );
  }




  //----------------------------------
  
  smsMain.func.proxy=function(url) {
    api=smsMain.data.urlLocal;
    $.getJSON(api+url,function(data){
        laolin.logic.render_data(data);
      });
  };
  /********************************
  //使用三个键，1左，2下，3右
  *********************************/
  smsMain.func.onKey=function (k) {
    switch(k) {
      case 1:
        smsMain.func.setActive(smsMain.disp.activeItem-1);
        break;
      case 2:
        smsMain.func.runItem(smsMain.disp.activeItem);
        break;
      case 3:
        smsMain.func.setActive(smsMain.disp.activeItem-0+1);//要先-0，否则会变成字符串
        break;
      default:
        return false;
    }
    return true;
  };
  
  smsMain.func.runItem=function(k) {
    smsMain.func.proxy(smsMain.disp.el[k].attr('item-url'));
  };
  smsMain.func.setActive=function(n) {
    if(n>=smsMain.disp.el.length)n=0;
    if(n<0)n=smsMain.disp.el.length-1;
    smsMain.disp.activeItem=n;
    $(smsMain.disp.selector).removeClass('active-box');
    smsMain.disp.el[n].addClass('active-box');
    return n;
  };
  
  //=========================================
  
  smsMain.func.init=function(){
  
    var el=$(smsMain.disp.selector);
    smsMain.disp.el=[];
    el.each(function(i){smsMain.disp.el[i]=$(this).attr('box-index',i)});
    
    
    el.mouseover(function(){var n=$(this).attr('box-index');smsMain.func.setActive(n);})
      .click(function(){var n=$(this).attr('box-index'); smsMain.func.runItem(smsMain.func.setActive(n))});
    ;
    
    //使用三个键，1左，2下，3右
    $(document).unbind('keyup')
      .bind('keyup','left',function(){return smsMain.func.onKey(1)})
      .bind('keyup','down',function(){return smsMain.func.onKey(2)})
      .bind('keyup','right',function(){return smsMain.func.onKey(3)})
    ;
    smsMain.func.setActive(1);
  };
});



















