## Embedded Client

#### Overview

The NXLink embedded client is a variant of the NXLink contact center service that can be used within third-party systems or as a browser extension alongside any web application. With the NXLink Embeddable Framework, you can develop your own NXLink integrations. These integrations support various types of interactions and functionalities, such as click-to-dial and screen pops.

#### User Interface

You can access menus and change status and calls from the client. The menu allows you to quickly perform common tasks, such as answering calls, making calls, or changing settings.

![p1](/images/p1.png)

#### Supported Interaction Types

Answering Calls - Agents can answer calls from the client, just like any other interaction.
Outbound Dialing - Agents can make outbound calls directly or using click-to-dial to dial external phone numbers.
Call History - Agents can access the history of all past calls.

#### Supported CRM Functionality

Click-to-Dial - Agents can initiate calls by clicking on a phone number or using a call initiation icon after configuration.
Interaction Logs - Agents can query detailed interaction logs for all agents.

#### Architecture

The following diagram illustrates the architecture of all components of the NXLink embedded client.

![p2](/images/p2.png)



#### Developer


#### 1. Iframe URL，Loading method

https://nxlink.nxcloud.com/admin/#/nxcc

```js
// Create iframe
// Suggest a width of 256px and a height of 460px
<iframe id="iframe" allow="camera *; microphone *; autoplay *; hid *" src="https://nxlink.nxcloud.com/admin/#/nxcc"></iframe>
```



#### 2. Silent Login

| Field       | Type   | Description                                                  |
| ----------- | ------ | ------------------------------------------------------------ |
| email       | string | Account (email)                                              |
| password    | string | Password                                                     |
| lang        | string | Language, currently supports Chinese (zh-CN), English (en-US), Spanish (es-MX) |
| loginMethod | number | Number0: Normal agent login (parameter transfer login), 1: Google SSO login (under this login method, there is no need to transfer email and password, and the default login page will be redirected to SSO)  |

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

// Pass it to the embedded iframe using this method.
const mapFrame = document.getElementById("iframe")
mapFrame.onload = function() {
	const iframeWin = mapFrame.contentWindow;
	iframeWin.postMessage(message, '*');
}
```

#### 3. Redirect to Login Page for Manual Login

- Not logged in: redirected to regular seat login
- Already logged in: No redirection; Jump to regular seat login when logging out
> Do not call SSO login

  ```js
  // Jump to regular seat login	
  const message = {
      type: 'toEmailLogin',
  }

  iframeWin.postMessage(message, '*');
  const mapFrame = document.getElementById("iframe")
  const iframeWin = mapFrame.contentWindow;
  ```

#### 4. Iframe Page Callback

You can receive message protocols using the following methods, and differentiate message types based on the 'type' field in the protocol.

```
window.addEventListener( "message",(event) => {
  // Print the received data.
  consolelog(event.data.type)
},false);
```



1. ###### Account Login Successful

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

2. ###### Whether the Login Account Has an Agent

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

3. ###### Phone Status and Callback Messages

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

  *The browser's multi tab pages appear synchronized, and when a tab's call status changes, the status of other tabs will remain consistent; If a tab is in call, other tabs will also be synchronized as in call.

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




4. ###### Seat status

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

5. ###### Logout Message Protocol

  ```js
  // Message protocol for iframe callback
  event.data:{
    type: 'logout'
  }
  ```

6. ###### Token Invalidation Message Protocol

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

// Pass it to the embedded iframe using this method.
const mapFrame = document.getElementById("iframe")
const iframeWin = mapFrame.contentWindow;
iframeWin.postMessage(message, '*');
```

#### 6. Proactively log out

```js
// Logout message protocol
const message = {
  type: 'loginOut',
}

const mapFrame = document.getElementById("iframe")
const iframeWin = mapFrame.contentWindow;
iframeWin.postMessage(message, '*');
```


#### 7. Status Change Description

