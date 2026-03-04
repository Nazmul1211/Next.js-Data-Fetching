"use server";

import dbConnect, { collectionNames } from "@/lib/dbConnect";

export const postSingleProduct = async (postedData) => {
    try {
        const result = await dbConnect(collectionNames.PROFESSIONAL_USER_DATA).insertOne(postedData);
        revalidatePath("/products");

        return result;
    }
    catch(error){
        return null;
    }
}