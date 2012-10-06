<?php


// 客户端 使用的路径
$g_conf_path['root']='/002';  //在web根目录设为''，在子目录就这样：'/dir'（后面不要加/号）

$g_conf_path['bs']=$g_conf_path['root'].'/static/bootstrap2'; //2,bootstrap path
$g_conf_path['js']=$g_conf_path['root'].'/static/js';         //3,other js path
$g_conf_path['app']=$g_conf_path['root'].'/app';              //4,app path，放子模块的目录(客户端js,css图片路径)


// 服务器端 模块的路径
$g_conf_path['_root']=dirname(__FILE__);//由于这一句，这个文件一定要和主文件index.php放在同一目录
$g_conf_path['_lib']=$g_conf_path['_root'].'/_lib';    //1,lib 服务器端库所在的目录

$g_conf_path['_app']=$g_conf_path['_root'].'/app';    //2,app 放子模块的目录（服务器包含 php文件用)

