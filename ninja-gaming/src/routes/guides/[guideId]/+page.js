import { redirect } from '@sveltejs/kit';

export async function load({ params, fetch }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.guideId}`);

  if (!res.ok) {
    throw redirect(302, '/guides');
  }

  const guide = await res.json();
  return { guide };
}
