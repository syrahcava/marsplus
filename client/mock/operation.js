import moment from 'moment';

export const getOperationOverview = (req, res) => {
  const userNumbers = [];
  const messageNumbers = [];
  const beginDay = new Date().getTime();
  for (let i = 0; i < 90; i += 1) {
    const day = moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('MM-DD');
    userNumbers.push({
      day,
      count: Math.floor(Math.random() * 10000) + 500,
    });
    messageNumbers.push({
      day,
      count: Math.floor(Math.random() * 200) + 20,
    });
  }

  res.json({
    id: 'btch56118899',
    name: '北京清华长庚医院',
    totalUserNumbers: 10541,
    lastDayMessageCount: 90,
    lastDayFollowCount: 90,
    lastDayTagCount: 120,
    userNumbers,
    messageNumbers,
    tags: [
      {
        name: '手术',
        value: 75,
        type: 0,
      },
      {
        name: '世界',
        value: 40,
        type: 1,
      },
      {
        name: '医疗',
        value: 85,
        type: 2,
      },
      {
        name: '医院',
        value: 70,
        type: 0,
      },
      {
        name: '医师',
        value: 70,
        type: 1,
      },
      {
        name: '天使',
        value: 60,
        type: 1,
      },
      {
        name: '门诊',
        value: 85,
        type: 2,
      },
      {
        name: '名医',
        value: 95,
        type: 1,
      },
      {
        name: '时间表',
        value: 45,
        type: 0,
      },
      {
        name: '服务',
        value: 60,
        type: 1,
      },
      {
        name: '护士',
        value: 85,
        type: 2,
      },
      {
        name: '中心',
        value: 85,
        type: 2,
      },
      {
        name: '患者',
        value: 90,
        type: 1,
      },
      {
        name: '活动',
        value: 85,
        type: 2,
      },
      {
        name: '动态',
        value: 85,
        type: 0,
      },
    ],
    hotArticles: [
      {
        title: '做身体健康的民族 清华董家鸿院士团队在行动',
        url:
          'http://mp.weixin.qq.com/s?__biz=MzAxNjE2MzI5MA==&mid=2651588204&idx=1&sn=3355118c2f49bb7f02eea6586d502f86&scene=0#wechat_redirect',
        view: '4415',
        like: '55',
      },
      {
        title: '加拿大华人回祖国求医 清华长庚破解10余年之痛',
        url:
          'http://mp.weixin.qq.com/s?__biz=MzAxNjE2MzI5MA==&mid=2651588145&idx=1&sn=8b4e190be0cc69f007c51c7376613ece&scene=0#wechat_redirect',
        view: '2733',
        like: '99',
      },
      {
        title: '【盘点】高血压患者血压波动七宗罪',
        url:
          'http://mp.weixin.qq.com/s?__biz=MzAxNjE2MzI5MA==&mid=2651588165&idx=1&sn=590a011ca79330d29c0302b5e95d1d2d&scene=0#wechat_redirect',
        view: '1278',
        like: '18',
      },
      {
        title: '听说了吗？四海八荒的小伙伴都去清华长庚看演唱会啦！',
        url:
          'http://mp.weixin.qq.com/s?__biz=MzAxNjE2MzI5MA==&mid=2651588199&idx=2&sn=94d56beabbc8a0df084c62bd3f05e543&scene=0#wechat_redirect',
        view: '1120',
        like: '9',
      },
      {
        title: '【人文医疗】生命的重量',
        url:
          'http://mp.weixin.qq.com/s?__biz=MzAxNjE2MzI5MA==&mid=2651588150&idx=1&sn=986bc39b8ebf62152a53c43af31fdd07&scene=0#wechat_redirect',
        view: '976',
        like: '31',
      },
      {
        title: '国际知名肝移植专家J. Michael Millis访问北京清华长庚医院',
        url:
          'http://mp.weixin.qq.com/s?__biz=MzAxNjE2MzI5MA==&mid=2651588145&idx=2&sn=4eeb2f6f84af5757e5789355a9e193dc&scene=0#wechat_redirect',
        view: '822',
        like: '10',
      },
      {
        title: '这种病女性一生至少得一次！如厕别忘回头看',
        url:
          'http://mp.weixin.qq.com/s?__biz=MzAxNjE2MzI5MA==&mid=2651588161&idx=2&sn=c7ef21c08ce808e61687f8c681ef8fba&scene=0#wechat_redirect',
        view: '595',
        like: '3',
      },
      {
        title: '北京清华长庚医院清明节假日门诊安排',
        url:
          'http://mp.weixin.qq.com/s?__biz=MzAxNjE2MzI5MA==&mid=2651588161&idx=1&sn=31e6eaf9e2e100f340fa9d254a195517&scene=0#wechat_redirect',
        view: '574',
        like: '1',
      },
      {
        title: '糖尿病合并高血压 死亡率增加7倍！',
        url:
          'http://mp.weixin.qq.com/s?__biz=MzAxNjE2MzI5MA==&mid=2651588179&idx=1&sn=d3f5d2aab0a217a3a8071c9870867715&scene=0#wechat_redirect',
        view: '447',
        like: '6',
      },
      {
        title: '【全国爱鼻日】鼻子里像蚂蚁爬？小心过敏性鼻炎',
        url:
          'http://mp.weixin.qq.com/s?__biz=MzAxNjE2MzI5MA==&mid=2651588199&idx=1&sn=f9079895c893c3cb69558ae7a6daba16&scene=0#wechat_redirect',
        view: '405',
        like: '9',
      },
    ],
  });
};

