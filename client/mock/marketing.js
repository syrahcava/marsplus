export const getMarketingApplicationForm = (req, res) => {
  const applicationFormArray = [
    {
      title: '挂号预约',
      createTime: '2018-04-25',
      feedbackCount: 1250,
      state: '使用中',
    },
    {
      title: '投诉意见',
      createTime: '2018-04-25',
      feedbackCount: 23,
      state: '使用中',
    },
  ];

  res.json({
    id: 'btch56118899',
    name: '北京清华长庚医院',
    applicationFormArray,
  });
};

export default {
  getMarketingApplicationForm,
};
