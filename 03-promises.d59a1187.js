var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,n){o[e]=n},e.parcelRequired7c6=t);var r=t("iQIUW");const l=document.querySelector(".form"),i=document.querySelector('[name="delay"]'),u=document.querySelector('[name="step"]'),a=document.querySelector('[name="amount"]');let d=null,s=null,c=null;function f(e,n){const o=Math.random()>.3;return new Promise(((t,r)=>{setTimeout((()=>{o?t({position:e,delay:n}):r({position:e,delay:n})}),d)}))}l.addEventListener("submit",(function(e){e.preventDefault(),d=Number(i.value),s=Number(u.value),c=Number(a.value);for(let e=1;e<=c;e+=1)f(e,d).then((({position:e,delay:n})=>{r.Notify.success(`✅ Fulfilled promise ${e} in ${n}ms`)})).catch((({position:e,delay:n})=>{r.Notify.failure(`❌ Rejected promise ${e} in ${n}ms`)})),d+=s}));
//# sourceMappingURL=03-promises.d59a1187.js.map