import React from 'react'
import Image from 'next/image';
import { grpahCMSImageLoader } from '@/utils';

interface Author {
  
    bio: string;
    name: string;
    id: string;
    photo: {
      url: string;
    };
  
}

interface AuthorProps {
  author: Author;
}

const Author = ( {author} : AuthorProps) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
    <div className="absolute w-full flex justify-center right-0 left-0 -top-14">
      <Image
        unoptimized
        loader={grpahCMSImageLoader}
        alt={author.name}
        height={100}
        width={100}
        className="align-middle rounded-full"
        src={author.photo.url}
      />
    </div>
    <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
    <p className="text-white text-ls">{author.bio}</p>
  </div>
  )
}

export default Author