import Link from "next/link";
import { useRouter } from "next/router";
export default function Pagination() {
  const router = useRouter();
  const { slug, page } = router.query;
  let pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <ol>
      {pages.map((pageNum) => {
        return (
          <li key={pageNum}>
            <Link
              href={`/categories/${slug}/?page=${pageNum - 1}`}
              prefetch={false}
            >
              {pageNum}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
