import { GetStaticPaths } from "next";
import utilStyles from "../../styles/util.module.css";
import { getSortedPosts } from "../../lib/posts";
import Layout from "../../components/Layout";
import { ArticleCard } from "../../components/article";

export default function Article({ targetPosts, allPosts, current, max }) {
  return (
    <>
      <Layout current={current} max={max} allPosts={allPosts}>
        <div className={utilStyles.article}>
          <h2>Article</h2>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = getSortedPosts();
  const paths = [];
  allPosts.forEach((post, index) => {
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
    const allPosts = getSortedPosts();
    const { id } = params;
    const current = parseInt(id, 10) - 1;
    return {
      props: {
        current: current + 1,
        max: Math.ceil(allPosts.length / 6),
        allPosts: allPosts,
        targetPosts: allPosts.slice(current * 6, current * 6 + 6),
      },
    };
  }
};
