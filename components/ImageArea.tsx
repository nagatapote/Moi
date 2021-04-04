import Link from "next/link";
import imageAreaStyle from "../styles/imageArea.module.css";

export default function ImageArea({ imageText, imageUrl }) {
  return (
    <>
      <Link href="/">
        <a>
          <div className={imageAreaStyle.imageArea}>
            <div
              className={imageAreaStyle.image}
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <span dangerouslySetInnerHTML={{ __html: imageText }} />
          </div>
        </a>
      </Link>
    </>
  );
}
