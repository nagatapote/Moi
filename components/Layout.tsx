import React, { ReactNode, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import layoutStyles from "../styles/layout.module.css";
import ImageArea from "./ImageArea";
import Pager from "../components/pager";
import AdSense from "react-adsense";

const optionsName = {
  blogTitle: "Moi",
  headerBackgroundColor: "",
  headerLogoColor: "",
  menu1: "Twitter",
  menuLink1: "https://twitter.com/pote_nagata",
  menuColor1: "",
  menu2: "GitHub",
  menuLink2: "https://github.com/nagatapote",
  menuColor2: "",
  footerBlogName: "© 2021 Moi",
  imageText:
    "自分の好きなことをアウトプットするブログです。<br /><center>〜プログラミング・ミニマリスト〜</center>",
  imageUrl: "/image/image.png",
  profileImage: "/image/profile.jpg",
  profileText:
    "<center>フロントエンドエンジニア・ミニマリスト</center><br />名古屋のベンチャー企業でフロントエンドエンジニアしてます。",
};

type OptionsName = {
  blogTitle: string;
  headerBackgroundColor: string;
  headerLogoColor: string;
  menu1: string;
  menuLink1: string;
  menuColor1: string;
  menu2: string;
  menuLink2: string;
  menuColor2: string;
  footerBlogName: string;
  imageText: string;
  imageUrl: string;
  profileImage: string;
  profileText: string;
};

type Props = {
  children: ReactNode;
  option?: OptionsName;
  max?: number;
  current?: number;
  allPostsData?: { category: string; date: string }[];
  idCategory?: string;
  idDate?: string;
};

export default function Layout({
  children,
  option = optionsName,
  current,
  max,
  allPostsData,
  idCategory,
  idDate,
}: Props) {
  const dateRef = useRef(null);
  const categoryRef = useRef(null);
  const filterUniqueCategory = (allPostsData: { category: string }[]) => {
    const categories = allPostsData.map((category) => {
      return category.category;
    });
    return categories.filter(function (category, index) {
      return categories.indexOf(category) === index;
    });
  };

  const filterUniqueDate = (allPostsData: { date: string }[]) => {
    const dates = allPostsData.map((date) => {
      return date.date.slice(0, -3).replace("-", "年");
    });
    return dates.filter(function (date, index) {
      return dates.indexOf(date) === index;
    });
  };

  const uniqCategories = filterUniqueCategory(allPostsData);
  const uniqDates = filterUniqueDate(allPostsData);

  const handleChange = (e, path) => {
    Router.push(path);
  };

  return (
    <div>
      <Head>
        <title>{option.blogTitle}</title>
      </Head>
      <header
        className={layoutStyles.header}
        style={{
          backgroundColor: option.headerBackgroundColor,
        }}
      >
        <div className={layoutStyles.header_logo}>
          <Link href="/">
            <a style={{ color: option.headerLogoColor }}>{option.blogTitle}</a>
          </Link>
        </div>
        <div className={layoutStyles.header_menu}>
          <Link href={option.menuLink1}>
            <a style={{ color: option.menuColor1 }}>{option.menu1}</a>
          </Link>
          <Link href={option.menuLink2}>
            <a style={{ color: option.menuColor2 }}>{option.menu2}</a>
          </Link>
        </div>
      </header>
      <div className={layoutStyles.ImageArea}>
        <ImageArea imageText={option.imageText} imageUrl={option.imageUrl} />
      </div>
      <div className={layoutStyles.mainAll}>
        <main className={layoutStyles.main}>{children}</main>
        <div className={layoutStyles.rightArea}>
          <div className={layoutStyles.rightArea_profile}>Profile</div>
          <img
            className={layoutStyles.profileImage}
            src={option.profileImage}
          />
          <div className={layoutStyles.profileName}>pote</div>
          <span dangerouslySetInnerHTML={{ __html: option.profileText }} />
          <div className={layoutStyles.rightArea_archive}>Archive</div>
          <select className={layoutStyles.archiveSelect} ref={dateRef}>
            {uniqDates.map((date, index) => (
              <option key={index} value={date}>
                {date + "月"}
              </option>
            ))}
          </select>{" "}
          <input
            type="button"
            value="検索"
            onClick={(e) =>
              handleChange(
                e,
                `/archive/${dateRef.current.value.replace("年", "-")}_1`
              )
            }
          />
          <div className={layoutStyles.rightArea_category}>Category</div>
          <select className={layoutStyles.categorySelect} ref={categoryRef}>
            {uniqCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>{" "}
          <input
            type="button"
            value="検索"
            onClick={(e) =>
              handleChange(e, `/category/${categoryRef.current.value}_1`)
            }
          />
          {/* <div className={layoutStyles.ads}> 
            <AdSense.Google
              client="ca-pub-3401994941764286"
              slot="7553735009"
              style={{ display: "block" }}
              format="auto"
              responsive="true"
            />
          </div>*/}
        </div>
      </div>
      {current && max ? (
        <Pager
          idCategory={idCategory}
          idDate={idDate}
          current={current}
          max={max}
        />
      ) : (
        <div className={layoutStyles.home}>
          <Link href="/">
            <a>HOME</a>
          </Link>
        </div>
      )}

      <footer className={layoutStyles.footer}>
        <small>{option.footerBlogName}</small>
      </footer>
    </div>
  );
}
