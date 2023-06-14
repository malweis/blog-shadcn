"use client";
import { getRecentPosts, getSimilarPosts } from '@/services';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { grpahCMSImageLoader } from '../utils';
import moment from 'moment';
import Link from 'next/link';




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




type PostWidgetProps = {
  slug?: string;
  categories?: string;
};

const PostWidget = ({ slug, categories }: PostWidgetProps) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((res) => setRelatedPosts(res));
    } else {
      getRecentPosts().then((res) => setRelatedPosts(res));
    
    }

   
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {slug ? 'Related Post' : "Recent Post"}
      </h3>
      {relatedPosts.map((post : Post) => (
        <div key={post.title} className='flex items-center w-full mb-4'>
            <div className='w-16 flex-none'>
                  <Image
                unoptimized
                loader={grpahCMSImageLoader}
                alt={post.title}
                height={60}
                width={60}
                className="align-middle rounded-full"
                src={post.featuredImage.url}
              />
            </div>
            <div className='flew-grow ml-4'>
              <p className='text-gray-500 font-xs'>
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </p>
              <Link href={`/post/${post.slug}`} key={post.title}  className='text-md'>
                {post.title}
              </Link>
        </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
