// 試寫出資料結構
const num = 0;
const str = 'string';
const src = 'src';
const t = 'timestamp';

const notes = [];
const note = {
  userId: 'ray',
  id: str,
  title: str,
  content: str,
  imgs: [src, src, src],
  readTime: [t, t, t],
  likeScore: [
    {
      likescore: num,
      likeTime: t,
    },
    {
      likescore: num,
      likeTime: t,
    },
  ],
  importantScore: [
    {
      likescore: num,
      likeTime: t,
    },
    {
      likescore: num,
      likeTime: t,
    },
  ],
  createTime: t,
  editTime: [t, t, t],
};

const users = [];

const user = {
  id: str,
  name: str,
  email: str,
};
