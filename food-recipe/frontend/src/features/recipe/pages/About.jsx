import { useNavigate } from "react-router-dom"

const About = () => {

  const navigate=useNavigate()
  return (
    <section class="bg-white text-gray-800">

      <div class="bg-black text-white py-20 px-6 text-center">
        <h1 class="text-4xl md:text-5xl font-bold">About Our Kitchen</h1>
        <p class="mt-4 max-w-2xl mx-auto text-gray-300">
          Discover, cook, and share your favorite recipes with a community that loves food as much as you do.
        </p>
      </div>


      <div class="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-4">Our Story</h2>
          <p class="text-gray-600 leading-relaxed">
            Our recipe platform was created with one simple goal — to make cooking easy and enjoyable for everyone.
            Whether you're a beginner or a professional chef, our collection of curated recipes helps you cook with confidence.
          </p>
          <p class="text-gray-600 mt-4 leading-relaxed">
            We believe food connects people. Every recipe shared here carries love, culture, and creativity.
          </p>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352"
            class="rounded-2xl shadow-lg w-full h-80 object-cover"
            alt="Cooking" />
        </div>
      </div>


      <div class="bg-gray-100 py-16">
        <div class="max-w-6xl mx-auto px-6 text-center">
          <h2 class="text-3xl font-bold mb-12">Why Choose Us?</h2>

          <div class="grid md:grid-cols-3 gap-8">

            <div class="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 class="text-xl font-semibold mb-3">🍳 Easy Recipes</h3>
              <p class="text-gray-600">
                Step-by-step cooking guides that anyone can follow easily.
              </p>
            </div>

            <div class="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 class="text-xl font-semibold mb-3">🌍 Global Cuisines</h3>
              <p class="text-gray-600">
                Explore dishes from different cultures and countries.
              </p>
            </div>

            <div class="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <h3 class="text-xl font-semibold mb-3">❤️ Community Driven</h3>
              <p class="text-gray-600">
                Share your own recipes and connect with food lovers.
              </p>
            </div>

          </div>
        </div>
      </div>

      <div class="bg-black text-white text-center py-16 px-6">
        <h2 class="text-3xl font-bold">Start Your Cooking Journey Today</h2>
        <p class="mt-4 text-gray-300">Join our growing food community and explore hundreds of delicious recipes.</p>
        <button
          onClick={() => navigate("/collection")}
          class="mt-6 px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition">
          Explore Recipes
        </button>
      </div>

    </section>
  )
}

export default About