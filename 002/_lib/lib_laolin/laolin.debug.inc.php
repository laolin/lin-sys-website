<?php
//显示debug信息，默认不显示，加?debug=xxx后，则调用时参数lev值不大于xxx的会显示出来。
define('DEBUG_LEVEL_NONE',-1);
define('DEBUG_LEVEL_LESS',9);
define('DEBUG_LEVEL_NORMAL',99);
define('DEBUG_LEVEL_MORE',999);

if(isset($_REQUEST['debug'])) {
  $_SESSION['debug']=intval($_REQUEST['debug']);
}

if(!isset($_SESSION['debug'])) {
  $_SESSION['debug']=DEBUG_LEVEL_NONE;
}

error_reporting(0);
if($_SESSION['debug']>0||$_SERVER['HTTP_HOST']=='127.0.0.1')error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);

//0.1 全局字符串变量，用于debug,显示在页面最后
$__g_debug_text='<span style="cursor:pointer;float:right;height:20px;width:20px;border:1px solid blue;background-color:red" onclick="$(this).parent().hide()" title="hide all debug info">X</span>';

//1.1  调试信息加到全局字符串变量
function var_debug($va,$i='NONAME',$lev=DEBUG_LEVEL_NORMAL){
  global $__g_debug_text;
  if($lev<=$_SESSION['debug']) $__g_debug_text.= "<pre><h2 class='btn' onclick='$(this).next().slideToggle()'>{$i}[Level=$lev]</h2><div class='hide'>".print_r ($va,true)."</div></pre>";
}
