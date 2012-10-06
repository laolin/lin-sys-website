<?php

function get_all_tpl() {
  global $site;
  $app_dir=$site['path']['app'].'/grids/';
  $ret=  <<<TPL
  
  <script type='text/template' id='ag-htm'>
    <%= htm %>
  </script>
  
  
  <script type='text/template' id='ag-grids'>
    <div class="row-fluid top-line">
      <span class="span2 thumbnail grid-box" id="box-back">后面<br/>一个</span>
      <span class="span8 thumbnail grid-box" id="box-info">一切就绪一切就绪</span>
      <span class="span2 thumbnail grid-box" id="box-next">前面<br/>一个</span></div>
      <div class="row-fluid">
      
        
      <div class="span12 row-fluid">
      
        <ul class="thumbnails" class="grid-items">      
        <% w=12/col;max_item=htm.length; %>
        <%  _.each(htm,function(item,key) { %>
          <li class="span<%=w%>">
            <span class="thumbnail grid-box-item">
              <%=item%>
            </span>
          </li>
        
        <% if(key%col==col-1){%> 
        </ul>
        <ul class="thumbnails" class="grid-items">      
        <%} }) ; %>        
        </ul> 
      
      </div>
    </div>
    <% print('<scr'+'ipt>$(function(){grids.func.initDisp()})</sc'+'ript>'); %>
  </script>
  
TPL;
  return $ret;
}