export const getOperationAnalysisUser = (req, res) => {
  const beginDay = new Date().getTime();
  const followCountArray = [];

  for (let i = 0; i < 90; i += 1) {
    const day = moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('MM-DD');
    const totalFollowNumbers = Math.floor(Math.random() * 10000) + 500;
    const newFollowCount = Math.floor(Math.random() * 100) + 20;
    const cancelFollowCount = Math.floor(Math.random() * 50) + 5;
    const newTotalFollowCount = newFollowCount - cancelFollowCount;
    followCountArray.push({
      day,
      新增关注用户: newFollowCount,
      取消关注用户: cancelFollowCount,
      净增关注用户: newTotalFollowCount,
      关注用户总数: totalFollowNumbers,
    });
  }

  res.json({
    id: 'btch56118899',
    name: '北京清华长庚医院',
    newFollowCount: 23,
    cancelFollowCount: 3,
    newTotalFollowCount: 20,
    totalFollowNumbers: 10541,
    followCountArray,
    followSource: [
      {
        x: '二维码',
        y: 6532,
      },
      {
        x: '非二维码',
        y: 3512,
      },
    ],
    qrFollowTop: [
      {
        x: '门诊',
        y: 6500,
      },
      {
        x: '急诊',
        y: 2200,
      },
      {
        x: '推送',
        y: 1500,
      },
      {
        x: '活动',
        y: 650,
      },
      {
        x: '专家',
        y: 330,
      },
    ],
    gender: [
      {
        x: '女性',
        y: 7512,
      },
      {
        x: '男性',
        y: 2532,
      },
    ],
    equipment: [
      {
        x: 'android',
        y: 5512,
      },
      {
        x: 'iOS',
        y: 4600,
      },
      {
        x: 'others',
        y: 300,
      },
    ],
    tagsTop: [
      {
        x: '门诊看病',
        y: 5320,
      },
      {
        x: '住院',
        y: 2300,
      },
      {
        x: '活动',
        y: 530,
      },
      {
        x: '体检',
        y: 350,
      },
    ],
  });
};