Link：[https://help.nxcloud.com/nxlink/docs/Iframe-duo-zhuang-tai-tiao-zhuan-shuo-ming](https://help.nxcloud.com/nxlink/docs/Iframe-duo-zhuang-tai-tiao-zhuan-shuo-ming)

![status](/images/status.png)

#### 8. Custom configuration
| Field | Type | Required | Description|
| ------- | ------ | ----- |  ---------- |
| dialDisabled   | boolean  | No | Do you want to disable dial out calls? [Default allowed], true: disable, false: allow    |
| callbackDisabled  | boolean | No |Whether the call history list displays the callback button [default not displayed], true: displayed, false: not displayed|
| callingBgUrl | string | No | Background image during call |
| offlineDisable | boolean | No |Should offline prompt sounds be disabled? true: disable, false: allow |

```js
const message = {
  type: "userCustomConfig",
  content: {
    dialDisabled: false,
    callbackDisabled: false,
  }
}


// After successful login, custom configuration information can be passed upon receiving the login callback
window.addEventListener( "message",(event) => {
  consolelog(event.data.type)
  if (event.data.type == "login") {
    // Pass custom configuration
  }
},false);
```

#### 9. Custom Button
  | Field | Type | Required | Description|
  | ------- | ------ | ------ | ---------- |
  | show | boolean | No | Show Button   |
  | buttonText | string | No | Button Content   |
  | eventName| string | No |  Custom event name     |
  | style| object| No | Button style |

  ```js
  const message = {
    type: "userCustomButton",
    content: {
      show: true,
      buttonText: 'Click',
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
      }, // Example
    }
    };


  const mapFrame = document.getElementById("iframe")
  const iframeWin = mapFrame.contentWindow;
  iframeWin.postMessage(message, '*');


  // When the page customization button is clicked, the iframe calls back the "myEvent" custom event, and the user end receives the custom event message
  window.addEventListener( "message",(event) => {
    consolelog(event.data.type)
    if (event.data.type == "myEvent") {
      // ...
    }
  },false);
  ```

#### 10. Initiate Hang Up

This message provides the option to initiate a hang - up for the current call.

Initiate hang-up message

| Field      | Type   | Remark                                                       |
| ---------- | ------ | ------------------------------------------------------------ |
| type       | string | Message Type - Initiate Hang Up                              |
| callId     | string | The callid of the dialStatus message callback mentioned above |
| hangupType | number | Hang-up type, 1: Normal hang-up, 2: Satisfaction hang-up (satisfaction survey needs to be configured) |

```js
// Monitor and obtain the call ID
 window.addEventListener("message",(event) => {
    if (event.data.type == "dialStatus") {
        	const data = event.data;
        	//  Get callId，data.content.callId
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

// Use this method to pass it to the embedded iframe
const mapFrame = document.getElementById("iframe")
const iframeWin = mapFrame.contentWindow;
iframeWin.postMessage(message, '*');
```

Abnormal disconnection callback
| Field | Type   | Remark                                                       |
| ----- | ------ | ------------------------------------------------------------ |
| type  | string | Message Type - Abnormal Disconnection Code                   |
| code  | number | Abnormal call disconnection codes: 1: Not currently in a call; 2: CallId inconsistency; 3: Satisfaction disconnection needs to be configured |
```js
// Iframe callback message protocol
event.data:{
  type: 'customizedHangupCode',
  content: {
    code: 1
  }
}

window.addEventListener( "message",(event) => {
  // Print the received data
  consolelog(event.data.type)
},false);
```


#### 10. Best Practices
  Below is an integration example that provides an iframe supporting minimize and restore functions, along with an example of a custom button.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iframe Example with Minimize and Maximize</title>
    <style>
        /* Black background for the page */
        body {
            background-color: black;
            margin: 0;
            overflow: hidden;
        }

        /* Styles for iframe container */
        #iframe-container {
            position: relative;
            width: 256px;
            height: 489px;
            border: 1px solid #ffffff;
        }

        /* Styles for iframe */
        #iframe {
            width: 100%;
            height: 460px;
            border: none;
        }

        /* Floating icon styles */
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

        /* Styles for minimized iframe */
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
        /* Styles for minimize and maximize buttons */
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
    <!-- iframe container -->
    <div id="iframe-container">
        <div class="iframe-minimize" id="drag-handle">
            <div class="company-txt">NXlink</div>
             <!-- Minimize button -->
            <p id="minimize-btn" onclick="minimizeIframe()">
                <svg class="control-btn" t="1729478265990" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2806" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64"><path d="M128 448h768c38.4 0 64 25.6 64 64s-25.6 64-64 64H128c-38.4 0-64-25.6-64-64s25.6-64 64-64z" p-id="2807" fill="#8a8a8a"></path></svg>
            </p>
        </div>
        <iframe id="iframe" allow="camera *; microphone *; autoplay *; hid *"
            src="https://nxlink.nxcloud.com/admin/#/nxcc"></iframe>
    </div>

    <!-- Floating icon -->
    <div id="floating-icon">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 25C50 44.8477 44.8477 50 25 50C5.15227 50 0 44.8477 0 25C0 5.15227 5.15227 0 25 0C44.8477 0 50 5.15227 50 25Z" fill="#00A062"/>
            <path d="M38.8821 31.3671C38.8821 31.9162 38.6345 32.4359 38.2082 32.7819L34.7842 35.5605V16.9035C34.7842 16.3282 34.0918 16.0366 33.6802 16.4386L27.981 22.0053C27.864 22.1195 27.798 22.2762 27.798 22.4397V27.5454L23.3236 20.0414C22.8973 19.3265 23.0098 18.4135 23.5968 17.8233L29.7155 11.6728C31.5283 9.8505 34.4748 9.84141 36.2989 11.6525L38.1461 13.4867C38.6172 13.9544 38.8821 14.5907 38.8821 15.2545V31.3671Z" fill="white"/>
            <path d="M11.1179 18.6329C11.1179 18.0838 11.3655 17.5641 11.7918 17.2181L15.2158 14.4395V33.0965C15.2158 33.6718 15.9082 33.9634 16.3198 33.5614L22.019 27.9947C22.136 27.8805 22.202 27.7238 22.202 27.5603V22.4546L26.6764 29.9586C27.1027 30.6735 26.9902 31.5865 26.4032 32.1767L20.2845 38.3272C18.4717 40.1495 15.5252 40.1586 13.7011 38.3475L11.8539 36.5133C11.3828 36.0456 11.1179 35.4093 11.1179 34.7455V18.6329Z" fill="white"/>
        </svg>
    </div>

    <script>
        // Control minimize functionality
        function minimizeIframe() {
            const iframeContainer = document.getElementById('iframe-container');
            const floatingIcon = document.getElementById('floating-icon');
            iframeContainer.classList.add('minimized'); // Hide iframe
            floatingIcon.style.display = 'block'; // Show floating icon
        }

        // Control restore functionality
        function restoreIframe() {
            const iframeContainer = document.getElementById('iframe-container');
            const floatingIcon = document.getElementById('floating-icon');
            iframeContainer.classList.remove('minimized'); // Show iframe
            floatingIcon.style.display = 'none'; // Hide floating icon
        }

        // Implement dragging functionality for the floating icon
        function dragElement(element) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            let elementRect; // For storing element's rectangle information  
            element.onmousedown = dragMouseDown;

            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                elementRect = element.getBoundingClientRect(); 
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;  
                e.preventDefault();  
                let dx = pos3 - e.clientX;  
                let dy = pos4 - e.clientY;  
                pos3 = e.clientX;  
                pos4 = e.clientY;  
                let newLeft = element.offsetLeft - dx;  
                let newTop = element.offsetTop - dy;  
                let viewportWidth = window.innerWidth || document.documentElement.clientWidth;  
                let viewportHeight = window.innerHeight || document.documentElement.clientHeight;  
                let newRight = newLeft + elementRect.width;  
                let newBottom = newTop + elementRect.height;  
                if (newLeft < 0) newLeft = 0;  
                if (newRight > viewportWidth) newLeft = viewportWidth - elementRect.width;  
                if (newTop < 0) newTop = 0;  
                if (newBottom > viewportHeight) newTop = viewportHeight - elementRect.height;  
                element.style.top = newTop + "px";  
                element.style.left = newLeft + "px";  
            }

            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }

        function dragWidget(){
            const dragHandle = document.getElementById('drag-handle');  
            const iframeContainer = document.getElementById('iframe-container');  
            let offsetX, offsetY, isDragging = false;  
            dragHandle.addEventListener('mousedown', (e) => {  
                isDragging = true;  
                offsetX = e.clientX - iframeContainer.offsetLeft;  
                offsetY = e.clientY - iframeContainer.offsetTop;  
                document.addEventListener('mousemove', onMouseMove);  
                document.addEventListener('mouseup', onMouseUp);  
                iframeContainer.style.cursor = 'grabbing'; 
                e.preventDefault();  
            });  

            function onMouseMove(e) {  
                if (!isDragging) return;  
                let newLeft = e.clientX - offsetX;  
                let newTop = e.clientY - offsetY;  
                if (newLeft < 0) newLeft = 0; 
                if (newTop < 0) newTop = 0; 
                if (newLeft + iframeContainer.offsetWidth > window.innerWidth) newLeft = window.innerWidth - iframeContainer.offsetWidth;  
                if (newTop + iframeContainer.offsetHeight > window.innerHeight) newTop = window.innerHeight - iframeContainer.offsetHeight;  
                iframeContainer.style.left = `${newLeft}px`;  
                iframeContainer.style.top = `${newTop}px`;  
            }  

            function onMouseUp() {  
                isDragging = false;  
                document.removeEventListener('mousemove', onMouseMove);  
                document.removeEventListener('mouseup', onMouseUp);  
                iframeContainer.style.cursor = 'grab';  
            }  
        }

        // Bind drag and double-click restore event for the floating icon
        const floatingIcon = document.getElementById('floating-icon');
        dragElement(floatingIcon);
        dragWidget();

        floatingIcon.ondblclick = function () {
            restoreIframe(); // Double-click to restore iframe
        };

        // Initialize configuration parameters
        const email = ""; // todo  your account
        const password = ""; // todo your password
        const lang = "en"; 
        const loginMethod = 0; 

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
            iframeWin.postMessage(message, '*'); 
        };

        // Listen to messages from the iframe
        window.addEventListener("message", (event) => {
            console.log(event.data.type);
            const data = event.data;
            const type = data.type;
            const iframeWin = mapFrame.contentWindow;
            switch (type) {
                case 'login':
                    const { email, sipNum, groupNo } = data.content;
                    console.log("Login successful:", email, sipNum, groupNo);
                    const userCustomConfig = {
                        type: "userCustomConfig",
                        content: {
                            dialDisabled: false,
                            callbackDisabled: false,
                        }
                    }
                    iframeWin.postMessage(userCustomConfig, '*'); 

                    const userCustomButton = {
                        type: "userCustomButton",
                        content: {
                            show: true,
                            buttonText: 'Button',
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
                            }, 
                        }
                    };
                    iframeWin.postMessage(userCustomButton, '*'); 
                    break;
                case 'dialStatus':
                    console.log("Minimize/Maximize:", data.content.direction);
                    if([0,2].indexOf(data.content.direction)>-1){
                        restoreIframe();
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