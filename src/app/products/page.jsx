// import { redirect } from 'next/navigation';
import React from 'react'
import { getProducts } from '../actiions/products/getProducts';

export const dynamic = "force-dynamic";

export default async function ProductPage() {

    // const { NEXT_PUBLIC_SERVER_ADDRESS } = process.env;

    // const res = await fetch(`${NEXT_PUBLIC_SERVER_ADDRESS}/api/items`);
    // const data = await res.json();

    // don't add below direct data fetching line from database in the client component, always add it in the server component, if you need to use it.
    const data = await getProducts();

    // if(data.length > 10){
    //     redirect("/");
    // }

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* <div>{JSON.stringify(data)}</div> */}
            {
                data?.map((singleData) => {
                    return (
                        <div className='my-4 p-4 bg-slate-100 text-xl text-black rounded-md ' key={singleData._id}>
                            <p>Name: <span className='font-bold text-teal-500'>{singleData?.name}</span></p>
                            <p>Age: <span className='font-bold text-teal-500'>{singleData?.age}</span></p>
                            <p>Age: <span className='font-bold text-teal-500'>{singleData?.profession}</span> </p>
                            <p>Age: <span className='font-bold text-teal-500'>{singleData?.location}</span> </p>
                        </div>
                    )
                })
            }
        </div>
    )
}
