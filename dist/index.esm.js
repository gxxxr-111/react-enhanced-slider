import{jsxs as t,jsx as e}from"react/jsx-runtime";import{useState as n,useRef as r,useCallback as o,useEffect as a}from"react";function u(t,{min:e,max:n}){return(t-e)/(n-e)*100}function l(t,{min:e,max:n,step:r}){if(r>n-e)return e;const o=r.toString().split(".")[1]?.length||0,a=Math.pow(10,o);let u=e+Math.round((t-e)/r)*r;u=Math.round(u*a)/a;const l=Math.min(n,Math.max(e,u));return Number(l.toFixed(o))}const i=({range:i={min:0,max:100,step:1},defaultValue:s=l((i.min+i.max)/2,i),onChange:c,className:m,showBar:d=!1,thumbColor:h="#3b82f6",barColor:v="#3b82f6"})=>{const{min:f,max:g,step:p}=i,[b,x]=n(s),w=r(b),[M,S]=n(!1),y=r(null),[N,C]=n(b.toString()),E=o((t=>{const e=l(t,i);t==e&&(C(e.toString()),c?.(e)),w.current=t,x(t)}),[c,i]),L=o((t=>{const e=l(t,i);w.current=e,x(e),C(e.toString()),c?.(e)}),[c,i]),$=o((t=>{if(!y.current)return f;const e=y.current.getBoundingClientRect(),n=function(t,{min:e,max:n}){return t*(n-e)/100+e}(Math.min(e.width,Math.max(0,t-e.left))/e.width*100,i);return n}),[f,g,p]),X=o((t=>{t.preventDefault(),S(!0);const e="touches"in t?t.touches[0].clientX:t.clientX,n=$(e);E(n);const r=t=>{const e=t,n="touches"in e?e.touches[0].clientX:e.clientX,r=$(n);L(r)},o=()=>{S(!1),document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",o),document.removeEventListener("touchmove",r),document.removeEventListener("touchend",o),E(l(w.current,i))};document.addEventListener("mousemove",r),document.addEventListener("mouseup",o),document.addEventListener("touchmove",r),document.addEventListener("touchend",o)}),[$]);return a((()=>{const t=l(b,i);t!==b&&(x(t),C(t.toString()),c?.(t))}),[i]),t("div",{className:`react-slider relative h-4 w-xs ${m}`,children:[e("div",{ref:y,className:"absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-gray-300 cursor-pointer",onMouseDown:X,onTouchStart:X,role:"slider","aria-valuemin":f,"aria-valuemax":g,"aria-valuenow":b,children:d?e("div",{className:"h-full rounded-full "+(M?"":"transition-all duration-500"),style:{width:`${u(b,i)}%`,backgroundColor:v}}):null}),e("div",{className:"group absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full "+(M?"":"transition-all duration-500"),style:{left:`${u(b,i)}%`,backgroundColor:`${h}${Math.round(76.5).toString(16).padStart(2,"0")}`},onMouseDown:X,onTouchStart:X,children:e("div",{className:"absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-md transition-transform duration-200 ease-in-out group-hover:scale-[3]",style:{backgroundColor:h}})}),e("input",{type:"number",value:N,onChange:t=>{const e=Number(t.target.value),n=Math.min(Math.max(e,f),g);C(n.toString()),E(n)},onBlur:()=>{L(Number(N))},min:f,max:g,step:p,className:"absolute top-1/2 left-full ml-6 w-16 -translate-y-1/2 text-center border border-gray-300 rounded","aria-label":"Slider value"})]})};export{i as Slider};
//# sourceMappingURL=index.esm.js.map
