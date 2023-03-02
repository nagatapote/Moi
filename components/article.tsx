import Link from "next/link";
import utilStyles from "/styles/util.module.css";
import dayjs from "dayjs";

type ArticleCardProps = {
  id: string;
  image: string;
  title: string;
  profile: string;
  user: string;
  date: Date;
};

export const ArticleCard = (props: ArticleCardProps) => {
  const { id, image, title, profile, user, date } = props;
  return (
    <>
      <Link href={`/posts/${id}`}>
        <div className={utilStyles.blogListItem}>
          <img className={utilStyles.blogListImage} src={image} />
          <div className={utilStyles.blogTitle}>{title}</div>
          <div className={utilStyles.blogList}>
            <div className={utilStyles.blogUser}>
              <img className={utilStyles.blogProfileImage} src={profile} />
              <span>{user}</span>
            </div>
            <small className={utilStyles.blogDate}>
              <img className={utilStyles.blogClockImage} src="/clock.png" />
              {dayjs(date).format("YYYY年MM月DD日")}
            </small>
          </div>
        </div>
      </Link>
    </>
  );
};
