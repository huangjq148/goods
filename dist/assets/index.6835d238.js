import{r as d,U as B,au as V,x as L,X as S,ak as E,an as N,Y as j,R as q,av as D,aw as G,_ as t,$ as i,l as o,a0 as p,ao as l,a1 as n,a2 as m,aq as O,a4 as P,a5 as v,ax as R}from"./index.0868de6e.js";const T={name:"GoodsList"},X=Object.assign(T,{setup(U){const s=d(""),c=d(B("goods")),g=V(),r=L(()=>c.value.filter(a=>a.name.indexOf(s.value)>-1)),y=a=>{c.value=R("goods",a)},f=a=>{g.push(`/goods/create?id=${a}`)};return(a,_)=>{const k=S,x=E,h=N,C=j,u=q,b=D,w=G;return t(),i(m,null,[o(k,{title:"\u5168\u90E8\u5546\u54C1"}),o(x,{modelValue:s.value,"onUpdate:modelValue":_[0]||(_[0]=e=>s.value=e),placeholder:"\u8BF7\u8F93\u5165\u641C\u7D22\u5173\u952E\u8BCD"},null,8,["modelValue"]),p(r).length?(t(),l(w,{key:1,class:"goods-list"},{default:n(()=>[(t(!0),i(m,null,O(p(r),(e,$)=>(t(),l(b,{key:e},{right:n(()=>[o(u,{onClick:()=>y(e.id),square:"",type:"danger",text:"\u5220\u9664"},null,8,["onClick"])]),default:n(()=>[o(C,{title:e.name,onClick:()=>f(e.id)},{default:n(()=>[P(" \u8FDB\u4EF7\uFF1A"+v(e.buyPrice)+" \u552E\u4EF7\uFF1A"+v(e.sellPrice),1)]),_:2},1032,["title","onClick"])]),_:2},1024))),128))]),_:1})):(t(),l(h,{key:0,description:"\u6CA1\u6709\u6570\u636E"})),o(u,{to:"/goods/create",class:"add-button",icon:"plus",type:"primary"})],64)}}});export{X as default};
