import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoutes = () => {

    const userName = useSelector(state => state.userName)

    if(userName !== ''){
        return <Outlet />
    }else{
        alert('Please enter your Username')
        return <Navigate to='/' />
    }
};

export default ProtectedRoutes;