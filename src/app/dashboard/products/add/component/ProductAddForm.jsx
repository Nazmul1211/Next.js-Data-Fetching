"use client";

import { postSingleProduct } from "@/app/actiions/products/postSingleProducts";
import { useRouter } from "next/navigation";

export default function ProductAddForm() {

    const router = useRouter();
    const {NEXT_PUBLIC_SERVER_ADDRESS} = process.env;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const productName = form.productName.value;
        const payload = { productName };
        // const res = await fetch(`${NEXT_PUBLIC_SERVER_ADDRESS}api/items`, {
        //     method: "POST",
        //     body: JSON.stringify(payload),
        //     headers: {
        //         "Content-Type": "application/json", 
        //     }
        // });
        // const result = await res.json();
        const result = await postSingleProduct(payload);
        form.reset();
        // alert("Product Added Successfully");
        // console.log(result);
        router.push("/products");
        // router.refresh()

    }

    return (
        <div>
            <form onSubmit={handleSubmit} action="">
                <input className="px-3 py-2 w-[400px] mr-4 bg-slate-300 text-black font-semibold" type="text" name='productName' placeholder='Product Name' />
                <button className="px-2 py-2 bg-emerald-400 font-bold text-black" type='submit'>Submit</button>
            </form>
        </div>
    )
}
