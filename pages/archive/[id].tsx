import * as React from "react";
import Link from "next/link";
import { GetStaticPaths } from "next";
import Date from "../../components/date";
import utilStyles from "../../styles/util.module.css";
import { getSortedPostsData } from "../../lib/posts";
import Layout from "../../components/Layout";

export const getStaticPaths: GetStaticPaths = async () => {
  const allPostsData = getSortedPostsData();
  const paths = [];
  const index = allPostsData.map((x, index) => {
    return index + 1;
  });
  allPostsData.map((post: { id: string; date: string }) => {
    index.map((x, index) => {
      paths.push({
        params: {
          id: post.date.slice(0, -3) + "_" + x,
        },
      });
    });
  });
  return { paths, fallback: false };
};

export const getStaticProps = ({ params }) => {
  {
    const allPostsData = getSortedPostsData();
    const { id } = params;
    const current = id.substring(id.indexOf("_") + 1) - 1;
    return {
      props: {
        current: current + 1,
        idDate: id.substring(0, id.indexOf("_")),
        max: Math.ceil(
          allPostsData.filter(
            (list: { id: string; date: string }) =>
              list.date.slice(0, -3) == id.substring(0, id.indexOf("_"))
          ).length / 6
        ),
        dateData: allPostsData
          .filter(
            (list: { id: string; date: string }) =>
              list.date.slice(0, -3) == id.substring(0, id.indexOf("_"))
          )
          .slice(current * 6, current * 6 + 6),
        allPostsDatas: allPostsData,
      },
    };
  }
};

export default function Archive({
  allPostsDatas,
  idDate,
  dateData,
  current,
  max,
}) {
  return (
    <>
      <Layout
        current={current}
        max={max}
        allPostsData={allPostsDatas}
        idDate={idDate}
      >
        <div className={utilStyles.article}>
          <h2>Article</h2>
          <h4>{idDate.replace("-", "年") + "月"}</h4>
          {dateData.map(({ id, date, title, image, profile, user }, index) => (
            <span key={index}>
              {date.slice(0, -3) == idDate && (
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
                        <Date dateString={date} />
                      </small>
                    </div>
                  </div>
                </Link>
              )}
            </span>
          ))}
        </div>
      </Layout>
    </>
  );
}
