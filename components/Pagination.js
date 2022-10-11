import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Pagination.module.css";
export default function Pagination() {
  const router = useRouter();
  const { slug } = router.query;
  let pages = ["", 2, 3, 4, 5, 6, 7, 8, 9];
  //TODO: empty slug[1] == page 1 active
  return (
    <ol className={styles.pagination}>
      {pages.map((pageNum) => {
        return (
          <li key={pageNum}>
            <Link href={`/categories/${slug[0]}/${pageNum}`} prefetch={false}>
              <a className={slug[1] === String(pageNum) ? styles.active : ""}>
                {pageNum || "1"}
              </a>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
