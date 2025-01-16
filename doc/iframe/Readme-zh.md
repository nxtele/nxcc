##  嵌入式客户端

#### 概览

NXLink嵌入式客户端是 NXLink 联络中心服务的变体，可以在第三方系统内，也可以作为与任何 Web 应用程序一起使用的浏览器扩展。借助 NXLink Embeddable Framework，您可以开发自己的 NXLink集成。 这些集成支持各种交互类型和功能，例如点击拨号、屏幕弹出等。

#### 用户界面

您可以从客户端访问菜单并更改状态和电话。 该菜单允许您快速执行常见任务，例如接听来电、拨打电话或更改设置。

![p1](/images/p1.png)

#### 支持的交互类型

接听来电-与任何其他互动一样，座席在客户端接听呼叫。

外呼拨号-座席可以直接、或使用点击拨号拨打外线电话。

通话记录-坐席可以查询到所有的历史通话记录。

#### 可实现的CRM 功能

点击拨号-点击号码或者发起通话图标即可发起呼叫，按照自定义的集成配置。

交互日志-查询所有座席的详细交互日志。

#### 架构

下图显示了 NXLink嵌入式客户端的所有组件的架构。

![p2](/images/p2.png)



#### 开发文档


#### 1. Iframe域名地址，加载方式

https://nxlink.nxcloud.com/admin/#/nxcc

```js
// 创建iframe
// 建议width为256px，height为460px
<iframe id="iframe" allow="camera *; microphone *; autoplay *; hid *" src="https://nxlink.nxcloud.com/admin/#/nxcc"></iframe>
```



#### 2. 静默自动登录

| 字段        | 类型   | 备注                                                         |
| ----------- | ------ | ------------------------------------------------------------ |
| email       | string | 账号（邮箱）                                                 |
| password    | string | 密码                                                         |
| lang        | string | 语言，目前支持中文（zh-CN），英文（en-US），西班牙语（es-MX） |
| loginMethod | number | 0：普通坐席登录（传参登录），1：谷歌 SSO登录（该登录方式下，不需要传email和password，默认跳转sso登录页面）。 |

```js
// loginMethod：0，普通坐席登录
const message = {
  type: 'init',
  content: {
      email：email，
    password： password，
      lang: "zh-CN",
      loginMethod：0
  }
}
// loginMethod：1，谷歌 SSO登录消息协议
const message = {
  type: 'init',
  content: {
      lang: "zh-CN",
      loginMethod：1
  }
}

// 使用该方法传递给嵌入的iframe
const mapFrame = document.getElementById("iframe")
mapFrame.onload = function() {
  const iframeWin = mapFrame.contentWindow;
  iframeWin.postMessage(message, '*');
}
```

#### 3. 跳转登陆页手动登录

- 未登录：跳转至普通坐席登录
- 已登录：不进行跳转；登出时跳转至普通坐席登录
> SSO登录的请勿调用

  ```js
  // 跳转至普通坐席登录	
  const message = {
    type: 'toEmailLogin',
  }

 
  const mapFrame = document.getElementById("iframe")
  const iframeWin = mapFrame.contentWindow;
  iframeWin.postMessage(message, '*');
  ```

#### 4. Iframe页面相关回调

可使用下述方法接收消息协议，可根据协议上的type区分消息类型

```
window.addEventListener( "message",(event) => {
  // 打印接收到的数据
  consolelog(event.data.type)
},false);
```


1. ###### 账号登入成功消息协议

  登录账号存在坐席时回调传递以下字段，无坐席不传递

  | 字段    | 类型   | 备注       |
  | ------- | ------ | ---------- |
  | email   | string | 登录账号   |
  | sipNum  | string | 话机号     |
  | groupNo | string | 坐席组编号 |

   ```js
  // iframe回调的消息协议
  event.data:{
    type: 'login',
    content: {
      email: '',
      sipNum: '',
      groupNo: ''    
    }
  }
   ```

2. ###### 登录账号是否存在坐席

  | Code（number） | 备注                               |
  | -------------- | ---------------------------------- |
  | 1              | 该账号存在坐席                     |
  | 2              | 该账号不存在坐席或者坐席状态已关闭 |

  ```js
  // iframe回调的消息协议
  event.data:{
    type: 'agentExists',
    content: {
      code: 1
    }
  }
  ```

