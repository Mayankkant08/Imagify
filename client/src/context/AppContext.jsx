import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [credit, setCredit] = useState(null);

  // Remove trailing slash if accidentally added
  const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '') || '';

  const navigate = useNavigate()

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { token },
      });

      if (data.success) {
        setCredit(data.credit); // backend returns `credit`
        setUser(data.user);
      } else {
        toast.error(data.message || 'Failed to load credits');
      }
    } catch (error) {
      console.error('Error loading credits:', error.message);
      toast.error('Could not fetch user credits');
    }
  };

  const generateImage = async(prompt)=>{
    try{
      const {data} = await axios.post(`${backendUrl}/api/image/generate-image`,{prompt},{headers: {token}})
      if(data.success){
        loadCreditsData()
        return data.resultImage
      }else{
        toast.error(data.message)
        loadCreditsData()
        if(data.creditBalance === 0){
          navigate('/buy-credit')
        }
      }
    }catch(error){
      toast.error(error.message)
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setCredit(null);
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const contextValue = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
