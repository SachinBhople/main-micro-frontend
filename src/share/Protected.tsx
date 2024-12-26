
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';

interface IProtected {
    compo: React.ReactNode;
}

const Protected: React.FC<IProtected> = ({ compo }) => {
    const { user } = useSelector<RootState, any>(state => state.auth);

    // Access the role correctly from user
    console.log("USERRRRR", user);
    console.log(user?.role, "QQQQQQQ");  // Correctly accessing the nested user object

    return user && user.role === "admin" ? compo : <Navigate to="/auth" />;
}

export default Protected;




// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Navigate } from 'react-router-dom'
// import { RootState } from '../redux/store'

// interface IProtected {
//     compo: React.ReactNode
// }

// const Protected: React.FC<IProtected> = ({ compo }) => {
//     const { user } = useSelector<RootState, any>(state => state.auth)
//     console.log("USERRRRR", user);
//     console.log(user.role, "ROLLEE");

//     return user && user.role === "admin" ? compo : <Navigate to="/auth" />
// }

// export default Protected
