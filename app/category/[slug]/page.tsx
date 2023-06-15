import React from 'react';
import { useRouter } from 'next/navigation';

import { getCategories, getCategoryPost } from '../../../services';
import { PostCard, Categories } from '../../../components';
import Loader from '@/components/Loader';


interface Post {
    cursor: string;
    node : { 
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
  }
  
  interface PostCardProps {
    posts: Post [] ;
  }

  interface parametros{
    params :{
       slug :string
    }
 }

 export const dynamicParams = true;
 
 export async function generateStaticParams() {
  return [<Loader/>]
}

 export default async function Page({ params }: parametros) {
  const post = await getPostos(params.slug)
 




  
  

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
        {post.map((post: Post, index: number) => (

                <PostCard key={index} post={post} />

          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};


// Fetch data at build time


async function getPostos(slug: string) {
  const res = (await await getCategoryPost(slug)) || []
  const post = res

  return post
}
