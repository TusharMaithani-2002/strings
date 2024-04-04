"use client";
import { usePathname, useRouter } from 'next/navigation';
import {arr as navConstants} from '../constants/NavBarConstants';
import Link from 'next/link';
import Button from './ui/Button';
import { useState } from 'react';


interface NavItemProps {
    value: typeof navConstants[0],
    isActive:boolean,
    showLabel:boolean
}
const NavItem = ({value,isActive,showLabel}:NavItemProps) => {
    const {label,icon:Icon,link} = value;
    return (
        <Link href={link} className={`flex justify-around items-center p-2
        md:h-[50px] hover:bg-orange-500 text-lg ${showLabel ? 'w-[200px]':'w-[60px]'}
        transition-all duration-200 ease-in-out text-white hover:text-white ${isActive ? 'text-white bg-orange-500 text-xl' : ''}
        rounded-md
        `}>
            <Icon className='h-[25px] w-[25px]' />
            <div className={showLabel?'block':'hidden'}>{label}</div>
        </Link>
    )
}
const NavBar = () => {
    const pathname = usePathname();
    const [openNavLabel,setOpenNavLabel] = useState(true);
   return (
    <section className='md:min-h-[calc(100vh-80px)] border-r-2 border-orange-500 flex md:flex-col items-center
    md:justify-between md:py-8 px-1 bg-red-600 relative h-[80px]
    '>
      <div className='flex md:flex-col'>
      {navConstants.map((value,key) => (
        <NavItem key={key} value={value} isActive={pathname === value.link} showLabel={openNavLabel}/>
      ))}
      </div>
      <Button className='bg-orange-500 hidden md:block p-2 rounded-md text-white' clickAction={()=>setOpenNavLabel((prev:boolean) => !prev)}>
        {openNavLabel ? 'collape':'expand'}
      </Button>
    </section>
  )
}

export default NavBar
