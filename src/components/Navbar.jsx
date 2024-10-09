"use client"
import React, { useState,useEffect } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Person3OutlinedIcon from '@mui/icons-material/Person3Outlined';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartStore } from '@/hooks/useCartStore';
import Gown from './dropdown/Gown';
import Saree from './dropdown/Saree';
import Bridal from './dropdown/Bridal';
import Legowns from './dropdown/Legowns';
import Lehnga from './dropdown/Lehnga';
import Cookies from "js-cookie";

function  Navbar()  {
  const [hoveredBrand, setHoveredBrand] = useState(null);
  const [scrolling, setScrolling] = useState(false);
  const [seller,setSeller]=useState()
  const {  counter } = useCartStore();
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if(userCookie){
      const user = JSON?.parse(userCookie);
      setSeller(user)
    }
  }, []);
  
  const handleMouseEnter = (brand) => {
    setHoveredBrand(brand);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Navigate to the products page with the search term
    router.push(`/list?name=${searchTerm}`);
  };
  
  const handleMouseLeave = () => {
    setHoveredBrand(null);
  };
  const router = useRouter();
  
  const handleSearch=(e)=>{
    console.log("seller",seller)
    if(seller==null){
      router.push('/login')
    }else{
    router.push('/profile')
    }
    }
  
    const isProfileDisabled = seller == null;

    const navigateToList = (name) => {
    router.push(`/list?cat=${name}`);
  };

  const handleCart=()=>{
    if (seller==null) {
      router.push('/login')
    }else{
      router.push('/cart')
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`fixed left-0 w-full flex-wrap top-0 z-20 pb-5 ${scrolling ? 'bg-black' : 'bg-transparent'} ${scrolling ? 'text-white' : 'text-black'} transition-all duration-500 border-4 border-red-600`} onMouseEnter={()=>setScrolling(true)} onMouseLeave={()=>setScrolling(false)}>

    <div className="flex flex-col mt-6 gap-6">
      <div className="first flex flex-col md:flex-row justify-around items-center sm:gap-6 md:gap-3">
        <div className="button w-full md:w-[20vw] flex gap-3 h-[6vh] justify-center md:justify-start">
          <button className="bg-slate-600 text-white w-[40vw] md:w-[9vw] md:h-[5vh]">COUTURE</button>
          <button className="bg-slate-600 text-white w-[40vw] md:w-[9vw] md:h-[5vh]">DIFFUSE</button>
        </div>

        <Link href={'/'} className="head w-full md:w-[25vw] h-[6vh] text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Legowns</h1>
        </Link>

        <div className="last w-full md:w-[29vw] flex justify-around items-center gap-3">
          <div className="inp flex relative">
          <div className="icon absolute left-2 top-1/2 transform -translate-y-1/2">
            <SearchIcon/>
          </div>
          <form onSubmit={handleSearchSubmit} className="w-[50vw] md:w-[15vw]">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchInputChange}
                className={`${scrolling ? 'bg-[#D3D3D3]' : 'bg-[hsla(0,0%,100%,0.2)]'} w-full h-[4vh] pl-10 text-black`}
                placeholder="Search..."
              />
            </form>
          </div>
          <div className="icon flex gap-5">
            <div className="cursor-pointer">
              <FavoriteBorderOutlinedIcon />
            </div>
            <div className={`cursor-pointer ${isProfileDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleSearch} disabled={isProfileDisabled}>
                <Person3OutlinedIcon />
              </div>
            <div className="relative cursor-pointer" onClick={handleCart}>
  <ShoppingCartIcon />
  <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#F35C7A] rounded-full text-black text-sm flex items-center justify-center">
    {counter}
  </span>
</div>

          </div>
        </div>
      </div>

      <div className="second hidden md:flex md:justify-center md:relative md:h-[5vh]">
        <div className="main  md:w-[50vw] grid grid-cols-3 md:flex gap-6 font-semibold justify-center md:justify-start">
          <div
            className="nav cursor-pointer"
            onMouseEnter={() => handleMouseEnter('NEW')}
            onMouseLeave={handleMouseLeave}
          >
            NEW IN
          </div>

          {/* Dropdown */}
          <div
            className={`absolute left-0 px-7 mt-8 ${hoveredBrand === 'NEW' ? 'flex' : 'hidden'} flex-row gap-5 items-center text-black shadow-lg w-[99vw] h-[12vh] bg-white`}
            onMouseEnter={() => handleMouseEnter('NEW')}
            onMouseLeave={handleMouseLeave}
          >
            <div className="wo">WOMEN</div>
            <div className="wo">MEN</div>
          </div>

          <div className="nav cursor-pointer"  onMouseEnter={() => handleMouseEnter('WOMEN')}
            onMouseLeave={handleMouseLeave}  onClick={() => navigateToList('lehnga')}>Lehnga</div>
          {/* lehnga dropdown */}
          <div
            className={`absolute left-0 px-7 mt-9 ${hoveredBrand === 'WOMEN' ? 'flex' : 'hidden'} bg-white flex-row justify-between text-black shadow-lg w-[99vw] h-[77vh] border-5 border-green-600`}
            onMouseEnter={() => handleMouseEnter('WOMEN')}
            onMouseLeave={handleMouseLeave}
          >
      <Lehnga/>
          </div>
          <div className="nav cursor-pointer" onMouseEnter={() => handleMouseEnter('MEN')}
            onMouseLeave={handleMouseLeave}  onClick={() => navigateToList('gown')}>Gown</div>
          {/* gown dropdown */}
          <div
            className={`absolute left-0 px-7 mt-9 ${hoveredBrand === 'MEN' ? 'flex' : 'hidden'} bg-white flex-row justify-between text-black shadow-lg w-[99vw] h-[50vh]`}
            onMouseEnter={() => handleMouseEnter('MEN')}
            onMouseLeave={handleMouseLeave}
          >
         <Gown/>
          </div>
          <div className="nav cursor-pointer"  onMouseEnter={() => handleMouseEnter('COL')}
            onMouseLeave={handleMouseLeave}  onClick={() => navigateToList('saree')}>Saree</div>
          {/* saree dropdown */}
          <div
            className={`absolute left-0 px-7 mt-9 ${hoveredBrand === 'COL' ? 'flex' : 'hidden'} bg-white flex-row justify-between text-black shadow-lg w-[99vw] h-[77vh]`}
            onMouseEnter={() => handleMouseEnter('COL')}
            onMouseLeave={handleMouseLeave}
          >
         <Saree/>
          </div>
          <div className="nav cursor-pointer" onMouseEnter={() => handleMouseEnter('STAR')}
            onMouseLeave={handleMouseLeave}  onClick={() => navigateToList('bridal-special')}>Bridal Special</div>
          {/* bridal dropdown */}
          <div
            className={`absolute left-0 px-7 mt-9 ${hoveredBrand === 'STAR' ? 'flex' : 'hidden'} bg-white flex-row justify-between text-black shadow-lg w-[99vw] h-[60vh] `}
            onMouseEnter={() => handleMouseEnter('STAR')}
            onMouseLeave={handleMouseLeave}
          >
         <Bridal/>
          </div>
          <div className="nav cursor-pointer"  onMouseEnter={() => handleMouseEnter('RUN')}
            onMouseLeave={handleMouseLeave}  onClick={() => navigateToList('legowns-special')}>Legowns Exclusive</div>
          {/* legowns dropdown */}
          <div
            className={`absolute left-0 px-7 mt-9 ${hoveredBrand === 'RUN' ? 'flex' : 'hidden'} bg-white flex-row justify-between text-black shadow-lg w-[99vw] h-[46vh] `}
            onMouseEnter={() => handleMouseEnter('RUN')}
            onMouseLeave={handleMouseLeave}
          >
         <Legowns/>
          </div>
        
          <div className="nav cursor-pointer">ABOUT</div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Navbar;

