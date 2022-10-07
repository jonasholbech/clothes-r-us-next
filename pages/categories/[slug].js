import Link from "next/link";
import { getCategories } from "../../lib/api";
import Layout from "../../components/Layout";
import styles from "../../styles/Category.module.css";
import Image from "next/future/image";
import { useRouter } from "next/router";
import { useBasketDispatch } from "../../contexts/BasketContext";
function Category({ articles }) {
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
  return (
    <Layout title={slug}>
      <h2>{slug}</h2>
      <div id="blue">her er tekst</div>
      <div className={styles.productGrid}>
        {articles.map((item) => (
          <article key={item.id}>
            <Link href={`/categories/${slug}/${item.id}`}>
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
    </Layout>
  );
}
//TODO: pagination
export async function getStaticProps({ params }) {
  console.log(params);
  const res = await fetch(
    `https://kea-alt-del.dk/t7/api/products?category=${params.slug}&limit=100`
  );
  const articles = await res.json();

  // Pass post data to the page via props
  return { props: { articles } };
}

export async function getStaticPaths() {
  const categories = await getCategories();

  // Get the paths we want to pre-render based on posts
  const paths = categories.map((post) => ({
    params: { slug: post.category },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export default Category;
