<?php

session_start();
error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);

$dir=dirname(__FILE__);
include_once( $dir.'/conf.path.php' );//全局变量 $g_conf_path

//把路径设置放在$site变量里
//$site变量是个万金油，N多内容、设置都在这个变量里。
//$site变量大部分内容是在 函数set_app()里填的。
foreach(array('root','bs','js','app',    '_root','_lib','_app') as $k) {
  $site['path'][$k]=$g_conf_path[ $k ];
}

//使用的bootstrap框架，backbone框架，underscore库
include_once( $site['path']['_lib'].'/_laolin.page.common.inc.php' );

//自定义的 显示调试信息的东西
//用法:在网址后面加 ?debug=2或其他合适的数字，
//从此以后，所有下面这个函数的调用第三个参数小于它的都会显示出来
//?debug=0即取消全部显示
var_debug($_REQUEST,"_REQUEST",2);
var_debug($_COOKIE,"_COOKIE",2);
var_debug($_SESSION,"_SESSION",2);
var_debug($_SERVER,"_SERVER",10);


//后面的内容基本就在往$site变量里放东西
  $site['title']['site']='LIN';//页面左上角显示的LOGO， 一般不要改
  

  //默认的页面里什么功能都没有，所以在要ext-header,ext-footer里加载需要的css,js等
  $site['ext-header']='';
  $site['footer']='';
  $site['ext-footer']='';
  
  
  
  //顶上水平导航栏
  $site['nav']=array(
      '?app=sms'=>'短信',
      '?app=grids'=>'网格系统',
      '?app=help'=>'使用说明'
      );
  $site['nav-active']='?app=grids';//显示样式为active的菜单项目
  $site['nav-right']='';//顶上nav右侧的，将用于显示当前登录帐号的操作菜单
  
//以上固定

//=======================================
//注册子模块(app)
reg_app('sms');
reg_app('grids');
reg_app('help');//未做


//=======================================
//取得子模块名字
//不同的模块用?app=xxx表示。
$appget=isset($_GET['app'])?$_GET['app']:'';
if(!isset($site['app'][$appget])) {
  $appget='grids';//默认值
}

/**************
 * 加载子模块 
 * xxx子模块 主文件所在的路径： SITE-PATH-APP/xxx/
 * 该路径下面至少应该要有以下5个文件（有些可以为空文件）
 *
 * 模块的主文件：app-xxx.php  //这行文件里会调用set_app()完成具体的内容
 * 模块css文件:  app-xxx.css  //css
 * 模块js文件：  app-xxx.js    //利用backbone定义ajax路径，等js功能
 
 * 模块的API文件：  api-xxx.php //模块内很多点击是ajax无刷新完成的，ajax一般是调用这个文件，返回JSON数据
 * 模块的模板文件： tpl-xxx.php //ajax返回的JSON数据利用underscore的模板功能显示出来
 ***************************************************************/

//模块的主文件：app-xxx.php
include_once( $site['path']['_app'].'/'.($site['app'][$appget]['path']).'/app-'.($site['app'][$appget]['path']).'.php' );


//$site['footer'].="<p> &copy; LIN 2012";  

//================================================================================
var_debug($site,'site',3);
show_main($site,true,false);//根据$site变量，真正地显示HTML出来
//exit;
//main process END
//================================================================================
function reg_app($appname) {
  global $site;
  $site['app'][$appname]['path']=$appname;
 
}
function set_app($appname,$detail) {
  global $site;
  
  
  $is_debug=isset($_SESSION['debug'])&&$_SESSION['debug']>0;
  $jsver=$is_debug?time():'';//
  //加载laolin-main.css，
  $site['ext-header'].=' <link href="'.$site['path']['app'].'/laolin-main.css" rel="stylesheet">';
  //加载app的css
  $site['ext-header'].=' <link href="'.$site['path']['app'].'/'.$appname.'/app-'.$appname.'.css" rel="stylesheet">';
  
  //加载app的模板
  include_once($site['path']['_app'].'/'.$appname.'/tpl-'.$appname.'.php' );
  $site['ext-footer'].= get_all_tpl();
  
  //加载laolin-main.js，以及告诉js代码ajax的api路径
  $site['ext-footer'].='
    <script src="'.$site['path']['app'].'/laolin-main.js?'.$jsver.'"></script>';
  $site['ext-footer'].='
    <script>$(function(){
      laolin.data.apiRoot=
      "'.$site['path']['app'].'/'.$appname.'/api-'.$appname.'.php?api="; })</script>';
  
  //加载app的js
  $site['ext-footer'].='
    <script src="'.$site['path']['app'].'/'.$appname.'/app-'.$appname.'.js?'.$jsver.'"></script>';
    
  //调试的,本地的，不加载GA
  //if(!$is_debug&&$_SERVER['HTTP_HOST']!='127.0.0.1')$site['ext-footer'].=google_analytics();

  
  //标准==================================================
  $site['app'][$appname]['disc']=$detail['disc'];
  $site['app'][$appname]['pagename']=$detail['pagename'];
  
  $site['title']['app']=$detail['disc'];
  $site['title']['page']=$detail['pagename'];
  $site['title']['description']=$site['title']['site'].', '.$site['title']['app'].' 老林 laolin '.$site['title']['page'];
 
  $site['nav']=array_merge($site['nav'],$detail['nav']);
  
  $site['rows-text']  =$detail['rows-text'] ;
  $site['rows-width'] =$detail['rows-width'];
  $site['ext-header'].=$detail['ext-header'];
  $site['ext-footer'].=$detail['ext-footer'];

}