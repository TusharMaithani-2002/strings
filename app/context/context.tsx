import { getUser } from "@/actions/user.action";
import { useSession } from "next-auth/react";
import { createContext,useState,useContext, ReactNode, useEffect, useReducer } from "react";
import { userReducer } from "./reducer";

const AppContext = createContext({});


export const AppProvider = ({children}:{children:ReactNode}) => {
    const [user,setUser] = useState({});
    const [savedPosts,setSavedPosts] = useState<Set<string>>();
    const {data:session} = useSession();

    useEffect(()=> {
        const fetchUser = async() => {
            
            try {
                // @ts-ignore
                const fetchedUser = await getUser(session?.user?.id);
                setUser(fetchedUser);
                setSavedPosts(new Set(fetchedUser?.savedPosts));
                console.log('laoding user for context')
            } catch(error:any) {
                throw new Error('Error while fetching user: '+error.message);
            }
        }

        fetchUser();
        // @ts-ignore
    },[session,session?.user,session?.user?.id])

    return <AppContext.Provider value={{user,setUser,
        savedPosts,setSavedPosts
    }}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext);