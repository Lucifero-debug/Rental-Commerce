import React, { useState } from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import MenuIcon from '@mui/icons-material/Menu';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from 'next/link';

const MobileNav = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
      };
      const router = useRouter();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Navigate to the products page with the search term
        router.push(`/list?name=${searchTerm}`);
      };
    
  return (
    <div className='md:hidden'>
      <Sheet>
  <SheetTrigger><MenuIcon/></SheetTrigger>
  <SheetContent className='fixed inset-0  overflow-auto flex flex-col gap-9'>
  <div className="inp flex mt-4">
          <div className="icon absolute left-7">
            <SearchIcon/>
          </div>
          <form onSubmit={handleSearchSubmit} className="w-[50vw] md:w-[15vw]">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchInputChange}
                className= 'bg-[hsla(0,0%,100%,0.2)] w-full h-[4vh] pl-10 text-black'
                placeholder="Search..."
              />
            </form>
          </div>
          <SheetClose asChild>
          <Link href={'/list?cat=all-products'} className='flex w-full justify-between'>
            <h1>All Products</h1>
            <ChevronRightIcon/>
          </Link>
          </SheetClose>
          <SheetClose asChild>
          <Link href={'/list?cat=lehnga'} className='flex w-full justify-between'>
            <h1>Lehnga</h1>
            <ChevronRightIcon/>
          </Link>
          </SheetClose>
          <SheetClose asChild>
          <Link href={'/list?cat=gown'} className='flex w-full justify-between'>
            <h1>Gown</h1>
            <ChevronRightIcon/>
          </Link>
          </SheetClose>
          <SheetClose asChild>
          <Link href={'/list?cat=bridal-special'} className='flex w-full justify-between'>
            <h1>Bridal Special</h1>
            <ChevronRightIcon/>
          </Link>
          </SheetClose>
          <SheetClose asChild>
          <Link href={'/list?cat=legowns-special'} className='flex w-full justify-between'>
            <h1>Legowns Exclusive</h1>
            <ChevronRightIcon/>
          </Link>
          </SheetClose>
          <SheetClose asChild>
          <Link href={'/list?cat=saree'} className='flex w-full justify-between'>
            <h1>Sarees</h1>
            <ChevronRightIcon/>
          </Link>
          </SheetClose>
  </SheetContent>
</Sheet>

    </div>
  )
}

export default MobileNav
