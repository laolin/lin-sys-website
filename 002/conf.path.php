<?php


// �ͻ��� ʹ�õ�·��
$g_conf_path['root']='/002';  //��web��Ŀ¼��Ϊ''������Ŀ¼��������'/dir'�����治Ҫ��/�ţ�

$g_conf_path['bs']=$g_conf_path['root'].'/static/bootstrap2'; //2,bootstrap path
$g_conf_path['js']=$g_conf_path['root'].'/static/js';         //3,other js path
$g_conf_path['app']=$g_conf_path['root'].'/app';              //4,app path������ģ���Ŀ¼(�ͻ���js,cssͼƬ·��)


// �������� ģ���·��
$g_conf_path['_root']=dirname(__FILE__);//������һ�䣬����ļ�һ��Ҫ�����ļ�index.php����ͬһĿ¼
$g_conf_path['_lib']=$g_conf_path['_root'].'/_lib';    //1,lib �������˿����ڵ�Ŀ¼

$g_conf_path['_app']=$g_conf_path['_root'].'/app';    //2,app ����ģ���Ŀ¼������������ php�ļ���)

