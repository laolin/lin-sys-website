<?php

$iget=isset($_GET['api'])?$_GET['api']:'';
$itemArr=explode('/',$iget);
//echo '<pre>';var_dump($itemArr);
//if($itemArr[0]=='sms')// 这里就假定肯定是==grids
  sms_item($itemArr);

function sms_item($itemArr) {
  
  $ret='NoTextToDisplay';
  $to_htm='#txt_main';
  $use_tpl='#ag-htm';
  try {
    if(!isset($itemArr[1]))$itemArr[1]='';//避免php Notice警告
    switch($itemArr[1]) {

    
      case 'proxy':
        switch($_GET['path']) {
        
          case 'messages/list':
          case '':
          default:
          $use_tpl='#ag-listmsg';
        }
        $ret=phone_proxy();
        break;
        
      case '':
      case 'listdir':
      default:
        $use_tpl='#ag-listdir';
        $_GET['path']='messages/listdir';
        $ret=phone_proxy();
        // 已经是JSON格式了，反转为变量。
        
    }
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
  echo json_encode(array('selector-htm'=>$to_htm,'selector-tpl'=>$use_tpl,'dat'=> $ret));
}
function phone_proxy() {
  $phone_URL='http://192.168.1.2:2012/';
  //echo '<pre>'; var_dump($_GET);
  $url=$phone_URL.$_GET['path'];
  unset($_GET['path']);//这个参数名是我们定义的，假设“安豆苗”不会使用这两个参数
  //unset($_GET['api']);//这个参数名是我们定义的，假设“安豆苗”不会使用这两个参数
  $url.='?'.http_build_query($_GET);
  return json_decode(file_get_contents($url));
}