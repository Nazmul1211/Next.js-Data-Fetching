import React from 'react'
import style from "./post.module.css";
import { Roboto } from "next/font/google";


export const getPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    return data;
}

export const metadata = {
  title: "All Post",
  description: "This page is about next.js data fetching from public api and show the post in the UI.",
};


const roboto = Roboto ({
  weight: ["100", "200", "400", "500", "600", "800"],
  subsets: ["latin",]
})


export default async function Posts() {
    const posts = await getPosts();
    return (
        // <div>{JSON.stringify(posts)}</div>
        <div className='grid grid-cols-3'>
            {
                posts.map((singlePost) => {
                    return (
                        <div className={`bg-teal-800 m-4 ${roboto.className}`}>
                            <div key={singlePost.id} className='p-4 mb-4'>
                    <h1 className={`text-2xl font-bold ${style["post-title"]}`}>Title: {singlePost.title}</h1>
                                <p>Body: {singlePost.body}</p>
                                <a href={`/posts/${singlePost.id}`}><button className='p-2 bg-blue-500'>Details</button></a>
                            </div>
                        </div>

                    )
                })
            }
        </div>
    )
}
