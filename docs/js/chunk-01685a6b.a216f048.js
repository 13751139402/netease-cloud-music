(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01685a6b"],{"0278":function(t,a,e){},"230c":function(t,a,e){"use strict";var n=e("6d83"),o=e.n(n);o.a},"652a":function(t,a,e){"use strict";var n,o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("transition",{attrs:{appear:"",name:"van-fade"}},[e("section",[e("head",{class:{height:t.title1}},[t._t("title",[e("span",[t._v(t._s(t.title1))])])],2),e("main",[e("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了","immediate-check":!1,error:t.error,"error-text":"请求失败，点击重新加载"},on:{load:t.onLoad,"update:error":function(a){t.error=a}},model:{value:t.loading,callback:function(a){t.loading=a},expression:"loading"}},[t._l(t.data1,function(a,n){return e("figure",{key:a.commentId,staticClass:"commItem"},[e("head",{staticClass:"commImgContainer"},[e("img",{staticClass:"commImg",attrs:{src:a.user.avatarUrl+"?param=50y50"}})]),e("main",{staticClass:"commMain"},[e("div",{staticClass:"commHead"},[e("figcaption",{staticClass:"commTitle"},[e("span",{staticClass:"commName"},[t._v(t._s(a.user.nickname))]),e("span",{directives:[{name:"time",rawName:"v-time",value:a.time,expression:"item.time"}],staticClass:"commTime"})]),e("div",{staticClass:"commLike",class:{color:a.liked},on:{click:function(a){return t.like(n)}}},[a.likedCountMap?e("span",{staticClass:"commLikeNum"},[t._v(t._s(a.likedCountMap))]):t._e(),a.liked?e("van-icon",{attrs:{name:"good-job"}}):e("van-icon",{attrs:{name:"good-job-o"}})],1)]),e("div",{staticClass:"text",domProps:{innerHTML:t._s(a.content)}})])])}),t._t("foot",null,{slot:"loading"})],2)],1)])])},i=[],c=(e("28a5"),e("ac6a"),e("bd86")),s=(e("2994"),e("2bdd")),r=(e("c3a6"),e("ad06")),m=(e("c5f6"),e("6f2e")),l={props:{data:Array,title:String,total:{type:Number,default:0}},components:(n={},Object(c["a"])(n,r["a"].name,r["a"]),Object(c["a"])(n,s["a"].name,s["a"]),n),data:function(){return{title1:this.title,loading:!1,finished:!1,error:!1,total1:this.total}},computed:{playData:function(){return this.$store.state.playData},data1:function(){return this.data&&this.data.forEach(function(t){var a=t.likedCount;if(a>1e5){var e=Math.floor(a/1e4),n=String(a%1e4).slice(0,1);t.likedCountMap="0"===n?"".concat(e,"万"):"".concat(e,".").concat(n,"万")}else t.likedCountMap=a;t.content=t.content.split("\n").join("<br />")}),this.data}},mixins:[m["a"]],methods:{onLoad:function(){this.error=!1,this.$emit("commLoad")},like:function(t){var a=this,e=this.data[t],n=e.commentId,o=e.liked,i=this.playData,c=i.id,s=i.type;this.$http.get("/comment/like?id=".concat(c,"&cid=").concat(n,"&t=").concat(o?0:1,"&type=").concat(s)).then(function(){e.liked=!o,a.likedCountMap=e.liked?e.likedCount++:e.likedCount--}).catch(function(t){throw new Error(t)})}}},d=l,u=(e("230c"),e("2877")),h=Object(u["a"])(d,o,i,!1,null,"90a6d392",null);a["a"]=h.exports},"6d83":function(t,a,e){},"7c64":function(t,a,e){"use strict";var n=e("0278"),o=e.n(n);o.a},e8f3:function(t,a,e){"use strict";e.r(a);var n,o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("section",{attrs:{id:"hotComm"}},[e("main",[e("comments",{ref:"hotComm",attrs:{data:t.hotComments,total:t.total},on:{commLoad:t.selectHotComm}})],1)])},i=[],c=e("75fc"),s=e("bd86"),r=(e("c3a6"),e("ad06")),m=(e("5246"),e("6b41")),l=e("652a"),d={data:function(){return{hotComments:[],commPage:0,total:0}},computed:{commentData:function(){return this.$store.state.commentData}},components:(n={},Object(s["a"])(n,m["a"].name,m["a"]),Object(s["a"])(n,r["a"].name,r["a"]),Object(s["a"])(n,"comments",l["a"]),n),methods:{back:function(){this.$parent.isError=!1,this.$router.push("/songComment")},selectHotComm:function(){var t=this;return this.$http.get("comment/hot?id=".concat(this.commentData.id,"&type=").concat(this.commentData.type,"&limit=15&before=0&offset=").concat(15*this.commPage)).then(function(a){var e;(e=t.hotComments).push.apply(e,Object(c["a"])(a.data.hotComments)),t.commPage++,t.$refs.hotComm.loading=!1,t.hotComments.length>=t.total-1&&(t.$refs.hotComm.finished=!0)}).catch(function(a){throw t.$parent.isError=!0,new Error(a)})},selectTotal:function(){var t=this;return this.$http.get("/comment/hot?id=".concat(this.commentData.id,"&type=").concat(this.commentData.type,"&limit=0&before=0")).then(function(a){var e=a.data.total;t.total=e,t.$parent.title="精彩评论(".concat(e,")")}).catch(function(t){throw new Error(t)})}},mounted:function(){this.$parent.loadType=!0;var t=this;this.$http.all([this.selectTotal(),this.selectHotComm()]).then(function(){t.$parent.loadType=!1})}},u=d,h=(e("7c64"),e("2877")),f=Object(h["a"])(u,o,i,!1,null,"5693e678",null);a["default"]=f.exports}}]);
//# sourceMappingURL=chunk-01685a6b.a216f048.js.map