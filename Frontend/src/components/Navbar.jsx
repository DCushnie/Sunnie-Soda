


function Navbar() {
    return (
       <nav className='flex justify-between items-center p-2 z-100'>
               <div className='text-3xl font-bold text-cream'>SodaPop</div>
               <ul className='flex space-x-6 text-cream'>
                 <li className='hover:text-mutedemerald cursor-pointer'>Home</li>
                 <li className='hover:text-mutedemerald cursor-pointer'>Products</li>
                 <li className='hover:text-mutedemerald cursor-pointer'>About</li>
                 <li className='hover:text-mutedemerald cursor-pointer'>Contact</li>
               </ul>
             </nav>
    );
};

export default Navbar;