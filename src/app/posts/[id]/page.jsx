import React from 'react'

export const getSinglePost = async (post_id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${post_id}`)
    const data = await res.json()
    return data
}

export async function generateMetadata({ params }) {
  const id = (await params).id
 
  // fetch post information
  const singlePost = await getSinglePost(id);
 
  return {
    title: singlePost.title,
    description: singlePost.body,
  }
}
 
export default async function singlePost({ params }) {
    const p = await params;
    console.log(p.id);
    const singlePostData = await getSinglePost(p.id);

    return (
        <>
            <div className='testing-purpose-css-class '> 
                <div>singlePost</div>
                {/* <div>{JSON.stringify(singlePostData)}</div> */}
                <p>User Id: {singlePostData.userId}</p>
                <p>ID: {singlePostData.id}</p>
                <p>Title: {singlePostData.title}</p>
                <p>Body: {singlePostData.body}</p>
            </div>
        </>
    )
}
