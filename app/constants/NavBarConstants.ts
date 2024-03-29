import { IoHome,IoCreate,IoNotifications,IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
export const arr = [
    {
        link: '/home',
        icon:IoHome,
        label:'Home'
    },
    {
        link:'/create',
        icon:IoCreate,
        label:'Create'
    },
    {
        link:'/friends',
        icon:FaRegUser,
        label:'Friends'
    },
    {
        link:'/activities',
        icon:IoNotifications,
        label:'Activities'
    },
    {
        link:'/groups',
        icon:MdGroups,
        label:'Groups'
    },
    {
        link:'/search',
        icon:IoSearch,
        label:'Search'
    },
]

export default arr;