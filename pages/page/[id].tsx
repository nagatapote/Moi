import * as React from "react";
import Link from "next/link";
import { GetStaticPaths } from "next";
import dayjs from "dayjs";
import utilStyles from "../../styles/util.module.css";
import { getSortedPostsData } from "../../lib/posts";
import Layout from "../../components/Layout";

export const getStaticPaths: GetStaticPaths = async () => {
  const allPostsData = getSortedPostsData();
  const paths = [];
  allPostsData.forEach((post, index) => {
    if ((index + 1) % 6 === 0) {
      paths.push({
        params: {
          id: `${(index + 1) / 6 + 1}`,
        },
      });
    }
  });
  return { paths, fallback: false };
};

export const getStaticProps = ({ params }) => {
  {
    const allPostsData = getSortedPostsData();
    const { id } = params;
    const current = parseInt(id, 10) - 1;
    return {
      props: {
        current: current + 1,
        max: Math.ceil(allPostsData.length / 6),
        allPostsDatas: allPostsData,
        allPostsData: allPostsData.slice(current * 6, current * 6 + 6),
      },
    };
  }
};

export default function Article({ allPostsData, allPostsDatas, current, max }) {
  return (
    <>
      <Layout current={current} max={max} allPostsData={allPostsDatas}>
        <div className={utilStyles.article}>
          <h2>Article</h2>
          {allPostsData.map(
            ({ id, date, title, image, profile, user }, index) => (
              <span key={index}>
                <Link href={`/posts/${id}`}>
                  <div className={utilStyles.blogListItem}>
                    <img className={utilStyles.blogListImage} src={image} />
                    <div className={utilStyles.blogTitle}>{title}</div>
                    <div className={utilStyles.blogList}>
                      <div className={utilStyles.blogUser}>
                        <img
                          className={utilStyles.blogProfileImage}
                          src={profile}
                        />
                        <span>{user}</span>
                      </div>
                      <small className={utilStyles.blogDate}>
                        <img
                          className={utilStyles.blogClockImage}
                          src="/clock.png"
                        />
                        {dayjs(date).format("YYYY年MM月DD日")}
                      </small>
                    </div>
                  </div>
                </Link>
              </span>
            )
          )}
        </div>
      </Layout>
    </>
  );
}
