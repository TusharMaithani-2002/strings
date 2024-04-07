import Profile from "./Profile";
import Link from "next/link";

const Header = () => {
    return (
        <div className=" flex justify-between items-center h-[80px] px-5 border-b-2 z-100">
            <div className="text-green-500 font-bold text-3xl"> <Link href={'/home'}>Strings</Link></div>
            <div><Profile/></div>
        </div>
    )
}

export default Header;