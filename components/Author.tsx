import React from 'react'


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
    <div>Author</div>
  )
}

export default Author