
const fetchSingleMeals = async (id) => {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        // setMeals(data?.meals || []);
        console.log(data);
        return data.meals;
    } catch (error) {
        console.log(error);
        return [];
    }
};


export async function generateMetadata({ params }) {
  const id = (await params).id
 
  // fetch post information
  const [singleMeal] = await fetchSingleMeals(id);
 
  return {
    title: singleMeal.strMeal,
    description: singleMeal.strInstructions,
  }
}


export default async function SingleMealsPage({ params }) {

    const p = await params;

    const singleMeal = await fetchSingleMeals(p?.id);



    return (
        <div>
            <h1 className='text-2xl font-bold text-yellow-500 text-center'>Single Meals Page</h1>
            {JSON.stringify(singleMeal)}
        </div>
    )
}
