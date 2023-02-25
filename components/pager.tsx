import * as React from "react";
import Link from "next/link";
import pagerStyles from "../styles/pager.module.css";

type Props = {
  max?: number;
  current?: number;
  idCategory?: string;
  idDate?: string;
};

export default function Pager(props: Props) {
  const list: React.ReactNode[] = [];
  const { max, current, idCategory, idDate } = props;

  if (max && current && idDate) {
    for (let i = 1; i <= max; i += 1) {
      if (i === current) {
        list.push(
          <li key={i} className={pagerStyles.current}>
            <span>{i}</span>
          </li>
        );
      } else if (i === 1 && i !== current) {
        list.push(
          <li key={i}>
            <Link href="/archive/[id]" as={`/archive/${idDate}_${i}`}>
              <a href={`/archive/${idDate}_${i}`}>
                <span>1</span>
              </a>
            </Link>
          </li>
        );
      } else
      if (Math.abs(i - current) < 4) {
        list.push(
          <li key={i}>
            <Link href="/archive/[id]" as={`/archive/${idDate}_${i}`}>
              <a href={`/archive/${idDate}_${i}`}>
                <span>{i}</span>
              </a>
            </Link>
          </li>
        );
      }  else
      if (i === max && i !== current) {
        list.push(
          <li key={i}>
            <Link href="/archive/[id]" as={`/archive/${idDate}_${max}`}>
              <a href={`/archive/${idDate}_${max}`}>
                <span>{max}</span>
              </a>
            </Link>
          </li>
        );
      }
    }
  }

  if (max && current && idCategory) {
    for (let i = 1; i <= max; i += 1) {
      if (i === current) {
        list.push(
          <li key={i} className={pagerStyles.current}>
            <span>{i}</span>
          </li>
        );
      } 
      else if (i === 1 && i !== current) {
        list.push(
          <li key={i}>
            <Link href="/category/[id]" as={`/category/${idCategory}_${i}`}>
              <a href={`/category/${idCategory}_${i}`}>
                <span>1</span>
              </a>
            </Link>
          </li>
        );
      } 
      else if (Math.abs(i - current) < 4) {
        list.push(
          <li key={i}>
            <Link href="/category/[id]" as={`/category/${idCategory}_${i}`}>
              <a href={`/category/${idCategory}_${i}`}>
                <span>{i}</span>
              </a>
            </Link>
          </li>
        );
      } 
      else if (i === max && i !== current) {
        list.push(
          <li key={i}>
            <Link href="/category/[id]" as={`/category/${idCategory}_${max}`}>
              <a href={`/category/${idCategory}_${max}`}>
                <span>{max}</span>
              </a>
            </Link>
          </li>
        );
      }
    }
  }

  if (max && current && !idCategory && !idDate) {
    for (let i = 1; i <= max; i += 1) {
      if (i === current) {
        list.push(
          <li key={i} className={pagerStyles.current}>
            <span>{i}</span>
          </li>
        );
      } 
      else if (i === 1 && i !== current) {
        list.push(
          <li key={i}>
            <Link href="/">
              <a href="/">
                <span>1</span>
              </a>
            </Link>
          </li>
        );
      } 
      else if (Math.abs(i - current) < 4) {
        list.push(
          <li key={i}>
            <Link href="/page/[id]" as={`/page/${i}`}>
              <a href={`/page/${i}`}>
                <span>{i}</span>
              </a>
            </Link>
          </li>
        );
      } 
      else if (i === max && i !== current) {
        list.push(
          <li key={i}>
            <Link href="/page/[id]" as={`/page/${max}`}>
              <a href={`/page/${max}`}>
                <span>{max}</span>
              </a>
            </Link>
          </li>
        );
      }
    }
  }

  return (
    <div>
      <ul className={pagerStyles.pager_btn}>
        {list}
      </ul>
    </div>
  );
}