export const getOperationAnalysisInteractive = (req, res) => {
  const beginDay = new Date().getTime();
  const messageCountArray = [];

  for (let i = 0; i < 90; i += 1) {
    const day = moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('MM-DD');
    const messageCount = Math.floor(Math.random() * 100) + 20;
    messageCountArray.push({
      day,
      消息数量: messageCount,
    });
  }

  // 用户互动统计
  const userInter = {
    '7': [
      {
        x: '互动用户',
        y: 335,
      },
      {
        x: '沉默用户',
        y: 5100,
      },
      {
        x: '活跃用户',
        y: 53,
      },
    ],
    '30': [
      {
        x: '互动用户',
        y: 1040,
      },
      {
        x: '沉默用户',
        y: 4300,
      },
      {
        x: '活跃用户',
        y: 85,
      },
    ],
    '90': [
      {
        x: '互动用户',
        y: 5010,
      },
      {
        x: '沉默用户',
        y: 2100,
      },
      {
        x: '活跃用户',
        y: 125,
      },
    ],
  };
  // 互动类型占比统计
  const userInterType = {
    '7': [
      {
        x: '点击菜单',
        y: 25,
      },
      {
        x: '发送消息',
        y: 10,
      },
      {
        x: '二维码扫描',
        y: 23,
      },
      {
        x: '阅读文章',
        y: 42,
      },
    ],
    '30': [
      {
        x: '点击菜单',
        y: 28,
      },
      {
        x: '发送消息',
        y: 8,
      },
      {
        x: '二维码扫描',
        y: 30,
      },
      {
        x: '阅读文章',
        y: 34,
      },
    ],
    '90': [
      {
        x: '点击菜单',
        y: 25,
      },
      {
        x: '发送消息',
        y: 20,
      },
      {
        x: '二维码扫描',
        y: 16,
      },
      {
        x: '阅读文章',
        y: 29,
      },
    ],
  };
  // 消息情况占比统计
  const messageInfoType = {
    '7': [
      {
        x: '未回复',
        y: 15,
      },
      {
        x: '自动回复',
        y: 55,
      },
      {
        x: '关键词回复',
        y: 20,
      },
      {
        x: '人工回复',
        y: 10,
      },
    ],
    '30': [
      {
        x: '未回复',
        y: 20,
      },
      {
        x: '自动回复',
        y: 45,
      },
      {
        x: '关键词回复',
        y: 25,
      },
      {
        x: '人工回复',
        y: 15,
      },
    ],
    '90': [
      {
        x: '未回复',
        y: 20,
      },
      {
        x: '自动回复',
        y: 45,
      },
      {
        x: '关键词回复',
        y: 25,
      },
      {
        x: '人工回复',
        y: 15,
      },
    ],
  };
  // 关键词回复
  const keywordTop = {
    '7': [
      {
        x: '【1】本月门诊出诊信息表',
        y: 350,
      },
      {
        x: '【2】医院预约挂号须知',
        y: 240,
      },
      {
        x: '【3】医院电话、地址及路线',
        y: 50,
      },
      {
        x: '【5】检查检验流程及病患须知',
        y: 42,
      },
      {
        x: '【4】住出院流程及出院须知',
        y: 12,
      },
    ],
    '30': [
      {
        x: '【1】本月门诊出诊信息表',
        y: 1020,
      },
      {
        x: '【2】医院预约挂号须知',
        y: 730,
      },
      {
        x: '【3】医院电话、地址及路线',
        y: 160,
      },
      {
        x: '【5】检查检验流程及病患须知',
        y: 120,
      },
      {
        x: '【4】住出院流程及出院须知',
        y: 40,
      },
    ],
    '90': [
      {
        x: '【1】本月门诊出诊信息表',
        y: 3010,
      },
      {
        x: '【2】医院预约挂号须知',
        y: 1920,
      },
      {
        x: '【3】医院电话、地址及路线',
        y: 460,
      },
      {
        x: '【5】检查检验流程及病患须知',
        y: 320,
      },
      {
        x: '【4】住出院流程及出院须知',
        y: 132,
      },
    ],
  };
  // 关键词回复
  const menuTop = {
    '7': [
      {
        x: '预约门诊',
        y: 350,
      },
      {
        x: '出诊信息',
        y: 240,
      },
      {
        x: '预约体检',
        y: 50,
      },
      {
        x: '科室&专家',
        y: 42,
      },
      {
        x: '医院特色',
        y: 12,
      },
    ],
    '30': [
      {
        x: '预约门诊',
        y: 1020,
      },
      {
        x: '出诊信息',
        y: 730,
      },
      {
        x: '预约体检',
        y: 160,
      },
      {
        x: '科室&专家',
        y: 120,
      },
      {
        x: '医院特色',
        y: 40,
      },
    ],
    '90': [
      {
        x: '预约门诊',
        y: 3010,
      },
      {
        x: '出诊信息',
        y: 1920,
      },
      {
        x: '预约体检',
        y: 460,
      },
      {
        x: '科室&专家',
        y: 320,
      },
      {
        x: '医院特色',
        y: 132,
      },
    ],
  };

  res.json({
    id: 'btch56118899',
    name: '北京清华长庚医院',
    userInter,
    userInterType,
    messageCountArray,
    messageInfoType,
    keywordTop,
    menuTop,
  });
};

