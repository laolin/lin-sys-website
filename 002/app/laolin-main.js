/***************************************
 * 利用backbone，做非ajax局部刷新（不利用其model,view）
 * 用法：
 *    1.加载laolin-main.js
 *    2.运行赋值js语句:laolin.data.apiRoot='/path_api.php?d=/pathB/';告诉js代码ajax的api根路径
 *    3.laolin.addApp("appname1",false); 
 *        laolin.addApp("appname2",false); 随便多少个
 *        href='#appname2/A/B'  会调用api路径:laolin.data.apiRoot/appname2/A/B
 *    4.laolin.start();
 *
 * ---------------------------
 * API的规定
 *    A.api要返回json
 *    B.json包括3个元素（目前是规定死的）  #TODO:1#
 *      selector-htm:要显示的目标HTML元素的 "选择器"
 *      selector-tpl:使用模板的 "选择器"
 *      dat:填充模板的 真正数据
 *
 * 另外，目前sidenav一些东西是写死的，不够通用 #TODO:2#（grids和sms中未用到）
 ***************************************/
var laolin={};

$(function(){
  laolin.data={};//放一些变量的地方
  
  laolin.logic={};
  laolin.appRouters={};//给Backbone.Router.extend用的routers属性
  laolin.appFunctions={};//给Backbone.Router.extend用的其他属性
  
  laolin.data.apiRoot='/_api/';//随便写一个，要求包含这个JS文件后，马上赋值一个正确的
  laolin.data.sideNav={'__active__':''};//用于缓存side nav
  
  laolin.addRouters=function(routes,functions){
    _.extend(laolin.appRouters,routes);
    _.extend(laolin.appFunctions,functions);
  };
  
  laolin.addApp=function(appName,hasSidenav){
    var funcName='__'+appName+"_fun_item__"; //暂时这么命名funcName ，这函数理论上只是内部使用
    if(typeof(hasSidenav)=='undefined')hasSidenav=true;
    var routes={};
    routes[appName]=funcName;//把 '#appName' URL地址和funcName()函数联系起来
    routes[appName+"/*item"]=funcName;//把 '#appName/***' URL地址也和funcName()函数联系起来
      
    var functions={};
    functions[funcName]=function (item) {//定义funcName()
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
    //如果没有空字符串''的router,则把''设为等同第1个router;
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
    render_data:function(data) {//3个写死的名字，见文件头说明 #TODO:1#
      laolin.logic.render_via_tpl(data['selector-htm'],data['selector-tpl'], data['dat']);
    },
    
    //side_nav中有N个写死的名字，见文件头说明 #TODO:2#
    change_side_nav_item:function(app_name,item_name) {
      if(item_name.length>0)s_name='/'+item_name;//空的item_name前面就不加/号了
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
  $('.navbar .nav a').parent().removeClass('active');//全变灰
  $('.navbar .nav a[href="'+c_app_name+'"]').parent().addClass('active');//与当前URL相符的亮显
  $('.navbar .nav a[href^="#'+''+'"]').parent().addClass('active');//href='#xxx'的也亮显
    
});