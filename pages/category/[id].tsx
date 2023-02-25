import * as React from "react";
import Link from "next/link";
import { GetStaticPaths } from "next";
import dayjs from "dayjs";
import utilStyles from "../../styles/util.module.css";
import { getSortedPosts } from "../../lib/posts";
import Layout from "../../components/Layout";

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = getSortedPosts();
  const paths = [];
  const index = allPosts.map((x, index) => {
    return index + 1;
  });
  allPosts.map((post: { id: string; category: string }) => {
    index.map((x) => {
      paths.push({
        params: {
          id: post.category + "_" + x,
        },
      });
    });
  });
  return { paths, fallback: false };
};

export const getStaticProps = ({ params }) => {
  {
    const allPosts = getSortedPosts();
    const { id } = params;
    const current = id.substring(id.indexOf("_") + 1) - 1;
    return {
      props: {
        current: current + 1,
        max: Math.ceil(
          allPosts.filter(
            (list: { id: string; category: string }) =>
              list.category == id.substring(0, id.indexOf("_"))
          ).length / 6
        ),
        idCategory: id.substring(0, id.indexOf("_")),
        categoryPosts: allPosts
          .filter(
            (list: { id: string; category: string }) =>
              list.category == id.substring(0, id.indexOf("_"))
          )
          .slice(current * 6, current * 6 + 6),
        allPosts: allPosts,
      },
    };
  }
};

export default function Category({
  allPosts,
  categoryPosts,
  idCategory,
  current,
  max,
}) {
  return (
    <>
      <Layout
        current={current}
        max={max}
        allPosts={allPosts}
        idCategory={idCategory}
      >
        <div className={utilStyles.article}>
          <h2>Article</h2>
          <h4>{idCategory}</h4>
          {categoryPosts.map(
            ({ id, date, title, image, profile, user, category }, index: number) => (
              <span key={index}>
                {category == idCategory && (
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
                )}
              </span>
            )
          )}
        </div>
      </Layout>
    </>
  );
}
