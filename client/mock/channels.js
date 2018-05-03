export const getChannels = (req, res) => {
  res.json([
    {
      id: 'btch56118899',
      name: '北京清华长庚医院',
    },
  ]);
};
export default {
  getChannels,
};
