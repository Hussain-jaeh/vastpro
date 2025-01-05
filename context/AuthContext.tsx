import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  isLoginin?: boolean;
}

interface AuthRequest {
  email: string;
  password: string;
}
const TOKEN_KEY = "my-jwt";
export const API_URL = "https://api.saasprotech.com";
const AuthContext = createContext<AuthProps>({});
export const useAuth = () => {
  return useContext(AuthContext);
};
export const useGlobalContext = () => useContext(AuthContext);
export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    authenticated: false,
    token: null,
  });
  const [isLoginin, setIsLoginin] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log(authState);
      if (token) {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
        setAuthState({
          authenticated: true,
          token: token,
        });
      }
    };
    loadToken();
  }, []);
  const login = async (email: string, password: string) => {
    setIsLoginin(true);
    try {
      // Simulate an API call with mock data
      // You can replace this with your actual API request once it's ready
      const mockResponse = {
        data: {
          access_token: "mock-jwt-token-1234567890",  // A mock token
        },
      };
      
      // Simulating a successful response
      const data = mockResponse.data;
  
      Toast.show({
        type: "success",
        text1: "Logged in successfully",
      });
  
      setAuthState({
        authenticated: true,
        token: data.access_token,
      });
  
      // Simulate setting the Authorization header globally
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
  
      // Save the token to SecureStore (local storage)
      await SecureStore.setItemAsync(TOKEN_KEY, data.access_token);
  
      // Navigate to the home page
      router.replace("/(tabs)/home");
  
      return data;
    } catch (e) {
      setIsLoginin(false);
      Toast.show({
        type: "error",
        text1: "Login failed, please try again",
      });
      return { error: true,  };
    } finally {
      setIsLoginin(false);
    }
  };
  
  const logout = async () => { 
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({
      authenticated: false,
      token: null,
    });
  };
  const value = {
    onLogin: login,
    onLogout: logout,
    authState: authState,
    isLoginin,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
