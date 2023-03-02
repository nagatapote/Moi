import utilStyles from "../styles/util.module.css";
import Layout from "../components/Layout";
import { getSortedPosts } from "../lib/posts";
import { ArticleCard } from "../components/article";

export async function getStaticProps() {
  const allPosts = getSortedPosts();
  return {
    props: {
      current: 1,
      max: Math.ceil(allPosts.length / 6),
      allPosts: allPosts,
      targetPosts: allPosts.slice(0, 6),
    },
  };
}

export default function Home({ targetPosts, allPosts, current, max }) {
  return (
    <>
      <Layout current={current} max={max} allPosts={allPosts}>
        <div className={utilStyles.article}>
          <h2>Article</h2>
          <h4>最新記事</h4>
          <div className={utilStyles.articleCardWrapper}>
            {targetPosts.map(
              ({ id, date, title, image, profile, user }, index) => (
                <div key={index}>
                  <ArticleCard
                    id={id}
                    date={date}
                    title={title}
                    image={image}
                    profile={profile}
                    user={user}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
