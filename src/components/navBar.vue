<!--
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-08-29 16:58:00
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-10-08 20:26:44
 -->
<template>
  <van-popup v-model="show" position="left" class="Popup" @close="closePopup">
    <main class="PopupMain">
      <header id="popupLogin">
        <div class="loginContainer" v-if="!userData">
          <span>登陆网易云音乐</span>
          <span style="margin: 3px 0 10px 0;">手机电脑多端同步,尽量海量高品质音乐</span>
          <van-button plain type="default" round class="loginBtn" @click="loginIn">立即登录</van-button>
        </div>
        <div class="loginContainer" v-else>
          <div style="width: 100%;padding: 0 .4rem;box-sizing: border-box;">
            <van-image
              round
              width="1.5rem"
              height="1.5rem"
              :src="`${userData.avatarUrl}?param=200y200`"
            />
            <div
              style="margin: 0.25rem 0px;display: flex;align-items: center;justify-content: space-between;"
            >
              <span>{{userData.nickname}}</span>
              <div class="signBtn">
                <van-icon class-prefix="icon" name="jinbi" style="font-size:.3rem;margin-right:5px"></van-icon>
                <span>签到</span>
              </div>
            </div>
          </div>
        </div>
        <div class="payVip">
          <figure class="payVip_1">
            <span class="payVip_1_1">开通黑胶VIP</span>
            <span>新课仅5元</span>
          </figure>
          <div class="payVip_1_2"></div>
          <figure class="payVip_2">
            <span style="color:#ffffff">超值礼卷免费抽</span>
            <div class="payVip_2_round">
              <van-icon class-prefix="icon" name="changpian" style="font-size:.8rem;color:#bddf94"></van-icon>
            </div>
          </figure>
        </div>
      </header>
      <main>
        <div id="PopupNabBar">
          <van-grid class="vanGrid" :border="false">
            <van-grid-item v-for="(item,index) of PopupNav" :key="index" :text="item.text">
              <van-icon
                class-prefix="icon"
                :name="item.icon"
                class="van-grid-item__icon"
                slot="icon"
              />
            </van-grid-item>
          </van-grid>
        </div>
        <van-cell-group>
          <van-cell title="演出" value="杨千嬅上海" :border="false">
            <van-icon class-prefix="icon" name="piao" slot="icon" class="iconStyle" />
          </van-cell>
          <van-cell title="商城" :border="false">
            <van-icon class-prefix="icon" name="gouwuche" slot="icon" class="iconStyle" />
          </van-cell>
          <van-cell title="附近的人" :border="false">
            <van-icon class-prefix="icon" name="fujinderen" slot="icon" class="iconStyle" />
          </van-cell>
          <van-cell title="游戏推荐" :border="false">
            <van-icon class-prefix="icon" name="youxituijian" slot="icon" class="iconStyle" />
          </van-cell>
          <van-cell title="我的订单" :border="false">
            <van-icon class-prefix="icon" name="bijiben" slot="icon" class="iconStyle" />
          </van-cell>
        </van-cell-group>
        <van-cell-group>
          <van-cell title="定时停止播放" :border="false">
            <van-icon
              class-prefix="icon"
              name="dingshitingzhibofang"
              slot="icon"
              class="iconStyle"
            />
          </van-cell>
          <van-cell title="扫一扫" :border="false">
            <van-icon class-prefix="icon" name="saoyisao" slot="icon" class="iconStyle" />
          </van-cell>
          <van-cell title="音乐闹钟" :border="false">
            <van-icon class-prefix="icon" name="yinlenaozhong" slot="icon" class="iconStyle" />
          </van-cell>
          <van-cell title="在线听歌免流量" :border="false">
            <van-icon
              class-prefix="icon"
              name="zaixiantinggemianliuliang"
              slot="icon"
              class="iconStyle"
            />
          </van-cell>
          <van-cell title="游戏推荐" :border="false">
            <van-icon class-prefix="icon" name="youxituijian" slot="icon" class="iconStyle" />
          </van-cell>
          <van-cell title="优惠卷" :border="false">
            <van-icon class-prefix="icon" name="youhuiquan" slot="icon" class="iconStyle" />
          </van-cell>
        </van-cell-group>
      </main>
    </main>
    <footer id="popupFooter" class="van-hairline--top">
      <ul id="setContainer">
        <li>
          <van-icon class-prefix="icon" name="yejianmoshi" size=".6rem" />
          <span>夜间模式</span>
        </li>
        <li>
          <van-icon class-prefix="icon" name="shezhi" size=".6rem" />
          <span>设置</span>
        </li>
        <li @click="exit">
          <van-icon class-prefix="icon" name="tuichu1" size=".6rem" />
          <span>退出</span>
        </li>
      </ul>
    </footer>
  </van-popup>
