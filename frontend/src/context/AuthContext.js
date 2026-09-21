// import { createContext, useContext, useEffect, useState } from 'react';

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const checkAuth = async () => {
//     try {
//       const response = await api.get('/auth/me');
//       setUser(response.data);
//     } catch {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };
// }
