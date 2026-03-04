import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";

export async function GET() {
    try {
        const collection = await dbConnect(collectionNames.PROFESSIONAL_USER_DATA);
        const data = await collection.find({}).toArray();
        return Response.json(data);
    } catch (error) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}


export async function POST(req) {

    const postedData = await req.json();
    const result = await dbConnect(collectionNames.PROFESSIONAL_USER_DATA).insertOne(postedData);
    revalidatePath("/products");

  return Response.json(result)
}