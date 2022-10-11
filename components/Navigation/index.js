import Link from "next/link";
export default function Navigation(props) {
  return (
    <nav>
      {props.menu.map((category, index) => (
        <Link href={`/categories/${category.category}`} key={index}>
          <a>{category.category}</a>
        </Link>
      ))}
    </nav>
  );
}
