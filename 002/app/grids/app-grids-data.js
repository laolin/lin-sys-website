
$(function(){

  grids.func.initData=function() {
    function addData(gid,txt,type,link) {
      if(typeof(type)=='undefined')type='text';
      if(gid in grids.data) {
        did=grids.data[gid].length;
      } else {
        grids.data[gid]=[];
        did=0;
      }
      grids.data[gid][did]={gid:gid,did:did,text:txt,type:type,link:link};
    }
    
    
    var g=0;//组号，每组最多12项（HTML决定的）。最少两项，因为初始焦点默认在第[1]项。
    //0先保留
    
    g=1;
    addData(g,'常用...','link',2);
    addData(g,'叫医生');
    addData(g,'叫人...','link',3);
    addData(g,'太热');
    addData(g,'太冷');
    addData(g,'大便');
    addData(g,'小便');
    addData(g,'擦汗');
    addData(g,'扇扇子');
    
    g=2;
    addData(g,'回首页','link',1);
    addData(g,'喝水');
    addData(g,'吃饭');
    addData(g,'调整枕头');
    addData(g,'调整手');
    addData(g,'调整脚');
    addData(g,'看指标');
    
    g=3;
    addData(g,'回首页','link',1);
    addData(g,'叫林');
    addData(g,'叫yx');
    addData(g,'叫阿h');
    addData(g,'叫阿z');
    addData(g,'叫ym');
    addData(g,'叫啊q');
  };
  grids.func.initData();
  //grids.func.dispGroup(1);
});