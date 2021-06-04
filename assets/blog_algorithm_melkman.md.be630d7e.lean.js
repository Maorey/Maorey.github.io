import{o as n,c as s,a,r as p,d as t,b as o}from"./app.ff4669d0.js";import{S as e}from"./canvas.module.1cb43611.js";var c={setup(){}};const l={width:"320",height:"320"};c.render=function(a,p,t,o,e,c){return n(),s("canvas",l)};function r(n,s,a){n.clearRect(0,0,320,320);let p,t=s&&s.length;if(t)for(n.fillStyle="red";t--;)p=s[t],n.fillRect(p.x-2,p.y-2,4,4);if(t=a&&a.length,t){let s=a[--t];for(a.done||(n.fillStyle="green",n.fillRect(s.x-3,s.y-3,6,6),t&&(n.beginPath(),n.moveTo(s.x,s.y),s=a[--t],n.lineTo(s.x,s.y),n.strokeStyle="red",n.stroke())),n.beginPath(),n.moveTo(s.x,s.y);t;)s=a[--t],n.lineTo(s.x,s.y);a.done&&n.closePath(),n.strokeStyle="green",n.stroke()}}var u={props:{algorithm:Function},setup(n){const s=[];let a,p=!1;return{STYLE:e,async run(){if(p=!1,a&&s.length)for await(const t of function*(n,s){const a=n(s);let p;do{p=a.next(),yield new Promise((n=>{const s=p.value;s.done=p.done,setTimeout((()=>{n(s)}),250)}))}while(!p.done)}(n.algorithm,s)){if(p)return;r(a,s,t)}},clear(){p=!0,s.splice(0),a&&r(a)},onClick(n){p=!0;const t=n.target;a=t.getContext("2d"),s.push({x:n.pageX-t.offsetLeft,y:n.pageY-t.offsetTop}),r(a,s)}}}};const i=a("br",null,null,-1),k=a("br",null,null,-1);u.render=function(p,t,o,e,c,l){return n(),s("div",{class:e.STYLE.wrap},[i,a("i",{onClick:t[1]||(t[1]=(...n)=>e.run&&e.run(...n))},"生成最小凸包"),a("i",{onClick:t[2]||(t[2]=(...n)=>e.clear&&e.clear(...n))},"重置"),a("canvas",{width:"320",height:"320",onClick:t[3]||(t[3]=(...n)=>e.onClick&&e.onClick(...n))}),k],2)};const m=(n,s)=>n.x===s.x?"y":n.x>s.x,b=(n,s)=>n.x===s.x?"y":n.x<s.x,h=(n,s)=>n.y===s.y?"x":n.y<s.y,g=(n,s)=>n.y===s.y?"x":n.y>s.y,d=(n,s,a)=>{if(!s.length)return s.push(n),!0;const p=s[0],t=a(p,n);if(!t)return;if(!0===t)return s.splice(0,2,n),!0;const o=n[t],e=p[t],c=s[1];return o>e&&(!c||o>c[t])?(s[1]=n,!0):o<e?(s[0]=n,c||(s[1]=p),!0):void 0},f=(n,s,a)=>n.x<a[0].x&&n.y>s[s.length-1].y,y=(n,s,a)=>n.x>a[a.length-1].x&&n.y>s[s.length-1].y,x=(n,s,a)=>n.x<a[0].x&&n.y<s[0].y,P=(n,s,a)=>n.x>a[a.length-1].x&&n.y<s[0].y,w=(n,s)=>(s[1].x-s[0].x)*(n.y-s[0].y)>(n.x-s[0].x)*(s[1].y-s[0].y);var v,E;(E=v||(v={}))[E.leftTop=0]="leftTop",E[E.rightTop=1]="rightTop",E[E.leftBottom=2]="leftBottom",E[E.rightBottom=3]="rightBottom";const C=n=>{const s=[],a=[];let p,t=n.length;if(t<2)return[n,s,a];for(;t;)p=n[--t],d(p,s,n.x),d(p,a,n.y);const o=[];for(o.c=n.c,o.x=n.x,o.y=n.y,o.i=n.i,o.v=n.v,t=n.length;t;)p=n[--t],n.i(p,s,a)&&w(p,n.v)&&o.push(p);return[s,a,o]},T=(n,s,a,p)=>{const t=[...n];t[t.length-1]===a[0]&&t.pop(),t.push(...a);let o=s.length;for(t[t.length-1]===s[o-1]&&o--;o;)t.push(s[--o]);for(o=p.length,t[t.length-1]===p[o-1]&&o--;o;)t.push(p[--o]);return t};var _={components:{Show:c,Play:u},methods:{divide:function*(n){const s=(n=>{let s=n.length;if(s<3)return;const a=[],p=[],t=[],o=[];let e;for(;s;)e=n[--s],d(e,a,m),d(e,p,b),d(e,t,h),d(e,o,g);const c=[],l=((n,s)=>[s[0],n[n.length-1]])(a,t);c.c=0,c.x=m,c.y=h,c.i=f,c.v=l;const r=[],u=((n,s)=>[n[n.length-1],s[s.length-1]])(p,t);r.c=1,r.x=b,r.y=h,r.i=y,r.v=u;const i=[],k=((n,s)=>[n[0],s[0]])(a,o);i.c=2,i.x=m,i.y=g,i.i=x,i.v=k;const v=[],E=((n,s)=>[s[s.length-1],n[0]])(p,o);for(v.c=3,v.x=b,v.y=g,v.i=P,v.v=E,s=n.length;s;)e=n[--s],f(e,a,t)?w(e,l)&&c.push(e):y(e,p,t)?w(e,u)&&r.push(e):x(e,a,o)?w(e,k)&&i.push(e):P(e,p,o)&&w(e,E)&&v.push(e);return[[a,p,t,o],[c,r,i,v]]})(n);if(!s)return n;const[[a,p,t,o],e]=s;let c,l,r;for(;e.length;){switch(yield T(a,p,t,o),c=e.shift(),[l,r,c]=C(c),c.c){case 0:a.push(...l),t.unshift(...r);break;case 1:p.push(...l),t.push(...r);break;case 2:a.unshift(...l),o.unshift(...r);break;case 3:p.unshift(...l),o.push(...r)}c.length&&e.push(c)}return T(a,p,t,o)}}};const B='{"title":"最小凸包","description":"","frontmatter":{"title":"最小凸包","index":3},"headers":[{"level":2,"title":"问题描述","slug":"问题描述"},{"level":2,"title":"演示","slug":"演示"},{"level":2,"title":"前置知识","slug":"前置知识"},{"level":2,"title":"方法介绍","slug":"方法介绍"},{"level":3,"title":"穷举法 (O(n))","slug":"穷举法-o-n3"},{"level":3,"title":"分治法 (快包 O(n㏒n))","slug":"分治法-快包-o-n㏒n"},{"level":3,"title":"Jarvis 步进法 (O(nH))","slug":"jarvis-步进法-o-nh"},{"level":3,"title":"Graham 扫描法 (O(n㏒n)) [^GrahamScan]","slug":"graham-扫描法-o-n㏒n"},{"level":3,"title":"Melkman 算法 (O(n))","slug":"melkman-算法-o-n"},{"level":2,"title":"升维","slug":"升维"},{"level":2,"title":"参考链接","slug":"参考链接"}],"relativePath":"blog/algorithm/melkman.md","lastUpdated":1622806801137}',R=a("p",null,"2021-06-04",-1),V=a("h2",{id:"问题描述"},[a("a",{class:"header-anchor",href:"#问题描述","aria-hidden":"true"},"#"),t(" 问题描述")],-1),A=a("p",null,"平面上任意位置有3个及以上的点, 求这些点的最小外接凸多边形",-1),S=a("h2",{id:"演示"},[a("a",{class:"header-anchor",href:"#演示","aria-hidden":"true"},"#"),t(" 演示")],-1),L=o('',6),I=a("ol",null,[a("li",null,[t("从点集里取出一点"),a("strong",null,"A"),t(", 与剩下的点"),a("strong",null,"B"),t("依次连接, 得到一条直线"),a("strong",null,"L"),t(" (共 "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[a("semantics",null,[a("mrow",null,[a("msub",null,[a("mo",null,"∑"),a("mstyle",{scriptlevel:"1"},[a("mtable",{rowspacing:"0.1000em",columnalign:"center",columnspacing:"1em"},[a("mtr",null,[a("mtd",null,[a("mstyle",{scriptlevel:"1",displaystyle:"false"},[a("mrow",null,[a("mn",null,"1"),a("mo",null,"<"),a("mi",null,"i"),a("mo",null,"<"),a("mi",null,"n"),a("mo",null,"−"),a("mn",null,"1")])])])])])])])]),a("annotation",{encoding:"application/x-tex"},"\\sum_{\\substack{1 < i < n - 1}}")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"1.168542em","vertical-align":"-0.418542em"}}),a("span",{class:"mop"},[a("span",{class:"mop op-symbol small-op",style:{position:"relative",top:"-0.0000050000000000050004em"}},"∑"),a("span",{class:"msupsub"},[a("span",{class:"vlist-t vlist-t2"},[a("span",{class:"vlist-r"},[a("span",{class:"vlist",style:{height:"0.16912199999999994em"}},[a("span",{style:{top:"-2.40029em","margin-left":"0em","margin-right":"0.05em"}},[a("span",{class:"pstrut",style:{height:"2.7em"}}),a("span",{class:"sizing reset-size6 size3 mtight"},[a("span",{class:"mord mtight"},[a("span",{class:"mord mtight"},[a("span",{class:"mtable"},[a("span",{class:"col-align-c"},[a("span",{class:"vlist-t vlist-t2"},[a("span",{class:"vlist-r"},[a("span",{class:"vlist",style:{height:"0.66976em"}},[a("span",{style:{top:"-2.71024em"}},[a("span",{class:"pstrut",style:{height:"2.7em"}}),a("span",{class:"mord mtight"},[a("span",{class:"mord mtight"},"1"),a("span",{class:"mrel mtight"},"<"),a("span",{class:"mord mathnormal mtight"},"i"),a("span",{class:"mrel mtight"},"<"),a("span",{class:"mord mathnormal mtight"},"n"),a("span",{class:"mbin mtight"},"−"),a("span",{class:"mord mtight"},"1")])])]),a("span",{class:"vlist-s"},"​")]),a("span",{class:"vlist-r"},[a("span",{class:"vlist",style:{height:"0.16976em"}},[a("span")])])])])])])])])])]),a("span",{class:"vlist-s"},"​")]),a("span",{class:"vlist-r"},[a("span",{class:"vlist",style:{height:"0.418542em"}},[a("span")])])])])])])])]),t(" 条)")]),a("li",null,[t("判断其他点是否都在这条直线"),a("strong",null,"L"),t("的同一侧 (共 "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[a("semantics",null,[a("mrow",null,[a("mi",null,"n"),a("mo",null,"−"),a("mn",null,"2")]),a("annotation",{encoding:"application/x-tex"},"n - 2")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.66666em","vertical-align":"-0.08333em"}}),a("span",{class:"mord mathnormal"},"n"),a("span",{class:"mspace",style:{"margin-right":"0.2222222222222222em"}}),a("span",{class:"mbin"},"−"),a("span",{class:"mspace",style:{"margin-right":"0.2222222222222222em"}})]),a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.64444em","vertical-align":"0em"}}),a("span",{class:"mord"},"2")])])]),t(" 个), 是则将这两点"),a("strong",null,"A"),t("和"),a("strong",null,"B"),t("去重地加入凸包数组 (插入更佳 按x,y排序)")]),a("li",null,"按一定规则(按x,y排序)连接(排序)凸包数组得到凸包")],-1),O=o('',8),G=o('',8),M=o('',6),z=o('',6),D=o('',8);_.render=function(t,o,e,c,l,r){const u=p("Show"),i=p("Play");return n(),s("div",null,[R,V,A,S,a(u),L,I,O,a(i,{algorithm:r.divide},null,8,["algorithm"]),G,a(i,{algorithm:r.divide},null,8,["algorithm"]),M,a(i,{algorithm:r.divide},null,8,["algorithm"]),z,a(i,{algorithm:r.divide},null,8,["algorithm"]),D])};export default _;export{B as __pageData};
