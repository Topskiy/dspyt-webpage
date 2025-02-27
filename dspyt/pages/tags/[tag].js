import Post from "@/components/Post";
import { getAllFilesFrontMatter, getFileBySlug } from "@/lib/mdx";
import { getAllTags } from "@/lib/tags";
import { convertToSlug } from "@/lib/utils/convertToSlug";
import Head from "next/head";
import { useState } from "react";

export async function getStaticPaths() {
  const tags = await getAllTags();

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter("posts");
  const filteredPosts = allPosts.filter(
    (post) =>
      post.draft !== true &&
      post.tags.map((tag) => convertToSlug(tag)).includes(params.tag)
  );

  for (let i = 0; i < filteredPosts.length; i++) {
    const obj = filteredPosts[i];
    const name =
      obj.authors && obj.authors.length > 0 ? obj.authors[0] : "dspytdao";

    const authorResults = await getFileBySlug("authors", name);

    filteredPosts[i].authorName = authorResults.frontMatter.name;
    filteredPosts[i].authorAvatar = authorResults.frontMatter.avatar;
    filteredPosts[i].authorSlug = authorResults.frontMatter.slug;
  }

  return { props: { posts: filteredPosts, tag: params.tag } };
}

export default function Tag({ posts, tag }) {
  const [page, setPage] = useState(1);
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(" ").join("-").slice(1);
  return (
    <>
      <Head>
        <title>{`Data Science with Python ${title} - DSPYT`}</title>
        <link rel="icon" href="/big-data-svgrepo.svg" />
        <meta
          name="description"
          content="Data Science with Python and blockchain DAO. We cover econometrics, python programming, blockchain technology and many more topics."
        />
        <meta property="og:image" content="https://dspyt.com/DSPYT.png" />
        <meta property="og:url" content={`https://dspyt.com/tags/${tag}`} />
        <meta
          property="og:title"
          content={`Data Science with Python ${title} - DSPYT`}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@dspytdao" />
        <meta name="twitter:creator" content="@pfedprog" />
      </Head>
      <div className="relative max-w-7xl mx-auto mt-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-5xl">
            Dspyt blog tag: <span> {title} </span>
          </h1>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {posts.slice(0, 6 * page).map((post, index) => (
            <Post key={index} post={post} slug={post.slug} />
          ))}
        </div>
        {posts.length > 6 * page ? (
          <a
            onClick={() => setPage(page + 1)}
            className="relative inline-flex items-center mt-4 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Load More Posts
          </a>
        ) : null}
      </div>
    </>
  );
}
