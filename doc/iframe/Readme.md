## 牛信云呼叫中心Iframe对接文档



#### 1. Iframe URL，Loading method

https://nxlink.nxcloud.com/admin/#/nxcc

```js
// Create iframe
// Suggest a width of 256px and a height of 460px
<iframe id="iframe" allow="camera *; microphone *; autoplay *; hid *" src="https://nxlink.nxcloud.com/admin/#/nxcc"></iframe>
```



#### 2. Initialize Configuration Parameters and Register Phone

| Field       | Type   | Description                                                  |
| ----------- | ------ | ------------------------------------------------------------ |
| email       | string | Account (email)                                              |
| password    | string | Password                                                     |
| lang        | string | Language, currently supports Chinese (zh-CN), English (en-US), Spanish (es-MX) |
| loginMethod | number | Number0: Normal agent login (parameter transfer login), 1: Google SSO login (under this login method, there is no need to transfer email and password, and the default login page will be redirected to SSO)                                                                 * Do not send this field, default to redirecting to the login page with the account password input. |

```js
// loginMethod：0，Agent login
const message = {
    type: 'init',
    content: {
        email：email，
    	password： password，
        lang: "zh-CN",
        loginMethod：0
    }
}
// loginMethod：1，Google SSO Login Message Protocol
const message = {
    type: 'init',
    content: {
        lang: "zh-CN",
        loginMethod：1
    }
}

const mapFrame = document.getElementById("iframe")
mapFrame.onload = function() {
	const iframeWin = mapFrame.contentWindow;
	iframeWin.postMessage(message, '*');
}
```

#### 3. Jump to the login page for regular seats

- Not logged in: redirected to regular seat login
- Already logged in: No redirection; Jump to regular seat login when logging out
> Do not call SSO login
 
   ```js
   // Jump to regular seat login	
   const message = {
       type: 'toEmailLogin'
   }

   iframeWin.postMessage(message, '*');
   const mapFrame = document.getElementById("iframe")
   const iframeWin = mapFrame.contentWindow;
   ```


#### 4. Iframe Page Callback

```js
// iframe sends message to the system via postMessage
window.parent.postMessage(data, '*');
```


1. ##### Account Login Successful

   If the login account has an agent, the following fields are passed; if there is no agent, no fields are passed.

   | Field   | Type   | Description        |
   | ------- | ------ | ------------------ |
   | email   | string | Login account      |
   | sipNum  | string | Phone number       |
   | groupNo | string | Agent group number |

   ```js
   // Message protocol for iframe callback
   event.data:{
       type: 'login',
       content: {
         email: '',
         sipNum: '',
         groupNo: ''    
       }
   }
   ```

2. ##### Whether the Login Account Has an Agent

      | code | Description                                                  |
      | ---- | ------------------------------------------------------------ |
      | 1    | The account has an agent                                     |
      | 2    | The account does not have an agent or the agent status is closed |

      ```js
      // Message protocol for iframe callback
      event.data:{
          type: 'agentExists',
          content: {
            code: 1
          }
      }
      ```

