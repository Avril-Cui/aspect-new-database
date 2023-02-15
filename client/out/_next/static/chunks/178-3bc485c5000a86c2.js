(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[178],{8550:function(e,t,r){e.exports=r(9608)},1923:function(e,t,r){"use strict";var n=r(6086),i=r(2695),o=r(1247),a=r(7118),l=r(1051),s=["projectId","dataset","imageOptions"],u={imageOptions:{}};function c(e){return"block"===e._type&&e.listItem}e.exports=function(e,t,r,f){var p=n({},u,t),h=Array.isArray(p.blocks)?p.blocks:[p.blocks],d=a(h),m=o(d,p.listNestMode),y=l(r,p.serializers||{}),g=s.reduce((function(e,t){var r=p[t];return"undefined"!==typeof r&&(e[t]=r),e}),{});function v(t,r,n,o){return"list"===(a=t)._type&&a.listItem?function(t){var r=t.listItem,n=t.level,i=t._key,o=t.children.map(v);return e(y.list,{key:i,level:n,type:r,options:g},o)}(t):c(t)?function(t,r){var n=t._key,o=i(t).map(v);return e(y.listItem,{node:t,serializers:y,index:r,key:n,options:g},o)}(t,function(e,t){for(var r=0,n=0;n<t.length;n++){if(t[n]===e)return r;c(t[n])&&r++}return r}(t,n)):function(e){return"string"===typeof e||e.marks||"span"===e._type}(t)?f(t,y,r,{serializeNode:v}):function(t,r,n){var o=i(t).map((function(e,t,r){return v(e,t,r,!0)})),a={key:t._key||"block-".concat(r),node:t,isInline:n,serializers:y,options:g};return e(y.block,a,o)}(t,r,o);var a}var b=Boolean(p.renderContainerOnSingleChild),k=m.map(v);if(b||k.length>1){var w=p.className?{className:p.className}:{};return e(y.container,w,k)}return k[0]?k[0]:"function"===typeof y.empty?e(y.empty):y.empty}},2695:function(e){"use strict";var t=["strong","em","code","underline","strike-through"];function r(e,t,r){if(!e.marks||0===e.marks.length)return e.marks||[];var i=e.marks.reduce((function(e,n){e[n]=e[n]?e[n]+1:1;for(var i=t+1;i<r.length;i++){var o=r[i];if(!o.marks||!Array.isArray(o.marks)||-1===o.marks.indexOf(n))break;e[n]++}return e}),{}),o=n.bind(null,i);return e.marks.slice().sort(o)}function n(e,r,n){var i=e[r]||0,o=e[n]||0;if(i!==o)return o-i;var a=t.indexOf(r),l=t.indexOf(n);return a!==l?a-l:r<n?-1:r>n?1:0}e.exports=function(e){var t=e.children,n=e.markDefs;if(!t||!t.length)return[];var i=t.map(r),o={_type:"span",children:[]},a=[o];return t.forEach((function(e,t){var r=i[t];if(r){var o=1;if(a.length>1)for(;o<a.length;o++){var l=a[o].markKey,s=r.indexOf(l);if(-1===s)break;r.splice(s,1)}var u,c=function(e){for(var t=e.length-1;t>=0;t--){var r=e[t];if("span"===r._type&&r.children)return r}return}(a=a.slice(0,o));if(r.forEach((function(t){var r={_type:"span",_key:e._key,children:[],mark:n.find((function(e){return e._key===t}))||t,markKey:t};c.children.push(r),a.push(r),c=r})),"span"!==(u=e)._type||"string"!==typeof u.text||!Array.isArray(u.marks)&&"undefined"!==typeof u.marks)c.children=c.children.concat(e);else{for(var f=e.text.split("\n"),p=f.length;p-- >1;)f.splice(p,0,"\n");c.children=c.children.concat(f)}}else{a[a.length-1].children.push(e)}})),o.children}},7118:function(e,t,r){"use strict";var n=r(6086);function i(e){var t=0,r=e.length;if(0===r)return t;for(var n=0;n<r;n++)t=(t<<5)-t+e.charCodeAt(n),t&=t;return t}e.exports=function(e){return e.map((function(e){return e._key?e:n({_key:(t=e,i(JSON.stringify(t)).toString(36).replace(/[^A-Za-z0-9]/g,""))},e);var t}))}},1643:function(e,t,r){"use strict";var n=r(261),i=r(4050),o=r(6086),a=encodeURIComponent,l="You must either:\n  - Pass `projectId` and `dataset` to the block renderer\n  - Materialize images to include the `url` field.\n\nFor more information, see ".concat(n("block-content-image-materializing"));e.exports=function(e){var t=e.node,r=e.options,n=r.projectId,s=r.dataset,u=t.asset;if(!u)throw new Error("Image does not have required `asset` property");if(u.url)return u.url+function(e){var t=e.imageOptions,r=Object.keys(t);if(!r.length)return"";var n=r.map((function(e){return"".concat(a(e),"=").concat(a(t[e]))}));return"?".concat(n.join("&"))}(r);if(!n||!s)throw new Error(l);if(!u._ref)throw new Error("Invalid image reference in block, no `_ref` found on `asset`");return i(o({projectId:n,dataset:s},r.imageOptions||{})).image(t).toString()}},9608:function(e,t,r){"use strict";var n=r(8019),i=r(1923),o=r(1643),a=r(1051);e.exports={blocksToNodes:function(e,t,r,o){if(r)return i(e,t,r,o);var a=n(e);return i(e,t,a.defaultSerializers,a.serializeSpan)},getSerializers:n,getImageUrl:o,mergeSerializers:a}},1051:function(e,t,r){"use strict";function n(e){return n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}var i=r(6086);e.exports=function(e,t){return Object.keys(e).reduce((function(r,o){var a=n(e[o]);return r[o]="function"===a?"undefined"!==typeof t[o]?t[o]:e[o]:"object"===a?i({},e[o],t[o]):"undefined"===typeof t[o]?e[o]:t[o],r}),{})}},1247:function(e,t,r){"use strict";var n=r(6086);function i(e){return Boolean(e.listItem)}function o(e,t){return e.level===t.level&&e.listItem===t.listItem}function a(e){return{_type:"list",_key:"".concat(e._key,"-parent"),level:e.level,listItem:e.listItem,children:[e]}}function l(e){return e.children&&e.children[e.children.length-1]}function s(e,t){var r="string"===typeof t.listItem;if("list"===e._type&&e.level===t.level&&r&&e.listItem===t.listItem)return e;var n=l(e);return!!n&&s(n,t)}e.exports=function(e){for(var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"html",u=[],c=0;c<e.length;c++){var f=e[c];if(i(f))if(t)if(o(f,t))t.children.push(f);else if(f.level>t.level){var p=a(f);if("html"===r){var h=l(t),d=n({},h,{children:h.children.concat(p)});t.children[t.children.length-1]=d}else t.children.push(p);t=p}else if(f.level<t.level){var m=s(u[u.length-1],f);if(m){(t=m).children.push(f);continue}t=a(f),u.push(t)}else if(f.listItem===t.listItem)console.warn("Unknown state encountered for block",f),u.push(f);else{var y=s(u[u.length-1],{level:f.level});if(y&&y.listItem===f.listItem){(t=y).children.push(f);continue}t=a(f),u.push(t)}else t=a(f),u.push(t);else u.push(f),t=null}return u}},8019:function(e,t,r){"use strict";var n=r(6086),i=r(1643);e.exports=function(e,t){var r=t||{useDashedStyles:!1};function o(t,r){return e(t,null,r.children)}return{defaultSerializers:{types:{block:function(t){var r=t.node.style||"normal";return/^h\d/.test(r)?e(r,null,t.children):e("blockquote"===r?"blockquote":"p",null,t.children)},image:function(t){if(!t.node.asset)return null;var r=e("img",{src:i(t)});return t.isInline?r:e("figure",null,r)}},marks:{strong:o.bind(null,"strong"),em:o.bind(null,"em"),code:o.bind(null,"code"),underline:function(t){var n=r.useDashedStyles?{"text-decoration":"underline"}:{textDecoration:"underline"};return e("span",{style:n},t.children)},"strike-through":function(t){return e("del",null,t.children)},link:function(t){return e("a",{href:t.mark.href},t.children)}},list:function(t){var r="bullet"===t.type?"ul":"ol";return e(r,null,t.children)},listItem:function(t){var r=t.node.style&&"normal"!==t.node.style?e(t.serializers.types.block,t,t.children):t.children;return e("li",null,r)},block:function(t){var r=t.node,n=t.serializers,i=t.options,o=t.isInline,a=t.children,l=r._type,s=n.types[l];if(!s)throw new Error('Unknown block type "'.concat(l,'", please specify a serializer for it in the `serializers.types` prop'));return e(s,{node:r,options:i,isInline:o},a)},span:function(t){var r=t.node,n=r.mark,i=r.children,o="string"===typeof n?n:n._type,a=t.serializers.marks[o];return a?e(a,t.node,i):(console.warn('Unknown mark type "'.concat(o,'", please specify a serializer for it in the `serializers.marks` prop')),e(t.serializers.markFallback,null,i))},hardBreak:function(){return e("br")},container:"div",markFallback:"span",text:void 0,empty:""},serializeSpan:function(t,r,i,o){if("\n"===t&&r.hardBreak)return e(r.hardBreak,{key:"hb-".concat(i)});if("string"===typeof t)return r.text?e(r.text,{key:"text-".concat(i)},t):t;var a;t.children&&(a={children:t.children.map((function(e,r){return o.serializeNode(e,r,t.children,!0)}))});var l=n({},t,a);return e(r.span,{key:t._key||"span-".concat(i),node:l,serializers:r})}}}},4050:function(e){e.exports=function(){function e(){return e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},e.apply(this,arguments)}function t(e,t){if(e){if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function n(e){var r=0;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=t(e)))return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(r=e[Symbol.iterator]()).next.bind(r)}var i="image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg";function o(e){var t=e.split("-"),r=t[1],n=t[2],o=t[3];if(!r||!n||!o)throw new Error("Malformed asset _ref '"+e+"'. Expected an id like \""+i+'".');var a=n.split("x"),l=+a[0],s=+a[1];if(!isFinite(l)||!isFinite(s))throw new Error("Malformed asset _ref '"+e+"'. Expected an id like \""+i+'".');return{id:r,width:l,height:s,format:o}}var a=function(e){return!!e&&"string"===typeof e._ref},l=function(e){return!!e&&"string"===typeof e._id},s=function(e){var t=e;return!(!t||!t.asset)&&"string"===typeof t.asset.url};function u(e){if(!e)return null;var t;if("string"===typeof e&&c(e))t={asset:{_ref:f(e)}};else if("string"===typeof e)t={asset:{_ref:e}};else if(a(e))t={asset:e};else if(l(e))t={asset:{_ref:e._id||""}};else if(s(e))t={asset:{_ref:f(e.asset.url)}};else{if("object"!==typeof e.asset)return null;t=e}var r=e;return r.crop&&(t.crop=r.crop),r.hotspot&&(t.hotspot=r.hotspot),p(t)}function c(e){return/^https?:\/\//.test(""+e)}function f(e){return("image-"+e.split("/").slice(-1)[0]).replace(/\.([a-z]+)$/,"-$1")}function p(t){if(t.crop&&t.hotspot)return t;var r=e({},t);return r.crop||(r.crop={left:0,top:0,bottom:0,right:0}),r.hotspot||(r.hotspot={x:.5,y:.5,height:1,width:1}),r}var h=[["width","w"],["height","h"],["format","fm"],["download","dl"],["blur","blur"],["sharpen","sharp"],["invert","invert"],["orientation","or"],["minHeight","min-h"],["maxHeight","max-h"],["minWidth","min-w"],["maxWidth","max-w"],["quality","q"],["fit","fit"],["crop","crop"],["saturation","sat"],["auto","auto"],["dpr","dpr"],["pad","pad"]];function d(t){var r=e({},t||{}),n=r.source;delete r.source;var i=u(n);if(!i)return null;var a=o(i.asset._ref||i.asset._id||""),l=Math.round(i.crop.left*a.width),s=Math.round(i.crop.top*a.height),c={left:l,top:s,width:Math.round(a.width-i.crop.right*a.width-l),height:Math.round(a.height-i.crop.bottom*a.height-s)},f=i.hotspot.height*a.height/2,p=i.hotspot.width*a.width/2,h=i.hotspot.x*a.width,d=i.hotspot.y*a.height,g={left:h-p,top:d-f,right:h+p,bottom:d+f};return r.rect||r.focalPoint||r.ignoreImageParams||r.crop||(r=e(e({},r),y({crop:c,hotspot:g},r))),m(e(e({},r),{},{asset:a}))}function m(e){var t=e.baseUrl||"https://cdn.sanity.io",r=e.asset.id+"-"+e.asset.width+"x"+e.asset.height+"."+e.asset.format,n=t+"/images/"+e.projectId+"/"+e.dataset+"/"+r,i=[];if(e.rect){var o=e.rect,a=o.left,l=o.top,s=o.width,u=o.height;(0!==a||0!==l||u!==e.asset.height||s!==e.asset.width)&&i.push("rect="+a+","+l+","+s+","+u)}e.bg&&i.push("bg="+e.bg),e.focalPoint&&(i.push("fp-x="+e.focalPoint.x),i.push("fp-y="+e.focalPoint.y));var c=[e.flipHorizontal&&"h",e.flipVertical&&"v"].filter(Boolean).join("");return c&&i.push("flip="+c),h.forEach((function(t){var r=t[0],n=t[1];"undefined"!==typeof e[r]?i.push(n+"="+encodeURIComponent(e[r])):"undefined"!==typeof e[n]&&i.push(n+"="+encodeURIComponent(e[n]))})),0===i.length?n:n+"?"+i.join("&")}function y(e,t){var r,n=t.width,i=t.height;if(!n||!i)return{width:n,height:i,rect:e.crop};var o=e.crop,a=e.hotspot,l=n/i;if(o.width/o.height>l){var s=o.height,u=s*l,c=o.top,f=(a.right-a.left)/2+a.left-u/2;f<o.left?f=o.left:f+u>o.left+o.width&&(f=o.left+o.width-u),r={left:Math.round(f),top:Math.round(c),width:Math.round(u),height:Math.round(s)}}else{var p=o.width,h=p/l,d=o.left,m=(a.bottom-a.top)/2+a.top-h/2;m<o.top?m=o.top:m+h>o.top+o.height&&(m=o.top+o.height-h),r={left:Math.max(0,Math.floor(d)),top:Math.max(0,Math.floor(m)),width:Math.round(p),height:Math.round(h)}}return{width:n,height:i,rect:r}}var g=["clip","crop","fill","fillmax","max","scale","min"],v=["top","bottom","left","right","center","focalpoint","entropy"],b=["format"];function k(e){return!!e&&"object"===typeof e.clientConfig}function w(e){for(var t,r=n(h);!(t=r()).done;){var i=t.value,o=i[0],a=i[1];if(e===o||e===a)return o}return e}function O(e){var t=e;if(k(t)){var r=t.clientConfig,n=r.apiHost,i=r.projectId,o=r.dataset;return new _(null,{baseUrl:(n||"https://api.sanity.io").replace(/^https:\/\/api\./,"https://cdn."),projectId:i,dataset:o})}return new _(null,e)}var _=function(){function t(t,r){this.options=e(t?e({},t.options||{}):{},r||{})}var r=t.prototype;return r.withOptions=function(r){var n=r.baseUrl||this.options.baseUrl,i={baseUrl:n};for(var o in r)r.hasOwnProperty(o)&&(i[w(o)]=r[o]);return new t(this,e({baseUrl:n},i))},r.image=function(e){return this.withOptions({source:e})},r.dataset=function(e){return this.withOptions({dataset:e})},r.projectId=function(e){return this.withOptions({projectId:e})},r.bg=function(e){return this.withOptions({bg:e})},r.dpr=function(e){return this.withOptions({dpr:e})},r.width=function(e){return this.withOptions({width:e})},r.height=function(e){return this.withOptions({height:e})},r.focalPoint=function(e,t){return this.withOptions({focalPoint:{x:e,y:t}})},r.maxWidth=function(e){return this.withOptions({maxWidth:e})},r.minWidth=function(e){return this.withOptions({minWidth:e})},r.maxHeight=function(e){return this.withOptions({maxHeight:e})},r.minHeight=function(e){return this.withOptions({minHeight:e})},r.size=function(e,t){return this.withOptions({width:e,height:t})},r.blur=function(e){return this.withOptions({blur:e})},r.sharpen=function(e){return this.withOptions({sharpen:e})},r.rect=function(e,t,r,n){return this.withOptions({rect:{left:e,top:t,width:r,height:n}})},r.format=function(e){return this.withOptions({format:e})},r.invert=function(e){return this.withOptions({invert:e})},r.orientation=function(e){return this.withOptions({orientation:e})},r.quality=function(e){return this.withOptions({quality:e})},r.forceDownload=function(e){return this.withOptions({download:e})},r.flipHorizontal=function(){return this.withOptions({flipHorizontal:!0})},r.flipVertical=function(){return this.withOptions({flipVertical:!0})},r.ignoreImageParams=function(){return this.withOptions({ignoreImageParams:!0})},r.fit=function(e){if(-1===g.indexOf(e))throw new Error('Invalid fit mode "'+e+'"');return this.withOptions({fit:e})},r.crop=function(e){if(-1===v.indexOf(e))throw new Error('Invalid crop mode "'+e+'"');return this.withOptions({crop:e})},r.saturation=function(e){return this.withOptions({saturation:e})},r.auto=function(e){if(-1===b.indexOf(e))throw new Error('Invalid auto mode "'+e+'"');return this.withOptions({auto:e})},r.pad=function(e){return this.withOptions({pad:e})},r.url=function(){return d(this.options)},r.toString=function(){return this.url()},t}();return O}()},8863:function(e,t,r){"use strict";var n=r(7294),i=r(5697),o=r(8550),a=r(8675),l=a.serializers,s=a.serializeSpan,u=a.renderProps,c=o.getImageUrl,f=o.blocksToNodes,p=o.mergeSerializers,h=n.createElement,d=function e(t){var r=p(e.defaultSerializers,t.serializers),n=Object.assign({},u,t,{serializers:r,blocks:t.blocks||[]});return f(h,n,l,s)};d.defaultSerializers=l,d.getImageUrl=c,d.propTypes={className:i.string,renderContainerOnSingleChild:i.bool,projectId:i.string,dataset:i.string,imageOptions:i.object,serializers:i.shape({types:i.object,marks:i.object,list:i.func,listItem:i.func,block:i.func,span:i.func}),blocks:i.oneOfType([i.arrayOf(i.shape({_type:i.string.isRequired})),i.shape({_type:i.string.isRequired})]).isRequired},d.defaultProps={renderContainerOnSingleChild:!1,serializers:{},imageOptions:{}},e.exports=d},8675:function(e,t,r){"use strict";var n=r(7294),i=(0,r(8550).getSerializers)(n.createElement),o=i.defaultSerializers,a=i.serializeSpan;e.exports={serializeSpan:a,serializers:o,renderProps:{nestMarks:!0}}},261:function(e){e.exports=function(e){return"https://docs.sanity.io/help/"+e}},7190:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(4941).Z;Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,r=e.rootMargin,u=e.disabled||!a,c=i.useRef(),f=n(i.useState(!1),2),p=f[0],h=f[1],d=n(i.useState(null),2),m=d[0],y=d[1];i.useEffect((function(){if(a){if(c.current&&(c.current(),c.current=void 0),u||p)return;return m&&m.tagName&&(c.current=function(e,t,r){var n=function(e){var t,r={root:e.root||null,margin:e.rootMargin||""},n=s.find((function(e){return e.root===r.root&&e.margin===r.margin}));if(n&&(t=l.get(n)))return t;var i=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var t=i.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)}))}),e);return t={id:r,observer:o,elements:i},s.push(r),l.set(r,t),t}(r),i=n.id,o=n.observer,a=n.elements;return a.set(e,t),o.observe(e),function(){if(a.delete(e),o.unobserve(e),0===a.size){o.disconnect(),l.delete(i);var t=s.findIndex((function(e){return e.root===i.root&&e.margin===i.margin}));t>-1&&s.splice(t,1)}}}(m,(function(e){return e&&h(e)}),{root:null==t?void 0:t.current,rootMargin:r})),function(){null==c.current||c.current(),c.current=void 0}}if(!p){var e=o.requestIdleCallback((function(){return h(!0)}));return function(){return o.cancelIdleCallback(e)}}}),[m,u,r,t,p]);var g=i.useCallback((function(){h(!1)}),[]);return[y,p,g]};var i=r(7294),o=r(9311),a="function"===typeof IntersectionObserver;var l=new Map,s=[];("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2703:function(e,t,r){"use strict";var n=r(414);function i(){}function o(){}o.resetWarningCache=i,e.exports=function(){function e(e,t,r,i,o,a){if(a!==n){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function t(){return e}e.isRequired=e;var r={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:o,resetWarningCache:i};return r.PropTypes=r,r}},5697:function(e,t,r){e.exports=r(2703)()},414:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},7737:function(e,t,r){var n=Object.create,i=Object.defineProperty,o=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,l=Object.getOwnPropertyNames,s=Object.getOwnPropertyDescriptor,u=Object.getOwnPropertySymbols,c=Object.prototype.propertyIsEnumerable,f=Object.assign,p=e=>i(e,"__esModule",{value:!0}),h=(e,t)=>{var r={};for(var n in e)a.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&u)for(var n of u(e))t.indexOf(n)<0&&c.call(e,n)&&(r[n]=e[n]);return r},d=e=>((e,t,r)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let n of l(t))!a.call(e,n)&&"default"!==n&&i(e,n,{get:()=>t[n],enumerable:!(r=s(t,n))||r.enumerable});return e})(p(i(null!=e?n(o(e)):{},"default",e&&e.__esModule&&"default"in e?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e);p(t),((e,t)=>{for(var r in t)i(e,r,{get:t[r],enumerable:!0})})(t,{blockContentToPlainText:()=>_,default:()=>k});var m=d(r(7294)),y=d(r(5697)),g=d(r(8863)),v=g.default.defaultSerializers,b=e=>{var{content:t,className:r,serializers:n={},dataset:i,projectId:o}=e,a=h(e,["content","className","serializers","dataset","projectId"]);if(!t)throw new Error("No `content` provided to PortableText.");return m.default.createElement(g.default,f({blocks:t,className:r,serializers:w(n),renderContainerOnSingleChild:!0,dataset:i,projectId:o},a))},k=b;b.propTypes={content:y.default.array.isRequired,className:y.default.string,projectId:y.default.string,dataset:y.default.string,serializers:y.default.shape({link:y.default.elementType,strong:y.default.elementType,em:y.default.elementType,underline:y.default.elementType,del:y.default.elementType,code:y.default.elementType,ul:y.default.elementType,ol:y.default.elementType,li:y.default.elementType,h1:y.default.elementType,h2:y.default.elementType,h3:y.default.elementType,h4:y.default.elementType,h5:y.default.elementType,h6:y.default.elementType,blockquote:y.default.elementType,container:y.default.elementType,block:y.default.elementType,span:y.default.elementType,hardBreak:y.default.elementType,unknownType:y.default.elementType,unknownMark:y.default.elementType})};var w=e=>{let{link:t,strong:r,em:n,underline:i,del:o,code:a,ul:l,ol:s,li:u,h1:c,h2:p,h3:d,h4:y,h5:b,h6:k,blockquote:w,container:_="div",block:j=v.BlockSerializer,span:x=v.SpanSerializer,hardBreak:z=v.HardBreakSerializer,unknownType:S=v.DefaultUnknownTypeSerializer,unknownMark:T="span"}=e,P=h(e,["link","strong","em","underline","del","code","ul","ol","li","h1","h2","h3","h4","h5","h6","blockquote","container","block","span","hardBreak","unknownType","unknownMark"]),M={h1:c,h2:p,h3:d,h4:y,h5:b,h6:k,blockquote:w};return{container:_,block:j,span:x,hardBreak:z,unknownType:S,unknownMark:T,marks:O(f({link:t,strong:r,em:n,underline:i,code:a,"strike-through":o},P)),list:e=>{let{type:t,children:r}=e,n="bullet"===t?l:s;return n?n({children:r}):g.default.defaultSerializers.list(e)},listItem:e=>{let{children:t}=e;return u?u({children:t}):g.default.defaultSerializers.listItem(e)},types:f({block:e=>{let{node:{style:t},children:r}=e;return M[t]?M[t]({children:r}):P[t]?P[t]({children:r}):g.default.defaultSerializers.types.block(e)}},Object.entries(P).reduce(((e,[t,r])=>{let n=({node:e})=>m.default.createElement(r,e);return n.displayName=`${I(t)}Wrapper`,e[t]=n,e}),{}))}},O=e=>Object.entries(e).reduce(((e,[t,r])=>{if(r){let n=e=>{var{_type:t,_key:n,mark:i,markKey:o,children:a}=e,l=h(e,["_type","_key","mark","markKey","children"]);if("object"==typeof i){let{_type:e,_key:t}=i,r=h(i,["_type","_key"]);Object.entries(r).forEach((([e,t])=>{l[e]=t}))}return m.default.createElement(r,l,a)};n.displayName=`${I(t)}Wrapper`,e[t]=n}return e}),{}),_=(e=[])=>e.map((e=>"block"===e._type&&e.children?e.children.map((e=>e.text)).join(""):"")).join("\n\n"),I=e=>e.slice(0,1).toUpperCase()+e.slice(1)},9396:function(e,t,r){"use strict";function n(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})),e}r.d(t,{Z:function(){return n}})}}]);