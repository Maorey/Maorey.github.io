import{e as a,f as s,o as l,c as e,r as n,a as t,d as r,b as i}from"./app.e08557f0.js";var h={setup(){const l=a();return s((()=>{})),{el:l}}};const o={ref:"el",width:"320",height:"320"};h.render=function(a,s,n,t,r,i){return l(),e("canvas",o,null,512)};var m={components:{Melkman:h}};const p='{"title":"最小凸包","description":"","frontmatter":{"title":"最小凸包","index":3},"headers":[{"level":2,"title":"问题描述","slug":"问题描述"},{"level":2,"title":"演示","slug":"演示"},{"level":2,"title":"前置知识","slug":"前置知识"},{"level":2,"title":"方法介绍","slug":"方法介绍"},{"level":3,"title":"穷举法 (O(n))","slug":"穷举法-o-n3"},{"level":3,"title":"分治法 (快包 O(n㏒n))","slug":"分治法-快包-o-n㏒n"},{"level":3,"title":"Jarvis 步进法 (O(nH))","slug":"jarvis-步进法-o-nh"},{"level":3,"title":"Graham 扫描法 (O(n㏒n)) [^GrahamScan]","slug":"graham-扫描法-o-n㏒n"},{"level":3,"title":"Melkman 算法 (O(n))","slug":"melkman-算法-o-n"},{"level":2,"title":"Melkman 算法实现","slug":"melkman-算法实现"},{"level":2,"title":"升维","slug":"升维"},{"level":2,"title":"参考链接","slug":"参考链接"}],"relativePath":"blog/algorithm/melkman.md","lastUpdated":1622630380589}',c=t("p",null,"2021-06-04",-1),d=t("h2",{id:"问题描述"},[t("a",{class:"header-anchor",href:"#问题描述","aria-hidden":"true"},"#"),r(" 问题描述")],-1),u=t("p",null,"平面上任意位置有3个及以上的点, 求这些点的最小外接凸多边形",-1),g=t("h2",{id:"演示"},[t("a",{class:"header-anchor",href:"#演示","aria-hidden":"true"},"#"),r(" 演示")],-1),f=i('<h2 id="前置知识"><a class="header-anchor" href="#前置知识" aria-hidden="true">#</a> 前置知识</h2><p><a href="./pinp.html#凸多边形">参考链接</a></p><h2 id="方法介绍"><a class="header-anchor" href="#方法介绍" aria-hidden="true">#</a> 方法介绍</h2><h3 id="穷举法-o-n3"><a class="header-anchor" href="#穷举法-o-n3" aria-hidden="true">#</a> 穷举法 (O(n<sup>3</sup>))</h3><p>最重要的目标时候找到哪些点是凸包的顶点, 然后根据坐标排序构造凸包</p><p>凸包的顶点满足的条件: 任意其他点在<strong>两个顶点连线的同一侧</strong> (如何判断见<a href="#%E5%89%8D%E7%BD%AE%E7%9F%A5%E8%AF%86">前置知识</a>)</p><p>计算的步骤为</p>',7),v=t("ol",null,[t("li",null,[r("从点集里取出一点, 与剩下的点依次连接, 得到一条直线 (共 "),t("span",{class:"katex"},[t("span",{class:"katex-mathml"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("semantics",null,[t("mrow",null,[t("msub",null,[t("mo",null,"∑"),t("mstyle",{scriptlevel:"1"},[t("mtable",{rowspacing:"0.1000em",columnalign:"center",columnspacing:"1em"},[t("mtr",null,[t("mtd",null,[t("mstyle",{scriptlevel:"1",displaystyle:"false"},[t("mrow",null,[t("mn",null,"1"),t("mo",null,"<"),t("mi",null,"i"),t("mo",null,"<"),t("mi",null,"n"),t("mo",null,"−"),t("mn",null,"1")])])])])])])])]),t("annotation",{encoding:"application/x-tex"},"\\sum_{\\substack{1 < i < n - 1}}")])])]),t("span",{class:"katex-html","aria-hidden":"true"},[t("span",{class:"base"},[t("span",{class:"strut",style:{height:"1.168542em","vertical-align":"-0.418542em"}}),t("span",{class:"mop"},[t("span",{class:"mop op-symbol small-op",style:{position:"relative",top:"-0.0000050000000000050004em"}},"∑"),t("span",{class:"msupsub"},[t("span",{class:"vlist-t vlist-t2"},[t("span",{class:"vlist-r"},[t("span",{class:"vlist",style:{height:"0.16912199999999994em"}},[t("span",{style:{top:"-2.40029em","margin-left":"0em","margin-right":"0.05em"}},[t("span",{class:"pstrut",style:{height:"2.7em"}}),t("span",{class:"sizing reset-size6 size3 mtight"},[t("span",{class:"mord mtight"},[t("span",{class:"mord mtight"},[t("span",{class:"mtable"},[t("span",{class:"col-align-c"},[t("span",{class:"vlist-t vlist-t2"},[t("span",{class:"vlist-r"},[t("span",{class:"vlist",style:{height:"0.66976em"}},[t("span",{style:{top:"-2.71024em"}},[t("span",{class:"pstrut",style:{height:"2.7em"}}),t("span",{class:"mord mtight"},[t("span",{class:"mord mtight"},"1"),t("span",{class:"mrel mtight"},"<"),t("span",{class:"mord mathnormal mtight"},"i"),t("span",{class:"mrel mtight"},"<"),t("span",{class:"mord mathnormal mtight"},"n"),t("span",{class:"mbin mtight"},"−"),t("span",{class:"mord mtight"},"1")])])]),t("span",{class:"vlist-s"},"​")]),t("span",{class:"vlist-r"},[t("span",{class:"vlist",style:{height:"0.16976em"}},[t("span")])])])])])])])])])]),t("span",{class:"vlist-s"},"​")]),t("span",{class:"vlist-r"},[t("span",{class:"vlist",style:{height:"0.418542em"}},[t("span")])])])])])])])]),r(" 条)")]),t("li",null,[r("判断其他点是否在这条线的同一侧 (共 "),t("span",{class:"katex"},[t("span",{class:"katex-mathml"},[t("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[t("semantics",null,[t("mrow",null,[t("mi",null,"n"),t("mo",null,"−"),t("mn",null,"2")]),t("annotation",{encoding:"application/x-tex"},"n - 2")])])]),t("span",{class:"katex-html","aria-hidden":"true"},[t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.66666em","vertical-align":"-0.08333em"}}),t("span",{class:"mord mathnormal"},"n"),t("span",{class:"mspace",style:{"margin-right":"0.2222222222222222em"}}),t("span",{class:"mbin"},"−"),t("span",{class:"mspace",style:{"margin-right":"0.2222222222222222em"}})]),t("span",{class:"base"},[t("span",{class:"strut",style:{height:"0.64444em","vertical-align":"0em"}}),t("span",{class:"mord"},"2")])])]),r(" 个), 是则将这两个顶点去重地加入顶点数组 (插入更佳 按x,y排序)")]),t("li",null,"按一定规则(按x,y排序)连接顶点得到凸包")],-1),_=i('<h3 id="分治法-快包-o-n㏒n"><a class="header-anchor" href="#分治法-快包-o-n㏒n" aria-hidden="true">#</a> 分治法 (快包 O(n㏒n))</h3><p>快速凸包构造算法的思路为: 想办法将点集进行划分, 然后分而治之</p><p>对于一个点集, 最容易确定是凸包顶点的, 是上下左右<strong>4个极值点</strong>, 剩下的凸包顶点暂时无法确定</p><p>那么基于这4个极值点, 可以想到把点集划分为<strong>5个区域</strong>, 很明显在这4个点围成的四边形内不可能存在凸包顶点, 那么还剩余的<strong>4个区域</strong></p><p>对于这4个区域我们可以视作新的点集, 重复上述步骤直到不能继续划分</p><p><img alt="划分" data-src="melkman/divide.png" loading="lazy" class="lazy"></p><h3 id="jarvis-步进法-o-nh"><a class="header-anchor" href="#jarvis-步进法-o-nh" aria-hidden="true">#</a> Jarvis 步进法 (O(nH))</h3><h3 id="graham-扫描法-o-n㏒n"><a class="header-anchor" href="#graham-扫描法-o-n㏒n" aria-hidden="true">#</a> Graham 扫描法 (O(n㏒n)) <sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup></h3><h3 id="melkman-算法-o-n"><a class="header-anchor" href="#melkman-算法-o-n" aria-hidden="true">#</a> Melkman 算法 (O(n))</h3><h2 id="melkman-算法实现"><a class="header-anchor" href="#melkman-算法实现" aria-hidden="true">#</a> Melkman 算法实现</h2><h2 id="升维"><a class="header-anchor" href="#升维" aria-hidden="true">#</a> 升维</h2><p>3D中的情况如何?</p><p><a href="https://zhuanlan.zhihu.com/p/166105080" target="_blank" rel="noopener noreferrer">凸包问题——快速凸包算法</a></p><h2 id="参考链接"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h2><p><a href="https://www.cnblogs.com/dream-it-possible/p/8514706.html" target="_blank" rel="noopener noreferrer">凸包算法入门</a></p><hr class="footnotes-sep"><section class="footnotes"><ol class="footnotes-list"><li id="fn1" class="footnote-item"><p><a href="https://muthu.co/understanding-graham-scan-algorithm-for-finding-the-convex-hull-of-a-set-of-points/" target="_blank" rel="noopener noreferrer">Understanding Graham scan algorithm for finding the Convex hull of a set of Points</a> <a href="#fnref1" class="footnote-backref">↩︎</a></p></li></ol></section>',17);m.render=function(a,s,r,i,h,o){const m=n("Melkman",!0);return l(),e("div",null,[c,d,u,g,t(m),f,v,_])};export default m;export{p as __pageData};
