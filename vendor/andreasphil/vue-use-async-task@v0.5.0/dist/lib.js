import{computed as i,ref as t}from"vue";function y(s,u){let a=t(),r=u?.isLoading??t(!1),n=u?.error??t(void 0),d=i(()=>!!n.value);return{run:async(...f)=>{r.value=!0,n.value=void 0;try{let e=await s(...f);return a.value=e,[e,void 0]}catch(e){return n.value=e,[void 0,e]}finally{r.value=!1}},data:a,isLoading:r,error:n,hasError:d}}export{y as useAsyncTask};
//# sourceMappingURL=lib.js.map
