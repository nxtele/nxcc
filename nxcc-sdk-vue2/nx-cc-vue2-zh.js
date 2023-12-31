export default {
    head: {
        nxcc: '云呼叫中心',
        beginnersGuide: '新手指引',
        management: '管理端',
        confirm: '确定',
        cancel: '取消',
        exitSuccessfully: '退出成功',
        successfullyModified: '修改成功',
        openAfterCall: '已开启话后整理，每次结束通话后默认会把话机状态更改为示忙，整理时间结束后会自动切换状态至示闲。',
        closeAfterCall: '已关闭话后整理',
        openGuide: '点击这里可以打开新手指引',
        tokenExpired: '登录信息已过期，请重新登录',
    },
    dashboard: {
        recentCalls: '最近通话',
        sInService: '服务中',
        ended: '已结束',
        hangUp: '挂断',
        comment: '业务记录',
        save: '保存',
        edit: '编辑',
        revisionHistory: '修改记录',
        viewCallLogs: '查看历史',
        nocalllogs: '暂无通话记录',
        callLogs: '通话记录',
        noCrm: '暂未接入CRM',
        noNumber: '该记录无号码',
        enter: '请输入',
        noBusiness: '暂无业务记录',
        enterBusiness: '请输入业务记录',
        notHavePermissionNumber: '您未分配此回拨的外显号码',
    },
    sip: {
        noAgentInformation: '无坐席信息',
        noDialerInformation: '无话机信息',
        noAgentAvailable: '无可用坐席',
        dialerInitialization: '话机初始化中',
        dialerFailedRegister: '话机注册失败',
        inCall: '正在通话中',
        savedSuccessfully: '保存成功',
        free: '示闲',
        busy: '示忙',
        afterCall: '话后整理',
        equipmentDetection: '设备检测',
        logout: '退出登录',
        dailPad: '拨号盘',
        dialing: '呼叫中',
        dialerOverdue: '话机已欠费',
        notCountry: '不允许呼叫的国家',
        errNumber: '号码不正确',
        networkError: '网络异常',
        registerSuccessfully: '注册成功',
        registrationFailed: '注册失败',
        errSymCode: `号码中包含不合法的符号（"#"）`,
        enterNumber: '请输入号码',
        rejected: '已拒接',
        newCall: '新来电',
        dialer: '话机',
        minuteAgo: '分钟前',
        hourAgo: '小时前',
        justNow: '刚刚',
        displayNumber: '外呼显号',
        selectDisplayNumber: '请选择外呼显号',
        notSupportMic: '浏览器不支持麦克风，请更换浏览器',
        isHaveMic: '请检查是否存在麦克风,并前往浏览器设置检查是否开启或者咨询技术人员',
        newCalleeIn: '您有新来电-牛信云呼叫中心',
        unknown: '未知',
    },
    record: {
        callStatus: '通话状态',
        hangupReason: '挂断原因',
        selectType: '请选择呼叫类型',
        inboundCall: '呼入',
        outboundCall: '呼出',
        enterAgentGroupName: '请输入坐席组名称',
        enteAgentAccount: '请输入坐席邮箱/坐席账号',
        enterCalledId: '请输入被叫号码',
        enterCallerId: '请输入主叫号码',
        startingTime: '开始时间',
        endTime: '结束时间',
        selectCallTime: '请选择呼叫时间',
        search: '搜索',
        reset: '重置',
        download: '下载',
        time: '时间',
        callType: '呼叫类型',
        callerId: '主叫号码',
        calledId: '被叫号码',
        connectionStatus: '接入状态',
        queueStartTime: '排队开始时间',
        callStartTime: '通话开始时间',
        callEndTime: '通话结束时间',
        queueDuration: '排队时长(s)',
        callDuration: '通话时长(s)',
        audioFiles: '录音文件',
        audioGenerating: '录音文件生成中',
        notSupportAudio: '您的浏览器不支持 audio 元素。',
        agentUsername: '坐席昵称',
        enterAgentNickname: '请输入坐席昵称',
        agentAccount: '坐席账号',
        agentGroup: '坐席组',
        selectAgentGroup: '请选择坐席组',
        actions: '操作',
        callBack: '回拨',
        redialBack: '重拨',
        agentAccountEmial: '坐席邮箱/坐席账号'
    },
    expenses: {
        agent: '坐席',
        totalAmount: '总费用(呼入+呼出)',
        totalDuration: '接通总时长(s)',
        totalBillableDuration: '计费总时长(s)',
        totalAmount: '总金额',
        inboundCallAmount: '呼入费用',
        inboundCallAnswering: '呼入接通时长(秒)',
        billableDuration: '计费时长(s)',
        amount: '金额',
        outboundCallAmount: '呼出费用',
        OutboundCallAnswering: '呼出接通时长(秒)',
        transactionDetails: '明细',
        expenseDetails: '费用明细'
    },
    group: {
        add: '新增',
        agentGroupId: '坐席组编号',
        enterAgentGroupId: '请输入坐席组编号',
        agentQuantity: '坐席数量',
        description: '备注',
        enterDescription: '请输入备注',
        created: '创建日期',
        edittingMembers: '编辑成员',
        modify: '修改',
        delete: '删除',
        noAgentMembers: '该坐席组无坐席成员',
        createdSuccessfully: '创建成功',
        updateSuccessfully: '更新成功',
        agentGroupMembers: '坐席组成员',
        deleteAgentGroup: '请确认是否删除该坐席组?',
        priorityAgentGroup: '熟客优先',
        ringingStrategy: '振铃策略',
        order: '顺振',
        atTheSameTime: '同振',
        selectStrategy: '请选择振铃策略',
    },
    agent: {
        maximumAgents: `坐席上限：限时免费100位。`,
        agentEmail: '坐席邮箱',
        bulkCreation: '批量创建',
        enterAgentEmail: '请输入坐席邮箱/坐席账号',
        defaultCountry: '默认国家',
        availableCountries: '允许国家',
        agentAccessPoint: '坐席接入点',
        record: '是否录音',
        agentStatus: '坐席状态',
        open: '开启',
        close: '关闭',
        accountRole: '账号角色',
        password: '密码',
        resetPassword: '重置密码',
        customerServiceSpecialist: '客服专员',
        supervisor: '主管',
        administrator: '管理员',
        selectDefaultCountry: '请选择默认国家',
        afterSelectingTip: '选中了默认国家后，拨打该国家的号码时无需增加国码。',
        selectAvailableCountries: '请选择允许国家',
        availableRangeAgent: '坐席允许发起呼叫的国家范围。',
        selectAgentAccessPoint: '请选择坐席接入点',
        makingCallAreaLine: '根据使用网络所在地选择接入节点。',
        recording: '录音',
        retentionPeriod: '保存时效',
        sevenDays: '7天(免费)',
        bulkImport: '批量导入',
        click: '点击',
        downlodTemplate: '下载导入模板',
        fillInFormat: '根据模板格式填写模板内容',
        uploadFiles: '上传文件',
        followFormatImport: '请按照模板格式导入；',
        onlyAvailable: '只能导入xlxs文件格式；',
        onlySingle: '每次只能导入一个文件；',
        importUpTime: '单次最多导入100条坐席信息；',
        upperBoundAgent: '若导入数量超出坐席上限，则超出部分坐席默认关闭。',
        preview: '预览',
        confirmRecording: '请确认是否',
        confirmOffRecording: '录音',
        hint: '提示',
        confirmAgentStatus: '请确认是否',
        confirmEnableAgentStatus: '坐席状态',
        randomPasswordOne: '系统将向坐席邮箱（',
        randomPasswordTwo: '）发送一封含有随机密码的邮件，该客服原密码将失效，请确认是否需要重置密码。',
        confirmDeleteAgent: '请确认是否删除该坐席',
        uploadFileation: '请上传文件',
        establish: '创建',
        sendingSucceeded: '发送成功',
        // 待确定
        batchOperation: '批量操作',
        resetPassword: '重置密码',
        openAgent: '开启坐席',
        closureAgent: '关闭坐席',
        addBatches: '批量新增',
        bulkInvitation: '批量邀请',
        invite: '邀请',
        theAgentFreeAgent: '坐席限时6个月免费中，已为您节省每个坐席60元',
        agentQuantity: '坐席数量',
        enterAgentQuantity: '请输入坐席数量',
        operationResult: '操作结果',
        bulkCreation: '批量创建',
        checkAccountPassword1: '批量创建成功，请在（',
        checkAccountPassword2: '）的邮箱查收账号密码',
        batchOpenedSuccessfully: '批量开启成功',
        batchClosedSuccessfully: '批量关闭成功',
        resetResultMailbox1: '重置成功，请在（',
        resetResultMailbox2: '）的邮箱查收结果',
        selectAgentFirst: '请先选择坐席',
    },
    quote: {
        callPricing: '呼叫费率',
        callPricingTip: '呼叫费率为系统实时费率，随实际情况调整。',
        country: '国家',
        selectCountry: '请选择国家',
        countryCode: '国码',
        price: '价格(CNY)',
        billingCycle: '计费周期',
    },
    seeting: {
        sortingAfterAitting: '坐席话后整理',
        customizeProcessing: '自定义话后整理时长',
        second: '秒',
        blacklistedNumberTip: '呼叫失败（黑名单号码）',
        callFailureLimit: '呼叫失败（呼叫次数限制）',
        cannotNumber: '当前号码无法使用',
    },
    guide: {
        helpGuidance: '帮助与指引',
        guide1: '一、开通呼叫中心',
        guide1_1: '1. 登录平台后，选择菜单：成员。',
        guide1_2: '2. 选择需要编辑权限的成员，点击右侧编辑按钮。',
        guide1_3: '3. 勾选呼叫中心功能，即可帮该成员开通呼叫中心权限。',
        guide1_4: '4. 选择该成员在呼叫中心的使用角色后，点击确定按钮完成操作。',
        guide2: '二、创建坐席',
        guide2_1: '1. 点击右侧系统切换按钮，从中台切换至呼叫中心系统。',
        guide2_2: '1. 选择管理端菜单',
        guide2_3: '1. 选择坐席管理菜单。',
        guide2_4: '2. 点击页面右侧的新增按钮。',
        guide2_5: '1. 输入需要邀请的坐席邮箱。',
        guide2_6: '2. 可以选择坐席所属的坐席组（此步骤可以提前设置好坐席组，创建坐席组后再添加成员）若未选择坐席组，则该坐席呼入时将不会被分配。',
        guide2_7: '3. 选择该坐席的默认国家，默认国家是指该坐席拨打该国家的号码时无需拨打国码。',
        guide2_8: '4. 选择该坐席的允许国家，允许国家是指该坐席允许拨打的国家范围。',
        guide2_9: '5. 选择该坐席的接入点，系统会默认选中默认接入点，支持手动修改。',
        guide2_10: '6. 可选是否开启录音，若开启录音功能，则该坐席的通话均会生成录音文件，可以在通话记录处进行查看。',
        guide2_11: '7. 若邀请的邮箱已在团队内则会直接生成坐席，若邀请的邮箱不在团队内，则需要通过邮件邀请链接先加入团队成功后再生成坐席。',
        guide3: '三、创建坐席组',
        guide3_1: '1. 选择菜单：坐席组管理。',
        guide3_2: '2. 点击右侧新增按钮，打开新增弹窗。',
        guide3_3: '3. 输入坐席组名称，和备注后点击确定按钮完成创建。',
        guide3_4: '1. 点击坐席组右侧的编辑成员按钮。',
        guide3_5: '2. 打开编辑成员弹窗，选择坐席组成员后完成成员添加。',
        guide4: '四、状态切换',
        guide4_1: '1. 点击右上角状态切换按钮，打开状态切换弹窗。',
        guide4_2: '2. 选择示闲状态。',
        guide4_3: '*状态处于示闲时才能轮询来电。',
        guide4_4: '状态处于示忙时则不会接受到来电。',
        guide4_5: '呼出不受状态影响。',
        guide5: '五、通话测试',
        guide5_1: '1. 点击右上角设置按钮，打开设置列表。',
        guide5_2: '2. 选择设备检测，系统将会自动呼出检测号码。',
        guide5_3: '3. 检测号码接通后，播放完录音，再听到滴声后可以开始说话测试，能在系统中听到自己的声音，则说明话机线路能够正常使用。',
        guide6: '六、发起外呼',
        guide6_1: '1. 点击拨号盘菜单，打开拨号盘。',
        guide6_2: '2. 点击数字或者数字键盘输入号码。',
        guide6_3: '3. 点击拨打按钮，进行外呼。',
        guide7: '七、接听来电',
        guide7_1: '1. 当有新来电时，系统右侧将会弹出来电弹屏。',
        guide7_2: '2. 点击绿色电话icon即可接听该来电。',
        guide7_3: '3. 点击红色电话icon即可拒接该来电。',
    },
    equipment: {
        ccMicTestingTitle: '云呼叫中心设备检测',
        startTest: '开始检测',
        lineTest: '线路检测',
        deviceTest: '设备检测',
        browserTest: '浏览器检测',
        networkMonitoring: '网络监测',
        microphoneOption: '麦克风选择:',
        trySaying: '对着麦克风说"哈喽"试试～',
        ableToSeeLine: '是否可以看到音量图标跳动？',
        speakerOption: '扬声器选择:',
        turnUpVolume: '请调高设备音量，点击播放下面的音频试试～',
        hearSound: '是否可以听到声音？',
        microphone: '麦克风状态：',
        normal: '正常',
        abnormal: '异常',
        yes: '是',
        no: '否',
        seeYesMicLine: '看的到',
        seeNoMicLine: '看不到',
        listenYesMicLine: '听的到',
        listenNoMicLine: '听不到',
        speaker: '扬声器状态：',
        browsers: '浏览器支持度：',
        networkStatus: '网络状态：',
        reCheck: '重新检测',
        copy: '复制信息',
        lineTest: '线路检测',
        deviceStatus: '设备状态',
        testTypes: '用户选择：', // 1
        localMicrophone: '本地麦克风获取：',
        theAudioSound: '音频是否播放：',
        browserSupport: '浏览器支持度',
        basicInformation: '基础环境', // 1
        operatingSystem: '操作系统：',
        browser: '浏览器：',
        screenResolution: '屏幕分辨率：',
        numberProcessors: '逻辑处理器数量：',
        apiSupport: 'API 支持',
        webrtcSupport: '是否支持 WebRTC：',
        webAudioSupport: '是否支持 WebAudio：',
        webSocketSupport: '是否支持 WebSocket：',
        availableDevices: '可用设备',
        whetherAuthorizeMicrophone: '是否授权使用麦克风：',
        microphoneDevice: '麦克风设备：',
        speakerDevice: '扬声器设备：',
        networkstatus: '网络状态',
        apiTesting: 'API 测试',
        networkNormal: '网络正常，延时',
        networkError: '网络异常',
        webSocketConnectionTest: 'WebSocket 连接测试',
        connectionNormal: '连接正常',
        connectionError: '连接异常',
        currentMicrophoneDevice: '当前麦克风设备：',
        notSupportMicrophone: '浏览器不支持麦克风，请更换浏览器',
        checkWhetherMicrophone: '请检查是否存在麦克风,并前往浏览器设置检查是否开启或者咨询技术人员',
        copiedSuccessfully: '复制成功',
        ccMicTesting: '复制失败',
    },
    statis: {
        productivityStatistics: '工作效率统计',
        statusStatistics: '工作状态统计',
        inboundCall: '呼入总数',
        inboundCallMissed: '呼入未接数',
        inboundCallAnswered: '呼入接听数',
        inboundCallAnsweredRate: '呼入接听率',
        outboundCall: '呼出总数',
        outboundCallMissed: '呼出未接数',
        outboundCallAnswered: '呼出接听数',
        outboundCallAnsweredRate: '呼出接听率',
        statusDuration: '状态时长',
        onlineDuration: '在线时长',
        idleDuration: '空闲时长',
        busyDuration: '示忙时长',
        dialedDuration: '通话时长',
        queueDuration: '排队等待时长:',
        callStrategy: '呼入策略',
        inboundMissedCallsList: '呼入未接列表',
        outboundCallAnsweredRateCallsList: '呼出未接列表',
        ringstarttime: '振铃开始时间',
        ringendtime: '振铃结束时间',
        ringingduration: '振铃时长(s)',
    }
};