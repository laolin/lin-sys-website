<?php
//session_start();

header('Content-Type: text/html; charset=UTF-8');

$dirlib=$g_conf_path['_lib'];


//include_once( $dirlib.'/lib_laolin/google-analytics.inc.php');
include_once( $dirlib.'/lib_laolin/bootstrap2-a.page.inc.php' );

include_once( $dirlib.'/lib_laolin/laolin.debug.inc.php' );
//如果不要debug，把上面这行换成： function var_debug(){}，即定义一个空函数就行了
  
//======= 一些需要提前定义的东西 =====================
$phpself=$_SERVER['PHP_SELF'];



/****************************************
 * bootstrap 12列模型 主内容 HTML 输出函数
 * $t:数组，各列的HTML代码
 * $w:数组，各列的宽度
 ****************************************/
function show_columns($t,$w,$show=true,$fluid=false){
  if($fluid)$ff='-fluid';
  else $ff='';
  $ret='<div class="row'.$ff.'">';
  foreach($t  as $i => $txt){
    $ret.="<div class='span{$w[$i]}'>{$txt}&nbsp;</div>";
  }
  $ret.='</div>';
  if(!$show)return $ret;
  echo $ret;
}


//bootstrap整个页面HTML 输出函数
//$site变量是个万金油，N多内容、设置都在这里。
function show_main($site, $show=true,$fluid=false){
  global $__g_debug_text;

  $ret=bs_page_header($site,false);
  if($_SESSION['debug']>0)$ret.=show_columns(Array($__g_debug_text),Array(12),false,$fluid);
  $ret.=show_columns($site['rows-text'],$site['rows-width'],false,$fluid);
  $ret.=bs_page_footer($site,false);
  if(!$show) return $ret;
  echo $ret;
}
