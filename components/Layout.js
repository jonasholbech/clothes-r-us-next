import Head from "next/head";
//import styles from './layout.module.css'
import { useBasket } from "../contexts/BasketContext";
export default function Layout({ children, title = "Clothes-R-Us" }) {
  const context = useBasket();
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>I&apos;m Layout</h1>
      <p>In basket: {context.length}</p>
      <main>{children}</main>
    </>
  );
}
//TODO: add context and simple basket
