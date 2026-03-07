const Footer=()=>{
    return(
        <footer class="bg-black text-gray-300">
  <div class="max-w-7xl mx-auto px-6 py-12">
    
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">

      <div>
        <h2 class="text-2xl font-bold text-white">Recipe World</h2>
        <p class="mt-4 text-sm text-gray-400">
          Building modern web experiences with clean design and powerful backend.
        </p>
      </div>

      <div>
        <h3 class="text-white font-semibold mb-4">Quick Links</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="#" class="hover:text-white transition">Home</a></li>
          <li><a href="#" class="hover:text-white transition">About</a></li>
          <li><a href="#" class="hover:text-white transition">Services</a></li>
          <li><a href="#" class="hover:text-white transition">Contact</a></li>
        </ul>
      </div>

                  <div>
        <h3 class="text-white font-semibold mb-4">Resources</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="#" class="hover:text-white transition">Blog</a></li>
          <li><a href="#" class="hover:text-white transition">Help Center</a></li>
          <li><a href="#" class="hover:text-white transition">Privacy Policy</a></li>
          <li><a href="#" class="hover:text-white transition">Terms</a></li>
        </ul>
      </div>

      <div>
        <h3 class="text-white font-semibold mb-4">Follow Us</h3>
        <div class="flex space-x-4">
          <a href="#" class="hover:text-white transition">Facebook</a>
          <a href="#" class="hover:text-white transition">Twitter</a>
          <a href="#" class="hover:text-white transition">Instagram</a>
        </div>
      </div>

    </div>
    <div class="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
      © 2026 RecipeWorld. All rights reserved.
    </div>

  </div>
</footer>
    )
}   

export default Footer