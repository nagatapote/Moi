import { useEffect } from "react";
import Head from "next/head";
import { getAllPostIds, getPost } from "../../lib/posts";
import dayjs from "dayjs";
import utilStyles from "../../styles/util.module.css";
import Layout from "../../components/Layout";
import { getAllPosts } from "../../lib/posts";
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/github.css";

hljs.registerLanguage("xml", xml);
hljs.registerLanguage("javascript", javascript);

export default function Post({ post, allPosts }) {
  useEffect(() => {
    hljs.initHighlighting();
    hljs.initHighlighting.called = false;
  }, []);

  return (
    <>
      <Layout allPosts={allPosts}>
        <div className="textCenter">
          <Head>
            <title>{post.title}</title>
          </Head>
          <article className={utilStyles.articleArea}>
            <div className={utilStyles.blogList}>
              <div className={utilStyles.blogUser}>
                <img
                  className={utilStyles.blogProfileImage}
                  src={post.profile}
                />
                <span>{post.user}</span>
              </div>
              <small className={utilStyles.blogDate}>
                <img className={utilStyles.blogClockImage} src="/clock.png" />
                {dayjs(post.date).format("YYYY年MM月DD日")}
              </small>
            </div>
            <div className="markdown">
              <h1>{post.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            </div>
          </article>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.id);
  const allPosts = getAllPosts();
  return {
    props: {
      post,
      allPosts: allPosts,
    },
  };
}
