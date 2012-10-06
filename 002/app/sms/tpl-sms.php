<?php

function get_all_tpl() {
  global $site;
  
  $app_dir=$site['path']['app'].'/sms/';
  $phone_proxy_api=$site['path']['app']."/sms/api-sms.php?api=sms/proxy/&path=";
  
  $phone_URL='http://192.168.1.2:2012/';

  $ret=  <<<TPL
  
  <script type='text/template' id='ag-htm'>
    <%= htm %>
  </script>
  
  <script type='text/template' id='ag-listdir'><!-- 首页列表 -->
    <div class="row-fluid">
      <div class="span12 row-fluid">
        <ul class="thumbnails" class="grid-items">
          <% 
            var n=0;
            var col=3;
            var w=12/col;
            _.each(cata , function(item,key){ 
            if(item['url']=='-#-#-')return;//“安豆苗”返回的数据里不是链接的标记
          %>    
          <li class="span<%= w %>">
            <span class="thumbnail grid-box-item" item-url="<%= item['url'] %>">
              <% print( '【'+item['tt']+'('+item['ph']+')】('+item['num']+')'); %>
            </span>
          </li>
          <% 
            n++;
            if(n%col==0){
          %> 
        </ul>
        <ul class="thumbnails" class="grid-items">      
        <%  }
        }); %>       
        </ul> 
      </div>
    </div>
    <% print('<scr'+'ipt>');%>
    $(function(){
      smsMain.func.init();
    
      smsMain.data.urlPhone=
        "$phone_URL";
      smsMain.data.urlLocal=      
        "{$phone_proxy_api}messages/list&";
    })
    <% print('</scr'+'ipt>');%>
  </script>
  
  <script type='text/template' id='ag-listmsg'><!-- 短信列表 -->
    <div class="row-fluid">
      <div class="span12 row-fluid">
        <ul class="thumbnails" class="grid-items">
          <% 
            var n=0;
            var col=3;
            var w=12/col;
            _.each(mata , function(item,key){ 

            %>    
          <li class="span<%= w %>">
            <span class="thumbnail grid-box-item" item-id="<%= item['id'] %>">
              <% print( '【'+item['nm']+'('+item['ads']+')】('+item['dt']+')'  
              + item['bd']);
              %>
            </span>
          </li>
          <% 
            n++;
            if(n%col==0){
          %> 
        </ul>
        <ul class="thumbnails" class="grid-items">      
        <%  }
        }); %>       
        </ul> 
      </div>
    </div>
    <% print('<scr'+'ipt>');%>
    $(function(){
      smsMain.func.init();
    
      smsMain.data.urlPhone=
        "$phone_URL";
      smsMain.data.urlLocal=      
        "{$phone_proxy_api}messages/list&";
    })
    <% print('</scr'+'ipt>');%>
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
