"use client";
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


export default function MealSearchInput() {
    // const [meals, setMeals] = useState([]);
    const [search, setSearch] = useState([]);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const searchQuery = {search};
        const urlQueryParam = new URLSearchParams(searchQuery);
        const url = `${pathname}?${urlQueryParam}`;
        router.push(url);
    }, [search])


    return (
        <div className='m-4 flex justify-center'>
            <input className='bg-slate-300 border-slate-600 text-slate-600 p-3 w-xl rounded-sm mb-4' placeholder='Search Your Favourite Meal...' value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
    )
}
