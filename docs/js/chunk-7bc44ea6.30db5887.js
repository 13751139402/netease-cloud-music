(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7bc44ea6"],{6686:function(t,a,e){"use strict";e.r(a);var n,o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("section",{attrs:{id:"songComment"}},[e("modHead",{attrs:{title:t.title},on:{left:t.back},scopedSlots:t._u([{key:"right",fn:function(){return[e("van-icon",{attrs:{"class-prefix":"icon",name:"fenxiangpt"}})]},proxy:!0}])}),e("div",{directives:[{name:"show",rawName:"v-show",value:t.loadType,expression:"loadType"}],attrs:{id:"loading"}},[t.isError?e("div",{staticStyle:{display:"flex","font-size":".5rem",color:"red"}},[e("van-icon",{attrs:{name:"cross"}}),e("span",[t._v("加载失败")])],1):e("van-loading",{attrs:{color:"rgb(255, 68, 68)"}},[e("span",[t._v("努力加载中...")])])],1),e("router-view")],1)},r=[],s=e("bd86"),c=(e("ac1e"),e("543e")),i=(e("c3a6"),e("ad06")),d=(e("5246"),e("6b41")),l=e("9305"),u={data:function(){return{title:"",loadType:!0,isError:!1}},components:(n={},Object(s["a"])(n,d["a"].name,d["a"]),Object(s["a"])(n,i["a"].name,i["a"]),Object(s["a"])(n,c["a"].name,c["a"]),Object(s["a"])(n,"modHead",l["a"]),n),computed:{commentData:function(){return this.$store.state.commentData}},methods:{back:function(){this.isError=!1,this.$router.go(-1)}}},f=u,m=(e("f2ce"),e("2877")),p=Object(m["a"])(f,o,r,!1,null,"32027044",null);a["default"]=p.exports},aa6f:function(t,a,e){},f2ce:function(t,a,e){"use strict";var n=e("aa6f"),o=e.n(n);o.a}}]);
//# sourceMappingURL=chunk-7bc44ea6.30db5887.js.map