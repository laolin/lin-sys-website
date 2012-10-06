
/***************************************/
一、安装说明 
/***************************************/
1.整个系统在网站路径需要在 文件conf.path.php中设置：
    $g_conf_path['root']
  目前路径是/002

2.手机的地址，需要在两个文件
    app\sms\api-sms.php
    app\sms\tpl-sms.php
  中设置好这个变量
    $phone_URL
  
/***************************************/
二、系统框架说明 
/***************************************/
1.
首先调用了文件 conf.path.php 
里面有站点的路径设置

2.
调用了然后文件 "lib"/_laolin.page.common.inc.php
这里使用的bootstrap 网页框架，
同时加载了backbone JS框架，underscore库，jQuery库，
键盘是使用jquery.hotkeys.js库来做的。

3.
然后就是往$site变量里填内容
//$site变量是个万金油，N多内容、设置都在这个变量里。
//$site变量大部分内容是在 函数set_app()里填的。

4.
为了 扩展方便，设置了 子模块 功能 
//不同的模块用?app=xxx表示。
程序自动会跑到/app/xxx/目录下加载文件
/**************
 * 加载子模块 
 * xxx子模块 主文件所在的路径： SITE-PATH-APP/xxx/
 * 该路径下面至少应该要有以下5个文件（有些可以为空文件）
 *
 * 模块的主文件：app-xxx.php  //这行文件里会调用set_app()完成具体的内容
 * 模块css文件:  app-xxx.css  //css
 * 模块js文件：  app-xxx.js    //利用backbone定义ajax路径，等js功能
 
 * 模块的API文件：  api-xxx.php //模块内很多点击是ajax无刷新完成的，ajax一般是调用这个文件，返回JSON数据
 * 模块的模板文件： tpl-xxx.php //ajax返回的JSON数据利用underscore的模板功能显示出来
 ***************************************************************/

5.
最后调用了函数show_main($site,true,false);
//根据$site变量，真正地显示HTML出来
//这个页面通常只加载好CSS，JS，初始化JS，不显示真正的内容
//然后由初始化后的JS来通过AJAX显示真正的内容，详见下一点

6.
laolin.main.js的说明见该文件头
这个文件的主要作用是： （使用 backbone 和 underscore 框架 ）
（1）这个JS文件定义了一个全局变量laolin
（2）在app-xxx.php中要加一些js语句完成初始化: laolin.addApp("'.$appname.'",false); laolin.start();
（3）laolin.addApp会设置backbone的各种路由，（backbone的路由就是 地址栏中的 #XXX，即#号后的东西）
（4）然后laolin.addApp会调用 laolin.addRouters使路由对应了JS函数。到这里完成JS初始化。
（5）当点击#xxx的地址，和路由相符时，JS函数被调用，它会使用jQuery的getJSON（打开的地址是api-xxx.php）实现AJAX
（6）完成AJAX后的回调函数 调用 laolin.logic.render_data 显示得到的数据
（7）laolin.logic.render_data利用underscore的template功能利用模板把数据显示到HTML中。
（8）模板其实就是一个特殊的<script>标签块，这个标签块会被underscore编译成真正的JS，
    这个标签块里可以直接写HTML，也可以在<% %>里面写JS语句 、或在<%= xxx %>里直接显示JS变量。
（9）模板块中也可以有<script>标签，为了避免和模板块的<script>标签冲突，
    <script>和</script>都要拆散开来写，   比如<% print('<scr'+'ipt>');%>
    可以写JS语句（会被自动执行）、或引用其他JS文件（会被加载）。

/***************************************/
三、模块说明 
/***************************************/
1.
grids和上一次一样，没有改

2.
sms模块
在app-sms.js文件头有 常用的URL地址


目前刚完成两个内容：
1) 首页 列出总信息 http://192.168.1.2:2012/messages/listdir
2) 列出短信 http://192.168.1.2:2012/messages/list

实现方法是api-sms.php调用phone_proxy，然后返回JSON，这里用到了三个PHP函数：
  http_build_query //把$_GET的参数传递到手机上
  json_decode //把手机返回的JSON数据转换为PHP变量
  json_encode //把PHP变量变成JSON数据作为AJAX数据输出



