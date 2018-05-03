export const getCustomerList = (req, res) => {
  const customerArray = [
    {
      username: '33小姐姐',
      id: 'dengyiyiyi',
      gender: '女',
      area: '湖北 武汉',
      tel: '',
      email: '',
      channel: '微信',
    },
    {
      username: '春哥_Curry',
      id: 'Atonement____',
      gender: '男',
      area: '江苏 南京',
      tel: '',
      email: '',
      channel: '微信',
    },
  ];
  res.json({
    id: 'btch56118899',
    name: '北京清华长庚医院',
    activeCount: 923,
    cancelFollowCount: 563,
    newFollowCount: 23,
    totalCount: 10541,
    customerArray,
  });
};

export default {
  getCustomerList,
};
