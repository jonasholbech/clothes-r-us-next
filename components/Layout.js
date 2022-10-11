import Head from "next/head";
import Navigation from "../components/Navigation";
//import styles from './layout.module.css'
import { useBasket } from "../contexts/BasketContext";
export default function Layout({ children, title = "Clothes-R-Us", menu }) {
  const context = useBasket();
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation menu={menu} />
      <p>In basket: {context.length}</p>
      <main>{children}</main>
    </>
  );
}
//TODO: add context and simple basket
