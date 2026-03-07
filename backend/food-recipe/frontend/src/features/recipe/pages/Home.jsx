const Home=()=>{
    return(
        <main className="h-[100%] w-full relative">
            <img src="https://thumbs.dreamstime.com/b/asian-food-cooking-wok-noodles-chicken-stir-fry-vegetables-ingredients-spices-sauces-chopsticks-dark-rustic-83701227.jpg" alt="" className="w-full h-full object-cover lg:object-fill object-top"/>
            <div className="absolute top-20 flex flex-col  items-center justify-center left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h1 className="text-3xl grade font-bold text-white whitespace-nowrap">Recipe World</h1>
                <p className="text-xl text-white whitespace-nowrap">The best place for create recipes</p>
            </div>
        </main>
    )
}   

export default Home 