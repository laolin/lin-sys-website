<?php
function google_analytics($ua='922595-1',$show=false){
$ret=<<<AAA
<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
var pageTracker = _gat._getTracker("UA-$ua");
pageTracker._initData();
pageTracker._trackPageview();
</script>
AAA;
if($show)echo $ret;
else return $ret;
}