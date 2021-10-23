import { GetServerSideProps } from 'next';
import Rss from 'rss';
import { getAllPostsData } from '../lib/posts';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { res } = ctx;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/rss+xml;charset=utf-8');

  const allPostsData = getAllPostsData();

  const rss = new Rss({
    title: 'Moi',
    site_url: "https://nagatapote.work/",
    feed_url: `https://nagatapote.work/rss`,
    language: 'ja',
    description:
      '自分の好きなことをアウトプットするブログです。',
    copyright: '©︎Moi',
  });

  type Post = {
    id: string,
    title: string,
    date: string,
    image: string,
    profile: string,
    user: string,
    category: string,
}

  allPostsData.forEach((post:Post) => {
    rss.item({
      title: post.title,
      url: `https://nagatapote.work/posts/${post.id}`,
      description: post.category,
      date: new Date(post.date),
    });
  });

  res.end(rss.xml());

  return { props: {} };
};

export default () => {};
