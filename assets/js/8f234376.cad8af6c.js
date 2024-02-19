"use strict";(self.webpackChunkwww_qroma_project=self.webpackChunkwww_qroma_project||[]).push([[1432],{3613:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>g,contentTitle:()=>r,default:()=>m,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var a=n(4848),s=n(8453),l=n(1690);const i={title:"Qroma Hat App"},r="Qroma Hat App",o={type:"mdx",permalink:"/qroma-hat/app/",source:"@site/src/pages/app/index.md",title:"Qroma Hat App",description:"To connect to your Qroma Lights device, plug it into your computer's USB port",frontMatter:{title:"Qroma Hat App"},unlisted:!1},g={},c=[];function d(e){const t={h1:"h1",p:"p",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{id:"qroma-hat-app",children:"Qroma Hat App"}),"\n",(0,a.jsxs)(t.p,{children:["To connect to your Qroma Lights device, plug it into your computer's USB port\nand click the Connect button. When prompted\nto connect to a serial port, select the entry with the most likely name\n(e.g. something-",(0,a.jsx)("b",{children:"usbserial"}),")."]}),"\n",(0,a.jsx)(l.A,{})]})}function m(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},1690:(e,t,n)=>{n.d(t,{A:()=>ue});var a=n(6540),s=n(7733),l=n(3581),i=n(4016),r=n(6786);const o=960,g=540;var c=n(4848);const d=e=>{let{componentState:t}=e;const n=t.grayscaleData,[s,l]=(0,a.useState)("");return console.log("RENDERING GrayscaleConversionOutputImage"),(0,a.useEffect)((()=>{console.log("IN USE EFFECT");const e=document.createElement("canvas");console.log(e),e.width=n.imageWidthInPixels,e.height=n.imageHeightInPixels;const t=e.getContext("2d");if(null===t)return;console.log("CANVAS CTX: "+t);var a=t.createImageData(n.imageWidthInPixels,n.imageHeightInPixels);console.log("IMAGE DATA: "+a);for(let l=0;l<n.dataAsNibbles.length;l++){const e=16*n.dataAsNibbles[l],t=4*l;a.data[t]=e,a.data[t+1]=e,a.data[t+2]=e,a.data[t+3]=255}t.putImageData(a,0,0);const s=e.toDataURL();console.log("CANVAS"),console.log(e),l(s),console.log(`SETTING CANVAS HEIGHT: ${n.imageHeightInPixels}`),console.log(`SETTING CANVAS WIDTH: ${n.imageWidthInPixels}`)}),[t.grayscaleData]),(0,c.jsx)(c.Fragment,{children:(0,c.jsx)("div",{style:{width:480,height:270},children:(0,c.jsx)("img",{src:s})})})};var m=n(5674);let p=function(e){return e.lightness="lightness",e.average="average",e.luminosity="luminosity",e}({});const u=e=>e<16?[0,0,0,0]:e<32?[0,0,0,1]:e<48?[0,0,1,0]:e<64?[0,0,1,1]:e<80?[0,1,0,0]:e<96?[0,1,0,1]:e<112?[0,1,1,0]:e<128?[0,1,1,1]:e<144?[1,0,0,0]:e<160?[1,0,0,1]:e<176?[1,0,1,0]:e<192?[1,0,1,1]:e<208?[1,1,0,0]:e<224?[1,1,0,1]:e<240?[1,1,1,0]:[1,1,1,1],h=e=>{const{p1r:t,p1g:n,p1b:a,p2r:s,p2g:l,p2b:i}=e,r=(s+l+i)/3,o=u((t+n+a)/3),g=u(r);return 16*m.Ay.nibble.write(o)+m.Ay.nibble.write(g)},x=e=>{const{p1r:t,p1g:n,p1b:a,p2r:s,p2g:l,p2b:i}=e,r=(s+l+i)/3,o=u((t+n+a)/3),g=u(r);return[m.Ay.nibble.write(o),m.Ay.nibble.write(g)]},v=e=>{const t=e.imageData.width;if(t%2!=0)throw new Error("Image width must be even");if(e.conversionAlgorithm!==p.average)throw new Error("Unsupported GS conversion algorithm: "+e.conversionAlgorithm);const n=e.imageData.height,a=[],s=[];for(let l=0;l<n;l++)for(let n=0;n<t;n+=2){const s=4*(l*t+n),i=e.imageData.data,r=h({p1r:i[s],p1g:i[s+1],p1b:i[s+2],p2r:i[s+4],p2g:i[s+5],p2b:i[s+6]});a.push(r)}for(let l=0;l<n;l++)for(let n=0;n<t;n+=2){const a=4*(l*t+n),i=e.imageData.data,[r,o]=x({p1r:i[a],p1g:i[a+1],p1b:i[a+2],p2r:i[a+4],p2g:i[a+5],p2b:i[a+6]});s.push(r),s.push(o)}return{dataAsUint8Array:new Uint8ClampedArray(a),dataAsNibbles:s,imageHeightInPixels:n,imageWidthInPixels:t,imageLabel:e.imageLabel}},I=e=>{const t=e.length/2,n=[];for(let l=0;l<t;l++){const t=2*l,i=(a=e[t],s=e[t+1],`0x${a.toString(16).toUpperCase()}${s.toString(16).toUpperCase()}`);n.push(i)}var a,s;return n.join(",")},f=(e,t)=>{const n=e.imageWidthInPixels,a=e.imageHeightInPixels,s=e.imageWidthInPixels*e.imageHeightInPixels,l=(e=>((e,t)=>{const n=[];for(let a=0;a<e.length;a+=t)n.push(e.slice(a,a+t));return n})(e.dataAsNibbles,e.imageWidthInPixels).map(I).join(",\n"))(e);return`\n\n#include "${t.imageTypesFilePath}"\n\nconst uint32_t thisImageWidth = ${n};\nconst uint32_t thisImageHeight = ${a};\nconst uint32_t thisImageArea = ${s};\nconst uint8_t thisImageData[thisImageArea / 2] = {\n${l}\n};\n\n\nHatGsBmpImageDef image_XX_def = {\n  .imageWidth = thisImageWidth,\n  .imageHeight = thisImageHeight,\n  .imageData = thisImageData,\n  .imageLabel = "${e.imageLabel}",\n};\n`},b=e=>{let{text:t,fileName:n}=e;const[s,l]=(0,a.useState)(!1),i=new Blob([t],{type:"text/plain"});var[r,o]=(0,a.useState)("");let g=new FileReader;g.readAsDataURL(i),g.onload=function(){const e=g.result;o(e)};return(0,c.jsx)(c.Fragment,{children:(0,c.jsx)("button",{disabled:s,onClick:()=>{l(!0);const e=document.createElement("a");e.href=r,e.download=n,document.body.appendChild(e),e.click(),setTimeout((()=>{l(!1),document.body.removeChild(e)}),2e3)},children:s?"Loading...":"Download"})})},S=e=>{let{text:t}=e;const[n,s]=(0,a.useState)(!1);return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("button",{onClick:()=>{navigator.clipboard.writeText(t).then((()=>{s(!0)}))},children:"Copy to clipboard"}),n&&(0,c.jsx)("p",{children:"Copied to clipboard!"})]})},j=()=>(0,c.jsx)("div",{children:"Arduino Output View"}),A=e=>{let{gsData:t,svgTemplateInputs:n}=e;if(!t)return(0,c.jsx)(j,{});const a=f(t,n),s=t.imageLabel.replace(/ /g,"-"),i=`gs_bmp_image_XX-${n.imageGroupNameRoot}_${s}.cpp`;return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(b,{text:a,fileName:i}),(0,c.jsx)(S,{text:a}),(0,c.jsx)("div",{children:(0,c.jsx)(l.A,{id:"outlined-multiline-static",label:".CPP file Content",multiline:!0,value:a,fullWidth:!0,inputProps:{style:{fontFamily:"monospace",height:"225px",overflow:"scroll"}}})})]})},w=e=>{if((e=(e=e.trim()).slice(e.indexOf("<svg"))).startsWith("<svg")&&e.endsWith("svg>")&&(e.includes("http://www.w3.org/2000/svg")||(e=e.replace(/<svg/g,"<svg xmlns='http://www.w3.org/2000/svg'")),(e=(e=(e=(e=(e=(e=(e=e.replace(/<!--.{1,}-->/g,"")).replace(/version=[\"\'](.{0,}?)[\"\'](?=[\s>])/g,"")).replace(/"'(.{1,})'"/g,"'$1'")).replace(/"/g,"'")).replace(/>\s{1,}</g,"><")).replace(/\s{2,}/g," ")).trim()).startsWith("<svg")&&e.endsWith("svg>")))return e=`data:image/svg+xml,${e=(e=e.replace(/&/g,"&amp;")).replace(/[%#<>?\[\\\]^`{|}]/g,encodeURIComponent)}`},y=e=>{const t=(0,a.useRef)(null);return(0,c.jsx)("div",{style:{width:480,height:270},children:(0,c.jsx)("img",{ref:t,src:e.svgAsDataUrl,onLoad:()=>{try{if(null===t||null===t.current)return;const n=document.createElement("canvas");n.width=t.current.naturalWidth,n.height=t.current.naturalHeight;const a=n.getContext("2d");a.drawImage(t.current,0,0);const s=a.getImageData(0,0,n.width,n.height),l=v({imageData:s,conversionAlgorithm:p.average,imageLabel:e.gsImageLabel});console.log(l),e.onGsConvertedData(l)}catch(n){console.log("CANVAS ERROR: "+n)}},height:0,width:0})})},T=256,D=16777216,F=e=>64+e,C=e=>{if(e<=63)return[F(e)];if(e<=16383)return(e=>{const t=e%T;return[128+Math.floor(e/T),t]})(e);if(e<=1073741823)return(e=>{const t=e%T,n=e%65536,a=Math.floor(n/T),s=e%D,l=Math.floor(s/65536);return[192+Math.floor(e/D),l,a,t]})(e);throw new Error("Pixel count is too high to create Op Run: "+e)},L=e=>{let t=e.toString(16);t.length<2&&(t="0"+t);return"0x"+t},G=e=>`${L(e.opPlacePixelByte)}, ${e.opRunLength.map(L).join(", ")},   // OP_PLACE GS: ${e.gsValue}, OP_RUN LENGTH: ${e.runLengthInPixels}`,P=(e,t,n)=>{const a=e.imageWidthInPixels,s=e.imageHeightInPixels,l=(e=>{const t=[],n=[],a=e.gsData,s=e.gsData.dataAsNibbles;let l=s[0],i=0;for(let r=0;r<s.length;r++)if(s[r]===l)i++;else{const e=l,a=C(i);t.push(e),t.push(...a),n.push({gsValue:l,runLengthInPixels:i,opPlacePixelByte:e,opRunLength:a,runBytes:new Uint8ClampedArray([e,...a])}),i=1,l=s[r]}if(i>0){const e=l,a=C(i);t.push(e),t.push(...a),n.push({gsValue:l,runLengthInPixels:i,opPlacePixelByte:e,opRunLength:a,runBytes:new Uint8ClampedArray([e,...a])})}return{imageHeightInPixels:a.imageHeightInPixels,imageWidthInPixels:a.imageWidthInPixels,imageLabel:a.imageLabel,dataAsUint8Array:new Uint8ClampedArray(t),pixelRuns:n}})({gsData:e}),i=(e=>{console.log("PIXEL RUNS"),console.log(e.pixelRuns);const t=e.pixelRuns.map(G);return console.log(t),t.join("\n")})(l),r=i,o=e.imageLabel.replace(/ /g,"_"),g=`thisImageLabel_${`${n.imageGroupNameRoot}_${o}`}`;return`\n#include "${n.imageTypesFilePath}"\n\nconst uint8_t thisDgsrData[\n  ${l.dataAsUint8Array.length}   // ${l.dataAsUint8Array.length} bytes of DGSR data\n] = {\n${r}\n};\n\nconst char * ${g} = "${l.imageLabel}";\n\nHatDgsrImageDef dgsr_image_XX_def = {\n  .magic = {'d', 'g', 's', 'r'},\n  \n  .imageWidth = ${a},\n  .imageHeight = ${s},\n  .gsBitsPerPixel = ${t},\n\n  .dgsrDataByteCount = ${l.dataAsUint8Array.length},\n\n  .metadata = {\n    .imageLabel = ${g},\n  },\n\n  .dgrsData = thisDgsrData,\n};\n`},U=()=>(0,c.jsx)("div",{children:"Arduino DGSR Output View"}),N=e=>{let{gsData:t,svgTemplateInputs:n}=e;if(!t)return(0,c.jsx)(U,{});const a=P(t,4,n),s=t.imageLabel.replace(/ /g,"-"),i=`dgsr_image_XX-${n.imageGroupNameRoot}-${s}.cpp`;return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(b,{text:a,fileName:i}),(0,c.jsx)(S,{text:a}),(0,c.jsx)("div",{children:(0,c.jsx)(l.A,{id:"outlined-multiline-static",label:"DGSR .CPP file Content",multiline:!0,value:a,fullWidth:!0,inputProps:{style:{fontFamily:"monospace",height:"225px",overflow:"scroll"}}})})]})};function R(e){const{children:t,value:n,index:a,...l}=e;return(0,c.jsx)("div",{role:"tabpanel",hidden:n!==a,id:`simple-tabpanel-${a}`,"aria-labelledby":`simple-tab-${a}`,...l,children:n===a&&(0,c.jsx)(s.A,{sx:{p:3},children:t})})}function E(e){return{id:`simple-tab-${e}`,"aria-controls":`simple-tabpanel-${e}`}}const k=e=>{let{svgInputText:t}=e;return console.log("svgInputText"),console.log(t),(0,c.jsx)(c.Fragment,{children:(0,c.jsx)("div",{children:(0,c.jsx)(l.A,{id:"outlined-multiline-static",label:"SVG Input",multiline:!0,value:t,fullWidth:!0,inputProps:{style:{fontFamily:"monospace",height:"250px",overflow:"scroll"}}})})})},W=e=>{const[t,n]=a.useState(1),l=async()=>{var t=document.createElement("img");const n=w(e.componentState.svgImageText);t.onload=async()=>{let n=new FileReader;const a=new Blob([e.componentState.svgImageText],{type:"image/svg+xml"});n.readAsDataURL(a),n.onload=function(){const a=n.result;(t=>{try{const n=document.createElement("canvas").getContext("2d");n.drawImage(t,0,0);const a=n?.getImageData(0,0,t.width,t.height),s=v({imageData:a,conversionAlgorithm:p.average,imageLabel:e.componentState.gsImageLabel});e.onNewGrayscaleData(s)}catch(n){console.log("CANVAS ERROR: "+n)}})(t),e.onNewSvgImageAsDataUrl(a)}},t.src=n};return(0,a.useEffect)((()=>{(async()=>{await l()})()}),[e.componentState.svgImageText]),(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(s.A,{sx:{borderBottom:1,borderColor:"divider",height:400},children:[(0,c.jsx)("canvas",{id:"canvas-ImageOutputView",height:0,width:0}),(0,c.jsx)("div",{style:{width:0,height:0},children:(0,c.jsx)(y,{svgAsDataUrl:e.componentState.svgImageAsDataUrl,gsImageLabel:e.componentState.gsImageLabel,onGsConvertedData:t=>{e.onNewGrayscaleData(t)}})}),(0,c.jsx)(s.A,{sx:{borderBottom:1,borderColor:"divider"},children:(0,c.jsxs)(i.A,{value:t,onChange:(e,t)=>{n(t)},"aria-label":"basic tabs example",variant:"scrollable",children:[(0,c.jsx)(r.A,{label:"SVG Text",...E(0)}),(0,c.jsx)(r.A,{label:"SVG Image",...E(1)}),(0,c.jsx)(r.A,{label:"Grayscale",...E(2)}),(0,c.jsx)(r.A,{label:"Arduino",...E(3)}),(0,c.jsx)(r.A,{label:"Arduino/DGSR",...E(4)})]})}),(0,c.jsx)(R,{value:t,index:0,children:(0,c.jsx)(k,{svgInputText:e.componentState.svgImageText})}),(0,c.jsx)(R,{value:t,index:1,children:(0,c.jsx)("div",{style:{width:480,height:270},children:(0,c.jsx)("img",{src:e.componentState.svgImageAsDataUrl})})}),(0,c.jsx)(R,{value:t,index:2,children:(0,c.jsx)(d,{componentState:e.componentState})}),(0,c.jsx)(R,{value:t,index:3,children:(0,c.jsx)(A,{gsData:e.componentState.grayscaleData,svgTemplateInputs:e.componentState.svgTemplateInputs})}),(0,c.jsx)(R,{value:t,index:4,children:(0,c.jsx)(N,{gsData:e.componentState.grayscaleData,svgTemplateInputs:e.componentState.svgTemplateInputs})})]})})};var $=n(3870),H=n(26),_=n(8440),B=n(2909),O=n(3232),V=n(7512),z=n(1523),M=n(5848);const X="LINE1",q=e=>{let{line1:t,svgTemplateInputs:n}=e;return(0,c.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",version:"1.1",baseProfile:"full",width:o,height:g,children:[(0,c.jsx)("rect",{width:"100%",height:"100%",fill:"white",stroke:"black",strokeWidth:n.borderWidth,strokeOpacity:"1.0"}),(0,c.jsx)("text",{x:480,y:270,fontSize:n.fontSize,fontFamily:n.fontFamily,textAnchor:"middle",dominantBaseline:"middle",fill:"black",children:t})]})},Q=(e,t)=>({newSvgText:(0,M.F0)((0,c.jsx)(q,{line1:e,svgTemplateInputs:t})),svgImageLabel:e}),K=e=>{const[t,n]=(0,a.useState)(X),[s,i]=(0,a.useState)("Arial, Helvetica, sans-serif"),[r,o]=(0,a.useState)(160),[g,d]=(0,a.useState)("");return(0,a.useEffect)((()=>{e.svgGenerationInputsUpdateFn(Q(t,e.templateInputs))}),[t,e.templateInputs]),(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(z.A,{spacing:2,children:(0,c.jsx)(l.A,{id:"outlined-required",label:"Line 1",value:t,onChange:e=>{const t=e.target.value;n(t)}},"single-line-text-line1-input")})})},Y=e=>{let{line1:t,line2:n,svgTemplateInputs:a}=e;return(0,c.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",version:"1.1",baseProfile:"full",width:o,height:g,children:[(0,c.jsx)("rect",{width:"100%",height:"100%",fill:"white",stroke:"black",strokeWidth:a.borderWidth,strokeOpacity:"1.0"}),(0,c.jsx)("text",{x:480,y:178.20000000000002,fontSize:a.fontSize,fontFamily:a.fontFamily,textAnchor:"middle",dominantBaseline:"middle",fill:"black",children:t}),(0,c.jsx)("text",{x:480,y:405,fontSize:a.fontSize,fontFamily:a.fontFamily,textAnchor:"middle",dominantBaseline:"middle",fill:"black",children:n})]})},Z=(e,t,n)=>({newSvgText:(0,M.F0)((0,c.jsx)(Y,{line1:e,line2:t,svgTemplateInputs:n})),svgImageLabel:e+" "+t}),J=e=>{console.log("IN FORM PROVIDER - 2");const[t,n]=(0,a.useState)("QROMA"),[s,i]=(0,a.useState)("HAT");return(0,a.useEffect)((()=>{e.svgGenerationInputsUpdateFn(Z(t,s,e.templateInputs))}),[t,s,e.templateInputs]),(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(z.A,{spacing:2,children:[(0,c.jsx)(l.A,{id:"outlined-required",label:"Line 1",value:t,onChange:e=>{const t=e.target.value;n(t)}}),(0,c.jsx)(l.A,{id:"outlined-required",label:"Line 2",value:s,onChange:e=>{const t=e.target.value;i(t)}})]})})},ee=e=>{let{line1:t,line2:n,line3:a,svgTemplateInputs:s}=e;return(0,c.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",version:"1.1",baseProfile:"full",width:o,height:g,children:[(0,c.jsx)("rect",{width:"100%",height:"100%",fill:"white",stroke:"black",strokeWidth:s.borderWidth,strokeOpacity:"1.0"}),(0,c.jsx)("text",{x:480,y:108,fontSize:s.fontSize,fontFamily:s.fontFamily,textAnchor:"middle",dominantBaseline:"middle",fill:"black",children:t}),(0,c.jsx)("text",{x:480,y:270,fontSize:s.fontSize,fontFamily:s.fontFamily,textAnchor:"middle",dominantBaseline:"middle",fill:"black",children:n}),(0,c.jsx)("text",{x:480,y:432,fontSize:s.fontSize,fontFamily:s.fontFamily,textAnchor:"middle",dominantBaseline:"middle",fill:"black",children:a})]})},te=(e,t,n,a)=>({newSvgText:(0,M.F0)((0,c.jsx)(ee,{line1:e,line2:t,line3:n,svgTemplateInputs:a})),svgImageLabel:e+" "+t+" "+n}),ne=e=>{console.log("IN FORM PROVIDER - 2");const[t,n]=(0,a.useState)("FIRST"),[s,i]=(0,a.useState)("GENERATION"),[r,o]=(0,a.useState)("PERFECT"),[g,d]=(0,a.useState)("arial"),[m,p]=(0,a.useState)(140);return(0,a.useEffect)((()=>{e.svgGenerationInputsUpdateFn(te(t,s,r,{...e.templateInputs,fontSize:m}))}),[t,s,r,e.templateInputs]),(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(z.A,{spacing:2,children:[(0,c.jsx)(l.A,{id:"outlined-required",label:"Line 1",value:t,onChange:e=>{const t=e.target.value;n(t)}}),(0,c.jsx)(l.A,{id:"outlined-required",label:"Line 2",value:s,onChange:e=>{const t=e.target.value;i(t)}}),(0,c.jsx)(l.A,{id:"outlined-required",label:"Line 3",value:r,onChange:e=>{const t=e.target.value;o(t)}})]})})},ae=e=>{const[t,n]=(0,a.useState)(null),[s,l]=(0,a.useState)(null);return(0,c.jsxs)("div",{children:[(0,c.jsx)("input",{type:"file",onChange:e=>{const t=e.target.files?.[0];l(t)}}),(0,c.jsx)("button",{onClick:()=>{if(!s)return;const t=new FileReader;t.onloadend=()=>{const a=t.result;n(a),e.onNewImageDataUrl(a)},t.readAsDataURL(s)},children:"Upload"}),t&&(0,c.jsx)("img",{src:t,alt:"uploaded"})]})},se="Put Image Name Here",le=e=>{let{embeddedImageUrl:t}=e;return(0,c.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",version:"1.1",width:o,height:g,children:[(0,c.jsx)("rect",{width:"100%",height:"100%",fill:"white",stroke:"black",strokeWidth:"20",strokeOpacity:"1.0"}),(0,c.jsx)("image",{x:"190",y:"65",xlinkHref:t})]})},ie=(e,t)=>({newSvgText:(0,M.F0)((0,c.jsx)(le,{embeddedImageUrl:e})),svgImageLabel:t}),re=e=>{let{svgGenerationInputsUpdateFn:t}=e;const[n,s]=(0,a.useState)(se),[i,r]=(0,a.useState)("");return(0,a.useEffect)((()=>{t(ie(i,n))}),[i,n]),(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(z.A,{spacing:2,children:[(0,c.jsx)(ae,{onNewImageDataUrl:e=>{r(e)}}),(0,c.jsx)(l.A,{id:"outlined-required",label:"Image Name",value:n,onChange:e=>{const a=e.target.value;s(a),t(ie(i,n))}},"single-line-text-line1-input")]})})},oe=[{templateTitle:"Double Line",defaultSvgToGrayscaleInputs:e=>Z("","",e),formProvider:e=>(0,c.jsx)(J,{svgGenerationInputsUpdateFn:e.svgGenerationInputsUpdateFn,templateInputs:e.templateInputs})},{templateTitle:"Single Line",defaultSvgToGrayscaleInputs:e=>Q(X,e),formProvider:e=>(0,c.jsx)(K,{svgGenerationInputsUpdateFn:e.svgGenerationInputsUpdateFn,templateInputs:e.templateInputs})},{templateTitle:"Triple Line",defaultSvgToGrayscaleInputs:e=>te("","","",e),formProvider:e=>(0,c.jsx)(ne,{svgGenerationInputsUpdateFn:e.svgGenerationInputsUpdateFn,templateInputs:e.templateInputs})},{templateTitle:"Embedded Image",defaultSvgToGrayscaleInputs:()=>ie("",se),formProvider:e=>(0,c.jsx)(re,{svgGenerationInputsUpdateFn:e.svgGenerationInputsUpdateFn})}],ge=e=>{const[t,n]=(0,a.useState)(!1),l=(e,t,n)=>{if(null===e)return null;const a=parseInt(e);return a>=t&&a<=n?a:null};return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(s.A,{sx:{borderColor:"divider"},children:[(0,c.jsxs)($.Ay,{container:!0,spacing:2,children:[(0,c.jsx)($.Ay,{item:!0,xs:8,children:(0,c.jsxs)(H.A,{fullWidth:!0,children:[(0,c.jsx)(_.A,{id:"svg-template-select-label",children:"SVG Template"}),(0,c.jsx)(B.A,{labelId:"svg-template-select-label",id:"svg-template-select",value:e.svgTemplateIndex,label:"SVG Template",onChange:t=>{const n=t.target.value;console.log("SVG TEMPLATE INDEX: "+n);const a=oe[n];e.onNewSvgTemplateSelected(n,a)},children:oe.map(((e,t)=>(0,c.jsx)(O.A,{value:t,children:e.templateTitle},e.templateTitle)))})]})}),(0,c.jsx)($.Ay,{item:!0,xs:4,children:(0,c.jsx)(V.A,{onClick:()=>n(!t),children:t?"Hide Settings":"Settings"})}),t?(0,c.jsx)($.Ay,{item:!0,xs:12,children:(0,c.jsxs)(z.A,{spacing:2,children:[(0,c.jsxs)("div",{children:["Font Size: ",e.svgTemplateInputs.fontSize,(0,c.jsx)("button",{onClick:()=>{const t=window.prompt("Choose new font size (20-300)",e.svgTemplateInputs.fontSize.toString());console.log("NEW FONT SIZE: "+t);const n=l(t,20,300);null!==n&&e.onNewSvgTemplateInputs({...e.svgTemplateInputs,fontSize:n})},children:"Change"})]}),(0,c.jsxs)("div",{children:["Border Thickness: ",e.svgTemplateInputs.borderWidth,(0,c.jsx)("button",{onClick:()=>{const t=window.prompt("Choose new border thickness (20-300)",e.svgTemplateInputs.borderWidth.toString());console.log("NEW BORDER THICKNESS: "+t);const n=l(t,20,300);null!==n&&e.onNewSvgTemplateInputs({...e.svgTemplateInputs,borderWidth:n})},children:"Change"})]})]})}):null]}),(0,c.jsx)("div",{})]})})};var ce=n(2979);class de extends ce.ImmerReducer{setSvgText(e){if(this.draftState.svgImageText!==e){this.draftState.svgImageText=e;const t=w(e);this.draftState.svgImageAsDataUrl=t}}setGsImageLabel(e){this.draftState.gsImageLabel!==e&&(this.draftState.gsImageLabel=e)}setImageGrayscaleData(e){this.draftState.grayscaleData=e}setSvgToGrayscaleTemplate(e){this.draftState.svgToGrayscaleTemplate!==e&&(this.draftState.svgToGrayscaleTemplate=e)}setSvgImageAsDataUrl(e){this.draftState.svgImageAsDataUrl!==e&&(this.draftState.svgImageAsDataUrl=e)}setSvgTemplateInputs(e){console.log(e),this.draftState.svgTemplateInputs!==e&&(this.draftState.svgTemplateInputs=e)}}const me=(0,ce.createActionCreators)(de),pe=(0,ce.createReducerFunction)(de),ue=()=>{const e=(e=>{const t={fontFamily:"arial",fontSize:170,borderWidth:20,imageTypesFilePath:"../../images/image_types.h",imageGroupNameRoot:"frank_hats_season2"};return{svgImageText:e.defaultSvgToGrayscaleInputs(t).newSvgText,svgImageAsDataUrl:"",grayscaleData:{dataAsUint8Array:new Uint8ClampedArray,dataAsNibbles:[],imageHeightInPixels:0,imageWidthInPixels:0,imageLabel:"UNLABELED IMAGE"},gsImageLabel:"NO LABEL SET YET",svgToGrayscaleTemplate:e,svgTemplateInputs:t}})(oe[0]),[t,n]=(0,a.useState)(0),[s,l]=(0,a.useReducer)(pe,e),i=e=>{l(me.setSvgText(e.newSvgText)),l(me.setGsImageLabel(e.svgImageLabel))};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(ge,{svgTemplateIndex:t,onNewSvgTemplateSelected:(e,t)=>{n(e),l(me.setSvgToGrayscaleTemplate(t))},onGenerateNewSvg:e=>{i(e)},onSvgTemplateFormUpdate:(e,t)=>{},svgTemplateInputs:s.svgTemplateInputs,onNewSvgTemplateInputs:e=>{l(me.setSvgTemplateInputs(e))}}),(0,c.jsx)("div",{style:{},children:(0,c.jsx)(W,{componentState:s,onNewGrayscaleData:e=>{l(me.setImageGrayscaleData(e))},onNewSvgImageAsDataUrl:e=>{l(me.setSvgImageAsDataUrl(e))}})}),oe[t].formProvider({templateInputs:s.svgTemplateInputs,svgGenerationInputsUpdateFn:i})]})}}}]);