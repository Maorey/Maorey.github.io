import{e as s,w as a,f as t,o as n,c as l,a as e,t as p,d as i,r as m,b as r}from"./app.33dfdfa8.js";function c(s){s.clearRect(0,0,320,320)}function o(s,a){c(s),s.beginPath();let t=a[0];s.moveTo(t.x,t.y);for(let n=1,l=a.length;n<l;n++)t=a[n],s.lineTo(t.x,t.y);s.closePath(),s.strokeStyle="green",s.fillStyle="rgb(0,255,0,0.1)",s.stroke(),s.fill()}var h={setup(){const n=s(),l=s(),e=s();let p,i,m;const r=[],h=s=>{const a={x:s.pageX-m.x,y:s.pageY-m.y};l.value?(o(i,r),function(s,a){s.fillStyle="red",s.fillRect(a.x-1,a.y-1,2,2)}(i,a),e.value=function({x:s,y:a},t){let n=!1;for(let l=t.length,e=0;l--;e=l){const{x:p,y:i}=t[l],{x:m,y:r}=t[e];if(s===p&&a===i||s===m&&a===r)return!0;if(a>i&&a<=r||a<=i&&a>r){const t=p+(m-p)*(a-i)/(r-i);if(t===s)return!0;t<s&&(n=!n)}}return n}(a,r)):(r.push(a),o(i,r),e.value=null)},u=s=>{!l.value&&r.length&&o(i,r.concat({x:s.pageX-m.x,y:s.pageY-m.y}))},g=()=>{i&&c(i),l.value=!1,e.value=null,r.splice(0)},y=()=>{l.value?g():r.length>2&&(o(i,r),l.value=!0)},d=s=>{y(),s.stopPropagation(),s.preventDefault()},v=()=>{p.removeEventListener("click",h),p.removeEventListener("mousemove",u),p.removeEventListener("contextmenu",d)};return a((()=>{p&&v(),n.value&&(p=n.value,i=p.getContext("2d"),m=p.getBoundingClientRect(),p.addEventListener("click",h),p.addEventListener("mousemove",u),p.addEventListener("contextmenu",d))})),t(v),{el:n,isPoint:l,result:e,toggle:y,clear:g}}};var u={wrap:"_wrap_qkhio_1"};const g={ref:"el",width:"320",height:"320"},y=i(" 计算结果: ");(h.__cssModules={}).$style=u,h.render=function(s,a,t,i,m,r){return n(),l("div",{class:s.$style.wrap},[e("i",{onClick:a[1]||(a[1]=(...s)=>i.toggle&&i.toggle(...s))},p(i.isPoint?"请指定点":"正在画多边形")+"(右键切换)",1),e("i",{onClick:a[2]||(a[2]=(...s)=>i.clear&&i.clear(...s))},"重置"),e("canvas",g,null,512),e("p",null,[y,e("b",{style:"color: "+(i.result?"green":!1===i.result?"red":"")},p(i.result?"点在面内(或边上)":!1===i.result?"点在面外":"--"),5)])],2)};function d(s){s.clearRect(0,0,320,320)}function v(s,a){d(s),s.beginPath();let t=a[0];s.moveTo(t.x,t.y);for(let n=1,l=a.length;n<l;n++)t=a[n],s.lineTo(t.x,t.y);s.closePath(),s.strokeStyle="green",s.fillStyle="rgb(0,255,0,0.1)",s.stroke(),s.fill()}function k(s,a){s.fillStyle="red",s.fillRect(a.x-1,a.y-1,2,2)}var b={setup(){const n=s(),l=s(),e=s(),p=s(0);let i,m,r,c;const o=[],h=s=>{l.value?c?(v(m,o),c=void 0):(v(m,o),c={x:s.pageX-r.x,y:s.pageY-r.y},k(m,c)):(o.push({x:s.pageX-r.x,y:s.pageY-r.y}),v(m,o),o.length>2&&!1!==e.value&&(e.value=function(s){for(let a=s.length,t=0,n=1,l=null;a--;n=t,t=a){const e=s[a],p=s[t],i=s[n],m=(p.x-e.x)*(i.y-e.y)-(p.y-e.y)*(i.x-e.x)>=0;if(null===l)l=m;else if(m!==l)return!1}return!0}(o)))},u=s=>{l.value?c&&(v(m,o),k(m,c),p.value=function(s,a,t,n){const{x:l,y:e}=a,p=t.y-e,i=t.x-l,m=p/i,r=e-m*l;let c=p>0?320:0,o=(c-r)/m;return i>0?o>320&&(o=320,c=m*o+r):o<0&&(o=0,c=r),s.beginPath(),s.moveTo(l,e),s.lineTo(o,c),s.closePath(),s.strokeStyle="green",s.stroke(),0}(m,c,{x:s.pageX-r.x,y:s.pageY-r.y})):o.length&&v(m,o.concat({x:s.pageX-r.x,y:s.pageY-r.y}))},g=()=>{m&&d(m),l.value=!1,e.value=null,p.value=0,c=void 0,o.splice(0)},y=()=>{l.value?c?(v(m,o),c=void 0):g():o.length>2&&(v(m,o),l.value=!0)},b=s=>{y(),s.stopPropagation(),s.preventDefault()},x=()=>{i.removeEventListener("click",h),i.removeEventListener("mousemove",u),i.removeEventListener("contextmenu",b)};return a((()=>{i&&x(),n.value&&(i=n.value,m=i.getContext("2d"),r=i.getBoundingClientRect(),i.addEventListener("click",h),i.addEventListener("mousemove",u),i.addEventListener("contextmenu",b))})),t(x),{el:n,isRay:l,result:e,cross:p,toggle:y,clear:g}}};var x={wrap:"_wrap_qkhio_1"};const f=e("p",null,"// TODO: 计算射线与多边形相交次数",-1),z={ref:"el",width:"320",height:"320"},_=i(" 计算结果: 你画的是"),w=i("; 射线与多边形相交");(b.__cssModules={}).$style=x,b.render=function(s,a,t,i,m,r){return n(),l("div",{class:s.$style.wrap},[f,e("i",{onClick:a[1]||(a[1]=(...s)=>i.toggle&&i.toggle(...s))},p(i.isRay?"正在画射线":"正在画多边形")+"(右键切换)",1),e("i",{onClick:a[2]||(a[2]=(...s)=>i.clear&&i.clear(...s))},"重置"),e("canvas",z,null,512),e("p",null,[_,e("b",{style:"color: "+(i.result?"green":!1===i.result?"red":"")},p(i.result?"凸多边形":!1===i.result?"凹多边形":"--"),5),w,e("b",null,p(i.cross)+"次",1)])],2)};var E={components:{Ray:h,Polygon:b}};const T='{"title":"点是否在多边形内","description":"","frontmatter":{"title":"点是否在多边形内","index":1},"headers":[{"level":2,"title":"问题描述","slug":"问题描述"},{"level":2,"title":"演示","slug":"演示"},{"level":2,"title":"前置知识","slug":"前置知识"},{"level":3,"title":"凸多边形","slug":"凸多边形"},{"level":3,"title":"凹多边形","slug":"凹多边形"},{"level":3,"title":"多边形演示","slug":"多边形演示"},{"level":2,"title":"方法介绍","slug":"方法介绍"},{"level":3,"title":"面积和","slug":"面积和"},{"level":3,"title":"夹角和","slug":"夹角和"},{"level":3,"title":"卷绕数","slug":"卷绕数"},{"level":3,"title":"射线法","slug":"射线法"},{"level":3,"title":"算法实现","slug":"算法实现"},{"level":2,"title":"升维","slug":"升维"}],"relativePath":"blog/algorithm/pinp.md","lastUpdated":1619458846657}',P=r('',3),S=r('',11),A=r('',30),C=e("p",null,[i("问题转化为: 已知P、S、E点坐标分别为 "),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("mi",null,"P"),e("mrow",null,[e("mo",{fence:"true"},"("),e("msub",null,[e("mi",null,"x"),e("mi",null,"p")]),e("mo",{separator:"true"},","),e("msub",null,[e("mi",null,"y"),e("mi",null,"p")]),e("mo",{fence:"true"},")")])]),e("annotation",{encoding:"application/x-tex"},"P\\left(x_p,y_p\\right)")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"1.036108em","vertical-align":"-0.286108em"}}),e("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"P"),e("span",{class:"mspace",style:{"margin-right":"0.16666666666666666em"}}),e("span",{class:"minner"},[e("span",{class:"mopen delimcenter",style:{top:"0em"}},"("),e("span",{class:"mord"},[e("span",{class:"mord mathnormal"},"x"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.15139200000000003em"}},[e("span",{style:{top:"-2.5500000000000003em","margin-left":"0em","margin-right":"0.05em"}},[e("span",{class:"pstrut",style:{height:"2.7em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mathnormal mtight"},"p")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.286108em"}},[e("span")])])])])]),e("span",{class:"mpunct"},","),e("span",{class:"mspace",style:{"margin-right":"0.16666666666666666em"}}),e("span",{class:"mord"},[e("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"y"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.15139200000000003em"}},[e("span",{style:{top:"-2.5500000000000003em","margin-left":"-0.03588em","margin-right":"0.05em"}},[e("span",{class:"pstrut",style:{height:"2.7em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mathnormal mtight"},"p")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.286108em"}},[e("span")])])])])]),e("span",{class:"mclose delimcenter",style:{top:"0em"}},")")])])])]),i("、"),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("mi",null,"S"),e("mrow",null,[e("mo",{fence:"true"},"("),e("msub",null,[e("mi",null,"x"),e("mi",null,"s")]),e("mo",{separator:"true"},","),e("msub",null,[e("mi",null,"y"),e("mi",null,"s")]),e("mo",{fence:"true"},")")])]),e("annotation",{encoding:"application/x-tex"},"S\\left(x_s,y_s\\right)")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),e("span",{class:"mord mathnormal",style:{"margin-right":"0.05764em"}},"S"),e("span",{class:"mspace",style:{"margin-right":"0.16666666666666666em"}}),e("span",{class:"minner"},[e("span",{class:"mopen delimcenter",style:{top:"0em"}},"("),e("span",{class:"mord"},[e("span",{class:"mord mathnormal"},"x"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.151392em"}},[e("span",{style:{top:"-2.5500000000000003em","margin-left":"0em","margin-right":"0.05em"}},[e("span",{class:"pstrut",style:{height:"2.7em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mathnormal mtight"},"s")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.15em"}},[e("span")])])])])]),e("span",{class:"mpunct"},","),e("span",{class:"mspace",style:{"margin-right":"0.16666666666666666em"}}),e("span",{class:"mord"},[e("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"y"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.151392em"}},[e("span",{style:{top:"-2.5500000000000003em","margin-left":"-0.03588em","margin-right":"0.05em"}},[e("span",{class:"pstrut",style:{height:"2.7em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mathnormal mtight"},"s")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.15em"}},[e("span")])])])])]),e("span",{class:"mclose delimcenter",style:{top:"0em"}},")")])])])]),i("、"),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("mi",null,"E"),e("mrow",null,[e("mo",{fence:"true"},"("),e("msub",null,[e("mi",null,"x"),e("mi",null,"e")]),e("mo",{separator:"true"},","),e("msub",null,[e("mi",null,"y"),e("mi",null,"e")]),e("mo",{fence:"true"},")")])]),e("annotation",{encoding:"application/x-tex"},"E\\left(x_e,y_e\\right)")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),e("span",{class:"mord mathnormal",style:{"margin-right":"0.05764em"}},"E"),e("span",{class:"mspace",style:{"margin-right":"0.16666666666666666em"}}),e("span",{class:"minner"},[e("span",{class:"mopen delimcenter",style:{top:"0em"}},"("),e("span",{class:"mord"},[e("span",{class:"mord mathnormal"},"x"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.151392em"}},[e("span",{style:{top:"-2.5500000000000003em","margin-left":"0em","margin-right":"0.05em"}},[e("span",{class:"pstrut",style:{height:"2.7em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mathnormal mtight"},"e")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.15em"}},[e("span")])])])])]),e("span",{class:"mpunct"},","),e("span",{class:"mspace",style:{"margin-right":"0.16666666666666666em"}}),e("span",{class:"mord"},[e("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"y"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.151392em"}},[e("span",{style:{top:"-2.5500000000000003em","margin-left":"-0.03588em","margin-right":"0.05em"}},[e("span",{class:"pstrut",style:{height:"2.7em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mathnormal mtight"},"e")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.15em"}},[e("span")])])])])]),e("span",{class:"mclose delimcenter",style:{top:"0em"}},")")])])])]),i(", 求A点x坐标是否小于"),e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("semantics",null,[e("mrow",null,[e("msub",null,[e("mi",null,"x"),e("mi",null,"p")])]),e("annotation",{encoding:"application/x-tex"},"x_p")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"0.716668em","vertical-align":"-0.286108em"}}),e("span",{class:"mord"},[e("span",{class:"mord mathnormal"},"x"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.15139200000000003em"}},[e("span",{style:{top:"-2.5500000000000003em","margin-left":"0em","margin-right":"0.05em"}},[e("span",{class:"pstrut",style:{height:"2.7em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mathnormal mtight"},"p")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.286108em"}},[e("span")])])])])])])])]),i(":")],-1),B=e("p",null,[e("span",{class:"katex-display"},[e("span",{class:"katex"},[e("span",{class:"katex-mathml"},[e("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[e("semantics",null,[e("mtable",{rowspacing:"0.1600em",columnalign:"left",columnspacing:"1em"},[e("mtr",null,[e("mtd",null,[e("mstyle",{scriptlevel:"0",displaystyle:"false"},[e("mrow",null,[e("mo",null,"∵"),e("mi",null,"tan"),e("mo",null,"⁡"),e("mrow",null,[e("mo",{fence:"true"},"("),e("mi",{mathvariant:"normal"},"∠"),e("mi",null,"E"),e("mi",null,"S"),e("mi",null,"C"),e("mo",{fence:"true"},")")]),e("mo",null,"="),e("mi",null,"tan"),e("mo",null,"⁡"),e("mrow",null,[e("mo",{fence:"true"},"("),e("mi",{mathvariant:"normal"},"∠"),e("mi",null,"A"),e("mi",null,"S"),e("mi",null,"B"),e("mo",{fence:"true"},")")])])])])]),e("mtr",null,[e("mtd",null,[e("mstyle",{scriptlevel:"0",displaystyle:"false"},[e("mrow",null,[e("mo",null,"∴"),e("mfrac",null,[e("mrow",null,[e("msub",null,[e("mi",null,"y"),e("mi",null,"e")]),e("mo",null,"−"),e("msub",null,[e("mi",null,"y"),e("mi",null,"s")])]),e("mrow",null,[e("msub",null,[e("mi",null,"x"),e("mi",null,"e")]),e("mo",null,"−"),e("msub",null,[e("mi",null,"x"),e("mi",null,"s")])])]),e("mo",null,"="),e("mfrac",null,[e("mrow",null,[e("msub",null,[e("mi",null,"y"),e("mi",null,"p")]),e("mo",null,"−"),e("msub",null,[e("mi",null,"y"),e("mi",null,"s")])]),e("mrow",null,[e("mi",null,"x"),e("mo",null,"−"),e("msub",null,[e("mi",null,"x"),e("mi",null,"s")])])])])])])]),e("mtr",null,[e("mtd",null,[e("mstyle",{scriptlevel:"0",displaystyle:"false"},[e("mrow",null,[e("mo",null,"∴"),e("mi",null,"x"),e("mo",null,"="),e("msub",null,[e("mi",null,"x"),e("mi",null,"s")]),e("mo",null,"+"),e("mfrac",null,[e("mrow",null,[e("mrow",null,[e("mo",{fence:"true"},"("),e("msub",null,[e("mi",null,"x"),e("mi",null,"e")]),e("mo",null,"−"),e("msub",null,[e("mi",null,"x"),e("mi",null,"s")]),e("mo",{fence:"true"},")")]),e("mo",null,"×"),e("mrow",null,[e("mo",{fence:"true"},"("),e("msub",null,[e("mi",null,"y"),e("mi",null,"p")]),e("mo",null,"−"),e("msub",null,[e("mi",null,"y"),e("mi",null,"s")]),e("mo",{fence:"true"},")")])]),e("mrow",null,[e("msub",null,[e("mi",null,"y"),e("mi",null,"e")]),e("mo",null,"−"),e("msub",null,[e("mi",null,"y"),e("mi",null,"s")])])])])])])])]),e("annotation",{encoding:"application/x-tex"},"\\begin{array}{l} \\because \\tan\\left(\\angle ESC\\right)=\\tan\\left(\\angle ASB\\right) \\\\ \\therefore \\frac{y_e-y_s}{x_e-x_s}=\\frac{y_p-y_s}{x-x_s} \\\\ \\therefore x=x_s+\\frac{\\left(x_e-x_s\\right)\\times\\left(y_p-y_s\\right)}{y_e-y_s} \\end{array} ")])])]),e("span",{class:"katex-html","aria-hidden":"true"},[e("span",{class:"base"},[e("span",{class:"strut",style:{height:"4.074179em","vertical-align":"-1.7870895em"}}),e("span",{class:"mord"},[e("span",{class:"mtable"},[e("span",{class:"arraycolsep",style:{width:"0.5em"}}),e("span",{class:"col-align-l"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"2.2870895em"}},[e("span",{style:{top:"-4.4794095em"}},[e("span",{class:"pstrut",style:{height:"3.03232em"}}),e("span",{class:"mord"},[e("span",{class:"mrel amsrm"},"∵"),e("span",{class:"mspace",style:{"margin-right":"0.2777777777777778em"}}),e("span",{class:"mop"},"tan"),e("span",{class:"mspace",style:{"margin-right":"0.16666666666666666em"}}),e("span",{class:"minner"},[e("span",{class:"mopen delimcenter",style:{top:"0em"}},"("),e("span",{class:"mord"},"∠"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.07153em"}},"ESC"),e("span",{class:"mclose delimcenter",style:{top:"0em"}},")")]),e("span",{class:"mspace",style:{"margin-right":"0.2777777777777778em"}}),e("span",{class:"mrel"},"="),e("span",{class:"mspace",style:{"margin-right":"0.2777777777777778em"}}),e("span",{class:"mop"},"tan"),e("span",{class:"mspace",style:{"margin-right":"0.16666666666666666em"}}),e("span",{class:"minner"},[e("span",{class:"mopen delimcenter",style:{top:"0em"}},"("),e("span",{class:"mord"},"∠"),e("span",{class:"mord mathnormal"},"A"),e("span",{class:"mord mathnormal",style:{"margin-right":"0.05017em"}},"SB"),e("span",{class:"mclose delimcenter",style:{top:"0em"}},")")])])]),e("span",{style:{top:"-3.2037584999999997em"}},[e("span",{class:"pstrut",style:{height:"3.03232em"}}),e("span",{class:"mord"},[e("span",{class:"mrel amsrm"},"∴"),e("span",{class:"mspace",style:{"margin-right":"0.2777777777777778em"}}),e("span",{class:"mord"},[e("span",{class:"mopen nulldelimiter"}),e("span",{class:"mfrac"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.854439em"}},[e("span",{style:{top:"-2.655em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mtight"},[e("span",{class:"mord mtight"},[e("span",{class:"mord mathnormal mtight"},"x"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.16454285714285719em"}},[e("span",{style:{top:"-2.357em","margin-left":"0em","margin-right":"0.07142857142857144em"}},[e("span",{class:"pstrut",style:{height:"2.5em"}}),e("span",{class:"sizing reset-size3 size1 mtight"},[e("span",{class:"mord mathnormal mtight"},"e")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.143em"}},[e("span")])])])])]),e("span",{class:"mbin mtight"},"−"),e("span",{class:"mord mtight"},[e("span",{class:"mord mathnormal mtight"},"x"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.16454285714285719em"}},[e("span",{style:{top:"-2.357em","margin-left":"0em","margin-right":"0.07142857142857144em"}},[e("span",{class:"pstrut",style:{height:"2.5em"}}),e("span",{class:"sizing reset-size3 size1 mtight"},[e("span",{class:"mord mathnormal mtight"},"s")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.143em"}},[e("span")])])])])])])])]),e("span",{style:{top:"-3.23em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),e("span",{style:{top:"-3.446108em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mtight"},[e("span",{class:"mord mtight"},[e("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.03588em"}},"y"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.16454285714285719em"}},[e("span",{style:{top:"-2.357em","margin-left":"-0.03588em","margin-right":"0.07142857142857144em"}},[e("span",{class:"pstrut",style:{height:"2.5em"}}),e("span",{class:"sizing reset-size3 size1 mtight"},[e("span",{class:"mord mathnormal mtight"},"e")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.143em"}},[e("span")])])])])]),e("span",{class:"mbin mtight"},"−"),e("span",{class:"mord mtight"},[e("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.03588em"}},"y"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.16454285714285719em"}},[e("span",{style:{top:"-2.357em","margin-left":"-0.03588em","margin-right":"0.07142857142857144em"}},[e("span",{class:"pstrut",style:{height:"2.5em"}}),e("span",{class:"sizing reset-size3 size1 mtight"},[e("span",{class:"mord mathnormal mtight"},"s")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.143em"}},[e("span")])])])])])])])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.44509999999999994em"}},[e("span")])])])]),e("span",{class:"mclose nulldelimiter"})]),e("span",{class:"mspace",style:{"margin-right":"0.2777777777777778em"}}),e("span",{class:"mrel"},"="),e("span",{class:"mspace",style:{"margin-right":"0.2777777777777778em"}}),e("span",{class:"mord"},[e("span",{class:"mopen nulldelimiter"}),e("span",{class:"mfrac"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.915651em"}},[e("span",{style:{top:"-2.655em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mtight"},[e("span",{class:"mord mathnormal mtight"},"x"),e("span",{class:"mbin mtight"},"−"),e("span",{class:"mord mtight"},[e("span",{class:"mord mathnormal mtight"},"x"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.16454285714285719em"}},[e("span",{style:{top:"-2.357em","margin-left":"0em","margin-right":"0.07142857142857144em"}},[e("span",{class:"pstrut",style:{height:"2.5em"}}),e("span",{class:"sizing reset-size3 size1 mtight"},[e("span",{class:"mord mathnormal mtight"},"s")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.143em"}},[e("span")])])])])])])])]),e("span",{style:{top:"-3.23em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),e("span",{style:{top:"-3.50732em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mtight"},[e("span",{class:"mord mtight"},[e("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.03588em"}},"y"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.16454285714285716em"}},[e("span",{style:{top:"-2.357em","margin-left":"-0.03588em","margin-right":"0.07142857142857144em"}},[e("span",{class:"pstrut",style:{height:"2.5em"}}),e("span",{class:"sizing reset-size3 size1 mtight"},[e("span",{class:"mord mathnormal mtight"},"p")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.2818857142857143em"}},[e("span")])])])])]),e("span",{class:"mbin mtight"},"−"),e("span",{class:"mord mtight"},[e("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.03588em"}},"y"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.16454285714285719em"}},[e("span",{style:{top:"-2.357em","margin-left":"-0.03588em","margin-right":"0.07142857142857144em"}},[e("span",{class:"pstrut",style:{height:"2.5em"}}),e("span",{class:"sizing reset-size3 size1 mtight"},[e("span",{class:"mord mathnormal mtight"},"s")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.143em"}},[e("span")])])])])])])])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.44509999999999994em"}},[e("span")])])])]),e("span",{class:"mclose nulldelimiter"})])])]),e("span",{style:{top:"-1.7263384999999998em"}},[e("span",{class:"pstrut",style:{height:"3.03232em"}}),e("span",{class:"mord"},[e("span",{class:"mrel amsrm"},"∴"),e("span",{class:"mspace",style:{"margin-right":"0.2777777777777778em"}}),e("span",{class:"mord mathnormal"},"x"),e("span",{class:"mspace",style:{"margin-right":"0.2777777777777778em"}}),e("span",{class:"mrel"},"="),e("span",{class:"mspace",style:{"margin-right":"0.2777777777777778em"}}),e("span",{class:"mord"},[e("span",{class:"mord mathnormal"},"x"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.151392em"}},[e("span",{style:{top:"-2.5500000000000003em","margin-left":"0em","margin-right":"0.05em"}},[e("span",{class:"pstrut",style:{height:"2.7em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mathnormal mtight"},"s")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.15em"}},[e("span")])])])])]),e("span",{class:"mspace",style:{"margin-right":"0.2222222222222222em"}}),e("span",{class:"mbin"},"+"),e("span",{class:"mspace",style:{"margin-right":"0.2222222222222222em"}}),e("span",{class:"mord"},[e("span",{class:"mopen nulldelimiter"}),e("span",{class:"mfrac"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"1.03232em"}},[e("span",{style:{top:"-2.6550000000000002em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mtight"},[e("span",{class:"mord mtight"},[e("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.03588em"}},"y"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.16454285714285719em"}},[e("span",{style:{top:"-2.357em","margin-left":"-0.03588em","margin-right":"0.07142857142857144em"}},[e("span",{class:"pstrut",style:{height:"2.5em"}}),e("span",{class:"sizing reset-size3 size1 mtight"},[e("span",{class:"mord mathnormal mtight"},"e")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.143em"}},[e("span")])])])])]),e("span",{class:"mbin mtight"},"−"),e("span",{class:"mord mtight"},[e("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.03588em"}},"y"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.16454285714285719em"}},[e("span",{style:{top:"-2.357em","margin-left":"-0.03588em","margin-right":"0.07142857142857144em"}},[e("span",{class:"pstrut",style:{height:"2.5em"}}),e("span",{class:"sizing reset-size3 size1 mtight"},[e("span",{class:"mord mathnormal mtight"},"s")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.143em"}},[e("span")])])])])])])])]),e("span",{style:{top:"-3.23em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),e("span",{style:{top:"-3.50732em"}},[e("span",{class:"pstrut",style:{height:"3em"}}),e("span",{class:"sizing reset-size6 size3 mtight"},[e("span",{class:"mord mtight"},[e("span",{class:"minner mtight"},[e("span",{class:"mopen mtight delimcenter",style:{top:"0em"}},[e("span",{class:"mtight"},"(")]),e("span",{class:"mord mtight"},[e("span",{class:"mord mathnormal mtight"},"x"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.16454285714285719em"}},[e("span",{style:{top:"-2.357em","margin-left":"0em","margin-right":"0.07142857142857144em"}},[e("span",{class:"pstrut",style:{height:"2.5em"}}),e("span",{class:"sizing reset-size3 size1 mtight"},[e("span",{class:"mord mathnormal mtight"},"e")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.143em"}},[e("span")])])])])]),e("span",{class:"mbin mtight"},"−"),e("span",{class:"mord mtight"},[e("span",{class:"mord mathnormal mtight"},"x"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.16454285714285719em"}},[e("span",{style:{top:"-2.357em","margin-left":"0em","margin-right":"0.07142857142857144em"}},[e("span",{class:"pstrut",style:{height:"2.5em"}}),e("span",{class:"sizing reset-size3 size1 mtight"},[e("span",{class:"mord mathnormal mtight"},"s")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.143em"}},[e("span")])])])])]),e("span",{class:"mclose mtight delimcenter",style:{top:"0em"}},[e("span",{class:"mtight"},")")])]),e("span",{class:"mbin mtight"},"×"),e("span",{class:"minner mtight"},[e("span",{class:"mopen mtight delimcenter",style:{top:"0em"}},[e("span",{class:"mtight"},"(")]),e("span",{class:"mord mtight"},[e("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.03588em"}},"y"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.16454285714285716em"}},[e("span",{style:{top:"-2.357em","margin-left":"-0.03588em","margin-right":"0.07142857142857144em"}},[e("span",{class:"pstrut",style:{height:"2.5em"}}),e("span",{class:"sizing reset-size3 size1 mtight"},[e("span",{class:"mord mathnormal mtight"},"p")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.2818857142857143em"}},[e("span")])])])])]),e("span",{class:"mbin mtight"},"−"),e("span",{class:"mord mtight"},[e("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.03588em"}},"y"),e("span",{class:"msupsub"},[e("span",{class:"vlist-t vlist-t2"},[e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.16454285714285719em"}},[e("span",{style:{top:"-2.357em","margin-left":"-0.03588em","margin-right":"0.07142857142857144em"}},[e("span",{class:"pstrut",style:{height:"2.5em"}}),e("span",{class:"sizing reset-size3 size1 mtight"},[e("span",{class:"mord mathnormal mtight"},"s")])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.143em"}},[e("span")])])])])]),e("span",{class:"mclose mtight delimcenter",style:{top:"0em"}},[e("span",{class:"mtight"},")")])])])])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"0.481108em"}},[e("span")])])])]),e("span",{class:"mclose nulldelimiter"})])])])]),e("span",{class:"vlist-s"},"​")]),e("span",{class:"vlist-r"},[e("span",{class:"vlist",style:{height:"1.7870895em"}},[e("span")])])])]),e("span",{class:"arraycolsep",style:{width:"0.5em"}})])])])])])])],-1),L=r('',3);E.render=function(s,a,t,p,i,r){const c=m("Ray"),o=m("Polygon");return n(),l("div",null,[P,e(c),S,e(o),A,C,B,L])};export default E;export{T as __pageData};
