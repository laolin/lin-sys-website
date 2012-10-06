<?php

main_grids();
function main_grids(){
  global $site;
  $appname='grids';
  
  $is_debug=isset($_SESSION['debug'])&&$_SESSION['debug']>0;
  $jsver=$is_debug?time():'';// 
  
  //------------------------------------------
  // Detail 1:设置，导航档
  $js_dir=$site['path']['js'];
  $app_base=$site['path']['app'];
  $app_dir=$app_base.'/'.$appname;  //app的js,css,图片文件所在的根目录

  
  // Detail 2:header,footer
  $ext_header='';
  $ext_footer='';

  $ext_footer.='
    <script src="'.$js_dir.'/jquery.hotkeys.js?'.$jsver.'"></script>';
  $ext_footer.='
    <script src="'.$app_dir.'/app-grids-data.js?'.$jsver.'"></script>';
  $ext_footer.='
    <script>$(function(){laolin.addApp("'.$appname.'",false); laolin.start();});</script>';
  
  // Detail 3:要输出的内容，全部放在这3个全局变量里
  $txt_side1='<div id="side_box"></div>';
  $txt_side2='<div id="side_box2"></div>';//一般的边栏内容
  $txt_main='';
  $txt_main.='<div id="txt_main">Content Loading...</div>';//正文

  $det['disc']='网络-系-统';
  $det['pagename']="网=络=系=统";
  //顶上第一行 水平导航栏 后面的其他项目
  $det['nav']['#grids/2']='网格系统:2列';
  $det['nav']['#grids/3']='3列';
  $det['nav']['#grids/4']='4列';
  $det['nav']['#grids/6']='6列';
  //----------------------------------------------------------------
  //把前面3步的内容放到全局数组里去。
  $det['rows-text']=array($txt_side1.$txt_side2,$txt_main);
  $det['rows-width']=Array(1,11);
  $det['ext-header']=$ext_header;
  $det['ext-footer']=$ext_footer;
  set_app($appname,$det);
}