export const getOperationAnalysisArticle = (req, res) => {
  const beginDay = new Date().getTime();
  const totalCountArray = [];

  for (let i = 0; i < 90; i += 1) {
    const day = moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('MM-DD');
    const viewCount = Math.floor(Math.random() * 7000) + 200;
    const likeCount = Math.floor(Math.random() * 500) + 50;
    const shareCount = Math.floor(Math.random() * 300) + 20;
    const collectCount = Math.floor(Math.random() * 80) + 8;
    totalCountArray.push({
      day,
      总浏览: viewCount,
      总点赞: likeCount,
      总分享: shareCount,
      总收藏: collectCount,
    });
  }

  // 用户互动统计
  const articleCountTop = [
    {
      title: '做身体健康的民族 清华董家鸿院士团队在行动',
      url:
        'http://mp.weixin.qq.com/s?__biz=MzAxNjE2MzI5MA==&mid=2651588204&idx=1&sn=3355118c2f49bb7f02eea6586d502f86&scene=0#wechat_redirect',
      view: '4415',
      like: '55',
      share: '5',
      collect: '0',
    },
    {
      title: '加拿大华人回祖国求医 清华长庚破解10余年之痛',
      url:
        'http://mp.weixin.qq.com/s?__biz=MzAxNjE2MzI5MA==&mid=2651588145&idx=1&sn=8b4e190be0cc69f007c51c7376613ece&scene=0#wechat_redirect',
      view: '2733',
      like: '99',
      share: '2',
      collect: '0',
    },
    {
      title: '【盘点】高血压患者血压波动七宗罪',
      url:
        'http://mp.weixin.qq.com/s?__biz=MzAxNjE2MzI5MA==&mid=2651588165&idx=1&sn=590a011ca79330d29c0302b5e95d1d2d&scene=0#wechat_redirect',
      view: '1278',
      like: '18',
      share: '5',
      collect: '0',
    },
    {
      title: '听说了吗？四海八荒的小伙伴都去清华长庚看演唱会啦！',
      url:
        'http://mp.weixin.qq.com/s?__biz=MzAxNjE2MzI5MA==&mid=2651588199&idx=2&sn=94d56beabbc8a0df084c62bd3f05e543&scene=0#wechat_redirect',
      view: '1120',
      like: '9',
      share: '3',
      collect: '0',
    },
    {
      title: '【人文医疗】生命的重量',
      url:
        'http://mp.weixin.qq.com/s?__biz=MzAxNjE2MzI5MA==&mid=2651588150&idx=1&sn=986bc39b8ebf62152a53c43af31fdd07&scene=0#wechat_redirect',
      view: '976',
      like: '31',
      share: '5',
      collect: '1',
    },
  ];

  res.json({
    id: 'btch56118899',
    name: '北京清华长庚医院',
    view: 2500,
    like: 320,
    share: 140,
    collect: 24,
    totalCountArray,
    articleCountTop,
  });
};

export const getOperationAnalysisQR = (req, res) => {
  const qrArray = [
    {
      title: '门诊',
      time: '2018-04-25 13:00',
      scanCount: '120',
      userCount: '118',
      followCount: '60',
    },
    {
      title: '急诊',
      time: '2018-04-25 13:00',
      scanCount: '80',
      userCount: '70',
      followCount: '30',
    },
    {
      title: '儿科',
      time: '2018-04-25 13:00',
      scanCount: '70',
      userCount: '70',
      followCount: '23',
    },
    {
      title: '住院部',
      time: '2018-04-25 13:00',
      scanCount: '65',
      userCount: '65',
      followCount: '12',
    },
    {
      title: '体检',
      time: '2018-04-25 13:00',
      scanCount: '55',
      userCount: '54',
      followCount: '15',
    },
  ];

  res.json({
    id: 'btch56118899',
    name: '北京清华长庚医院',
    qrCount: 10,
    scanCount: 560,
    userCount: 520,
    followCount: 210,
    qrArray,
  });
};

