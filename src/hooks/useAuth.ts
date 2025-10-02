// hooks/useAuth.ts
import { useUserInfoQuery } from '@/redux/features/auth/auth.api';
import { logout, setLoading, setUser } from '@/redux/features/auth/auth.slice';
import type { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  
  // This will automatically run and check if user is authenticated via cookies
  const { 
    data: userInfo, 
    isLoading: userLoading, 
    error,
    refetch 
  } = useUserInfoQuery(undefined, {
    // Skip the query if we already have user data from login
    skip: !!user,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    // console.log("useAuth Effect:", { 
    //   userInfo: userInfo?.data, 
    //   hasError: !!error,
    //   currentUser: user 
    // });
    
    // If we get user info from the query and don't already have it in Redux
    if (userInfo?.success && userInfo.data && !user) {
      // console.log("Setting user from useUserInfoQuery:", userInfo.data);
      dispatch(setUser(userInfo.data));
    } 
    // If there's an error and we're not loading, user is not authenticated
    else if (error && !userLoading) {
      console.log("Auth error detected, ensuring logged out state");
      dispatch(logout());
    }
  }, [userInfo, error, user, userLoading, dispatch]);

  useEffect(() => {
    // Update loading state
    if (userLoading && !user) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [userLoading, user, dispatch]);

  return {
    user,
    isAuthenticated: !!user, // Simple check - if we have user data, we're authenticated
    isLoading: isLoading || (userLoading && !user),
    refetchUser: refetch, // Keep this for manual refreshes if needed elsewhere
  };
};