3. ###### 话机状态和回调消息

  | Code（number） | 坐席话机状态 |
  | -------------- | ------------ |
  | 0              | 呼出振铃中   |
  | 1              | 呼入振铃中   |
  | 2              | 通话中       |
  | 3              | 话机断开     |
  | 4              | 话机注册成功 |
  | 5              | 挂断         |
  | 6              | 账号未登录   |
  | -1             | 话机注册失败 |

  *浏览器多Tab页面表现为同步，当某一tab通话状态变更以后，其他tab的状态会保持一致；如一个tab为通话中，其他tab也同步为通话中

  当话机状态为呼出中(0)、呼入中(1)、通话中(2)、挂断(5)的通话状态时，会返回以下字段

  | 字段                   | 类型         | 备注                                       |
  | ---------------------- | ------------ | ------------------------------------------ |
  | callId                 | string       | 通话 id                                    |
  | direction              | number       | 通话场景，0:呼入，1:呼出，2:自动拨号转人工 |
  | caller                 | string       | 主叫号码                                   |
  | callee                 | string       | 被叫号码                                   |
  | orderId                | string       | 回传的用户自定义id，字符串，32位           |
  | params                 | json string  | 呼出时回传的用户自定义字段，支持json字符串 |
  | callStartTimestamp     | number(毫秒) | 时间戳，当发起呼叫/接收来电时生成          |
  | callConnectedTimestamp | number(毫秒) | 时间戳，当接听电话时生成                   |
  | callHangUpTimestamp    | number(毫秒) | 时间戳，挂断电话后生成                     |
  | other                  | json string  | 呼入时回传的用户自定义字段                 |

  ```js
  // iframe回调的消息协议
  event.data:{
    type: 'dialStatus',
    content: {
      code: 0,
      callId: '',
      orderId: '',
      direction: 1,
      caller: '',
      callee: '',
      params: '',
      callStartTimestamp: '',
      callConnectedTimestamp: '',
      callHangUpTimestamp: ''
    }
   }
  ```

   ###### 挂断原因映射

  | Code | 挂断原因                   |
  | ---- | -------------------------- |
  | 810  | 话机已欠费                 |
  | 811  | 不允许呼叫的国家           |
  | 812  | 号码不正确                 |
  | 813  | 登录信息已过期，请重新登录 |
  | 814  | 呼叫失败（黑名单号码）     |
  | 815  | 呼叫失败（呼叫次数限制）   |
  | 816  | 当前号码无法使用           |
  | 800  | 网络异常                   |
  | 801  | 网络异常                   |
  | 817  | 今日呼叫体验已上限。       |
  | 819  | DID号码呼叫失败。          |




4. ###### 坐席状态

  | code（number） | 备注                                                         |
  | -------------- | ------------------------------------------------------------ |
  | 1              | 工作-示闲，可呼入呼出                                        |
  | 2              | 工作-示忙（发起呼叫/接收来电、通话中、整理中也返回此code），仅能呼出 |
  | 3              | 休息-会议，仅能呼出                                          |
  | 4              | 休息-吃饭，仅能呼出                                          |
  | 5              | 休息-厕所，仅能呼出                                          |
  | 6              | 休息-睡觉，仅能呼出                                          |
  | 7              | 休息-其他，仅能呼出                                          |

  *浏览器多Tab页面表现：当某一tab坐席状态进行变更，切换其他tab以后，状态会保持一致

  ```js
  // iframe回调的消息协议
  event.data:{
    type: 'agentStatus',
    content: {
      code: 1
    }
  }
  ```

5. ###### 登出消息协议

  ```js
  // iframe回调的消息协议
  event.data:{
    type: 'logout'
  }
  ```

6. ###### token失效消息协议

  ```js
  // iframe回调的消息协议
  event.data:{
    type: 'tokenInvalid'
  }
  ```

   

#### 5. 发起呼叫消息协议

