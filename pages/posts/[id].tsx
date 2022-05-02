import React, { useEffect } from "react";
import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/posts";
import dayjs from "dayjs";
import utilStyles from "../../styles/util.module.css";
import Layout from "../../components/Layout";
import { getSortedPostsData } from "../../lib/posts";
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/github.css";

hljs.registerLanguage("xml", xml);
hljs.registerLanguage("javascript", javascript);

export default function Post({ postData, allPostsDatas }) {
  useEffect(() => {
    hljs.initHighlighting();
    hljs.initHighlighting.called = false;
  }, []);

  return (
    <>
      <Layout allPostsData={allPostsDatas}>
        <div className="textCenter">
          <Head>
            <title>{postData.title}</title>
          </Head>
          <article className={utilStyles.articleArea}>
            <div className={utilStyles.blogList}>
              <div className={utilStyles.blogUser}>
                <img
                  className={utilStyles.blogProfileImage}
                  src={postData.profile}
                />
                <span>{postData.user}</span>
              </div>
              <small className={utilStyles.blogDate}>
                <img className={utilStyles.blogClockImage} src="/clock.png" />
                {dayjs(postData.date).format("YYYY年MM月DD日")}
              </small>
            </div>
            <div className="markdown">
              <h1>{postData.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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
  const postData = await getPostData(params.id);
  const allPostsData = getSortedPostsData();
  return {
    props: {
      postData,
      allPostsDatas: allPostsData,
    },
  };
}
