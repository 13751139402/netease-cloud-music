<template>
  <section id="signIn">
    <van-nav-bar left-text="手机号登录" left-arrow @click-left="onClickLeft" />
    <article style="padding: 0.5rem;">
      <h1 style="font-size: .3rem;color: #999999;margin: .5rem 0;">请输入密码</h1>
      <van-field v-model="passwork" clearablet type="password" placeholder="请输入密码" ref="password" />
      <button class="submit" @touchstart="submit">登录</button>
    </article>
  </section>
</template>
<script>
import {
  NavBar,
  Field,
  NumberKeyboard,
  Toast,
  PasswordInput,
  Notify
} from "vant";
export default {
  data() {
    return { passwork: "", show: true };
  },
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [Toast.name]: Toast,
    [NumberKeyboard.name]: NumberKeyboard,
    [PasswordInput.name]: PasswordInput,
    [Notify.name]: Notify
  },
  methods: {
    submit() {
      this.$http
        .get(
          `/login/cellphone?phone=${this.$route.query.phone}&password=${this.passwork}`
        )
        .then(response => {
          console.log("登录");
          let data = response.data.profile;
          this.$store.commit("upDateUser", data);
          this.$router.push("/home");
          this.storage.set("userData", JSON.stringify(data));
        })
        .catch(error => {
          Notify({ type: "danger", message: `密码错误` });
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.$refs.password.focus();
  }
};
</script>

<style scoped>
#signIn {
  overflow: hidden;
}
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
</style>
<style>
#signIn .van-icon,
#signIn .van-nav-bar__text {
  color: #333333 !important;
}
#signIn .van-cell {
  font-size: 0.5rem;
  padding: 0.26667rem 0;
  border-bottom: 1px solid #d9d9d9;
}
</style>