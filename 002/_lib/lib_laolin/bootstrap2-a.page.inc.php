<?php

function bs_page_header($site,$show=true){
  
  $bpath=$site['path']['bs'];//bootstrap path
  $jspath=$site['path']['js'];//other js path
  //<html xmlns:wb="http://open.weibo.com/wb" lang="zh-CN">

  //<script src="http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=1942305827" type="text/javascript" charset="utf-8"></script>
  
  
  $ret=<<<RET001
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <title>{$site['title']['page']}::{$site['title']['app']}::{$site['title']['site']}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{$site['title']['description']}">
    <meta name="author" content="LaoLin">

    <!-- Le styles -->
    <link href="{$bpath}/css/bootstrap.min.css" rel="stylesheet">
    <style>
      body {
        padding-top: 60px;
        padding-bottom: 40px;
      }
    </style>
    <link href="{$bpath}/css/bootstrap-responsive.min.css" rel="stylesheet">

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <script src="{$jspath}/jquery-1.8.0.min.js"></script>
    
   <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="/favicon.ico">
{$site['ext-header']}
  </head>

  <body>

    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container-fluid">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href=".">{$site['title']['site']}</a>
          

          <div class="nav-collapse collapse">
            <ul class="nav">
RET001;
  foreach($site['nav'] as $k => $v) {
    $active= $k==$site['nav-active'] ?'active':'';
    $ret.="<li class='$active'><a href='$k'>$v</a></li>";
  }            
  $ret.=<<<RET002
            </ul>
            
            <p class="navbar-text pull-right">
              {$site['nav-right']}
            </p>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>

    <div class="container-fluid">
RET002;
  if($show) {
    echo $ret;
  }
  else {
    return $ret;
  }
}


     

function bs_page_footer($site,$show=true){

  $bpath=$site['path']['bs'];//bootstrap path
  $jspath=$site['path']['js'];//other js path
 
  $ret=<<<RET001
      <footer class="footer">
        
{$site['footer']}
    </footer>
    </div> <!-- /container -->


    <script src="{$jspath}/underscore-min.js"></script>
    <script src="{$jspath}/backbone-min.js"></script>
    <script src="{$bpath}/js/bootstrap.min.js"></script>
{$site['ext-footer']}
  </body>
</html>
RET001;
  if($show) {
    echo $ret;
  }
  else {
    return $ret;
  }
}