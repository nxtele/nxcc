## 牛信云呼叫中心SDK组件对接文档（vue3）

#### 1.安装方式（npm安装）

`npm install nx-cc`

tips: 每次更新安装后需重启项目

#### 2.引入组件（vue3）

##### main.js

```
import Nxcc from 'nx-cc'
import 'nx-cc/nx-cc.css'
const app = createApp(App)
app.use(Nxcc).mount('#app')
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
   script:
   const nxcc = ref();
   return{
    nxcc
   }
   ```

2. 获取验证码图片和key

   ```
   nxcc.value.getVerifys((res) => {
     state.info = {
       image: res.image, // 验证码图片
       key: res.key, // 验证码图片key
     };
   });
   ```

3. 在自定义登陆页面输入用户名，密码，验证码（根据返回验证码图片输入）后登录

   ```
   const loginInfo = {
       graphVerificationCode: '验证码',   // 选填，可为空字符串
       key: '验证码图片的key',   // 选填，可为空字符串
       phone: '用户名',
       password: '密码',
   }
   nxcc.value.loginSaas(postForm);
   ```

4. 登录成功，话机注册成功

5. 密码输错超过三次获取验证码图片和验证码key

   ```
   // 监听方法, 当输错三次密码触发
   <nx-dial ref="nxcc" @loginGetVerify="loginGetVerify"></nx-dial>
   
   const loginGetVerify = (verifyInfo) => {
     console.log("验证码图片和验证码key", verifyInfo);
   };
   ```

   

#### 4.话机是否注册成功 

```
<nx-dial ref="nxcc" @loginOk="loginOk"></nx-dial>

const loginOk = (obj) => {
    console.log(obj.onRegistered) // obj.onRegistered为true则注册成功
};
```

#### 5.退出登录方法

```
<nx-dial ref="nxcc"></nx-dial>

nxcc.value.loginOuts()
```

#### 6.判断token是否失效或者是否有坐席

```
<nx-dial ref="nxcc" @isLogin="isLogin"></nx-dial>

const isLogin = (obj) => {
  console.log(obj.islogin) // obj.islogin为false则token失效
  console.log(obj.isHaveSeat) // obj.isHaveSeat为false则无坐席
};
```

#### 7.是否默认弹出拨号盘和拨号盘输入框自动填入号码

```
<nx-dial ref="nxcc" :paramOptions="paramOptions"></nx-dial>

const paramOptions = {
 visible: false, // 控制拨号盘收起展开
 callee: "12456", // 传入拨号盘的被叫号码
 countryCode: "852", // 传入拨号盘的国码
 hideDialPad: true, // 控制拨号盘的显示隐藏
 hideCallLog: true, // 控制最近通话组件的显示隐藏
};
```

#### 8.用户自定义按钮直接拨号

获取主叫号码列表

```
nxcc.value.getDidExternals((res) => {
  console.log(’主叫号码列表‘， res)
});
```

```
<nx-dial ref="nxcc"></nx-dial>
let numberOptions：{
  caller: '', // 主叫,主叫传空将根据随机号码呼出
  callee: "6282123931868", // 被叫，如62******
  countryCode: "62", // 被叫国码
  orderId: "66493f1afaa3",  // 自定义orderId， 可选填
} // 需要传入的号码
nxcc.value.getNumToCall(numberOptions); // 发起拨号
```



#### 代码示例

```
<template>
  <div class="wrapper">
    <nx-dial ref="nxcc" @isLogin="isLogin" @loginOk="loginOk"></nx-dial>
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="账号">
          <el-input clearable v-model="form.userName" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item label="验证码">
          <el-input clearable v-model="form.verify" />
          <img :src="info.image" alt="" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="logins" v-loading="dialogLoading"> 登录 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, ref } from "vue";
import Cookies from "../utils/auth";

export default {
  setup() {
    const nxcc = ref();
    const state = reactive({
      form: {
        userName: "",
        password: "",
        verify: null,
      },
      info: {},
      dialogVisible: true,
      dialogLoading: false
    });

    onMounted(() => {
      // 也可通过按钮交互打开登录界面，目前是判断token自动开启登录弹窗
      if(Cookies.getCookie('ccToken')){
        state.dialogVisible = false
      }
      getVerify();
    });

    // 判断token是否失效
    const isLogin = (obj) => {
      console.log("登出了", obj.islogin);
      state.dialogVisible = true;
    };

    // 判断话机是否注册成功
    const loginOk = (obj) => {
      console.log("注册成功", obj.onRegistered);
      if (obj.onRegistered == true) {
        state.dialogLoading = false
        state.dialogVisible = false;
      }
    };

    // 获取图片验证码
    const getVerify = () => {
      nxcc.value.getVerifys((res) => {
        state.info = {
          image: res.image,
          key: res.key,
        };
      });
    };

    // 登录
    const logins = () => {
      state.dialogLoading = true
      let postForm = {
        graphVerificationCode: state.form.verify,
        key: state.info.key,
        email: state.form.userName,
        password: state.form.password,
      };
      nxcc.value.loginSaas(postForm);
    };

    // 系统退出调用当前方法清除sdk的Token
    const loginOut = () => {
      nxcc.value.loginOuts();
    };
    
    // 直接发起拨号
    const getNumberToCall = () => {
        let numberOptions：{
          	caller: '', // 主叫,传空将根据随机号码呼出
  			callee: "6282123931868", // 被叫，如62******
  			countryCode: "62", // 被叫国码
  			orderId: "66493f1afaa3",  // 自定义orderId， 可选填
        } // 需要传入的号码
        nxcc.value.getNumToCall(numberOptions); // 发起拨号
    }

    return {
      ...toRefs(state),
      nxcc,
      getVerify,
      logins,
      isLogin,
      loginOk,
      loginOut,
    };
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  color: #fff;
  .left {
    :deep(.el-breadcrumb__inner) {
      color: #fff;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .user-icon {
      width: 32px;
      height: 32px;
      margin-right: 8px;
      border-radius: 50%;
    }
    .el-dropdown {
      cursor: pointer;
      color: #fff;
    }
  }
}
</style>

```

