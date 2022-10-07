import Layout from "../../../components/Layout";
import Image from "next/image";
function Product({ id, productdisplayname }) {
  return (
    <Layout title={productdisplayname}>
      <h2>{productdisplayname}</h2>
      <Image
        src={`https://kea-alt-del.dk/t7/images/webp/640/${id}.webp`}
        alt="Picture of the author"
        width={640}
        height={854}
        priority
      />
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  console.log(params);
  const res = await fetch(
    `https://kea-alt-del.dk/t7/api/products/${params.id}`
  );
  const data = await res.json();

  // Pass post data to the page via props
  //reduce amoun t of data in .json file
  //TODO: samme i slug?
  let { id, productdisplayname } = data;
  return { props: { id, productdisplayname } };
}

export async function getStaticPaths() {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    //if(true){
    return {
      paths: [],
      fallback: true,
    };
  }
  const res = await fetch("https://kea-alt-del.dk/t7/api/products/?limit=1000");
  const products = await res.json();
  // Get the paths we want to pre-render based on posts
  const paths = products.map((post) => ({
    params: { slug: post.category, id: post.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}

export default Product;
