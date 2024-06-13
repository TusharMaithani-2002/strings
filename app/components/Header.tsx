
import Link from "next/link";
import SideProfile from "./SideProfile";

const Header = () => {
    return (
        <div className=" flex justify-between items-center h-[80px] px-5 z-100 bg-[rgba(16,16,16,1)]">
            <div className="text-[#B3005E] font-bold text-3xl"> <Link href={'/home'}>Strings</Link></div>
            <div><SideProfile/></div>
        </div>
    )
}

export default Header;