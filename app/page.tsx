
import Link from "next/link"
import { PostWidget, PostCard, Categories } from "@/components"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { getPosts } from '../services';
interface Post {
  cursor: string;

    author: {
      bio: string;
      name: string;
      id: string;
      photo: {
        url: string;
      };
    };
    createdAt: string;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: {
      url: string;
    };
    categories: {
      name: string;
      slug: string;
    }[];
 
}



export default async function IndexPage() {
  const post  = await getPosteos()
  return (
    
    <section className="container mx-auto px-10 mb-8 ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {post.map((post : Post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </div>

        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />

          </div>
        </div>
      </div>
    </section>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}

// `app` directory
 
// This function can be named anything
async function getPosteos() {
  const res = await (await getPosts()) || [];
  const post = res
 
  return post
}
 
