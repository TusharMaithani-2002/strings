import { getUser } from "@/actions/user.action";
import { useSession } from "next-auth/react";
import { createContext,useState,useContext, ReactNode, useEffect, useReducer } from "react";
import { userReducer } from "./reducer";

const AppContext = createContext({});


export const AppProvider = ({children}:{children:ReactNode}) => {
    const [user,setUser] = useState({});
    const [openNavLabel,setOpenNavLabel] = useState(true);
    const {data:session} = useSession();

    useEffect(()=> {
        const fetchUser = async() => {
            
            try {
                // @ts-ignore
                const fetchedUser = await getUser(session?.user?.id);
                setUser(fetchedUser);
            } catch(error:any) {
                throw new Error('Error while fetching user: '+error.message);
            }
        }

        fetchUser();
        // @ts-ignore
    },[session,session?.user,session?.user?.id])

    return <AppContext.Provider value={{user,setUser,openNavLabel,setOpenNavLabel}}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext);