<!--
 * @Descripttion: learning
 * @version: learning
 * @Author: 戴训伟
 * @Date: 2019-08-28 14:22:00
 * @LastEditors: 戴训伟
 * @LastEditTime: 2019-10-09 20:06:34
 -->
<template>
  <section id="userName">
    <van-nav-bar left-text="手机号登录" left-arrow @click-left="onClickLeft" maxlength="11" />
    <article style="padding: 0.5rem;">
      <h1 style="font-size: .3rem;color: #999999;margin: .5rem 0;">未注册手机号登陆后将自动创建账号</h1>
      <van-field
        v-model="username"
        clearable
        type="number"
        label-width="1rem"
        label="+86"
        placeholder="请输入用户名"
        ref="userName"
      />
      <button class="submit" @touchstart="submit">下一步</button>
    </article>
  </section>
</template>
<script>
import { NavBar, Field, NumberKeyboard, Toast, Notify } from "vant";
export default {
  data() {
    return { username: "", show: true };
  },
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Toast.name]: Toast,
    [NumberKeyboard.name]: NumberKeyboard,
    [Notify.name]: Notify
  },
  methods: {
    checkPhone(phone) {
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        Toast({
          position: "bottom",
          message: "请输入11位数字的手机号",
          duration: 1000
        });
        return false;
      }
      return true;
    },
    submit() {
      if (this.checkPhone(this.username)) {
        this.$http
          .get(`cellphone/existence/check?phone=${this.username}`)
          .then(response => {
            let result = response.data.exist;
            if (result == true) {
              this.$router.push({
                path: "/signIn",
                query: { phone: this.username }
              });
            } else {
              throw new Error();
            }
          })
          .catch(() => {
            Notify({
              type: "danger",
              message: `此账号暂未注册,请重新输入`,
              duration: 1000
            });
          });
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    }
  },
  mounted() {
    this.$refs.userName.focus();
  }
};
</script>

<style scoped>
.submit {
  font-size: 0.4rem;
  margin-top: 0.5rem;
  width: 90%;
  margin-left: 50%;
  transform: translateX(-50%);
  padding: 0.3rem;
  border: 0;
  border-radius: 1rem;
  background: #ff3a3a;
  color: #fff;
}
#userName {
  overflow: hidden;
  height: 100%;
}
</style>
<style>
#userName .van-icon,
#userName .van-nav-bar__text {
  color: #333333 !important;
}
#userName .van-cell {
  font-size: 0.5rem;
  padding: 0.26667rem 0;
  border-bottom: 1px solid #d9d9d9;
}
</style>