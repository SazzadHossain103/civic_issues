const server = process.env.NEXT_PUBLIC_API_URL

export async function getIssues() {
  const result = await fetch(`${server}/api/issues/list`, { next: { revalidate: 10 } });
  return result.json();
}
export async function getUsers() {
  const result = await fetch(`${server}/api/users/list`, { next: { revalidate: 10 } });
  return result.json();
}
export async function getSingleIssues(id : string) {
  const result = await fetch(`${server}/api/issues/single`, { 
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id}),
    next: { revalidate: 10 } });

  if (!result.ok) {
    throw new Error("Failed to fetch issue");
  }
  console.log("single fetch error", id)
  return result.json();
}