| 字段        | 类型       | 备注                                             |
| ----------- | ---------- | ------------------------------------------------ |
| caller      | string(32) | 主叫号码，主叫传空将根据随机号码呼出             |
| callee      | string(32) | 被叫号码，需带国码，例如呼叫香港方向：852******* |
| countryCode | string     | 被叫国码                                         |
| orderId     | string(32) | 自定义orderId，可选填                            |
| params      | string     | 自定义字段，可选填                               |

```js
const message = {
  type: 'callOut',
  content: {
    caller: '',
    callee: "8524444",
    countryCode: "852",
    orderId: "66493f1afaa3",
    params：""
  }
}

// 使用该方法传递给嵌入的iframe
const mapFrame = document.getElementById("iframe")
const iframeWin = mapFrame.contentWindow;
iframeWin.postMessage(message, '*');
```

#### 6. 主动登出

```js
// 登出消息协议
const message = {
  type: 'loginOut',
}
   
const mapFrame = document.getElementById("iframe")
const iframeWin = mapFrame.contentWindow;
iframeWin.postMessage(message, '*');
```


#### 7. 状态变更说明

链接：[https://help.nxcloud.com/nxlink/docs/Iframe-duo-zhuang-tai-tiao-zhuan-shuo-ming](https://help.nxcloud.com/nxlink/docs/Iframe-duo-zhuang-tai-tiao-zhuan-shuo-ming)

![status](/images/status.png)


#### 8. 自定义配置

| 字段    | 类型   |  必填   | 备注   |
| ------- | ------ | ----- |  ---------- |
| dialDisabled   | boolean  | 否 |是否禁止拨号盘外呼【 默认允许】，true:禁止，false:允许    |
| callbackDisabled  | boolean | 否 |通话记录列表是否显示回拨按钮【默认不显示】，true:显示，false:不显示|
| callingBgUrl | string | 否 |通话时背景图 |
| offlineDisable | boolean | 否 |是否禁止播放离线提示音，true:禁止，false:允许 |

  ```js
  const message = {
    type: "userCustomConfig",
    content: {
      dialDisabled: false,
      callbackDisabled: false,
    }
  }



  // 可在登录成功后，接收到login回调后传递自定义配置信息
  window.addEventListener( "message",(event) => {
    consolelog(event.data.type)
    if (event.data.type == "login") {
      // 传递自定义配置
    }
  },false);
  ```

#### 9. 自定义按钮

  | 字段    | 类型   |   必填  |备注       |
  | ------- | ------ | ------ | ---------- |
  | show | boolean | 是 | 是否显示按钮   |
  | buttonText | string | 是 | 按钮内容   |
  | eventName| string | 是 |  自定义事件名称     |
  | style| object| 是 | 按钮样式 |

  ```js
  const message = {
    type: "userCustomButton",
    content: {
      show: true,
      buttonText: '按钮',
      eventName: 'myEvent',
      style: {
        "width": "44px",
        "height": "44px",
        "font-size": "14px",
        "color": "#333",
        "display": "flex",
        "justify-content": "center",
        "align-items": "center",
        "position": "absolute",
        "left": "25px",
        "bottom": "50px",
        "border-radius": "50%",
        "background-color": "#f5f5f5",
        "cursor": "pointer",
      }, // 举例
    }
  };


  const mapFrame = document.getElementById("iframe")
  const iframeWin = mapFrame.contentWindow;
  iframeWin.postMessage(message, '*');


  // 当点击页面自定义按钮时，iframe回调"myEvent"自定义事件，用户端接收自定义事件消息
  window.addEventListener( "message",(event) => {
    consolelog(event.data.type)
    if (event.data.type == "myEvent") {
      // ...
    }
  },false);
  ```

#### 10. 发起挂断
此消息提供了对当前通话发起挂断

发起挂断消息

| 字段       | 类型   | 备注                                                     |
| ---------- | ------ | -------------------------------------------------------- |
| type       | string | 消息类型-发起挂断                                        |
| callId     | string | 由上述dialStatus消息回调的callid                         |
| hangupType | number | 挂断类型，1：普通挂断，2：满意度挂断（需配置满意度调查） |

```js
// 监听获取callid
 window.addEventListener("message",(event) => {
    if (event.data.type == "dialStatus") {
        	const data = event.data;
        	// 获取callId，data.content.callId
        }
	}
)

const message = {
  type: 'hangupConfig',
  content: {
    callId: "",
    hangupType: 1
  }
}

// 使用该方法传递给嵌入的iframe
const mapFrame = document.getElementById("iframe")
const iframeWin = mapFrame.contentWindow;
iframeWin.postMessage(message, '*');
```

异常挂断回调
| 字段 | 类型   | 备注                                                         |
| ---- | ------ | ------------------------------------------------------------ |
| type | string | 消息类型-异常挂断code                                        |
| code | number | 异常挂断code，1：当前不在通话中，2：CallId不一致，3：需配置满意度挂断 |
```js
// iframe回调的消息协议
event.data:{
  type: 'customizedHangupCode',
  content: {
    code: 1
  }
}

window.addEventListener( "message",(event) => {
  // 打印接收到的数据
  consolelog(event.data.type)
},false);
```



#### 11. 最佳实践

  以下是一个集成示例，提供了一个支持最小化和恢复原状功能的iframe，自定义按钮的示例。

  ```html
  <!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>带最小化和最大化的Iframe示例</title>
    <style>
        /* 页面黑色背景 */
        body {
            background-color: black;
            margin: 0;
            overflow: hidden;
        }

        /* 定义 iframe 的容器样式 */
        #iframe-container {
            position: relative;
            width: 256px;
            height: 489px;
            border: 1px solid #ffffff;
        }
    
        /* 定义 iframe 的样式 */
        #iframe {
            width: 100%;
            height: 460px;
            border: none;
        }
    
        /* 悬浮图标样式 */
        #floating-icon {
            display: none;
            position: fixed;
            width: 50px;
            height: 50px;
            background: url('/Users/haoqi/Pictures/nxlink.png') no-repeat center center;
            background-size: cover;
            cursor: pointer;
            bottom: 20px;
            right: 20px;
            z-index: 999;
        }
        #floating-icon img,
        #floating-icon svg{
            width: 100%;
            height: 100%;
            display: block;
        }
    
        /* iframe 最小化样式 */
        .iframe-minimize{
            width: 100%;
            height: 28px;
            background-color: #ffffff;
            border-bottom: 1px solid #e4e4e4;
            position: relative;
        }
        .company-txt{
            width: 100%;
            height: 100%;
            text-align: center;
            font-size: 12px;
            line-height: 28px;        
        }
        /* 最小化和最大化按钮的样式 */
        .control-btn {
            width: 15px;
            height: 100%;
            position: absolute;
            top: 0;
            right: 15px;
            cursor: pointer;
            z-index: 10;
        }
        .minimized {
            display: none;
        }
    </style>
</head>

<body>
    <!-- iframe 容器 -->
    <div id="iframe-container">
        <div class="iframe-minimize" id="drag-handle">
            <div class="company-txt">NXlink</div>
             <!-- 最小化按钮 -->
            <p id="minimize-btn" onclick="minimizeIframe()">
                <svg class="control-btn" t="1729478265990" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2806" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64"><path d="M128 448h768c38.4 0 64 25.6 64 64s-25.6 64-64 64H128c-38.4 0-64-25.6-64-64s25.6-64 64-64z" p-id="2807" fill="#8a8a8a"></path></svg>
            </p>
            <!-- <img src="./minimize.svg" alt=""> -->
        </div>
        <iframe id="iframe" allow="camera *; microphone *; autoplay *; hid *"
            src="https://nxlink.nxcloud.com/admin/#/nxcc"></iframe>
    </div>

    <!-- 悬浮图标 -->
    <div id="floating-icon">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 25C50 44.8477 44.8477 50 25 50C5.15227 50 0 44.8477 0 25C0 5.15227 5.15227 0 25 0C44.8477 0 50 5.15227 50 25Z" fill="#00A062"/>
            <path d="M38.8821 31.3671C38.8821 31.9162 38.6345 32.4359 38.2082 32.7819L34.7842 35.5605V16.9035C34.7842 16.3282 34.0918 16.0366 33.6802 16.4386L27.981 22.0053C27.864 22.1195 27.798 22.2762 27.798 22.4397V27.5454L23.3236 20.0414C22.8973 19.3265 23.0098 18.4135 23.5968 17.8233L29.7155 11.6728C31.5283 9.8505 34.4748 9.84141 36.2989 11.6525L38.1461 13.4867C38.6172 13.9544 38.8821 14.5907 38.8821 15.2545V31.3671Z" fill="white"/>
            <path d="M11.1179 18.6329C11.1179 18.0838 11.3655 17.5641 11.7918 17.2181L15.2158 14.4395V33.0965C15.2158 33.6718 15.9082 33.9634 16.3198 33.5614L22.019 27.9947C22.136 27.8805 22.202 27.7238 22.202 27.5603V22.4546L26.6764 29.9586C27.1027 30.6735 26.9902 31.5865 26.4032 32.1767L20.2845 38.3272C18.4717 40.1495 15.5252 40.1586 13.7011 38.3475L11.8539 36.5133C11.3828 36.0456 11.1179 35.4093 11.1179 34.7455V18.6329Z" fill="white"/>
            </svg>
            
    </div>
    
    <script>
        // 控制最小化功能
        function minimizeIframe() {
            const iframeContainer = document.getElementById('iframe-container');
            const floatingIcon = document.getElementById('floating-icon');
            iframeContainer.classList.add('minimized'); // 隐藏 iframe
            floatingIcon.style.display = 'block'; // 显示悬浮图标
        }
    
        // 控制恢复功能
        function restoreIframe() {
            const iframeContainer = document.getElementById('iframe-container');
            const floatingIcon = document.getElementById('floating-icon');
            iframeContainer.classList.remove('minimized'); // 显示 iframe
            floatingIcon.style.display = 'none'; // 隐藏悬浮图标
        }
        // 实现悬浮图标的拖动功能
        function dragElement(element) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            let elementRect; // 用于存储元素的矩形信息  
            element.onmousedown = dragMouseDown;
    
            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                // 获取元素的当前位置和尺寸  
                elementRect = element.getBoundingClientRect(); 
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }
    
            function elementDrag(e) {
                e = e || window.event;  
                e.preventDefault();  
                
                // 更新鼠标与元素初始点击位置之间的差值  
                let dx = pos3 - e.clientX;  
                let dy = pos4 - e.clientY;  
                
                // 更新鼠标当前位置  
                pos3 = e.clientX;  
                pos4 = e.clientY;  
                
                // 计算新位置  
                let newLeft = element.offsetLeft - dx;  
                let newTop = element.offsetTop - dy;  
                
                // 获取视窗的宽度和高度  
                let viewportWidth = window.innerWidth || document.documentElement.clientWidth;  
                let viewportHeight = window.innerHeight || document.documentElement.clientHeight;  
                
                // 计算元素移动后的边界位置  
                let newRight = newLeft + elementRect.width;  
                let newBottom = newTop + elementRect.height;  
                
                // 防止元素移出屏幕左边界  
                if (newLeft < 0) {  
                    newLeft = 0;  
                }  
                // 防止元素移出屏幕右边界  
                if (newRight > viewportWidth) {  
                    newLeft = viewportWidth - elementRect.width;  
                }  
                // 防止元素移出屏幕上边界  
                if (newTop < 0) {  
                    newTop = 0;  
                }  
                // 防止元素移出屏幕下边界  
                if (newBottom > viewportHeight) {  
                    newTop = viewportHeight - elementRect.height;  
                }  
                // 更新元素的位置  
                element.style.top = newTop + "px";  
                element.style.left = newLeft + "px";  
            }
    
            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
        // 窗口拖拽
        function dragWidget(){
            const dragHandle = document.getElementById('drag-handle');  
            const iframeContainer = document.getElementById('iframe-container');  
        
            let offsetX, offsetY, initialX, initialY, isDragging = false;  
        
            dragHandle.addEventListener('mousedown', (e) => {  
                isDragging = true;  
                offsetX = e.clientX - iframeContainer.offsetLeft;  
                offsetY = e.clientY - iframeContainer.offsetTop;  
                initialX = iframeContainer.offsetLeft;  
                initialY = iframeContainer.offsetTop;  
        
                document.addEventListener('mousemove', onMouseMove);  
                document.addEventListener('mouseup', onMouseUp);  
                // 改变光标样式以指示正在拖拽  
                iframeContainer.style.cursor = 'grabbing'; 
                e.preventDefault(); // 阻止默认选择行为  
            });  
        
            function onMouseMove(e) {  
                if (!isDragging) return;  
        
                let newLeft = e.clientX - offsetX;  
                let newTop = e.clientY - offsetY;  
        
                // 检查边缘碰撞  
                if (newLeft < 0) newLeft = 0; // 不要超出左边界  
                if (newTop < 0) newTop = 0; // 不要超出上边界  
                if (newLeft + iframeContainer.offsetWidth > window.innerWidth) {  
                    newLeft = window.innerWidth - iframeContainer.offsetWidth; // 不要超出右边界  
                }  
                if (newTop + iframeContainer.offsetHeight > window.innerHeight) {  
                    newTop = window.innerHeight - iframeContainer.offsetHeight; // 不要超出下边界  
                }  
        
                // 应用新位置  
                iframeContainer.style.left = `${newLeft}px`;  
                iframeContainer.style.top = `${newTop}px`;  
            }  
        
            function onMouseUp() {  
                isDragging = false;  
                document.removeEventListener('mousemove', onMouseMove);  
                document.removeEventListener('mouseup', onMouseUp);  
                // 恢复光标样式  
                iframeContainer.style.cursor = 'grab';  
            }  
        }
    
        // 为悬浮图标绑定拖动和双击恢复事件
        const floatingIcon = document.getElementById('floating-icon');
        dragElement(floatingIcon);
        dragWidget()
    
        floatingIcon.ondblclick = function () {
            restoreIframe(); // 双击恢复 iframe
        };
    
        // 初始化配置参数
        const email = ""; // todo 请设置你的账号
        const password = ""; // todo 请设置你的密码
        const lang = "zh-CN"; // 语言
        const loginMethod = 0; // 0：普通坐席登录 1: sso
    
        const message = {
            type: 'init',
            content: {
                email: email,
                password: password,
                lang: lang,
                loginMethod: loginMethod
            }
        };
    
        const mapFrame = document.getElementById("iframe");
        mapFrame.onload = function () {
            const iframeWin = mapFrame.contentWindow;
            iframeWin.postMessage(message, '*'); // 发送初始化消息
        };
    
        // 监听来自 iframe 的消息
        window.addEventListener("message", (event) => {
            // 打印接收到的数据
            console.log(event.data.type);
            const data = event.data
            const type = data.type
            const iframeWin = mapFrame.contentWindow;
            switch (type) {
                case 'login':
                    // 登录成功回调
                    const { email, sipNum, groupNo } = data.content;
                    console.log("登录成功:", email, sipNum, groupNo);
                     // 发送自定义配置
                    const userCustomConfig = {
                        type: "userCustomConfig",
                        content: {
                            dialDisabled: false,
                            callbackDisabled: false,
                        }
                    }
                    iframeWin.postMessage(userCustomConfig, '*'); // 发送初始化消息
    
                    const userCustomButton = {
                        type: "userCustomButton",
                        content: {
                            show: true,
                            buttonText: '按钮',
                            eventName: 'myEvent',
                            style: {
                                "width": "44px",
                                "height": "44px",
                                "font-size": "14px",
                                "color": "#333",
                                "display": "flex",
                                "justify-content": "center",
                                "align-items": "center",
                                "position": "absolute",
                                "left": "25px",
                                "bottom": "50px",
                                "border-radius": "50%",
                                "background-color": "#f5f5f5",
                                "cursor": "pointer",
                            }, // 举例
                        }
                    };
                    iframeWin.postMessage(userCustomButton, '*'); // 发送初始化消息
                    break;
                case 'dialStatus':
                    // 呼入情况
                    console.log("最大小化:", data.content.direction);
                    if([0,2].indexOf(data.content.direction)>-1){
                        restoreIframe()
                    }
                    break;
            
                default:
                    break;
            }
        }, false);
    </script>

</body>
</html>

  ```