# start

## quick start

### Initialize your web server, which must be accessed using https.

### Get NXLINK account

When jssdk logs in, you need to use the nxlink account, which is the account password required to obtain the TOKEN interface in the following example. You can log in to the [NXLINK](https://nxlink.nxcloud.com/admin/#/register) to obtain and manage them.（The account is single sign-on）

## SDK Instructions

### SDK usage steps

1. Import [nxwebrtc.js](https://github.com/nxtele/nxcc/blob/main/nxcc-jssdk/lib/nxwebrtc.js).
2. Define profile, set nxuser, nxpass (sip account), logLevel, playTone and other attributes,
3. new NxwCall(profile) creates the object nxwcall and sets the callback method based on nxwcall.myEvents.
4. nxwcall will automatically start the state machine. After the registration is successful, it will enter the UA_READY state, and you can call in and out.
5. It is usually necessary to perform related processing for the received event in the callback method. You can call the api to perform the corresponding functions: initiate a call, connect a call, and hang up a call.

### Example

#### 1. Introduce nxwebrtc.js

```html
<script src="your/path/nxwebrtc.js"></script>
```

```js
let NxwCall = NXW.default; //Type declaration of the object
let nxwcall = null; // the global instance of the object, not yet initialized
```

#### 2. Obtain TOKEN and phone registration information

/admin/saas_plat/user/login -- THE API REQUEST TO OBTAIN THE TOKEN(If the token does not perform any operation, it expires within 5 hours, and it will be renewed if there is an interface request)

```
request
curl --location --request PUT 'https://nxlink.nxcloud.com/admin/saas_plat/user/login' \
--header 'lang: en_US' \
--header 'User-Agent: apifox/1.0.0 (https://www.apifox.cn)' \
--header 'Content-Type: application/json' \
--data-raw '{
	loginMethod: 0， // 0 Log in by email， 1 Log in with your mobile phone number
	email: "email"， // Log in by email，Mobile phone number login：phone： “phone”,
	password: "password",
  graphVerificationCode: "", // Required, empty string
  key: ""   // Required, empty string
}'
body
{
    "code": 0,
    "message": "",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1SWQiOjEsInV1SWQiOiI2NGMyMjBjNmIxYmMyNjUyM2NjMTIyZmQifQ.uMMrkXVSAXht0AN_KlxN2LHhS9GwlmTYYp61Rm0QXGk",
        "lang": "zh_CN",
        "time_zone_id": 105,
        "time_zone": "UTC+08:00"
    },
    "traceId": "f062fc22055bd86f236ea63032fed48e"
}

```

/cc/fs/webCall/register -- The API requests registration information

```
request
curl --location --request POST 'cc/fs/webCall/register' \
--header 'usertoken: eyJhbGciOiJIUzI1NiJ9.eyJ1SWQiOjEsInV1SWQiOiI2NGMxY2I2Y2IxYmNlYzE0NjM1ZTIyMGUifQ.rYlUFXIqTnP9vCAkkHIU_jGl5SO_oBJq4nzKp8Ivx7g' \
--header 'lang: en_US' \
--header 'Authorization;' \
--header 'User-Agent: apifox/1.0.0 (https://www.apifox.cn)' \
--header 'Content-Type: application/json' \
--data-raw '{
    "agentName": "8618344031797"
}'
body
{
    "reqId": "41aa5b571b66b33c028c1ef1b1204ecf",
    "code": 0,
    "msg": "succees",
    "data": {
        "domain": "domain",  // domain
        "groupNo": "groupNo",  // Agent groups
        "sipNum": "sipNum",  // Agent account
        "url": "wssurl",  // wssurl
        "email": "email",  // email
        "tenantNickName": "tenantNickName",  // Tenant nickname
        "company": "company",  // Certified Enterprise
        "tenantName": "tenantName",  // Tenant Name
        "roleName": "roleName",  // role
        "utcDate": "2023/07/27",  //utc time
    }
}

```

#### 3. Define the profile

```js
let profile = {
  nxuser: "xxxxxxx",  // SipNum agent account in phone information
  nxpass: "xxxxxxx",  // Require MD5 encryption, such as: MD5 (email+":"+domain+":"+utcDate)
  logLevel: "error",
  playTone: 0xff,
  nxtype: 6,
  audioElementId: "remoteAudio",
  playElementId: "playAudio",
  audioSrcPath: "https://nxcc-sgp-test-1259196162.cos.ap-singapore.myqcloud.com/static/resource/audio",
  domain: `${domain}`,  // DOMAN Domain Name in Phone Information
  wssurl: `${wssurl}`,  // Wssurl in phone information
  ccAgent: `${email}`,  // Email email in phone information
  ccToken: `${Token}`,    //  Token obtained from login interface'
  ccQueue: `${groupNo}`  // CcQueue Agent Group in Phone Information
};
```

- audioElementId and playElementId are the ids of the audio component of the page
- If you need to customize playTone, please refer to the <a href='#audiolist'>list</a>.

#### 4. Initialize and start the object

Taking the defined profile as the parameter of the NxwCall constructor, the nxwcall object will be automatically created, and it will try to perform state transition automatically. First perform NXAPI authentication, then connect to the wss server, and then enter the UA_READY state after successful registration.

```js
function initApp() {
  if (nxwcall == null) {
    nxwcall = new NxwCall(profile);
    setupEvents(nxwcall);
  }
}
```

#### 5. Write the callback function

```js
function setupEvents(nxwcall) {
    let e = nxwcall.myEvents;
    console.log("setupEvents e=", e)
	
    // Make a call
    e.on("placeCall", function () {
        console.log("================", "placeCall")        
    });
    
    // The phone is successfully registered
    e.on("onRegistered", function () {
        console.log("================", "onRegistered")        
    });
    
    // Incoming calls
    e.on("onCallReceived", function (param1) {
        console.log("================", "onCallReceived", param1)
        // Get the number of the incoming call 
        const numner = param1.split("@")[0]
    });
    
    // Answer
    e.on("onCallAnswered", function () {
        console.log("================", "onCallAnswered")
        // Get the current call seconds
        let callTimer = setInterval(() => {
          const t = nxwcall.talkingTime / 1000;
          const time = Math.floor(t);
          let isTimer = parseInt(time);
          if (isTimer > 0 && isTimer % 180 == 0) {
            changeSipStatu("Available", "In a queue call");
          }
        }, 1000);
    });
    
    // Outbound calls to get the CcallId
    e.on("onAccept", function () {
        console.log("=====Get the parameters======", "onAccept", nxwcall.lastCcCallId);
    })
    
    // hang up
    e.on("onCallHangup", function () {
      console.log("=====Actions after hanging up======", "onCallHangup");
    })
    
    // Hang-up reason mapping
    e.on("onReject", function (param1) {
        let code = nxwcall.lastCcCode
        switch (code) {
            case "810":
                message.error(‘The phone is in arrears’);
                break;
                .... // See the table below for more reasons for hanging up
        }
	}）
    
    // WSS is disconnected
    e.on("onServerDisconnect", function (param1) {
        console.log("=====Get the parameters======", "onServerDisconnect", param1);
    })
    
    // The WSS link was successful
    e.on("onServerConnect", function (param1) { 
     	console.log("================", "onServerConnect", param1);
    })
    
    // The phone registration failed
    e.on("onUnregistered", function () { 
        // Registration failures reinitialize and start the object
        initApp()
    })
    // A collection of errors
    e.on("error", function (param1) {
        console.log("================", "error", param1);
        // Registration failures reinitialize and start the object
        initApp();
    });
}
```

| Code | 挂断原因                                               |
| ---- | ------------------------------------------------------ |
| 810  | The phone is in arrears                                |
| 811  | Countries where calls are not allowed                  |
| 812  | The number is incorrect                                |
| 813  | The login information has expired, please log in again |
| 814  | Call Failed (Blacklist Number)                         |
| 815  | Call Failure (Call Limit)                              |
| 816  | The current number is not available                    |
| 800  | The network is abnormal                                |
| 801  | The network is abnormal                                |
| 817  | Today's calling experience is capped.                  |
| 819  | DID number call failed.                                |

The nxwebrtc SDK library encapsulates multiple <a href='#eventlist'>event notifications</a>, which can interact with business logic in the corresponding event callback functions.
1. ##### Inbound, outbound, and auto-dialing are distinguished from manual scenarios

   Set the mapping parameters

   ```js
   // 0:Inbound, 1:Outbound, 2:Auto-dialed to manual
   let direction
   ```

   Inbound、Auto-dialed to manual

   ```js
   e.on("onCallReceived", function () {
   	// nxwcall is the parameter of the setupEvents function
   	// nxDirectionType: 0:Inbound，2:Auto-dialed to manual
   	direction = nxwcall.nxDirectionType
   });
   ```

   Outbound

   ```js
   // Make a call
   e.on("placeCall", function () {
   	direction = 1
   });
   ```
   



#### 6. The status of the phone changes

##### 1. Phone status switching interface

status, state mapping

| Page status     | status    | state           |
| --------------- | --------- | --------------- |
| Available       | Available | Waiting         |
| On break        | On break  | Idle            |
| In a queue call | Available | In a queue call |
| Receiving       | Available | Receiving       |

   updateTime: the current timestamp, agentName: the current agent's email address (the email address of the API callback is registered)

```
   curl --location --request POST 'https://nxlink.nxcloud.com/cc/fs/ccAgent/status/change' \
   --header 'usertoken: eyJhbGciOiJIUzI1NiJ9.eyJ1SWQiOjkxLCJ1dUlkIjoiNjUwYTUxZTNiMWJjODBhMjg2NzYxNDM1In0.-8Vtg5Hc0g-		  e_1tHmXI_pSFjQuqD6t5YExoZs_cI3t4' \
   --header 'lang: zh_CN' \
   --header 'Authorization;' \
   --header 'User-Agent: apifox/1.0.0 (https://www.apifox.cn)' \
   --header 'Content-Type: application/json' \
   --data-raw '{"agentName":"fang.cheng@nxcloud.com","status":"Available","state":"Waiting","updateTime":1699344035}'
```

##### 2. Different events send different statuses

1. Successful registration is sent once with default status (idle or busy)

   ```
   e.on("onRegistered", function () {
       const postForm = {
       	"agentName":"fang.cheng@nxcloud.com",
       	"status":"Available",
       	"state":"Waiting",
       	"updateTime":1699344035
       }       
   });
   // The current example is the default idle display
   ```

   

2. The ringing status is sent once, and both placeCall and onCallReceived events need to send the status

   ```
   e.on("placeCall", function () {
       const postForm = {
       	"agentName":"fang.cheng@nxcloud.com",
       	"status":"Available",
       	"state":"Receiving",
       	"updateTime":1699344035
       }       
   });
   ```

3. Send the call status once in a call

   ```
   e.on("onCallAnswered", function () {
       const postForm = {
       	"agentName":"fang.cheng@nxcloud.com",
       	"status":"Available",
       	"state":"In a queue call",
       	"updateTime":1699344035
       }       
   });
   ```

4. The default state before an incoming or outbound call is sent at the end of a call

   ```
   e.on("onCallHangup", function () {
       const postForm = {
       	"agentName":"fang.cheng@nxcloud.com",
       	"status":"Available",
       	"state":"Waiting",
       	"updateTime":1699344035
       }       
   });
   // An example is to restore the default idle state
   ```

   In order to maintain the consistency of the background and client status, it is recommended to report the request for the current agent to be idle or busy once every five minutes, and do not need to report during ringing or calling

#### 7. Start testing

After the onRegistered callback is completed, the outgoing call can be performed and the incoming call can be processed.
Local microphone test:

```js
nxwcall.placeCall("9196");
```

Remote server test:

```js
nxwcall.placeCall("4444");
```

After completing the test, your phone channel is ready.

#### 8. Related information interfaces

1. Call log callbacks

   [](https://www.nxcloud.com/document/nxcc/nxccCdr)

2. Obtain the outbound call display number

   ```
   curl --location --request POST 'https://nxlink.nxcloud.com/cc/api/ccDidNumber/v1/myUsefulNumber' \
   --header 'usertoken: eyJhbGciOiJIUzI1NiJ9.eyJ1SWQiOjkxLCJ1dUlkIjoiNjUwYTUxZTNiMWJjODBhMjg2NzYxNDM1In0.-8Vtg5Hc0g-e_1tHmXI_pSFjQuqD6t5YExoZs_cI3t4' \
   --header 'lang: zh_CN' \
   --header 'Authorization;' \
   --header 'User-Agent: apifox/1.0.0 (https://www.apifox.cn)'
   --header 'Content-Type: application/json' \   
   ```

3. Get the country where it is opened

   ```
   curl --location --request POST 'https://nxlink.nxcloud.com/cc/api/ccCountry/v1/allForMe' \
   --header 'usertoken: eyJhbGciOiJIUzI1NiJ9.eyJ1SWQiOjkxLCJ1dUlkIjoiNjUwYTUxZTNiMWJjODBhMjg2NzYxNDM1In0.-8Vtg5Hc0g-e_1tHmXI_pSFjQuqD6t5YExoZs_cI3t4' \
   --header 'lang: zh_CN' \
   --header 'Authorization;' \
   --header 'User-Agent: apifox/1.0.0 (https://www.apifox.cn)'
   --header 'Content-Type: application/json' \   
   ```

4. Get the last 30 calls

   ```
   curl --location --request POST 'https://nxlink.nxcloud.com/cc/api/ccCdr/v/recent' \
   --header 'usertoken: eyJhbGciOiJIUzI1NiJ9.eyJ1SWQiOjkxLCJ1dUlkIjoiNjUwYTUxZTNiMWJjODBhMjg2NzYxNDM1In0.-8Vtg5Hc0g-e_1tHmXI_pSFjQuqD6t5YExoZs_cI3t4' \
   --header 'lang: zh_CN' \
   --header 'Authorization;' \
   --header 'User-Agent: apifox/1.0.0 (https://www.apifox.cn)' \
   --header 'Content-Type: application/json' \
   --data-raw '{"direction":null,"answered":null}'   
   ```

5. Disconnect the current phone

   ```
   nxwcall.disconnect();
   nxwcall = null;
   ```

6. Log out of the current login account

   ```
   curl --location --request PUT 'https://nxlink.nxcloud.com/admin/saas_plat/user/logout' \
   --header 'Authorization: eyJhbGciOiJIUzI1NiJ9.eyJ1SWQiOjkxLCJ1dUlkIjoiNjUwYTUxZTNiMWJjODBhMjg2NzYxNDM1In0.-8Vtg5Hc0g-e_1tHmXI_pSFjQuqD6t5YExoZs_cI3t4' \
   --header 'lang: zh_CN' \
   --header 'User-Agent: apifox/1.0.0 (https://www.apifox.cn)'
   --header 'Content-Type: application/json' \
   ```

### Customize playTone

From the start of the call to the end of the call, NXCLOUD defines a total of 5 default tones. If you do not modify the playback mechanism of the tones at all, set playTone=0xFF. If you don't want to play any tones, set playTone=0x00. If you want to play the custom tone at all, set playTone=0x80.
Here are a few values that control the playing of the beep: they are a bitwise AND:

| value | meaning                                                                                        |
| ----- | :--------------------------------------------------------------------------------------------- |
| 0xFF  | ALL: Play all                                                                                  |
| 0x01  | RINGIN: Allow the SDK to automatically play the ringing tone                                   |
| 0x02  | RINGOUT: Allow the SDK to automatically play the ringback tone                                 |
| 0x04  | CONNECTED: Allow the SDK to automatically play the connection tone                             |
| 0x08  | HANGUP: Allow the SDK to automatically play the hangup tone                                    |
| 0x10  | ONLINE: Allow the SDK to automatically play the online prompt                                  |
| 0x80  | CUSTOM: Allow the SDK to play your custom audio file in wav or mp3 format, mono, 8kHZ or 16kHZ |

#### NXCLOUD SDK default 5 beeps:

Specify the directory of the prompt through the parameter audioSrcPath of the profile

<h2 id='audiolist'></h2>

| filename      | purpose       |
| ------------- | :------------ |
| ringin.wav    | Ring tone     |
| ringout.wav   | Ringback tone |
| connected.wav | Connect tone  |
| hangup.wav    | Hangup tone   |
| online.wav    | Online beep   |

## Nxwebrtc Instructions for Use

### NxwAppConfig

| Attribute            | Type     | Required | Description                                                                     |
| -------------------- | :------- | :------- | :------------------------------------------------------------------------------ |
| nxuser               | string   | M        |
| nxpass               | string   | M        |
| nxtype               | number   | M        | NX voice call production environment is set to 6                                |
| audioElementId       | string   | M        | The id of the HTML component that plays the audio of the other party            |
| playElementId        | string   | M        | The id of the audio component that plays the ringing, ringback, and hangup tone |
| logLevel             | LogLevel | M        | debug: debug, warn: warning, error: error                                       |
| playTone             | number   | O        | tone playback control                                                           |
| audioSrcPath         | string   | O        | Prompt sound wav file path, the default is audio                                |
| video                | boolean  | O        | Whether to enable video, default false                                          |
| videoLocalElementId  | string   | O        | id of the video component of the local video                                    |
| videoRemoteElementId | string   | O        | id of remote video video component                                              |
| autoAnswer           | boolean  | O        | Whether the incoming call is automatically connected, the default is false      |

### Status of Nxwebrtc

| state           | description                                    | events that may trigger this state |
| --------------- | :--------------------------------------------- | ---------------------------------- |
| UA_INIT=0       | Initial State                                  |
| UA_NXAPI        | Query NXAPI, verify according to nxuser/nxpass |
| UA_CONNECTING   | Attempting to connect to NX's wss server       |
| UA_CONNECTED    | connected to wss server successfully           | onServerConnect                    |
| UA_REGISTERING  | Attempting REGISTER registration               |
| UA_READY        | Registered successfully, ready to complete     | onRegistered                       |
| UA_CALLING_OUT  | Outgoing Call Status                           | onCallCreated                      |
| UA_INCOMING     | Incoming Status                                | onCallReceived                     |
| UA_TALKING      | On Status                                      | onCallAnswered                     |
| UA_CALL_ENDING  | Call ending                                    |
| UA_CALL_END     | Call completely ended                          | onCallHangup                       |
| UA_DISCONNECTED | Disconnected from wss server                   | onServerDisconnect                 |
| UA_ERROR        | SDK various abnormal events                    | error                              |

<h2 id='eventlist'></h2>

### EventEmitter event notification

Nxwebrtc encapsulates the call-related events of the SIP bottom protocol stack, and uses the EventEmitter object to interact with the business, and the business layer can register callback functions.
Event|Parameter Description|Description
--|:--|:--
onCallCreated|RemoteNumber|Initial call created successfully, calling mode
onCallAnswered|RemoteNumber|Call connected, calling or called
onCallReceived|RemoteNumber| received a call request, called mode
onCallHangup|RemoteNumber| hang up the call, the calling or the called, the other party hangs up first
onServerConnect|-|Connect to NX's wss server
onServerDisconnect|-|disconnect|to NX's wss server
onRegistered|-|Registered successfully
onUnregistered|-| failed to register, or successfully unregistered,
onCallDTMFReceived|tone+":"+duration|DTMF button information and duration
onMessageReceived|message|MESSAGE The text of the message
error|Msg|A description of the abnormal event

### Properties of Nxwebrtc

It can be associated with the data of the business layer through the properties of the nxwebrtc object, and there is corresponding data in the CDR callback of the call.
parameter|read-write|description
--|:--|:--
myState|R| Read only the state of the state machine of the current NxwCall
myOrderId|RW|Set this orderId information before making a call
comingOrderId|RW|The already carried orderId information when calling in

## Main method

#### Make a call

Outbound call signal out

```js
let hdrs = new Array(
  `X-NXCC-Out-Caller-Number:  ${The selected outbound call display number}`,
  // callCountry is the country of the current number
  `X-Callee-Country-Code: ${
    callCountry == undefined ? "" : callCountry
  }`
);
nxwcall.placeCall(`${callCountry == undefined ? "" : callCountry}${state.numberText}`, hdrs);
```
Random display number calls

```js
let hdrs = new Array(、
  // callCountry is the country of the current number
  `X-Callee-Country-Code: ${
    callCountry == undefined ? "" : callCountry
  }`
);
nxwcall.placeCall(`${callCountry == undefined ? "" : callCountry}${state.numberText}`, hdrs);
```

#### Connect the call

```js
nxwcall.answerCall()
```

#### Reject call

```js
nxwcall.hangupCall() // For incoming calls, hang up directly.
```

#### hang up call

```js
hangupCall(); //For an outgoing or incoming SIP call that has been connected, the local party will actively hang up.
```

### Other methods

#### Register and cancel account

The manual registration and cancellation of the account is generally not required for this manual operation. The SDK will automatically maintain the state machine and try its best to ensure the registered state.

```js
register(); // Registration of sip account.

unregister(); // Logout of the sip account.
```

#### disconnect wss connection

When creating NxwCall, it will try to automatically connect to the wss server. This function is used to actively disconnect the wss connection. If the account has been registered, the account will be cancelled first. Can be used to switch accounts or pre-close pages.

```js
disconnect();
```

#### Play beep

```js

Statement: play(action: string, filename?: string)

Example: nxwcall.play('start','my-music.wav') //Play a custom sound

nxwcall.play('end') //stop playing all prompts
```

- action: start or end, start playback and stop playback.
- filename Audio file name.

**Note: If the current page has no mouse and keyboard interaction, the background playback of the page will be automatically muted by the browser**

#### Send DTMF key message

When the call is connected, the DTMF information is sent, usually through the INFO message, and possibly through RTP in-band transmission.

```js

Declaration: sendDTMF(tonestr: string)

Example: nxwcall.sendDTMF('1'); // DTMF key 1 occurs

```

#### Turn off the microphone, mute locally

```js

muteCall(checked: boolean)

```

#### audio control sound, whether to play the other party's sound

```js

silentCall(checked: boolean)

```

#### Set the local playback volume

Set the local playback volume, the parameter volume represents the percentage of the maximum volume, the optional value is [0,1] or (1,100],

```js

Statement: setVolume(volume: number)

Example: nxwcall.setVolume(0.8); //set to 80% of the maximum volume

nxwcall.setVolume(80); //Set to 80% of the maximum volume

```

## SDK Compatibility Requirements

### Browser Requirements

#### PC browser (win/linux/macOS)

- Mobile browser (android/iOS)
- Chrome 56+
  -Edge 79+
- Safari 16+
- Firefox 44+
- Opera 43+
- **Does not support IE browser**

#### Mobile browser (android/iOS)

- Chrome Android 105+
- Dafari iOS 11+
- UC Android 13.4+
- Android Browser 105+
- Firefox Android 104+
- QQ browser 13.1+
- Baidu Browser 13.18+
- KaiOS Browser 2.5+
