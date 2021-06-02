import{o as a,c as s,r as e,a as n,d as l,b as t}from"./app.c26f7357.js";var r={setup(){}};const i={width:"320",height:"320"};r.render=function(e,n,l,t,r,h){return a(),s("canvas",i)};var h={setup(){}};const m={width:"320",height:"320"};h.render=function(e,n,l,t,r,i){return a(),s("canvas",m)};var o={setup(){}};const c={width:"320",height:"320"};o.render=function(e,n,l,t,r,i){return a(),s("canvas",c)};var p={setup(){}};const d={width:"320",height:"320"};p.render=function(e,n,l,t,r,i){return a(),s("canvas",d)};var u={setup(){}};const g={width:"320",height:"320"};u.render=function(e,n,l,t,r,i){return a(),s("canvas",g)};var _={components:{Show:r,Divide:h,Jarvis:o,Graham:p,Melkman:u}};const v='{"title":"最小凸包","description":"","frontmatter":{"title":"最小凸包","index":3},"headers":[{"level":2,"title":"问题描述","slug":"问题描述"},{"level":2,"title":"演示","slug":"演示"},{"level":2,"title":"前置知识","slug":"前置知识"},{"level":2,"title":"方法介绍","slug":"方法介绍"},{"level":3,"title":"穷举法 (O(n))","slug":"穷举法-o-n3"},{"level":3,"title":"分治法 (快包 O(n㏒n))","slug":"分治法-快包-o-n㏒n"},{"level":3,"title":"Jarvis 步进法 (O(nH))","slug":"jarvis-步进法-o-nh"},{"level":3,"title":"Graham 扫描法 (O(n㏒n)) [^GrahamScan]","slug":"graham-扫描法-o-n㏒n"},{"level":3,"title":"Melkman 算法 (O(n))","slug":"melkman-算法-o-n"},{"level":2,"title":"升维","slug":"升维"},{"level":2,"title":"参考链接","slug":"参考链接"}],"relativePath":"blog/algorithm/melkman.md","lastUpdated":1622660439505}',f=n("p",null,"2021-06-04",-1),T=n("h2",{id:"问题描述"},[n("a",{class:"header-anchor",href:"#问题描述","aria-hidden":"true"},"#"),l(" 问题描述")],-1),b=n("p",null,"平面上任意位置有3个及以上的点, 求这些点的最小外接凸多边形",-1),y=n("h2",{id:"演示"},[n("a",{class:"header-anchor",href:"#演示","aria-hidden":"true"},"#"),l(" 演示")],-1),w=t('<h2 id="前置知识"><a class="header-anchor" href="#前置知识" aria-hidden="true">#</a> 前置知识</h2><p><a href="./pinp.html#凸多边形">参考链接</a></p><h2 id="方法介绍"><a class="header-anchor" href="#方法介绍" aria-hidden="true">#</a> 方法介绍</h2><h3 id="穷举法-o-n3"><a class="header-anchor" href="#穷举法-o-n3" aria-hidden="true">#</a> 穷举法 (O(n<sup>3</sup>))</h3><p>最重要的目标时候找到哪些点是凸包的顶点, 然后根据坐标排序构造凸包</p><p>凸包的顶点满足的条件: 任意其他点在<strong>两个顶点连线的同一侧</strong> (如何判断见<a href="#%E5%89%8D%E7%BD%AE%E7%9F%A5%E8%AF%86">前置知识</a>)</p><p>计算的步骤为</p>',7),A=n("ol",null,[n("li",null,[l("从点集里取出一点, 与剩下的点依次连接, 得到一条直线 (共 "),n("span",{class:"katex"},[n("span",{class:"katex-mathml"},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("semantics",null,[n("mrow",null,[n("msub",null,[n("mo",null,"∑"),n("mstyle",{scriptlevel:"1"},[n("mtable",{rowspacing:"0.1000em",columnalign:"center",columnspacing:"1em"},[n("mtr",null,[n("mtd",null,[n("mstyle",{scriptlevel:"1",displaystyle:"false"},[n("mrow",null,[n("mn",null,"1"),n("mo",null,"<"),n("mi",null,"i"),n("mo",null,"<"),n("mi",null,"n"),n("mo",null,"−"),n("mn",null,"1")])])])])])])])]),n("annotation",{encoding:"application/x-tex"},"\\sum_{\\substack{1 < i < n - 1}}")])])]),n("span",{class:"katex-html","aria-hidden":"true"},[n("span",{class:"base"},[n("span",{class:"strut",style:{height:"1.168542em","vertical-align":"-0.418542em"}}),n("span",{class:"mop"},[n("span",{class:"mop op-symbol small-op",style:{position:"relative",top:"-0.0000050000000000050004em"}},"∑"),n("span",{class:"msupsub"},[n("span",{class:"vlist-t vlist-t2"},[n("span",{class:"vlist-r"},[n("span",{class:"vlist",style:{height:"0.16912199999999994em"}},[n("span",{style:{top:"-2.40029em","margin-left":"0em","margin-right":"0.05em"}},[n("span",{class:"pstrut",style:{height:"2.7em"}}),n("span",{class:"sizing reset-size6 size3 mtight"},[n("span",{class:"mord mtight"},[n("span",{class:"mord mtight"},[n("span",{class:"mtable"},[n("span",{class:"col-align-c"},[n("span",{class:"vlist-t vlist-t2"},[n("span",{class:"vlist-r"},[n("span",{class:"vlist",style:{height:"0.66976em"}},[n("span",{style:{top:"-2.71024em"}},[n("span",{class:"pstrut",style:{height:"2.7em"}}),n("span",{class:"mord mtight"},[n("span",{class:"mord mtight"},"1"),n("span",{class:"mrel mtight"},"<"),n("span",{class:"mord mathnormal mtight"},"i"),n("span",{class:"mrel mtight"},"<"),n("span",{class:"mord mathnormal mtight"},"n"),n("span",{class:"mbin mtight"},"−"),n("span",{class:"mord mtight"},"1")])])]),n("span",{class:"vlist-s"},"​")]),n("span",{class:"vlist-r"},[n("span",{class:"vlist",style:{height:"0.16976em"}},[n("span")])])])])])])])])])]),n("span",{class:"vlist-s"},"​")]),n("span",{class:"vlist-r"},[n("span",{class:"vlist",style:{height:"0.418542em"}},[n("span")])])])])])])])]),l(" 条)")]),n("li",null,[l("判断其他点是否在这条线的同一侧 (共 "),n("span",{class:"katex"},[n("span",{class:"katex-mathml"},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("semantics",null,[n("mrow",null,[n("mi",null,"n"),n("mo",null,"−"),n("mn",null,"2")]),n("annotation",{encoding:"application/x-tex"},"n - 2")])])]),n("span",{class:"katex-html","aria-hidden":"true"},[n("span",{class:"base"},[n("span",{class:"strut",style:{height:"0.66666em","vertical-align":"-0.08333em"}}),n("span",{class:"mord mathnormal"},"n"),n("span",{class:"mspace",style:{"margin-right":"0.2222222222222222em"}}),n("span",{class:"mbin"},"−"),n("span",{class:"mspace",style:{"margin-right":"0.2222222222222222em"}})]),n("span",{class:"base"},[n("span",{class:"strut",style:{height:"0.64444em","vertical-align":"0em"}}),n("span",{class:"mord"},"2")])])]),l(" 个), 是则将这两个顶点去重地加入顶点数组 (插入更佳 按x,y排序)")]),n("li",null,"按一定规则(按x,y排序)连接顶点得到凸包")],-1),S=t('<h3 id="分治法-快包-o-n㏒n"><a class="header-anchor" href="#分治法-快包-o-n㏒n" aria-hidden="true">#</a> 分治法 (快包 O(n㏒n))</h3><p>快速凸包构造算法的思路为: 想办法将点集进行划分, 然后分而治之</p><p>对于一个点集, 最容易确定是凸包顶点的, 是上下左右<strong>4个极值点</strong>(有相等时取两端参与划分), 剩下的凸包顶点暂时无法确定</p><p>那么基于这4个极值点, 可以想到把点集划分为<strong>5个区域</strong>, 很明显在这4个点围成的四边形内不可能存在凸包顶点, 那么还剩余的<strong>4个区域</strong></p><p>对于这4个区域我们可以视作新的点集, 重复上述步骤直到不能继续划分</p><p><img alt="划分" data-src="melkman/divide.png" loading="lazy" class="lazy"></p><h4 id="演示-1"><a class="header-anchor" href="#演示-1" aria-hidden="true">#</a> 演示</h4>',7),k=t('<details><summary>推导及代码实现</summary><div class="language-ts line-numbers-mode"><pre><code>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div></details><h3 id="jarvis-步进法-o-nh"><a class="header-anchor" href="#jarvis-步进法-o-nh" aria-hidden="true">#</a> Jarvis 步进法 (O(nH))</h3><h4 id="演示-2"><a class="header-anchor" href="#演示-2" aria-hidden="true">#</a> 演示</h4>',3),x=t('<details><summary>推导及代码实现</summary><div class="language-ts line-numbers-mode"><pre><code>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div></details><h3 id="graham-扫描法-o-n㏒n"><a class="header-anchor" href="#graham-扫描法-o-n㏒n" aria-hidden="true">#</a> Graham 扫描法 (O(n㏒n)) <sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup></h3><h4 id="演示-3"><a class="header-anchor" href="#演示-3" aria-hidden="true">#</a> 演示</h4>',3),P=t('<details><summary>推导及代码实现</summary><div class="language-ts line-numbers-mode"><pre><code>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div></details><h3 id="melkman-算法-o-n"><a class="header-anchor" href="#melkman-算法-o-n" aria-hidden="true">#</a> Melkman 算法 (O(n))</h3><h4 id="演示-4"><a class="header-anchor" href="#演示-4" aria-hidden="true">#</a> 演示</h4>',3),C=t('<details><summary>推导及代码实现</summary><div class="language-ts line-numbers-mode"><pre><code>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div></details><h2 id="升维"><a class="header-anchor" href="#升维" aria-hidden="true">#</a> 升维</h2><p>3D中的情况如何?</p><p><a href="https://zhuanlan.zhihu.com/p/166105080" target="_blank" rel="noopener noreferrer">凸包问题——快速凸包算法</a></p><h2 id="参考链接"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h2><ul><li><a href="https://www.cnblogs.com/dream-it-possible/p/8514706.html" target="_blank" rel="noopener noreferrer">凸包算法入门</a></li></ul><hr class="footnotes-sep"><section class="footnotes"><ol class="footnotes-list"><li id="fn1" class="footnote-item"><p><a href="https://muthu.co/understanding-graham-scan-algorithm-for-finding-the-convex-hull-of-a-set-of-points/" target="_blank" rel="noopener noreferrer">Understanding Graham scan algorithm for finding the Convex hull of a set of Points</a> <a href="#fnref1" class="footnote-backref">↩︎</a></p></li></ol></section>',8);_.render=function(l,t,r,i,h,m){const o=e("Show"),c=e("Divide"),p=e("Jarvis"),d=e("Graham"),u=e("Melkman",!0);return a(),s("div",null,[f,T,b,y,n(o),w,A,S,n(c),k,n(p),x,n(d),P,n(u),C])};export default _;export{v as __pageData};