3. ##### Phone Status and Callback Messages

   | Code（number） | Seat phone status             |
   | -------------- | ----------------------------- |
   | 0              | Calling out ringing           |
   | 1              | Incoming ringing              |
   | 2              | In call                       |
   | 3              | Phone disconnected            |
   | 4              | Phone registered successfully |
   | 5              | Hung up                       |
   | 6              | Account not logged in         |
   | -1             | Phone registration failed     |

   *The browser's multi tab pages appear synchronized, and when a tab's call status changes, the status of other tabs will remain consistent; If Atab is in call, other tabs will also be synchronized as in call.

   When the phone status is dialing out (0), incoming call (1), in call (2), or hung up (5), the following fields are returned:
   
   | Field                  | Type        | Description                                                  |
   | ---------------------- | ----------- | ------------------------------------------------------------ |
   | callId                 | string      | Call ID                                                      |
   | direction              | number      | Call scenario: 0 for incoming, 1 for outgoing, 2 for auto-dial to agent |
   | caller                 | string      | Caller number                                                |
   | callee                 | string      | Callee number                                                |
   | orderId                | string      | Custom user ID, string, 32 characters                        |
   | params                 | json string | User defined fields returned on outbound call, supporting JSON strings |
   | callStartTimestamp     | number(ms)  | Timestamp when call is initiated/received                    |
   | callConnectedTimestamp | number(ms)  | Timestamp when call is connected                             |
   | callHangUpTimestamp    | number(ms)  | Timestamp when call is hung up                               |
   | other                  | json string | User defined fields returned on incoming calls               |
   
   ```js
   // Message protocol for iframe callback
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
   
   ###### Hanging Reason Mapping
   
   | Code | Reason for hanging up                          |
   | ---- | ---------------------------------------------- |
   | 810  | Balance is insufficient                        |
   | 811  | The country is restricted from calling         |
   | 812  | Incorrect number                               |
   | 813  | Login has expired, please login again          |
   | 814  | Call failed (blacklisted number)               |
   | 815  | Call failed (call limit reached)               |
   | 816  | Current number cannot be used                  |
   | 800  | Network abnormal                               |
   | 801  | Network abnormal                               |
   | 817  | Today's call experience limit has been reached |
   | 819  | DID number call failed                         |




4. ##### Seat status

   | code（number） | Description                                                  |
   | -------------- | ------------------------------------------------------------ |
   | 1              | Work - idle, can call in and out                             |
   | 2              | Work - busy (including initiating/receiving calls, returning this code during calls, and organizing), only able to make outgoing calls |
   | 3              | Rest - Meeting, can only be called out                       |
   | 4              | Rest - Eat, only able to exhale                              |
   | 5              | Rest - Toilet, only able to exhale                           |
   | 6              | Rest - Sleepping, only able to exhale                        |
   | 7              | Rest - Other, can only exhale                                |

   *Browser multi tab page performance: When a tab's seat status changes and switches to other tabs, the status will remain consistent

   ```js
   // Message protocol for iframe callback
   event.data:{
       type: 'agentStatus',
       content: {
         code: 1
       }
   }
   ```

5. ##### Logout Message Protocol

   ```js
   // Message protocol for iframe callback
   event.data:{
       type: 'logout'
   }
   ```

6. ##### Token Invalidation Message Protocol

   ```js
   // Message protocol for iframe callback
   event.data:{
       type: 'tokenInvalid'
   }
   ```

   

#### 5. Initiate Call Message Protocol

| Field       | Type       | Description                                                  |
| ----------- | ---------- | ------------------------------------------------------------ |
| caller      | string(32) | caller，The caller will call out based on a random number when passing through the air |
| callee      | string(32) | callee, should include country code, e.g., for Hong Kong:852*** |
| countryCode | string     | callee country code                                          |
| orderId     | string(32) | custom orderId, optional                                     |
| params      | string     | custom fields, optional                                      |



```js
const message = {
    type: 'callOut',
    content: {
        caller: '',
  		callee: "8524444",
  		countryCode: "852",
  		orderId: "66493f1afaa3",
        params： ""
    }
}

const mapFrame = document.getElementById("iframe")
const iframeWin = mapFrame.contentWindow;
iframeWin.postMessage(message, '*');
```

#### 6. Proactively log out

```js
// Logout message protocol
const message = {
    type: 'loginOut'
}
   
const mapFrame = document.getElementById("iframe")
const iframeWin = mapFrame.contentWindow;
iframeWin.postMessage(message, '*');
```


#### 7. Status Change Description

Link：[https://help.nxcloud.com/nxlink/docs/Iframe-duo-zhuang-tai-tiao-zhuan-shuo-ming](https://help.nxcloud.com/nxlink/docs/Iframe-duo-zhuang-tai-tiao-zhuan-shuo-ming)

![status](./img/status.png)