export const getOperationAutoResponseKeyword = (req, res) => {
  const ruleArray = [
    {
      title: '预约挂号',
      keyword: '预约,预约挂号,挂号',
      type: 'text',
      content: "点击<a href='#'>预约挂号</a>",
    },
    {
      title: '专家列表',
      keyword: '专家',
      type: 'text',
      content: '就诊专家列表：',
    },
  ];

  res.json({
    id: 'btch56118899',
    name: '北京清华长庚医院',
    ruleArray,
  });
};

export const getOperationManageQR = (req, res) => {
  const qrArray = [
    {
      title: '门诊',
      time: '2018-04-25 13:00',
      type: '永久',
      state: '使用中',
      scanCount: '120',
      userCount: '118',
      followCount: '60',
    },
    {
      title: '急诊',
      time: '2018-04-25 13:00',
      type: '永久',
      state: '使用中',
      scanCount: '80',
      userCount: '70',
      followCount: '30',
    },
    {
      title: '儿科',
      time: '2018-04-25 13:00',
      type: '永久',
      state: '使用中',
      scanCount: '70',
      userCount: '70',
      followCount: '23',
    },
    {
      title: '住院部',
      time: '2018-04-25 13:00',
      type: '永久',
      state: '使用中',
      scanCount: '65',
      userCount: '65',
      followCount: '12',
    },
    {
      title: '体检',
      time: '2018-04-25 13:00',
      type: '永久',
      state: '使用中',
      scanCount: '55',
      userCount: '54',
      followCount: '15',
    },
  ];

  res.json({
    id: 'btch56118899',
    name: '北京清华长庚医院',
    qrArray,
  });
};

export const getOperationManageTag = (req, res) => {
  const tagArray = [
    {
      groupName: '基本属性',
      color: 'orange',
      tags: [
        {
          title: '已婚',
        },
        {
          title: '未婚',
        },
        {
          title: '男',
        },
        {
          title: '女',
        },
      ],
    },
    {
      groupName: '社保情况',
      color: 'green',
      tags: [
        {
          title: '有社保',
        },
        {
          title: '无社保',
        },
      ],
    },
  ];

  res.json({
    id: 'btch56118899',
    name: '北京清华长庚医院',
    tagArray,
  });
};

export const getOperationManageMessage = (req, res) => {
  const messageArray = [
    {
      username: '33小姐姐',
      id: 'dengyiyiyi',
      gender: '女',
      messageType: '点击菜单', // 点击菜单 | 用户消息 | 扫描二维码 | 触发关键词
      messageContent: '预约挂号',
      time: '2018-04-25 13:00',
      replyType: '自动回复', // 自动回复 | 人工回复 | 未回复
      replyContent: '点击预约',
    },
  ];

  res.json({
    id: 'btch56118899',
    name: '北京清华长庚医院',
    messageArray,
  });
};

