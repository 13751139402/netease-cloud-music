(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-46f3528c"],{"0813":function(t,e,i){"use strict";var n=i("ca79"),s=i.n(n);s.a},2381:function(t,e,i){},"77a8":function(t,e,i){"use strict";var n=i("dea6"),s=i.n(n);s.a},"9ed6":function(t,e,i){"use strict";i.r(e);var n,s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{attrs:{id:"login"}},[i("div",{attrs:{id:"logo"}},[i("div",{attrs:{id:"logoArea"}},[i("i",{staticClass:"iconfont icon-wangyiyunyinle logoIcon",attrs:{slot:"icon"},slot:"icon"})])]),i("article",[i("div",{attrs:{id:"content"}},[i("van-button",{staticClass:"btn",attrs:{plain:"",type:"danger",size:"large",round:""},on:{click:t.loginIn}},[t._v("手机号登陆")]),i("van-button",{staticClass:"btn",staticStyle:{background:"#de3425"},attrs:{plain:"",type:"danger",size:"large",round:"",color:"#fff"},on:{click:t.experience}},[t._v("立即体验")]),i("ul",[i("li",[i("btnRound",{on:{click:t.failToast}},[i("i",{staticClass:"iconfont icon-weixin",attrs:{slot:"icon"},slot:"icon"})])],1),i("li",[i("btnRound",{on:{click:t.failToast}},[i("i",{staticClass:"iconfont icon-icon",attrs:{slot:"icon"},slot:"icon"})])],1),i("li",[i("btnRound",{on:{click:t.failToast}},[i("i",{staticClass:"iconfont icon-xinlang",attrs:{slot:"icon"},slot:"icon"})])],1),i("li",[i("btnRound",{on:{click:t.failToast}},[i("i",{staticClass:"iconfont icon-wangyi",attrs:{slot:"icon"},slot:"icon"})])],1)]),i("footer",[i("van-checkbox",{attrs:{"checked-color":"#f56d5f"},model:{value:t.agree,callback:function(e){t.agree=e},expression:"agree"}},[i("span",[t._v("\n            同意\n            "),i("span",{staticClass:"whiteSpan"},[t._v("《用户协议》")]),t._v("和\n            "),i("span",{staticClass:"whiteSpan"},[t._v("《隐私政策》")])])])],1)],1)])])},a=[],o=(i("e7e5"),i("d399")),c=i("bd86"),l=(i("68ef"),i("d282")),r=i("9884"),u=Object(l["a"])("checkbox-group"),d=u[0],h=u[1],b=d({mixins:[Object(r["b"])("vanCheckbox")],props:{max:Number,disabled:Boolean,value:{type:Array,default:function(){return[]}}},watch:{value:function(t){this.$emit("change",t)}},render:function(){var t=arguments[0];return t("div",{class:h()},[this.slots()])}}),f=(i("09fe"),i("2381"),i("ad06")),p=i("ea8e"),m=function(t){var e=t.parent,i=t.bem,n=t.role;return{mixins:[Object(r["a"])(e)],props:{name:null,value:null,disabled:Boolean,iconSize:[Number,String],checkedColor:String,labelPosition:String,labelDisabled:Boolean,shape:{type:String,default:"round"}},computed:{isDisabled:function(){return this.parent&&this.parent.disabled||this.disabled},iconStyle:function(){var t=this.checkedColor;if(t&&this.checked&&!this.isDisabled)return{borderColor:t,backgroundColor:t}},tabindex:function(){return this.isDisabled||"radio"===n&&!this.checked?-1:0}},methods:{onClick:function(t){var e=this.$refs.label,i=t.target,n=e&&(e===i||e.contains(i));this.disabled||n&&this.labelDisabled||this.toggle(),this.$emit("click",t)}},render:function(){var t=arguments[0],e=this.slots,s=this.checked,a=e("icon",{checked:s})||t(f["a"],{attrs:{name:"success"},style:this.iconStyle}),o=e()&&t("span",{ref:"label",class:i("label",[this.labelPosition,{disabled:this.isDisabled}])},[e()]),c=[t("div",{class:i("icon",[this.shape,{disabled:this.isDisabled,checked:s}]),style:{fontSize:Object(p["a"])(this.iconSize)}},[a])];return"left"===this.labelPosition?c.unshift(o):c.push(o),t("div",{attrs:{role:n,tabindex:this.tabindex,"aria-checked":String(this.checked)},class:i(),on:{click:this.onClick}},[c])}}},g=Object(l["a"])("checkbox"),k=g[0],v=g[1],x=k({mixins:[m({bem:v,role:"checkbox",parent:"vanCheckbox"})],computed:{checked:{get:function(){return this.parent?-1!==this.parent.value.indexOf(this.name):this.value},set:function(t){this.parent?this.setParentValue(t):this.$emit("input",t)}}},watch:{value:function(t){this.$emit("change",t)}},methods:{toggle:function(){var t=this,e=!this.checked;clearTimeout(this.toggleTask),this.toggleTask=setTimeout(function(){t.checked=e})},setParentValue:function(t){var e=this.parent,i=e.value.slice();if(t){if(e.max&&i.length>=e.max)return;-1===i.indexOf(this.name)&&(i.push(this.name),e.$emit("input",i))}else{var n=i.indexOf(this.name);-1!==n&&(i.splice(n,1),e.$emit("input",i))}}}}),y=(i("66b9"),i("b650")),C=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("button",{staticClass:"round",on:{click:t.submit}},[t._t("icon")],2)},O=[],S={name:"btnRound",props:{icon:String},methods:{submit:function(){this.$emit("click")}}},j=S,w=(i("0813"),i("2877")),$=Object(w["a"])(j,C,O,!1,null,"88f89376",null),_=$.exports,T={data:function(){return{agree:!1,type:!0}},components:(n={},Object(c["a"])(n,y["a"].name,y["a"]),Object(c["a"])(n,x.name,x),Object(c["a"])(n,b.name,b),Object(c["a"])(n,"btnRound",_),n),methods:{failToast:function(){Object(o["a"])({position:"bottom",message:"暂无功能",duration:1e3})},checkedAgree:function(){return!!this.agree||(Object(o["a"])({position:"bottom",message:'请先勾选同意"用户协议"\n和"隐私政策"',duration:2e3}),!1)},experience:function(){this.checkedAgree()&&(this.storage.set("userData","experience"),this.$router.push("home"))},loginIn:function(){this.checkedAgree()&&this.$router.push("userName")}},mounted:function(){this.$route.query.type&&(this.type=!1)}},D=T,R=(i("f3e8"),i("77a8"),Object(w["a"])(D,s,a,!1,null,"8d8cc600",null));e["default"]=R.exports},b37b:function(t,e,i){},ca79:function(t,e,i){},dea6:function(t,e,i){},f3e8:function(t,e,i){"use strict";var n=i("b37b"),s=i.n(n);s.a}}]);
//# sourceMappingURL=chunk-46f3528c.618181d1.js.map