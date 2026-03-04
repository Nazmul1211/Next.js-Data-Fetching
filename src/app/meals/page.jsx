import Link from "next/link";
import MealSearchInput from "./components/MealSearchInput";
import Image from "next/image";

export const metadata = {
    title: "All Meals",
    description: "All meals loaded from MealDB API",
};

export default async function MealsPage({ searchParams }) {

    const query = await searchParams;

    // const meals = [];
    const fetchMeals = async () => {
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query.search}`);
            const data = await res.json();
            // setMeals(data?.meals || []);
            console.log(data);
            return data.meals;
        } catch (error) {
            console.log(error);
            return [];
        }
    };


    const meals = await fetchMeals();



    return (
        <div>
            <h1 className='text-2xl font-bold text-yellow-500 text-center'>Meals Page</h1>
            <MealSearchInput></MealSearchInput>
            {/* {JSON.stringify(meals)} */}
            <div className='grid grid-cols-3 gap-4'>
                {
                    meals?.map((singleMeal) => {
                        return (
                            <div key={singleMeal?.idMeal} className='bg-emerald-600 p-3 rounded-md'>
                                <img src={singleMeal?.strMealThumb} width={641} height={641} alt={singleMeal.strMeal} />
                                <p className='text-2xl font-extrabold text-lime-300 mt-1.5'>{singleMeal.strMeal}</p>
                                <p>{singleMeal.strInstructions.length > 300
                                    ? singleMeal.strInstructions.slice(0, 300) + " ..."
                                    : singleMeal.strInstructions}</p>
                                <Link className="" href={`/meals/${singleMeal.idMeal}`}><button className="bg-yellow-400 px-2 py-1 mt-4 rounded-md text-green-700 font-bold">Details</button></Link>
                            </div>
                        )
                    }
                    )
                }
            </div>

        </div>
    )
}
