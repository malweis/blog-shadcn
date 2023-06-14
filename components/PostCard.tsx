"use client"
import React from 'react';

interface PostcardProps {
  post: {
    title: string;
    excerpt: string;
  };
}

const Postcard: React.FC<PostcardProps> = ({ post }) => {
  return (
    <div>
      {post.title}
      {post.excerpt}
    </div>
  );
};

export default Postcard;
