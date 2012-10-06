<?php

$iget=isset($_GET['api'])?$_GET['api']:'';
$itemArr=explode('/',$iget);
//echo '<pre>';var_dump($itemArr);
//if($itemArr[0]=='grids')// 这里就假定肯定是==grids
  grids_item($itemArr);

function grids_item($itemArr) {

  
  $to_htm='#txt_main';
  $use_tpl='#ag-htm';
  $col=isset($_SESSION['col'])?$_SESSION['col']:6;
  try {
    if(!isset($itemArr[1]))$itemArr[1]='';//避免php Notice警告
    switch($itemArr[1]) {
      case '2':
      case '3':
      case '4':
      case '6':
        $col=$itemArr[1];
      case '':
      default:
        $use_tpl='#ag-grids';
        $ret=grids_system($col);
        
    }
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
  echo json_encode(array('selector-htm'=>$to_htm,'selector-tpl'=>$use_tpl,'dat'=>array('col'=>$col,'htm'=>$ret)));
}
function grids_system($col) {
  $col=intval($col);
  $_SESSION['col']=$col;
  $ret=array(1,2,3,4,5,6,7,8,9,10,11,12);
  return $ret;
}