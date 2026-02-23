


function Navbar() {
    return (
      //  <nav className='flex justify-between items-center p-2 z-100 pointer-events-auto'>
      //          <div className='h-24 w-24'><img src="\Images\Sunnie_main_lgogo-removebg-preview.png" alt="Sunnie Logo" /></div>
      //          <ul className='flex space-x-6 text-cream'>
      //            <li className='hover:text-mutedemerald cursor-pointer'>Home</li>
      //            <li className='hover:text-mutedemerald cursor-pointer'><a href="/showproducts">Products</a></li>
      //            <li className='hover:text-mutedemerald cursor-pointer'>About</li>
      //            <li className='hover:text-mutedemerald cursor-pointer'>Contact</li>
      //          </ul>
      //        </nav>

      <nav className='relative '>
        <div className="mx-4 max-w-full px-2 sm:px-6 lg:px-8 xl:px-0 md:px-4">
          <div className="relative flex h-8 items-end justify-between">
              <div className='flex shrink-0 items-center'>
              <img src="\Images\Sunnie_main_lgogo-removebg-preview.png" alt="Sunnie Logo" class="h-8 w-auto" />
            </div>
            <div className="hidden sm:ml-6 md:ml-4 sm:block md:block">
              <div className="flex space-x-5">
                  <a class=" hover:text-indigo-400" aria-current="home" href="/">Home</a>
                  <a class=" hover:text-indigo-400" href="/showproducts">Products</a>
                  <a class=" hover:text-indigo-400" href="/cart">Cart</a>
                  <a class=" hover:text-indigo-400" href="/login">Login</a>
                  <a class=" hover:text-indigo-400" href="/signup"> Sign Up</a>
              </div>
                  
              
            </div>
          </div>
            
                
          
        </div>
            
                
              </nav>
    );
};

export default Navbar;