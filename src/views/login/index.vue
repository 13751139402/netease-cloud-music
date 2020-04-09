<!--
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-08-26 10:18:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-04-09 16:15:52
 -->
<template>
  <section id="login">
    <div id="logo">
      <div id="logoArea">
        <i class="iconfont icon-wangyiyunyinle logoIcon" slot="icon"></i>
      </div>
    </div>
    <article>
      <div id="content">
        <van-button
          plain
          type="danger"
          size="large"
          round
          class="btn"
          @click="loginIn"
        >手机号登陆</van-button>
        <van-button
          plain
          type="danger"
          size="large"
          round
          class="btn"
          color="#fff"
          style="background:#de3425"
          @click="experience"
        >立即体验</van-button>
        <ul>
          <li>
            <btnRound @click="failToast">
              <i class="iconfont icon-weixin" slot="icon"></i>
            </btnRound>
          </li>
          <li>
            <btnRound @click="failToast">
              <i class="iconfont icon-icon" slot="icon"></i>
            </btnRound>
          </li>
          <li>
            <btnRound @click="failToast">
              <i class="iconfont icon-xinlang" slot="icon"></i>
            </btnRound>
          </li>
          <li>
            <btnRound @click="failToast">
              <i class="iconfont icon-wangyi" slot="icon"></i>
            </btnRound>
          </li>
        </ul>
        <footer>
          <van-checkbox v-model="agree" checked-color="#f56d5f">
            <span>
              同意
              <span class="whiteSpan">《用户协议》</span>和
              <span class="whiteSpan">《隐私政策》</span>
            </span>
          </van-checkbox>
        </footer>
      </div>
    </article>
  </section>
</template>
<script>
import { Button, Checkbox, CheckboxGroup, Toast } from "vant";
import btnRound from "../../components/btnRound";
export default {
  data() {
    return {
      agree: false,
      type: true
    };
  },
  components: {
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    btnRound
  },
  methods: {
    failToast() {
      Toast({
        position: "bottom",
        message: "暂无功能",
        duration: 1000
      });
    },
    checkedAgree() {
      if (!this.agree) {
        Toast({
          position: "bottom",
          message: `请先勾选同意"用户协议"\n和"隐私政策"`,
          duration: 2000
        });
        return false;
      }
      return true;
    },
    experience() {
      if (!this.checkedAgree()) {
        return;
      }
      this.storage.set("userData", "experience");
      this.$router.push("home");
    },
    loginIn() {
      if (!this.checkedAgree()) {
        return;
      }
      this.$router.push("userName");
    }
  },
  mounted() {
    if (this.$route.query.type) {
      this.type = false;
    }
  }
};
</script>
<style scoped>
#login {
  width: 100%;
  height: 100vh;
  background: #db2c1f;
  display: flex;
  flex-direction: column;
}
#logo {
  flex: 1;
  display: flex;
  justify-content: center;
  align-content: center;
}
article {
  height: 35%;
  display: flex;
  width: 100%;
  justify-content: center;
}
#content {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.btn {
}
ul {
  float: left;
  display: flex;
  justify-content: inherit;
}
li {
  width: 1rem;
  height: 1rem;
  margin: 0 0.26667rem;
}
footer {
  height: 1rem;
  display: flex;
  justify-content: center;
  font-size: 0.35rem;
}
footer span {
  color: #f56d5f;
}
.whiteSpan {
  color: #fff;
}
.logoIcon {
  font-size: 1.5rem;
  color: #fff;
}
#logoArea {
  margin-top: 3rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  background: #f2312a;
}
.extendRound {
  border: 1px solid #fff;
  position: absolute;
  border-radius: 50%;
  animation: extendRound 5s ease infinite;
  -moz-animation: extendRound 5s ease infinite; /* Firefox */
  -webkit-animation: extendRound 5s ease infinite; /* Safari and Chrome */
  -o-animation: extendRound 5s ease infinite; /* Opera */
}
.hidden {
  visibility: hidden;
}
@keyframes extendRound {
  0% {
    width: 0vw;
    height: 0vw;
  }
  100% {
    width: 100vw;
    height: 100vw;
  }
}

@-moz-keyframes extendRound /* Firefox */ {
  0% {
    width: 0vw;
    height: 0vw;
  }
  100% {
    width: 100vw;
    height: 100vw;
  }
}

@-webkit-keyframes extendRound /* Safari and Chrome */ {
  0% {
    background: red;
  }
  100% {
    background: green;
  }
}

@-o-keyframes extendRound /* Opera */ {
  0% {
    background: red;
  }
  100% {
    background: green;
  }
}
</style>
<style>
.van-checkbox__label {
  line-height: inherit;
}
/* .van-toast--bottom {
  line-height: normal;
  font-size: 0.5rem;
  padding: 0.3rem !important;
  border-radius: 0.2rem;
} */
</style>
