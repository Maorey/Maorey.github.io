> 作者：MR.

&nbsp;&nbsp;&nbsp;&nbsp;Mapbox GL JS是一个JavaScript库，使用WebGL渲染交互式矢量瓦片地图和栅格瓦片地图。WebGL渲染意味着高性能，MapboxGL能够渲染大量的地图要素，拥有流畅的交互以及动画效果、可以显示立体地图并且支持移动端，是一款十分优秀的WEB GIS开发框架。

###Hello MapboxGL
&nbsp;&nbsp;&nbsp;&nbsp;现在开始我们的MapBox之旅。
&nbsp;&nbsp;&nbsp;&nbsp;首先在页面引入MapboxGL脚本库和样式库：

```HTML
<script src='https://api.mapbox.com/mapbox-gl-js/v0.40.0/mapbox-gl.js'></script>
<link href='https://api.mapbox.com/mapbox-gl-js/v0.40.0/mapbox-gl.css' rel='stylesheet'/>
```

&nbsp;&nbsp;&nbsp;&nbsp;也可以在GitHub找到MapboxGL ： https://github.com/mapbox/mapbox-gl-js/releases

&nbsp;&nbsp;&nbsp;&nbsp;执行上述引入脚本后即创建了mapboxgl对象，通过它可以使用MapboxGL的全部功能。
在使用之前，需要先设置mapboxgl.accessToken。access tokens（访问令牌）可以使用API提供的示例（如下），也可以注册[MapBox](https://www.mapbox.com)账号,在[用户信息页](https://www.mapbox.com/studio/account/tokens)查看或者创建令牌。

&nbsp;&nbsp;&nbsp;&nbsp;现在开始第一个MapboxGL程序：展示一幅地图。代码如下:

```HTML
<div id='map' style='width: 900px; height: 600px;'></div>
<script>
mapboxgl.accessToken = 'pk.eyJ1IjoibWFvcmV5IiwiYSI6ImNqNWhrenIwcDFvbXUyd3I2bTJxYzZ4em8ifQ.KHZIehQuWW9AsMaGtATdwA'; // 设置MapBox访问令牌
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9'
});
</script>
```

&nbsp;&nbsp;&nbsp;&nbsp;**Map**对象是MapboxGL的核心对象，地图的展示、交互等都由它来实现。上述代码中id为map的div元素为地图的容器；**mapboxgl.Map**构造方法用于创建**Map**对象，一个**Map**对象对应一个地图容器，参数**container**指定使用的地图容器id，**style**用于指定使用的Mapbox地图。
&nbsp;&nbsp;&nbsp;&nbsp;上述代码效果如下：

![显示地图](http://img.blog.csdn.net/20171025163455606?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3VwZXJtYXBzdXBwb3J0/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

&nbsp;&nbsp;&nbsp;&nbsp;现在我们可以通过鼠标拖拽、缩放地图，并使用鼠标右键旋转（**bearing**属性）、倾斜（**pitch**属性）地图。
&nbsp;&nbsp;&nbsp;&nbsp;**Style**指定的样式是MapBox提供的、以矢量瓦片的方式加载的地图，可以在 [API](https://www.mapbox.com/mapbox-gl-js/api/#map) 和用户信息处找到预定义的样式，也可以自定义地图样式，参考博客：http://blog.csdn.net/supermapsupport/article/details/77991911
&nbsp;&nbsp;&nbsp;&nbsp;除了使用MapBox提供的地图，还可以使用其它地图服务，支持**zxy地图瓦片服务**(OpenStreetMap规范)、**MapBox矢量瓦片地图服务**(mvt)以及**GeoJSON**等服务规范和数据格式，SuperMap iServer 9D对这三种格式均支持，示例地址：http://iclient.supermapol.com/examples/mapboxgl/examples.html#iServer。

###地图控件

&nbsp;&nbsp;&nbsp;&nbsp;现在我们来添加一些常见的地图控件，导航（**NavigationControl**，放大、缩小以及指北针按钮）、定位(**GeolocateControl**)、比例尺(**ScaleControl**)、全屏(**FullscreenControl**)：

![添加控件](http://img.blog.csdn.net/20171025163621726?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3VwZXJtYXBzdXBwb3J0/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

&nbsp;&nbsp;&nbsp;&nbsp;如上图，只需要实例化控件并使用addControl方法添加到地图上即可。

###添加标记并点击弹出气泡

![标记和气泡](http://img.blog.csdn.net/20171025163714368?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3VwZXJtYXBzdXBwb3J0/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

&nbsp;&nbsp;&nbsp;&nbsp;标记和气泡都可以单独指定坐标添加到地图上。标记可以通过**setPopup**方法设置点击显示的气泡。对于标记，指定的坐标在标记图片中心点处，所以竖直方向需要偏移图片高度的一半，使指定的坐标在水滴形标记图片的尖端处；对于气泡，指定的坐标在气泡下部尖端处，所以偏移了标记图片的高度加1像素使气泡指向标记顶部。

###绘制点线面

&nbsp;&nbsp;&nbsp;&nbsp;MapboxGL绘制点线面的方式其实和加载地图是一样的，点线面数据是放在数据源(**source**)里的，绘制时添加图层(**layer**)并指定数据源、显示参数等。

![绘制点线面](http://img.blog.csdn.net/20171025163837822?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3VwZXJtYXBzdXBwb3J0/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

&nbsp;&nbsp;&nbsp;&nbsp;这部分属于进阶的内容，需要多熟悉MapboxGL API文档，在此不再过多介绍。

&nbsp;&nbsp;&nbsp;&nbsp;最后，下图的效果也是使用MapBox（和Echarts插件）完成的。

![效果](http://img.blog.csdn.net/20171025164431709?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3VwZXJtYXBzdXBwb3J0/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)