/***************************************
 * ����backbone������ajax�ֲ�ˢ�£���������model,view��
 * �÷���
 *    1.����laolin-main.js
 *    2.���и�ֵjs���:laolin.data.apiRoot='/path_api.php?d=/pathB/';����js����ajax��api��·��
 *    3.laolin.addApp("appname1",false); 
 *        laolin.addApp("appname2",false); �����ٸ�
 *        href='#appname2/A/B'  �����api·��:laolin.data.apiRoot/appname2/A/B
 *    4.laolin.start();
 *
 * ---------------------------
 * API�Ĺ涨
 *    A.apiҪ����json
 *    B.json����3��Ԫ�أ�Ŀǰ�ǹ涨���ģ�  #TODO:1#
 *      selector-htm:Ҫ��ʾ��Ŀ��HTMLԪ�ص� "ѡ����"
 *      selector-tpl:ʹ��ģ��� "ѡ����"
 *      dat:���ģ��� ��������
 *
 * ���⣬ĿǰsidenavһЩ������д���ģ�����ͨ�� #TODO:2#��grids��sms��δ�õ���
 ***************************************/
var laolin={};

$(function(){
  laolin.data={};//��һЩ�����ĵط�
  
  laolin.logic={};
  laolin.appRouters={};//��Backbone.Router.extend�õ�routers����
  laolin.appFunctions={};//��Backbone.Router.extend�õ���������
  
  laolin.data.apiRoot='/_api/';//���дһ����Ҫ��������JS�ļ������ϸ�ֵһ����ȷ��
  laolin.data.sideNav={'__active__':''};//���ڻ���side nav
  
  laolin.addRouters=function(routes,functions){
    _.extend(laolin.appRouters,routes);
    _.extend(laolin.appFunctions,functions);
  };
  
  laolin.addApp=function(appName,hasSidenav){
    var funcName='__'+appName+"_fun_item__"; //��ʱ��ô����funcName ���⺯��������ֻ���ڲ�ʹ��
    if(typeof(hasSidenav)=='undefined')hasSidenav=true;
    var routes={};
    routes[appName]=funcName;//�� '#appName' URL��ַ��funcName()������ϵ����
    routes[appName+"/*item"]=funcName;//�� '#appName/***' URL��ַҲ��funcName()������ϵ����
      
    var functions={};
    functions[funcName]=function (item) {//����funcName()
      if(typeof(item)=='undefined')item='';
      console.log(appName+','+item);
      url = laolin.data.apiRoot+appName;
      if(item.length>0)url+='/'+item;
      $.getJSON(url,  function(data){
        laolin.logic.render_data(data);
      });      
      if(hasSidenav)laolin.logic.update_side_nav(appName,item);
    }

    laolin.addRouters(routes,functions);
    
  }
  laolin.start=function(){
    //���û�п��ַ���''��router,���''��Ϊ��ͬ��1��router;
    if(!('' in laolin.appRouters)) {
      laolin.appRouters['']=laolin.appRouters[(_.keys(laolin.appRouters))[0]];
    }
    laolin.App=Backbone.Router.extend(_.extend(laolin.appFunctions,{'routes':laolin.appRouters}));//laolin.App

    //laolin.logic.init();
    laolin.app = new laolin.App();
    Backbone.history.start();
  };
  
  _.extend(laolin.logic,{
    render_via_tpl:function(selector,tplSelector,dat) {
      $(selector).html(
        _.template( $(tplSelector).html() , dat)
        );
    },
    render_data:function(data) {//3��д�������֣����ļ�ͷ˵�� #TODO:1#
      laolin.logic.render_via_tpl(data['selector-htm'],data['selector-tpl'], data['dat']);
    },
    
    //side_nav����N��д�������֣����ļ�ͷ˵�� #TODO:2#
    change_side_nav_item:function(app_name,item_name) {
      if(item_name.length>0)s_name='/'+item_name;//�յ�item_nameǰ��Ͳ���/����
      else s_name=item_name;
      $('.side-nav .nav a[href="#'+app_name+s_name+'"]').parent().addClass('active');
      $('.side-nav .nav a[href!="#'+app_name+s_name+'"]').parent().removeClass('active');
    },
    render_side_nav:function(app_name,item_name) {
      laolin.logic.render_via_tpl('#side-nav-list','#tpl-side-nav', laolin.data.sideNav[app_name]);
      laolin.data.sideNav['__active__']=app_name;
      laolin.logic.change_side_nav_item(app_name,item_name);
    },
    update_side_nav:function(app_name,item_name) {
      if(laolin.data.sideNav['__active__']==app_name) {
        laolin.logic.change_side_nav_item(app_name,item_name);
        return;
      }
      if(!(app_name in laolin.data.sideNav)) {
        //get the app_name
        var url=laolin.data.apiRoot+'nav/'+app_name;
        $.getJSON(url, function(data){
          laolin.data.sideNav[app_name]=data;
          laolin.logic.render_side_nav(app_name,item_name);
        });
      } else {
        laolin.logic.render_side_nav(app_name,item_name);
      }
    }
  });

  var c_app_name=window.location.search;
  $('.navbar .nav a').parent().removeClass('active');//ȫ���
  $('.navbar .nav a[href="'+c_app_name+'"]').parent().addClass('active');//�뵱ǰURL���������
  $('.navbar .nav a[href^="#'+''+'"]').parent().addClass('active');//href='#xxx'��Ҳ����
    
});