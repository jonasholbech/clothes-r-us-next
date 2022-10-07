import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Button from "../components/Button";
import { getCategories } from "../lib/api";
import Layout from "../components/Layout";
export default function Home({ categories }) {
  return (
    <Layout title="yeah">
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>
                <Link href={`/categories/${category.category}?page=1`}>
                  <a>{category.category}</a>
                </Link>
              </li>
            ))}
          </ul>
          <Button />
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </Layout>
  );
}
export async function getStaticProps() {
  const categories = await getCategories();
  return {
    props: {
      categories,
    },
  };
}