</template>

<script>
import {
  NavBar,
  Popup,
  Button,
  Grid,
  GridItem,
  Divider,
  Cell,
  CellGroup,
  Image,
  Icon
} from "vant";
export default {
  props: ["isShowPopup"],
  data() {
    return {
      PopupNav: [
        { icon: "xiaoxi", text: "我的消息" },
        { icon: "haoyou", text: "我的好友" },
        { icon: "gexingzhuangban", text: "个性换肤" },
        { icon: "tinggeshiqu", text: "听歌识曲" }
      ],
      show: this.isShowPopup
    };
  },
  computed: {
    userData() {
      return this.$store.state.userData;
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Divider.name]: Divider,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Image.name]: Image,
    [Icon.name]: Icon
  },
  methods: {
    exit() {
      this.$http.get("/logout").then(() => {
        this.$store.commit("upDateUser", false);
        this.$store.commit("upDatePlay", false);
        this.storage.remove("userData");
        this.$router.push({ path: "/login", query: { type: "login" } });
      });
    },
    loginIn() {
      this.$store.commit("upDateUser", false);
      this.$store.commit("upDatePlay", false);
      this.$router.push({ path: "/login", query: { type: "login" } });
    },
    closePopup() {
      this.$parent.isShowPopup = this.show;
    }
  },
  watch: {
    isShowPopup(to) {
      this.show = to;
    }
  }
};
</script>

<style scoped>
.iconStyle {
  margin-right: 8px;
  color: #323233;
}
.signBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background: #ff4747;
  color: #fff;
  border-radius: 50px;
  font-size: 0.3rem;
}
.tabbar {
  flex: 1;
  display: flex;
  padding: 0 0.8rem;
  font-size: 0.5rem;
  justify-content: space-around;
  align-items: flex-end;
}
a {
  color: #7f7f7f;
}
.currentTab {
  font-size: 0.55rem;
  color: #343434;
}
#menu {
  position: fixed;
  width: 85%;
  height: 100%;
  background: #fff;
  z-index: 2;
}
#popupFooter {
  position: fixed;
  height: 7vh;
  width: 100%;
  bottom: 0;
  background: #ffffff;
  border-top: 1px solid #f5f5f5;
}
.Popup {
  width: 85%;
  height: 100%;
  font-size: 15px;
}
#setContainer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
}
#setContainer li {
  display: flex;
  height: 100%;
  align-items: center;
}
#setContainer li span {
  margin-left: 10px;
}
#popupLogin {
  background: #ebebeb;
  width: 100%;
  height: 19vh;
  color: #5e5e5e;
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.loginBtn {
  width: 4rem;
  height: 1rem;
  line-height: normal;
  border: 0.05333rem solid #c8c8c8;
  background: #ebebeb;
}
.loginContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60%;
  width: 100%;
}
.payVip {
  flex: 1;
  width: 90%;
  background: linear-gradient(to right, #111111, #373737);
  border-radius: 5px;
  transform: translateY(50%);
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 0.3rem;
  z-index: 1;
}
.payVip_1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 0.3rem;
}
.payVip_1_1 {
  color: #dec6c2;
  font-size: 0.4rem;
  margin-bottom: 3px;
}
.payVip_1_2 {
  width: 1px;
  height: 80%;
  background: #606060;
  margin-left: 0.1rem;
}
.payVip_2 {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-right: 0.3rem;
  align-items: center;
}
.payVip_2_round {
  display: flex;
  align-content: center;
  justify-content: center;
  background: #969799;
  margin-left: 0.1rem;
  border-radius: 1rem;
  border-radius: 50%;
  padding: 0.1rem;
}
#PopupNabBar {
  margin-top: 1rem;
  padding: 0.3rem;
}
.vanGrid {
  color: #ff4747;
}
.PopupMain {
  position: fixed;
  height: 93vh;
  width: 100%;
  overflow-y: auto;
}
</style>