import utilStyles from "../styles/util.module.css";
import Layout from "../components/Layout";
import { getAllPosts } from "../lib/posts";
import { ArticleCard } from "../components/article";

export default function Home({ targetAllPosts, allPosts, current, max }) {
  return (
    <>
      <Layout current={current} max={max} allPosts={allPosts}>
        <div className={utilStyles.article}>
          <h2>Article</h2>
          <h4>最新記事</h4>
          <div className={utilStyles.articleCardWrapper}>
            {targetAllPosts.map(
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

export async function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: {
      current: 1,
      max: Math.ceil(allPosts.length / 6),
      allPosts: allPosts,
      targetAllPosts: allPosts.slice(0, 6),
    },
  };
}
