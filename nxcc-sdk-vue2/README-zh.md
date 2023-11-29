## 牛信云呼叫中心SDK组件对接文档（vue2）

#### 1.安装方式（npm安装）

`npm install nx-cc-vue2`

tips: 每次更新安装后需重启项目

#### 2.引入组件和语言包（vue2）

##### main.js

```
import nxcc from 'nx-cc-vue2/nx-cc-vue2.common'
import 'nx-cc-vue2/nx-cc-vue2.css'
// 中英文语言包
import Cookies from "js-cookie";
import VueI18n from 'vue-i18n'
import zh from 'nx-cc-vue2/nx-cc-vue2-zh.js'
import en from 'nx-cc-vue2/nx-cc-vue2-en.js'
Vue.use(nxcc)
// 引入I18N
Vue.use(VueI18n)
// 根据项目实际情况在对应文件引入语言包
const messages = {
  zh: {
    ...zh
  },
  en: {
    ...en
  },
};
const language = (navigator.language || 'zh').toLocaleLowerCase(); // 获取浏览器的语言
const i18n = new VueI18n({
  locale: Cookies.get("locale") == "en-US" ? 'en' : 'zh' || language.split('-')[0] || 'zh',
  fallbackLocale: 'zh', // 设置备用语言
  globalInjection: true,
  legacy: false,
  messages,
})
new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
```

##### 所需页面引入

```
<nx-dial></nx-dial>
```

#### 3.用户自定义登录页面

需跟<nx-dial></nx-dial>组件在同一页面

1. 定义ref

   ```
   html:
   <nx-dial ref="nxcc"></nx-dial>
   ```
   
2. 获取验证码图片和key

   ```
   this.$refs.nxcc.getVerifys((res) => {
       this.imgs = res.image; // 验证码图片
       this.form.key = res.key; // 验证码图片key
   });
   ```

3. 在自定义登陆页面输入用户名，密码，验证码（根据返回验证码图片输入）后登录

   ```
   const loginInfo = {
       graphVerificationCode: '验证码',
       key: '验证码图片的key',
       email: '用户名',
       password: '密码',
   }
   this.$refs.nxcc.loginSaas(loginInfo);
   ```

4. 登录成功，话机注册成功

#### 4.话机是否注册成功 

```
<nx-dial ref="nxcc" @loginOk="loginOk"></nx-dial>

 loginOk(obj) {
    console.log(obj.onRegistered) // obj.onRegistered为true则注册成功
};
```

#### 5.退出登录方法

```
<nx-dial ref="nxcc"></nx-dial>

this.$refs.nxcc.loginOuts();
```

#### 6.判断token是否失效或者是否有坐席

```
<nx-dial ref="nxcc" @isLogin="isLogin"></nx-dial>

isLogin(obj) {
  console.log(obj.islogin) // obj.islogin为false则token失效
  console.log(obj.isHaveSeat) // obj.isHaveSeat为false则无坐席
};
```

#### 7.是否默认弹出拨号盘和拨号盘输入框自动填入号码

```
<nx-dial ref="nxcc" :paramOptions="paramOptions"></nx-dial>

const paramOptions = {
 visible: false, // 控制拨号盘隐藏显示
 number: "", // 传入拨号盘号码
};
```

#### 8.用户自定义按钮直接拨号

```
<nx-dial ref="nxcc"></nx-dial>
let numberOptions：{
  callee： '861234',    // 被叫，必填
  countryCode：‘86’ // 被叫号码国码，必填
} // 需要传入的号码
nxcc.value.getNumToCall(numberOptions); // 发起拨号
```



#### 代码示例

```
<template>
  <div class="hello">
    <nx-dial
      ref="nxcc"
      @isLogin="isLogin"
      @loginOk="loginOk"
      :paramOptions="paramOptions"
    ></nx-dial>
    <div style="text-align: left">
      <el-button type="primary" @click="loginNxcc">登录</el-button>
      <el-button type="primary" @click="loginOut">登出</el-button>
      <el-button type="primary" @click="toCall">直接拨打</el-button>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="form.graphVerificationCode"></el-input>
          <img :src="imgs" alt="" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="testLogin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paramOptions: {
        visible: false, // 控制拨号盘隐藏显示
        number: "", // 传入拨号盘号码
      },
      dialogVisible: false,
      form: {
        graphVerificationCode: null,
        key: null,
        email: "fang.cheng@nxcloud.com",
        password: "y12345678",
      },
      imgs: null,
    };
  },
  mounted() {
    this.paramOptions = {
      visible: true, // 控制拨号盘隐藏显示
      number: "", // 传入拨号盘号码
    };
  },
  methods: {
    isLogin(obj) {
      console.log("登出了", obj.islogin);
    },

    loginOk(obj) {
      console.log("注册成功", obj.onRegistered);
      if (obj.onRegistered == true) {
        this.dialogVisible = false;
      }
    },
    getVerify() {
      this.$refs.nxcc.getVerifys((res) => {
        this.imgs = res.image;
        this.form.key = res.key;
      });
    },
    loginNxcc() {
      this.dialogVisible = true;
      this.getVerify();
    },
    testLogin() {
      let postForm = {
        graphVerificationCode: this.form.graphVerificationCode,
        key: this.form.key,
        // email: "454379377@qq.com",
        // password: "zsqcc123456",
        email: this.form.email,
        password: this.form.password,
      };
      this.$refs.nxcc.loginSaas(postForm);
    },
    loginOut() {
      this.$refs.nxcc.loginOuts();
    },
    toCall() {
      let numberOptions = {
        // caller: null, // 主叫，随机号码时为null
        callee: "4444", // 被叫
        // type: 0, // 0随机号码，1did号码
        // remark: "测试",
      };
      this.$refs.nxcc.getNumToCall(numberOptions);
    },
  },
};
</script>

<style scoped lang="scss">
.about {
  width: 100%;
  height: 56px;
  background-color: #333333;
}
</style>

```

