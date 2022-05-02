import Link from "next/link";
import dayjs from "dayjs";
import utilStyles from "../styles/util.module.css";
import Layout from "../components/Layout";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      current: 1,
      max: Math.ceil(allPostsData.length / 6),
      allPostsDatas: allPostsData,
      allPostsData: allPostsData.slice(0, 6),
    },
  };
}

export default function Home({ allPostsData, allPostsDatas, current, max }) {
  return (
    <>
      <Layout current={current} max={max} allPostsData={allPostsDatas}>
        <div className={utilStyles.article}>
          <h2>Article</h2>
          <h4>最新記事</h4>
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
