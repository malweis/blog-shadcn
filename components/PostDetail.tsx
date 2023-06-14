import React from 'react'


import { grpahCMSImageLoader } from '../utils';


interface Post {
  cursor: string;
  node:{ 
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
  post: Post;
}

const PostDetail = ({ post }: PostCardProps) => {
  return (
    <div>PostDetail</div>
  )
}

export default PostDetail