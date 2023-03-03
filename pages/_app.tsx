import usePageView from "../hooks/usePageView";
import { AppProps } from "next/app";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  usePageView();

  return <Component {...pageProps} />;
}
