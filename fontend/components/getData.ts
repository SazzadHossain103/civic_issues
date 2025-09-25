const server = process.env.NEXT_PUBLIC_API_URL

export async function Issues() {
  const result = await fetch(`${server}/api/issues/list`, { next: { revalidate: 10 } });
  return result.json();
}