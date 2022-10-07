import Link from "next/link";
import { getCategories } from "../../lib/api";
import Layout from "../../components/Layout";
import Pagination from "../../components/Pagination";
import styles from "../../styles/Category.module.css";
import Image from "next/future/image";
import { useRouter } from "next/router";
import { useBasketDispatch } from "../../contexts/BasketContext";
function Category({ articles }) {
  const dispatch = useBasketDispatch();
  const router = useRouter();
  const { slug, page = 0 } = router.query;
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
            <Link href={`/categories/${slug}/${item.id}`} prefetch={false}>
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
//pages/category/[category]/[page].js så [slug][id] skal flyttes til [category]/product/[id]?

export async function getStaticProps({ params }) {
  console.log("heres the", params);
  const res = await fetch(
    `https://kea-alt-del.dk/t7/api/products?category=${
      params.slug
    }&limit=10&start=${params.page * 10}`
  );
  const articles = await res.json();

  // Pass post data to the page via props
  return { props: { articles } };
}

export async function getStaticPaths() {
  const categories = await getCategories();

  // Get the paths we want to pre-render based on posts
  const paths = [];
  /* const paths = categories.map((post) => {
   // return { params: { slug: post.category } };
   
  }); */
  categories.forEach((cat) => {
    for (let i = 0; i < 10; i++) {
      paths.push({ params: { slug: cat.category, page: i } });
    }
  });

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}

export default Category;
