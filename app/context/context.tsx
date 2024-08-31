import { getUser, getUserActivities } from "@/actions/user.action";
import { useSession } from "next-auth/react";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { userReducer } from "./reducer";
import axios from "axios";

const AppContext = createContext({
  user: {},
  savedPosts: new Set<string>(),
  activityCount: 0,
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({});
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set<string>());
  const { data: session } = useSession();
  const [activityCount, setActivityCount] = useState<number>(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // @ts-ignore
        if (!session?.user?.id) return;
        // @ts-ignore
        const fetchedUser = await getUser(session?.user?.id);
        setUser(fetchedUser);
        setSavedPosts(new Set(fetchedUser?.savedPosts));
        console.log("laoding user for context");
      } catch (error: any) {
        console.error("Error while fetching user: " + error.message);
      }
    };

    fetchUser();
    // @ts-ignore
  }, [session, session?.user, session?.user?.id]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // @ts-ignore
        if (!session?.user?.id) return;
        // @ts-ignore
        const fetchedActivities = await axios.get(
          `api/clientrequest/activities/activityCount/${session?.user?.id}`
        );
        setActivityCount(fetchedActivities.data);
      } catch (error: any) {
        console.error("Error while fetching activities: " + error.message);
      }
    };
    fetchActivities();
    const interval = setInterval(fetchActivities, 20000);

    return () => {
      clearInterval(interval);
    };
  }, [session, session?.user, session?.user?.id]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        savedPosts,
        setSavedPosts,
        activityCount,
        setActivityCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
