import { GetStaticPaths } from "next";
import utilStyles from "../../styles/util.module.css";
import { getPosts } from "../../lib/posts";
import Layout from "../../components/Layout";
import { ArticleCard } from "../../components/article";

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
          <div className={utilStyles.articleCardWrapper}>
            {categoryPosts.map(
              (
                { id, date, title, image, profile, user, category },
                index: number
              ) => (
                <div key={index}>
                  {category == idCategory && (
                    <ArticleCard
                      id={id}
                      date={date}
                      title={title}
                      image={image}
                      profile={profile}
                      user={user}
                    />
                  )}
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
  const allPosts = getPosts();
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
    const allPosts = getPosts();
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
