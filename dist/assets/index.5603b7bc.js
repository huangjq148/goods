import{r as m,U as S,au as E,x as N,X as O,ak as j,an as q,ai as D,R as I,av as R,aw as U,_ as o,$ as d,l as s,a0 as f,ao as h,a1 as i,a2 as k,aq as $,a6 as c,a5 as p,ax as F}from"./index.4fb8bf1b.js";const P=(_,t)=>{const n=_.__vccOpts||_;for(const[l,r]of t)n[l]=r;return n},T={key:1,class:"van-address-list address-list"},X={class:"van-address-item address-wrapper"},z={class:"info-wrapper"},A={class:"van-address-item__name"},G={class:"van-address-item__address"},H=["onClick"],J={name:"ContactList"},K=Object.assign(J,{setup(_){const t=m(""),n=m(S("persons")),l=E(),r=N(()=>n.value.filter(a=>a.name.indexOf(t.value)>-1)),y=a=>{n.value=F("persons",a)},x=a=>{l.push(`/contact/create?id=${a}`)};return(a,u)=>{const g=O,w=j,C=q,B=D,v=I,V=R,b=U;return o(),d(k,null,[s(g,{title:"\u5168\u90E8\u8054\u7CFB\u4EBA"}),s(w,{modelValue:t.value,"onUpdate:modelValue":u[0]||(u[0]=e=>t.value=e),placeholder:"\u8BF7\u8F93\u5165\u641C\u7D22\u5173\u952E\u8BCD"},null,8,["modelValue"]),f(r).length?(o(),d("div",T,[s(b,null,{default:i(()=>[(o(!0),d(k,null,$(f(r),(e,L)=>(o(),h(V,{key:e},{right:i(()=>[s(v,{onClick:()=>y(L),square:"",type:"danger",text:"\u5220\u9664"},null,8,["onClick"])]),default:i(()=>[c("div",X,[c("div",z,[c("div",A,p(e.name)+" "+p(e.phone),1),c("div",G,p(e.address),1)]),c("div",{class:"edit-warpper",onClick:()=>x(e.id)},[s(B,{name:"edit"})],8,H)])]),_:2},1024))),128))]),_:1})])):(o(),h(C,{key:0,description:"\u6CA1\u6709\u6570\u636E"})),s(v,{to:"/contact/create",class:"add-button",icon:"plus",type:"primary"})],64)}}}),Q=P(K,[["__scopeId","data-v-9f759e1c"]]);export{Q as default};
