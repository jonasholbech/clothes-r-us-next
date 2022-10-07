export async function getCategories() {
  const res = await fetch("https://kea-alt-del.dk/t7/api/categories");
  return await res.json();
}
