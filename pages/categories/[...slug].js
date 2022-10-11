import Link from "next/link";
import { getCategories } from "../../lib/api";
import Layout from "../../components/Layout";
import Pagination from "../../components/Pagination";
import styles from "../../styles/Category.module.css";
import Image from "next/future/image";
import { useRouter } from "next/router";
import { useBasketDispatch } from "../../contexts/BasketContext";
function Category({ articles, categories }) {
  const dispatch = useBasketDispatch();
  const router = useRouter();
  const { slug } = router.query;

  function addToBasket(item) {
    dispatch({
      type: "added",
      amount: 1,
      prize: item.prize,
      productdisplayname: item.productdisplayname,
    });
  }
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={slug[0]} menu={categories}>
      <h2>{slug}</h2>
      <div id="blue">her er tekst</div>
      <div className={styles.productGrid}>
        {articles.map((item) => (
          <article key={item.id}>
            <Link href={`/products/${item.id}`} prefetch={false}>
              <a>
                {item.productdisplayname}
                <Image
                  src={`https://kea-alt-del.dk/t7/images/webp/640/${item.id}.webp`}
                  alt="Picture of the author"
                  width={640}
                  height={854}
                />
              </a>
            </Link>
            <button onClick={() => addToBasket(item)}>Buy</button>
          </article>
        ))}
      </div>
      <Pagination />
    </Layout>
  );
}
//TODO: pagination
//det skal være den her logik (desværre?), eller client rendered
//https://github.com/vercel/next.js/discussions/10987
//pages/category/[category]/[page].js så [slug]/[id] skal flyttes til [category]/product/[id]?

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://kea-alt-del.dk/t7/api/products?category=${
      params.slug[0]
    }&limit=10&start=${(params.slug[1] - 1) * 10 || 0 * 10}`
  ); //${params.page * 10}&start=10
  const articles = (await res.json()) || [];
  // Pass data to the page via props
  const categories = await getCategories();

  return { props: { articles, categories } };
}

export async function getStaticPaths() {
  const categories = await getCategories();

  const subpaths = [];
  const paths = categories.map((cat) => {
    for (let i = 2; i < 5; i++) {
      subpaths.push({ params: { slug: [cat.category, String(i)] } });
    }
    return { params: { slug: [cat.category] } };
  });
  return { paths: [...paths, ...subpaths], fallback: true };
}

export default Category;
