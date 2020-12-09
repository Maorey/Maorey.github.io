import{B as s,o as a,e as n,f as e,D as l,G as p,s as t}from"./framework.c00dda38.js";const r='{"title":"动态规划","description":"","frontmatter":{"index":3},"headers":[{"level":2,"title":"这是啥","slug":"这是啥"},{"level":2,"title":"能干啥","slug":"能干啥"},{"level":2,"title":"怎么干","slug":"怎么干"},{"level":3,"title":"基础概念","slug":"基础概念"},{"level":2,"title":"举例子","slug":"举例子"},{"level":2,"title":"讲套路","slug":"讲套路"}],"relativePath":"blog/dynamicProgramming.md","lastUpdated":1607536267875.0022}';var m={};const c=p('',15),d=t("斐波那契数列 "),i={class:"katex"},u={class:"katex-mathml"},f=t("f"),o=t("("),h=t("n"),A=t(")"),g=t("="),x=t("{"),_=t("("),B=t("1"),y=t(","),b=t("if"),T=t("n"),v=t("="),w=t("1"),P=t(","),k=t("2"),q=t(")"),D=t(","),S=t("("),C=t("f"),I=t("("),V=t("n"),M=t("−"),E=t("1"),N=t(")"),R=t("+"),j=t("f"),G=t("("),L=t("n"),U=t("−"),z=t("2"),F=t(")"),H=t(","),J=t("if"),K=t("n"),O=t(">"),Q=t("2"),W=t(")"),X=t("\\{f\\{\\{\\left(\\{n}\\right)}}}=\\{\\left\\lbrace\\{\\left(\\{1},\\{\\quad\\text\\{if}\\quad}\\{n}=\\{1},\\{2}\\right)},\\{\\left(\\{f\\{\\{\\left(\\{n}-\\{1}\\right)}}}+\\{f\\{\\{\\left(\\{n}-\\{2}\\right)}}},\\{\\quad\\text\\{if}\\quad}\\{n}>\\{2}\\right)}\\right.}"),Y=p('',1),Z=t(" 的求解按照这两种方法的执行过程如下:"),$=e("p",null,"普通递归算法:",-1),ss=e("pre",{class:"mermaid loading"},'flowchart TB\n  A("f(n)") --\x3e A1("f(n - 1)")\n    A1 --\x3e A11("f(n - 2)")\n      A11 --\x3e A111(...)\n        A111 --\x3e A1111("f(1)") --\x3e B111\n        A111 --\x3e A1112("f(2)") --\x3e B111\n      A11 --\x3e A112(...)\n        A112 --\x3e A1121("f(1)") --\x3e B112\n        A112 --\x3e A1122("f(2)") --\x3e B112\n    A1 --\x3e A12("f(n - 3)")\n      subgraph b\n      A12 --\x3e A121(...)\n        A121 --\x3e A1211("f(1)") --\x3e B121\n        A121 --\x3e A1212("f(2)") --\x3e B121\n      A12 --\x3e A122(...)\n        A122 --\x3e A1221("f(1)") --\x3e B122\n        A122 --\x3e A1222("f(2)") --\x3e B122\n      end\n  A --\x3e A2("f(n - 2)")\n  subgraph a\n    A2 --\x3e A21("f(n - 3)")\n      A21 --\x3e A211(...)\n        A211 --\x3e A2111("f(1)") --\x3e B211\n        A211 --\x3e A2112("f(2)") --\x3e B211\n      A21 --\x3e A212(...)\n        A212 --\x3e A2121("f(1)") --\x3e B212\n        A212 --\x3e A2122("f(2)") --\x3e B212\n    A2 --\x3e A22("f(n - 4)")\n      A22 --\x3e A221(...)\n        A221 --\x3e A2211("f(1)") --\x3e B221\n        A221 --\x3e A2212("f(2)") --\x3e B221\n      A22 --\x3e A222(...)\n        A222 --\x3e A2221("f(1)") --\x3e B222\n        A222 --\x3e A2222("f(2)") --\x3e B222\n  end\n\n  B1("f(n - 1)") --\x3e B("f(n)")\n    B11("f(n - 2)") --\x3e B1\n      B111(...) --\x3e B11\n      B112(...) --\x3e B11\n    B12("f(n - 3)") --\x3e B1\n      subgraph b\n      B121(...) --\x3e B12\n      B122(...) --\x3e B12\n      end\n  B2("f(n - 2)") --\x3e B\n    subgraph a\n    B21("f(n - 3)") --\x3e B2\n      B211(...) --\x3e B21\n      B212(...) --\x3e B21\n    B22("f(n - 4)") --\x3e B2\n      B221(...) --\x3e B22\n      B222(...) --\x3e B22\n    end',-1),as=e("p",null,"可以看到圈起来的都是重复计算的",-1),ns=e("p",null,"动态规划算法:",-1),es=e("pre",{class:"mermaid loading"},'flowchart TB\n  A1("f(1)") --\x3e A3("f(3)")\n  A2("f(2)") --\x3e A3\n  A2 --\x3e A4("f(4)")\n  A3 --\x3e A4\n  A3 --\x3e Ad1(...)\n  A4 --\x3e Ad1\n  A4 --\x3e Ad2(...)\n  Ad1 --\x3e Ad2\n  Ad1 --\x3e An1("f(n - 1)")\n  Ad2 --\x3e An1\n  Ad2 --\x3e An("f(n)")\n  An1 --\x3e An',-1),ls=e("p",null,"效果显著",-1),ps=e("h2",{id:"讲套路"},[e("a",{class:"header-anchor",href:"#讲套路","aria-hidden":"true"},"#"),t(" 讲套路")],-1);m.render=function(p,t,r,m,ts,rs){const ms=s("mi"),cs=s("mo"),ds=s("mrow"),is=s("mn"),us=s("mspace"),fs=s("mtext"),os=s("annotation"),hs=s("semantics"),As=s("math");return a(),n("div",null,[c,e("p",null,[d,e("span",i,[e("span",u,[e(As,{xmlns:"http://www.w3.org/1998/Math/MathML"},{default:l((()=>[e(hs,null,{default:l((()=>[e(ds,null,{default:l((()=>[e(ds,null,{default:l((()=>[e(ms,null,{default:l((()=>[f])),_:1}),e(ds,null,{default:l((()=>[e(cs,{fence:"true"},{default:l((()=>[o])),_:1}),e(ms,null,{default:l((()=>[h])),_:1}),e(cs,{fence:"true"},{default:l((()=>[A])),_:1})])),_:1})])),_:1}),e(cs,null,{default:l((()=>[g])),_:1}),e(ds,null,{default:l((()=>[e(cs,{fence:"true"},{default:l((()=>[x])),_:1}),e(ds,null,{default:l((()=>[e(cs,{fence:"true"},{default:l((()=>[_])),_:1}),e(is,null,{default:l((()=>[B])),_:1}),e(cs,{separator:"true"},{default:l((()=>[y])),_:1}),e(ds,null,{default:l((()=>[e(us,{width:"1em"}),e(fs,null,{default:l((()=>[b])),_:1}),e(us,{width:"1em"})])),_:1}),e(ms,null,{default:l((()=>[T])),_:1}),e(cs,null,{default:l((()=>[v])),_:1}),e(is,null,{default:l((()=>[w])),_:1}),e(cs,{separator:"true"},{default:l((()=>[P])),_:1}),e(is,null,{default:l((()=>[k])),_:1}),e(cs,{fence:"true"},{default:l((()=>[q])),_:1})])),_:1}),e(cs,{separator:"true"},{default:l((()=>[D])),_:1}),e(ds,null,{default:l((()=>[e(cs,{fence:"true"},{default:l((()=>[S])),_:1}),e(ds,null,{default:l((()=>[e(ms,null,{default:l((()=>[C])),_:1}),e(ds,null,{default:l((()=>[e(cs,{fence:"true"},{default:l((()=>[I])),_:1}),e(ms,null,{default:l((()=>[V])),_:1}),e(cs,null,{default:l((()=>[M])),_:1}),e(is,null,{default:l((()=>[E])),_:1}),e(cs,{fence:"true"},{default:l((()=>[N])),_:1})])),_:1})])),_:1}),e(cs,null,{default:l((()=>[R])),_:1}),e(ds,null,{default:l((()=>[e(ms,null,{default:l((()=>[j])),_:1}),e(ds,null,{default:l((()=>[e(cs,{fence:"true"},{default:l((()=>[G])),_:1}),e(ms,null,{default:l((()=>[L])),_:1}),e(cs,null,{default:l((()=>[U])),_:1}),e(is,null,{default:l((()=>[z])),_:1}),e(cs,{fence:"true"},{default:l((()=>[F])),_:1})])),_:1})])),_:1}),e(cs,{separator:"true"},{default:l((()=>[H])),_:1}),e(ds,null,{default:l((()=>[e(us,{width:"1em"}),e(fs,null,{default:l((()=>[J])),_:1}),e(us,{width:"1em"})])),_:1}),e(ms,null,{default:l((()=>[K])),_:1}),e(cs,null,{default:l((()=>[O])),_:1}),e(is,null,{default:l((()=>[Q])),_:1}),e(cs,{fence:"true"},{default:l((()=>[W])),_:1})])),_:1})])),_:1})])),_:1}),e(os,{encoding:"application/x-tex"},{default:l((()=>[X])),_:1})])),_:1})])),_:1})]),Y]),Z]),$,ss,as,ns,es,ls,ps])};export default m;export{r as __pageData};
