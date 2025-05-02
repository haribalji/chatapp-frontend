import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";
import { server } from "./constants/config";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);//when this function is called that time it will return the value


// getSocket()
// It looks up the component tree to find the nearest <SocketContext.Provider>.

// It grabs the value that was passed to that Provider:
const SocketProvider = ({ children }) => {


// SocketProvider is a React functional component.

// It takes children as a prop — which represents whatever you wrap 
// inside <SocketProvider>...</SocketProvider> in your app.
  
// Inside it, you initialize the socket using useMemo(...) (so it's only created once).
  
// Then it wraps all its children with <SocketContext.Provider>
//  and passes the socket instance as a value.







  const socket = useMemo(() => io(server, { withCredentials: true }),
   []//if there is no changes in it ,it will not change again and again
  );

  return (
    <SocketContext.Provider value={socket}>
      {children}
      </SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };


// Socketcontext.Provider whatever comes inside it will be considred as children