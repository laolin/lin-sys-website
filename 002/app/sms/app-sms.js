/*

�绰��

 ��绰 http://192.168.1.2:2012/call/callphone
  POST{number:13818720287}
  
 �Ҷϵ绰 http://192.168.1.2:2012/call/endcallphone
  POST{number:13818720287}
  
  ==================================================
  
���ţ�
 
 ɾ��һ������ http://192.168.1.2:2012/messages/remove?deletetype=id&value=1539
 ����N��Ϊ�Ѷ� http://192.168.1.2:2012/messages/setread?messageId=1537,1535,

 ������ http://192.168.1.100:2012/messages/send
  POST{ number: num, message: msg}
  
2) �г�����
 �г�δ�����ţ�http://192.168.1.100:2012/messages/list?listtype=folder&value=unread
 �г���ĳ����Ķ��ţ� http://192.168.1.100:2012/messages/list?listtype=contact&value=1386098979
 ������

1) ��ҳ �г�����Ϣ http://192.168.1.2:2012/messages/listdir
  cata: [{id:0, tt:�ļ���ģʽ, ph:, num:0, url:-#-#-},��]
    0: {id:0, tt:�ļ���ģʽ, ph:, num:0, url:-#-#-}
    1: {id:1, tt:δ������, ph:, num:1, url:listtype=folder&value=unread}
    2: {id:2, tt:�ռ���, ph:, num:1055, url:listtype=folder&value=inbox}
    3: {id:3, tt:�ѷ���, ph:, num:283, url:listtype=folder&value=sent}
    4: {id:4, tt:ȫ������, ph:, num:1338, url:listtype=folder&value=all}
    5: {id:5, tt:�Ựģʽ(���8��), ph:, num:0, url:-#-#-}
    6: {id:6, tt:10086700, ph:10086700, num:7, url:listtype=contact&value=10086700}
    7: {id:7, tt:57516956666, ph:57516956666, num:29, url:listtype=contact&value=57516956666}
    8: {id:8, tt:�ֽ���, ph:13860989791, num:41, url:listtype=contact&value=13860989791}
    9: {id:9, tt:10086, ph:10086, num:199, url:listtype=contact&value=10086}
    10: {id:10, tt:01956100039, ph:01956100039, num:4, url:listtype=contact&value=01956100039}
    11: {id:11, tt:�����, ph:15002102927, num:11, url:listtype=contact&value=15002102927}
    12: {id:12, tt:06575586266, ph:06575586266, num:1, url:listtype=contact&value=06575586266}
    13: {id:13, tt:������, ph:13609566550, num:3, url:listtype=contact&value=13609566550}
*/



var smsMain={};

$(function(){
  var MAX_ITEM=12;
  var SELECTOR='.grid-box-item';
  var DISPBOX='#box-info';
  
  //$('#box-info').click(function(){ms_tts('#box-info');});
  smsMain.func={};//����
  smsMain.disp={};//������ʾ�Ŀ�������
  smsMain.data={};//��������
  
  
  
  smsMain.disp.selector=SELECTOR;
  
  smsMain.data.urlPhone='http://192.168.x.x:2012/';//��app-sms.php���ɵ�js������������ȷֵ
  smsMain.data.urlLocal='xx/api-sms.php';//��app-sms.php���ɵ�js������������ȷֵ
  
  /********
   * url: http://192.168.1.100:2012/messages/send
   * num: ���ն��ŵĵ绰����
   * msg: ����������
   * callback: �����괦�������ݵĵ��õĺ�����Ŀǰ�������ͳɹ����ص�������һ���ֽڡ�1����ʧ���������ֽڡ�-1����
   *   (callback������� ���ܲ��飬��ʱ��Ҫ��)
   *   (ԭ����Ǻ�list_smsһ���ģ�ajax���ܿ������Է��ͳ�ȥ�ˣ������ղ�����Ӧ��
   ********/
 
  //$_g_sms_server='http://127.0.0.1/'; //����ʱ�����Լ��������ｨ��messages/send�ĵ�ַ�����ÿ�ζ�Ҫ����Ķ���
  smsMain.func.send_sms=function(num,msg,  callback) {
    url=smsMain.data.urlPhone+'messages/send'; //url����Ĭ��һ���̶�ֵ
    if(typeof(num)=='undefined')return -101;
    if(typeof(msg)=='undefined')return -102;
    $.post(url,{ number: num, message: msg},function(data){if(typeof(callback)!='undefined')callback(data)});
  }


  /*******************
   * �г���ĳ����Ķ��ţ� http://192.168.1.100:2012/messages/list?listtype=contact&value=1386098979
   *************************/
  //�����50�� 
  smsMain.func.list_sms=function(num,    url, callback ) {
    url=smsMain.data.urlLocal;
    //������һ�У����ڿ���������ajax�󲿷�������ǲ��еģ��������˸�phpҳ�����һ��
    //�����Щ�汾��IE�����ܲ��ô���Ҳ�У�����һ�еĵ�ַ�ĳ���������ˣ� $_g_sms_server+'messages/list'
    
    
    if(typeof(num)=='undefined')return -101;
    $.getJSON(url,{ listtype: 'contact', value: num},function(data){if(typeof(callback)!='undefined')callback(data)} );
  }
  
  
  /*******************
   * �г�δ�����ţ�http://192.168.1.100:2012/messages/list?listtype=folder&value=unread
   *************************/
  smsMain.func.list_unread_sms=function(    url, callback ) {
    url=smsMain.data.urlLocal;
    //������һ�У����ڿ���������ajax�󲿷�������ǲ��еģ��������˸�phpҳ�����һ��
    //�����Щ�汾��IE�����ܲ��ô���Ҳ�У�����һ�еĵ�ַ�ĳ���������ˣ� $_g_sms_server+'messages/list'
    
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
  //ʹ����������1��2�£�3��
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
        smsMain.func.setActive(smsMain.disp.activeItem-0+1);//Ҫ��-0����������ַ���
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
    
    //ʹ����������1��2�£�3��
    $(document).unbind('keyup')
      .bind('keyup','left',function(){return smsMain.func.onKey(1)})
      .bind('keyup','down',function(){return smsMain.func.onKey(2)})
      .bind('keyup','right',function(){return smsMain.func.onKey(3)})
    ;
    smsMain.func.setActive(1);
  };
});



















