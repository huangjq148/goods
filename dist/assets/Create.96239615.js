import{c as C,n as A,t as x,d as P,u as F,F as H,a as N,b as o,p as I,w as k,e as M,m as L,B as j,r as S,f as q,L as G,g as O,h as R,i as J,j as U,k as W,l as Y,v as Z,o as Q,s as X,T as ee,q as te,H as ne,x as le,N as oe,y as ae,z as se,A as re,C as ie,D as p,E as ue,G as ce}from"./index.448b5215.js";const[de,me]=C("form"),fe={colon:Boolean,disabled:Boolean,readonly:Boolean,showError:Boolean,labelWidth:A,labelAlign:String,inputAlign:String,scrollToError:Boolean,validateFirst:Boolean,submitOnEnter:x,showErrorMessage:x,errorMessageAlign:String,validateTrigger:{type:[String,Array],default:"onBlur"}};var ve=P({name:de,props:fe,emits:["submit","failed"],setup(e,{emit:a,slots:s}){const{children:r,linkChildren:c}=F(H),m=t=>t?r.filter(n=>t.includes(n.name)):r,b=t=>new Promise((n,u)=>{const f=[];m(t).reduce((D,$)=>D.then(()=>{if(!f.length)return $.validate().then(K=>{K&&f.push(K)})}),Promise.resolve()).then(()=>{f.length?u(f):n()})}),g=t=>new Promise((n,u)=>{const f=m(t);Promise.all(f.map(v=>v.validate())).then(v=>{v=v.filter(Boolean),v.length?u(v):n()})}),h=t=>{const n=r.find(u=>u.name===t);return n?new Promise((u,f)=>{n.validate().then(v=>{v?f(v):u()})}):Promise.reject()},i=t=>typeof t=="string"?h(t):e.validateFirst?b(t):g(t),d=t=>{typeof t=="string"&&(t=[t]),m(t).forEach(u=>{u.resetValidation()})},_=()=>r.reduce((t,n)=>(t[n.name]=n.getValidationStatus(),t),{}),w=(t,n)=>{r.some(u=>u.name===t?(u.$el.scrollIntoView(n),!0):!1)},B=()=>r.reduce((t,n)=>(t[n.name]=n.formValue.value,t),{}),V=()=>{const t=B();i().then(()=>a("submit",t)).catch(n=>{a("failed",{values:t,errors:n}),e.scrollToError&&n[0].name&&w(n[0].name)})},l=t=>{I(t),V()};return c({props:e}),N({submit:V,validate:i,getValues:B,scrollToField:w,resetValidation:d,getValidationStatus:_}),()=>{var t;return o("form",{class:me(),onSubmit:l},[(t=s.default)==null?void 0:t.call(s)])}}});const he=k(ve),[ge,E]=C("cell-group"),ye={title:String,inset:Boolean,border:x};var xe=P({name:ge,inheritAttrs:!1,props:ye,setup(e,{slots:a,attrs:s}){const r=()=>{var m;return o("div",L({class:[E({inset:e.inset}),{[j]:e.border&&!e.inset}]},s),[(m=a.default)==null?void 0:m.call(a)])},c=()=>o("div",{class:E("title",{inset:e.inset})},[a.title?a.title():e.title]);return()=>e.title||a.title?o(M,null,[c(),r()]):r()}});const be=k(xe),[_e,T]=C("key"),we=o("svg",{class:T("collapse-icon"),viewBox:"0 0 30 24"},[o("path",{d:"M26 13h-2v2h2v-2zm-8-3h2V8h-2v2zm2-4h2V4h-2v2zm2 4h4V4h-2v4h-2v2zm-7 14 3-3h-6l3 3zM6 13H4v2h2v-2zm16 0H8v2h14v-2zm-12-3h2V8h-2v2zM28 0l1 1 1 1v15l-1 2H1l-1-2V2l1-1 1-1zm0 2H2v15h26V2zM6 4v2H4V4zm10 2h2V4h-2v2zM8 9v1H4V8zm8 0v1h-2V8zm-6-5v2H8V4zm4 0v2h-2V4z",fill:"currentColor"},null)]),Be=o("svg",{class:T("delete-icon"),viewBox:"0 0 32 22"},[o("path",{d:"M28 0a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H10.4a2 2 0 0 1-1.4-.6L1 13.1c-.6-.5-.9-1.3-.9-2 0-1 .3-1.7.9-2.2L9 .6a2 2 0 0 1 1.4-.6zm0 2H10.4l-8.2 8.3a1 1 0 0 0-.3.7c0 .3.1.5.3.7l8.2 8.4H28a2 2 0 0 0 2-2V4c0-1.1-.9-2-2-2zm-5 4a1 1 0 0 1 .7.3 1 1 0 0 1 0 1.4L20.4 11l3.3 3.3c.2.2.3.5.3.7 0 .3-.1.5-.3.7a1 1 0 0 1-.7.3 1 1 0 0 1-.7-.3L19 12.4l-3.4 3.3a1 1 0 0 1-.6.3 1 1 0 0 1-.7-.3 1 1 0 0 1-.3-.7c0-.2.1-.5.3-.7l3.3-3.3-3.3-3.3A1 1 0 0 1 14 7c0-.3.1-.5.3-.7A1 1 0 0 1 15 6a1 1 0 0 1 .6.3L19 9.6l3.3-3.3A1 1 0 0 1 23 6z",fill:"currentColor"},null)]);var z=P({name:_e,props:{type:String,text:A,color:String,wider:Boolean,large:Boolean,loading:Boolean},emits:["press"],setup(e,{emit:a,slots:s}){const r=S(!1),c=q(),m=i=>{c.start(i),r.value=!0},b=i=>{c.move(i),c.direction.value&&(r.value=!1)},g=i=>{r.value&&(s.default||I(i),r.value=!1,a("press",e.text,e.type))},h=()=>{if(e.loading)return o(G,{class:T("loading-icon")},null);const i=s.default?s.default():e.text;switch(e.type){case"delete":return i||Be;case"extra":return i||we;default:return i}};return()=>o("div",{class:T("wrapper",{wider:e.wider}),onTouchstartPassive:m,onTouchmovePassive:b,onTouchend:g,onTouchcancel:g},[o("div",{role:"button",tabindex:0,class:T([e.color,{large:e.large,active:r.value,delete:e.type==="delete"}])},[h()])])}});const[Ve,y]=C("number-keyboard"),Se={show:Boolean,title:String,theme:O("default"),zIndex:A,teleport:[String,Object],maxlength:R(1/0),modelValue:O(""),transition:x,blurOnClose:x,showDeleteKey:x,randomKeyOrder:Boolean,closeButtonText:String,deleteButtonText:String,closeButtonLoading:Boolean,hideOnClickOutside:x,safeAreaInsetBottom:x,extraKey:{type:[String,Array],default:""}};function Te(e){for(let a=e.length-1;a>0;a--){const s=Math.floor(Math.random()*(a+1)),r=e[a];e[a]=e[s],e[s]=r}return e}var Ce=P({name:Ve,props:Se,emits:["show","hide","blur","input","close","delete","update:modelValue"],setup(e,{emit:a,slots:s}){const r=S(),c=()=>{const l=Array(9).fill("").map((t,n)=>({text:n+1}));return e.randomKeyOrder&&Te(l),l},m=()=>[...c(),{text:e.extraKey,type:"extra"},{text:0},{text:e.showDeleteKey?e.deleteButtonText:"",type:e.showDeleteKey?"delete":""}],b=()=>{const l=c(),{extraKey:t}=e,n=Array.isArray(t)?t:[t];return n.length===1?l.push({text:0,wider:!0},{text:n[0],type:"extra"}):n.length===2&&l.push({text:n[0],type:"extra"},{text:0},{text:n[1],type:"extra"}),l},g=J(()=>e.theme==="custom"?b():m()),h=()=>{e.show&&a("blur")},i=()=>{a("close"),e.blurOnClose&&h()},d=()=>a(e.show?"show":"hide"),_=(l,t)=>{if(l===""){t==="extra"&&h();return}const n=e.modelValue;t==="delete"?(a("delete"),a("update:modelValue",n.slice(0,n.length-1))):t==="close"?i():n.length<e.maxlength&&(a("input",l),a("update:modelValue",n+l))},w=()=>{const{title:l,theme:t,closeButtonText:n}=e,u=s["title-left"],f=n&&t==="default";if(!!(l||f||u))return o("div",{class:y("header")},[u&&o("span",{class:y("title-left")},[u()]),l&&o("h2",{class:y("title")},[l]),f&&o("button",{type:"button",class:[y("close"),ne],onClick:i},[n])])},B=()=>g.value.map(l=>{const t={};return l.type==="delete"&&(t.default=s.delete),l.type==="extra"&&(t.default=s["extra-key"]),o(z,{key:l.text,text:l.text,type:l.type,wider:l.wider,color:l.color,onPress:_},t)}),V=()=>{if(e.theme==="custom")return o("div",{class:y("sidebar")},[e.showDeleteKey&&o(z,{large:!0,text:e.deleteButtonText,type:"delete",onPress:_},{delete:s.delete}),o(z,{large:!0,text:e.closeButtonText,type:"close",color:"blue",loading:e.closeButtonLoading,onPress:_},null)])};return U(()=>e.show,l=>{e.transition||a(l?"show":"hide")}),e.hideOnClickOutside&&W(r,h,{eventName:"touchstart"}),()=>{const l=w(),t=o(ee,{name:e.transition?"van-slide-up":""},{default:()=>[Y(o("div",{ref:r,style:Q(e.zIndex),class:y({unfit:!e.safeAreaInsetBottom,"with-title":!!l}),onAnimationend:d,onTouchstartPassive:X},[l,o("div",{class:y("body")},[o("div",{class:y("keys")},[B()]),V()])]),[[Z,e.show]])]});return e.teleport?o(te,{to:e.teleport},{default:()=>[t]}):t}}});const Pe=k(Ce);const pe={style:{margin:"16px"}},Ae={__name:"Create",setup(e){const a=S(""),s=S(""),r=S([]),c=S(!1),m=()=>{history.back()},b=()=>{r.value.push({name:a,price:s}),localStorage.setItem("goods",JSON.stringify(r.value)),m()};le(()=>{var d;const i=(d=localStorage.getItem("goods"))!=null?d:"[]";r.value=JSON.parse(i),console.log("\u7EC4\u4EF6\u6302\u8F7D")});const g=i=>s.value+=i,h=()=>s.value=s.value.slice(0,s.value.length-1);return(i,d)=>{const _=oe,w=ae,B=se,V=be,l=he,t=Pe;return re(),ie(M,null,[o(_,{title:"\u65B0\u589E\u5546\u54C1","left-text":"\u8FD4\u56DE","left-arrow":"",onClickLeft:m}),o(l,{onSubmit:b,class:"form"},{default:p(()=>[o(V,{inset:""},{default:p(()=>[o(w,{modelValue:a.value,"onUpdate:modelValue":d[0]||(d[0]=n=>a.value=n),name:"\u5546\u54C1\u540D",label:"\u5546\u54C1\u540D",placeholder:"\u5546\u54C1\u540D",rules:[{required:!0,message:"\u8BF7\u586B\u5199\u5546\u54C1\u540D"}]},null,8,["modelValue"]),o(w,{modelValue:s.value,"onUpdate:modelValue":d[1]||(d[1]=n=>s.value=n),name:"\u5356\u4EF7",label:"\u5356\u4EF7",placeholder:"\u5356\u4EF7",focused:c.value,onFocus:d[2]||(d[2]=n=>c.value=!0),rules:[{required:!0,message:"\u8BF7\u586B\u5199\u5356\u4EF7"}]},null,8,["modelValue","focused"]),ue("div",pe,[o(B,{round:"",block:"",type:"primary","native-type":"submit"},{default:p(()=>[ce(" \u63D0\u4EA4 ")]),_:1})])]),_:1})]),_:1}),o(t,{show:c.value,theme:"custom","extra-key":".","close-button-text":"\u5B8C\u6210",onBlur:d[3]||(d[3]=n=>c.value=!1),onInput:g,onDelete:h},null,8,["show"])],64)}}};export{Ae as default};
