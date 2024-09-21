import React,{useState,useEffect} from 'react';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "./admindashboard.css";

const Admindashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    

    const handleLogout = async () => {
        await signOut(auth);
        localStorage.removeItem('rememberMe')
        navigate('/admin-login');
    };

    const handlechangeinformation = () => {
        navigate('/admin/change-information')
    }

    const handlescriptinformation= () => {
        navigate('/admin/change-script')
    }

    const handlecbacktogarden = () => {
        navigate('/')
    }

    const getUsername = (email) => {
        if (email.endsWith('@vrndvn.in')) {
            return email.split('@')[0].toUpperCase();
        }
        return email;
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setUser);
        return () => unsubscribe();
    }, []);

  return (
      <div className='Maindashboard'>
          <div className='displayadminuser'>
              {user ? (
                  <p>WELCOME {getUsername(user.email)}</p>
              ) : (
                  <p>GUEST</p>
              )}
          </div>
          <div className='allthedashbuttons'>
              <button onClick={handlechangeinformation} className='changeinformation'>Change Information</button>
              <button onClick={handlescriptinformation} className='changescript'>Change Scipt</button>
              <div className='logoutorgarden'>
                  <button onClick={handleLogout} className='logoutbuttononadmin'>Logout</button>
                  <button onClick={handlecbacktogarden} className='gardenbuttontoadmin'>Garden</button>
              </div>
          </div>
    </div>
  )
}

export default Admindashboard
