export default {
    head: {
        nxcc: 'NXCC',
        beginnersGuide: 'Beginners Guide',
        management: 'Management',
        confirm: 'Confirm',
        cancel: 'cancel',
        exitSuccessfully: 'exit successfully',
        successfullyModified: 'Successfully modified',
        openAfterCall: 'Enabling the After-call Work refers to the busy status will be opened by default when a dialer ends a calling and switch to the free status after the after-call work is finished.',
        closeAfterCall: 'Disable the After-call Work',
        openGuide: 'Click here to open the Beginners Guide',
        tokenExpired: 'Login has expired, please login again!',
    },
    dashboard: {
        recentCalls: 'Recent Calls',
        sInService: 'SIn Service',
        ended: 'Ended',
        hangUp: 'Hang up',
        comment: 'Comment',
        save: 'Save',
        edit: 'Edit',
        revisionHistory: 'Revision history',
        viewCallLogs: 'View Call Logs',
        nocalllogs: 'No call logs',
        callLogs: 'Call Logs',
        noCrm: 'Not connection with CRM',
        noNumber: 'The record has no number',
        enter: 'Enter',
        noBusiness: 'No business record',
        enterBusiness: 'Please enter comment',
        notHavePermissionNumber: 'You do not have permission to dial this number',
    },
    sip: {
        noAgentInformation: 'No agent information',
        noDialerInformation: 'No dialer information',
        noAgentAvailable: 'No agent available',
        dialerInitialization: 'The dialer is in the initialization.',
        dialerFailedRegister: 'The dialer failed to register.',
        inCall: 'In a call',
        savedSuccessfully: 'Saved successfully',
        free: 'Free',
        busy: 'Busy',
        afterCall: 'After-call',
        equipmentDetection: 'Equipment detection',
        logout: 'Log out',
        dailPad: 'Dail Pad',
        dialing: 'Dialing',
        dialerOverdue: 'The dialer is overdue',
        notCountry: 'The calling country is not available.',
        errNumber: 'Incorrect number',
        networkError: 'Network Error',
        registerSuccessfully: 'Register Successfully',
        registrationFailed: 'registration failed',
        errSymCode: 'The number contains an illegal symbol ("#")',
        enterNumber: 'please enter the number',
        rejected: 'Rejected',
        newCall: 'New call',
        dialer: 'Dialer',
        minuteAgo: ' minute ago',
        hourAgo: ' hour ago',
        justNow: ' just now',
        displayNumber: 'call display number',
        selectDisplayNumber: 'Select call display number',
        notSupportMic: 'The browser does not support microphones, please change the browser',
        isHaveMic: 'Check for the presence of a microphone and go to your browser settings to check if it is turned on or consult a technician',
        newCalleeIn: 'You have a new call - NXCLOUD Call Center',
        unknown: 'unknown',
    },
    record: {
        callStatus: 'Call Status',
        hangupReason: 'Hang up reason',
        selectType: 'Please select a call type',
        inboundCall: 'Inbound Call',
        outboundCall: 'Outbound Call',
        enterAgentGroupName: 'Enter an agent group name',
        enteAgentAccount: 'Enter Agent Email / Agent Account',
        enterCalledId: 'Enter an called ID',
        enterCallerId: 'Enter an caller ID',
        startingTime: 'Starting Time',
        endTime: 'End Time',
        selectCallTime: 'Please select a call time',
        search: 'Search',
        reset: 'Reset',
        download: 'Download',
        time: 'Time',
        callType: 'Call Type',
        callerId: 'Caller ID',
        calledId: 'Called ID',
        connectionStatus: 'Connection Status',
        queueStartTime: 'Queue start time',
        callStartTime: 'Call start time',
        callEndTime: 'Call end time',
        queueDuration: 'Queue Duration (Sec.)',
        callDuration: 'Call Duration (Sec.)',
        audioFiles: 'Audio files',
        audioGenerating: 'The audio file is in generating.',
        notSupportAudio: 'Your browser does not support the audio file.',
        agentUsername: 'Agent Username',
        enterAgentNickname: 'Enter an Agent name',
        agentAccount: 'Agent account',
        agentGroup: 'Agent group',
        selectAgentGroup: 'Please select an agent group',
        actions: 'Actions',
        callBack: 'Call Back',
        redialBack: 'Redial',
        agentAccountEmial: 'Agent Email / Agent Account'
    },
    expenses: {
        agent: 'Agent',
        totalAmount: 'Total Amount (both inbound and outbound calls)',
        totalDuration: 'Total Duration (Sec.)',
        totalBillableDuration: 'Total Billable Duration (Sec.)',
        totalAmount: 'Total Amount (CNY)',
        inboundCallAmount: 'Inbound Call amount',
        inboundCallAnswering: 'Inbound Call Answering Duration (Sec.)',
        billableDuration: 'Billable Duration (Sec.)',
        amount: 'Amount (CNY)',
        outboundCallAmount: 'Outbound Call amount',
        OutboundCallAnswering: 'Outbound Call answering time（Sec.)',
        billableDuration: 'Billable Duration (Sec.)',
        transactionDetails: 'Transaction Details',
        expenseDetails: 'Expense Details'
    },
    group: {
        add: 'Add',
        agentGroupId: 'Agent Group ID',
        enterAgentGroupId: 'Enter an Agent Group ID',
        agentQuantity: 'Agent Quantity',
        description: 'Description',
        enterDescription: 'Enter comments',
        created: 'Created',
        edittingMembers: 'Editting Members',
        modify: 'Modify',
        delete: 'Delete',
        noAgentMembers: 'No agent members in this group',
        createdSuccessfully: 'Created successfully',
        updateSuccessfully: 'Updated Successfully',
        agentGroupMembers: 'Agent group members',
        deleteAgentGroup: 'Please confirm whether to delete the agent group?',
        deletedSuccessfully: 'Deleted Successfully',
        priorityAgentGroup: 'A served customer takes priority to the member of the Agent Group',
        ringingStrategy: 'Ringing strategy',
        order: 'order',
        atTheSameTime: 'at the same time',
        selectStrategy: 'Please select a ringing strategy',
    },
    agent: {
        maximumAgents: `Agent limit: 100 seats are free for a limited time.`,
        agentEmail: 'Agent Email',
        bulkCreation: 'Bulk Creation',
        enterAgentEmail: 'Please enter the Agent Email / Agent Account',
        defaultCountry: 'Default country',
        availableCountries: 'Available Countries',
        agentAccessPoint: 'Agent Access Point',
        record: 'Record',
        agentStatus: 'Agent status',
        open: 'open',
        close: 'close',
        accountRole: 'Account role',
        password: 'Password',
        resetPassword: 'Reset Password',
        customerServiceSpecialist: 'Customer Service Specialist',
        supervisor: 'Supervisor',
        administrator: 'Administrator',
        selectDefaultCountry: 'Please select a default country',
        afterSelectingTip: 'After selecting the default country, dialing this country number can be done without the country code',
        selectAvailableCountries: 'Please select available countries',
        availableRangeAgent: 'The available range of making calls countries for the Agent.',
        selectAgentAccessPoint: 'Please select an agent access point',
        makingCallAreaLine: 'Making a call by a designated area line',
        recording: 'recording',
        retentionPeriod: 'Retention Period',
        sevenDays: '7 days (free)',
        bulkImport: 'Bulk Import',
        click: 'Click',
        downlodTemplate: 'Downlod/Import Template',
        fillInFormat: 'Fill in the content by the template format',
        uploadFiles: 'upload files',
        followFormatImport: 'Please follow the template format to import',
        onlyAvailable: 'Only available for xlsx. file format',
        onlySingle: 'Only a single file at a time to import',
        importUpTime: 'The import of agent information is up to 100 at a time.',
        upperBoundAgent: 'The excess agents will be off by default when the imported quantity is out of the upper bound of the agent. ',
        preview: 'Preview',
        confirmRecording: 'Please confirm whether to ',
        confirmOffRecording: ' recording',
        hint: 'hint',
        confirmAgentStatus: 'Please confirm whether to ',
        confirmEnableAgentStatus: ' the agent status',
        randomPasswordOne: `The system will send an email with a random password to the Agent's email(`,
        randomPasswordTwo: `), while the old password will be invalid. Please confirm whether to reset the password.`,
        confirmDeleteAgent: 'Please confirm whether to delete the agent',
        uploadFileation: 'Please upload the file',
        establish: 'Establish',
        sendingSucceeded: 'Sending succeeded',
        // 待确定
        batchOperation: 'Batch operation',
        resetPassword: 'Reset Password',
        openAgent: 'Open Agent',
        closureAgent: 'Closure Agent',
        addBatches: 'Add in batches',
        bulkInvitation: 'Bulk invitation',
        invite: 'Invite',
        theAgentFreeAgent: 'The Agent is free for 6 months within a limited time, which has saved you 60 CNY per Agent',
        agentQuantity: 'Agent Quantity',
        enterAgentQuantity: 'Enter an agent Quantity',
        operationResult: 'Operation result',
        bulkCreation: 'Bulk Creation',
        checkAccountPassword1: 'The batch creation is successful, please check the account password in the mailbox of (',
        checkAccountPassword2: ')',
        batchOpenedSuccessfully: 'Batch opened successfully',
        batchClosedSuccessfully: 'Batch closed successfully',
        resetResultMailbox1: 'The reset is successful, please check the result in the mailbox of (',
        resetResultMailbox2: ')',
        selectAgentFirst: 'Please select a  agent first',
        agentLimitTime: 'Agent limit: 100 seats are free for a limited time.',
    },
    quote: {
        callPricing: 'Call Pricing',
        callPricingTip: 'The call pricing is real-time updating and adjusting in the actual situation.',
        country: 'Country',
        selectCountry: 'Please select a country',
        countryCode: 'Country code',
        price: 'Price(CNY)',
        billingCycle: 'Bill Type',
    },
    seeting: {
        sortingAfterAitting: 'After-call ',
        customizeProcessing: 'Time-gap Setting',
        second: 'Second'
    },
    guide: {
        helpGuidance: 'Help and guidance',
        guide1: 'Open the call-center service',
        guide1_1: '1. After login the Middle-Office, please select the User from the left hand side menu.',
        guide1_2: '2. Click the edit button on the right side and select the user you need to edit permission.',
        guide1_3: '3. Check the box, then help the user to open the call-center permission.',
        guide1_4: '4. Select a role for the user in the call-center, then click the confirm button to complete the operation',
        guide2: 'Creating Agents',
        guide2_1: '1. Click the top right button and then select NXCC.',
        guide2_2: '1. Select the Management-Side on the top bar menu.',
        guide2_3: '1. Select the Agents Management section.',
        guide2_4: '2. Then click the top right button, "Add"',
        guide2_5: '1. Enter an agent email you need to invite',
        guide2_6: `2. You can assign it to the Agent Group, which has already been created previously. If you don't select an Agent Group, the Agent won't be assigned when calling.`,
        guide2_7: '3. Select the default country for this Agent, which refers to dialing this country number, can be done without the country code.',
        guide2_8: '4. Select the available countries for the Agent, which refers to the range of countries for available dialing.',
        guide2_9: '5. Select the agent access point, which refers to the system access point by default but supports modifying manually.',
        guide2_10: '6. You can enable the Recording, which refers to all calls generated the audio files and can view the Call Logs.',
        guide2_11: '7. If the invite email exists as in the Team, it will generate an Agent. Otherwise, it needs to join the invite link first.',
        guide3: 'Creating Agent Groups',
        guide3_1: '1. Select the Agent Group Management section.',
        guide3_2: '2. Then click the top right button, "Add" pop up.',
        guide3_3: '3. Enter an agent group name, type in the description then click the Create button to finish the creation.',
        guide3_4: '1. Click the button Edit Members from the right side.',
        guide3_5: '2. Add a member to this Agent Group and complete to add.',
        guide4: 'Switch the Status',
        guide4_1: '1. Click the top right button to switch the status.',
        guide4_2: '2. Select the Free status',
        guide4_3: '*Only in the Free status can be in a polling call.',
        guide4_4: `It won't receive the call in the Busy status.`,
        guide4_5: `But outbound calls won't be impacted by the status.`,
        guide5: 'Call testing',
        guide5_1: '1. Click the top right button to open the Setting List.',
        guide5_2: '2. Select a device to test, which means the system will automatically call the test phone number.',
        guide5_3: '3. The audio will play when the call is picked up, and you can speak on the phone after listening to the beep, and if you can hear your voice, which refers to the dialer line is normal.',
        guide6: 'Making the outbound call',
        guide6_1: '1. Click the dial pad section on the top bar menu.',
        guide6_2: '2. Enter the phone number on the dial pad.',
        guide6_3: '3. Click the Dial icon to an outbound call.',
        guide7: 'Receive incoming calls',
        guide7_1: '1. A call hint will pop up on the right side if a new incoming call comes out.',
        guide7_2: '2. Click the green phone icon to pick up the call.',
        guide7_3: '3. Click the red phone icon to reject the call.',
    },
    equipment: {
        ccMicTestingTitle: 'NXCC Mic Testing',
        startTest: 'Start Test',
        lineTest: 'Line Test',
        deviceTest: 'Device Test',
        browserTest: 'Browser Test',
        networkMonitoring: 'Network monitoring',
        microphoneOption: 'Microphone Option：',
        trySaying: 'Try saying "hello" into the microphone~',
        ableToSeeLine: 'Would be able to see a line moving up & down in the test box area?',
        speakerOption: 'Speaker Option：',
        turnUpVolume: 'Please click to play the audio to turn up the volume',
        hearSound: 'Can you hear the sound？',
        microphone: 'Microphone：',
        normal: 'Normal',
        abnormal: 'Abnormal',
        yes: 'yes',
        no: 'no',
        seeYesMicLine: 'yes',
        seeNoMicLine: 'no',
        listenYesMicLine: 'yes',
        listenNoMicLine: 'no',
        speaker: 'Speaker：',
        browsers: 'Browsers：',
        networkStatus: 'Network status：',
        reCheck: 'Re-check',
        copy: 'Copy',
        lineTest: 'Line Test',
        deviceStatus: 'Device status',
        testTypes: 'Test types：',
        localMicrophone: 'Local microphone：',
        theAudioSound: 'The audio sound：',
        browserSupport: 'Browser support',
        basicInformation: 'Basic Information',
        operatingSystem: 'Operating system：',
        browser: 'Browser：',
        screenResolution: 'Screen Resolution：',
        numberProcessors: 'Number of logical processors：',
        apiSupport: 'API support',
        webrtcSupport: 'WebRTC Support：',
        webAudioSupport: 'WebAudio Support：',
        webSocketSupport: 'WebSocket Support：',
        availableDevices: 'Available devices：',
        whetherAuthorizeMicrophone: 'Whether to authorize the use of the microphone：',
        microphoneDevice: 'Microphone Device：',
        speakerDevice: 'Speaker Device：',
        networkstatus: 'Network status',
        apiTesting: 'API testing',
        networkNormal: 'The network is normal, the delay is ',
        networkError: 'Network Error',
        webSocketConnectionTest: 'WebSocket connection test',
        connectionNormal: 'Normal',
        connectionError: 'Connection Error',
        currentMicrophoneDevice: 'Current Microphone Device：',
        notSupportMicrophone: 'The browser does not support the microphone, please change the browser',
        checkWhetherMicrophone: 'Please check whether there is a microphone, and go to the browser settings to check whether it is turned on or consult a technical staff',
        copiedSuccessfully: 'Copied successfully',
        ccMicTesting: 'ccMicTesting',
    },
    statis: {
        productivityStatistics: 'Productivity Statistics',
        statusStatistics: 'Status Statistics',
        inboundCall: 'Inbound Call',
        inboundCallMissed: 'Inbound Call Missed',
        inboundCallAnswered: 'Inbound Call Answered',
        inboundCallAnsweredRate: 'Inbound Call Answered Rate',
        outboundCall: 'Outbound Call',
        outboundCallMissed: 'Outbound Call Missed',
        outboundCallAnswered: 'Outbound Call Answered',
        outboundCallAnsweredRate: 'Outbound Call Answered Rate',
        statusDuration: 'Status Duration ',
        onlineDuration: 'Online Duration',
        idleDuration: 'Idle Duration',
        busyDuration: 'Busy Duration',
        dialedDuration: 'Dialed Duration',
        queueDuration: 'queue Duration:',
        callStrategy: 'Call Strategy',
        inboundMissedCallsList: 'Inbound Missed Calls List',
        outboundCallAnsweredRateCallsList: 'Outbound Missed Calls List',
        ringstarttime: 'Ring start time',
        ringendtime: 'Ring end time',
        ringingduration: 'Ringing duration（Sec.)',
    }
};