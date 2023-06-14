import { GraphQLClient, gql } from 'graphql-request';
import { NextResponse } from 'next/server';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export async function POST(request) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;

  try {
    const { name, email, comment, slug } = await request.json();

    console.log("Request Body: ", {
      name,
      email,
      comment,
      slug,
    });

    const result = await graphQLClient.request(query, {
      name,
      email,
      comment,
      slug,
    });

    const statusCode = 200;
    return NextResponse.json(result, { status: statusCode });
  } catch (error) {
    // Return a custom error object with the expected shape
    const errorObject = {
      message: "Something went wrong while creating the comment",
      error: error.message,
      status: 500,
    };

    return NextResponse.json(errorObject, { status: 500 });
  }
}