export const getOperationManageMaterialArticle = (req, res) => {
  const articleArray = [
    {
      id: 1,
      date: '2018-4-30',
      articles: [
        {
          title: '【世界哮喘日】清华长庚：让哮喘儿童拥有个案管理师',
          image:
            'https://mmbiz.qpic.cn/mmbiz_png/DTMictM9pUQ1OzibicmphD94OMKCcffq1OGCILtK4aPYQvibwlqSQL5VeyPtAn3colviaxJfySaelsGfxtSAmlib4Pgg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1',
        },
        {
          title: '难逃哮喘困扰？预防控制是关键！',
          image:
            'https://mmbiz.qpic.cn/mmbiz_jpg/DTMictM9pUQ1OzibicmphD94OMKCcffq1OGEHZE3HJY3E5JwsJY5SKYUqA8ncQwfnDA3qzetGe48dFCLyCXCXYFcQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1',
        },
      ],
    },
    {
      id: 2,
      date: '2018-5-2',
      articles: [
        {
          title: '【清华长庚】五一，这里有劳动，没有节',
          image:
            'https://mmbiz.qpic.cn/mmbiz_jpg/DTMictM9pUQ1HZSPBia6AExO59HF2wnBCKsoRlhtY71R0P2qB2lYy6VwtGprsUagk2nQYQkVibBnicb3ScgoKBy4Sg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1',
        },
      ],
    },
    {
      id: 3,
      date: '2018-4-26',
      articles: [
        {
          title: '【医改一周年】清华长庚这些细节， 让您就医更方便',
          image:
            'https://mmbiz.qpic.cn/mmbiz_png/DTMictM9pUQ0SE7s7DH2MdgV2RMRaabYqzwFia3xZjznzhBWicvjghiaRyWYxarL0I2TcGEZYlKlpLkiaBD058JZFBQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1',
        },
        {
          title: '眼睛！还是原装的好',
          image:
            'https://mmbiz.qpic.cn/mmbiz_jpg/DTMictM9pUQ0SE7s7DH2MdgV2RMRaabYqibXEGRDdj6GRdItpjRUFORCydCITiagMCKPXcQnQtvicMWAjboKuIyKaQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1',
        },
        {
          title: '2018年5月北京清华长庚医院门诊出诊时间表',
          image:
            'https://mmbiz.qpic.cn/mmbiz_jpg/DTMictM9pUQ0SE7s7DH2MdgV2RMRaabYqmiadwbtJEWJiaG7UkacE2bYJtBtQGa7Wt2a4unVoRgUNpbtE5x2TITbg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1',
        },
      ],
    },
  ];

  res.json({
    id: 'btch56118899',
    name: '北京清华长庚医院',
    articleArray,
  });
};

export const getOperationManageMaterialPicture = (req, res) => {
  const pictureArray = [
    {
      id: 1,
      image:
        'https://mmbiz.qpic.cn/mmbiz_png/DTMictM9pUQ1OzibicmphD94OMKCcffq1OGCILtK4aPYQvibwlqSQL5VeyPtAn3colviaxJfySaelsGfxtSAmlib4Pgg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1',
    },
    {
      id: 2,
      image:
        'https://mmbiz.qpic.cn/mmbiz_jpg/DTMictM9pUQ1OzibicmphD94OMKCcffq1OGEHZE3HJY3E5JwsJY5SKYUqA8ncQwfnDA3qzetGe48dFCLyCXCXYFcQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1',
    },
    {
      id: 3,
      image:
        'https://mmbiz.qpic.cn/mmbiz_jpg/DTMictM9pUQ1HZSPBia6AExO59HF2wnBCKsoRlhtY71R0P2qB2lYy6VwtGprsUagk2nQYQkVibBnicb3ScgoKBy4Sg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1',
    },
    {
      id: 4,
      image:
        'https://mmbiz.qpic.cn/mmbiz_png/DTMictM9pUQ0SE7s7DH2MdgV2RMRaabYqzwFia3xZjznzhBWicvjghiaRyWYxarL0I2TcGEZYlKlpLkiaBD058JZFBQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1',
    },
    {
      id: 5,
      image:
        'https://mmbiz.qpic.cn/mmbiz_jpg/DTMictM9pUQ0SE7s7DH2MdgV2RMRaabYqibXEGRDdj6GRdItpjRUFORCydCITiagMCKPXcQnQtvicMWAjboKuIyKaQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1',
    },
  ];

  res.json({
    id: 'btch56118899',
    name: '北京清华长庚医院',
    pictureArray,
  });
};

export const getOperationManageMaterialComposition = (req, res) => {
  const compositionArray = [
    {
      title: '常用摘要',
      createTime: '2018-04-25',
      updateTime: '2018-04-25',
    },
    {
      title: '常用页尾',
      createTime: '2018-04-25',
      updateTime: '2018-04-25',
    },
    {
      title: '门诊信息',
      createTime: '2018-04-25',
      updateTime: '2018-04-25',
    },
  ];

  res.json({
    id: 'btch56118899',
    name: '北京清华长庚医院',
    compositionArray,
  });
};

export default {
  getOperationOverview,
  getOperationAnalysisUser,
  getOperationAnalysisInteractive,
  getOperationAnalysisArticle,
  getOperationAnalysisQR,
  getOperationAutoResponseKeyword,
  getOperationManageQR,
  getOperationManageTag,
  getOperationManageMessage,
  getOperationManageMaterialArticle,
  getOperationManageMaterialPicture,
  getOperationManageMaterialComposition,
};
