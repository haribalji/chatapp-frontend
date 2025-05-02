import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useErrors = (errors = []) => {
    // Each object inside the errors array is expected to look like this:
    // {
    //     isError: boolean,          // RTK query/mutation isError flag
    //     error: object,             // RTK query/mutation error object
    //     fallback: function         // (optional) custom function to run on error
    //   }

  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        else toast.error(error?.data?.message || "Something went wrong");
      }
    });
  }, [errors]);
};

const useAsyncMutation = (mutatationHook) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);



  // const [mutate] = mutatationHook(); // == useSendFriendRequestMutation() present in   api reducer

  const [mutate] = mutatationHook();

  const executeMutation = async (toastMessage, ...args) => {
    setIsLoading(true);
    const toastId = toast.loading(toastMessage || "Updating data...");

    try {
      // mutate(...args) becomes:
      // mutate({ userId: id })

      const res = await mutate(...args);

      if (res.data) {
        toast.success(res.data.message || "Updated data successfully", {
          id: toastId,
        });
        setData(res.data);
      } else {
        toast.error(res?.error?.data?.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return [executeMutation, isLoading, data];
};

const useSocketEvents = (socket, handlers) => {
  useEffect(() => {
    // it converts an object into an array of key-value pairs.

    // const handlers = {
    //   message: handleMessage,
    //   connect: handleConnect,
    //   disconnect: handleDisconnect
    // };

    // [
    //   ["message", handleMessage],
    //   ["connect", handleConnect],
    //   ["disconnect", handleDisconnect]
    // ]
    
    
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event,handler);
      // Adds a listener.
      // You are adding a listener on the client side.
      //  This listener will wait for the server (or whoever is connected) to emit that event.
      //  When that specific event is triggered (emitted), your handler function will execute.
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
        //  You are only removing a specific event listener that you added with socket.on(event, handler).


      });
    };
  }, [socket, handlers]);
};

export { useErrors, useAsyncMutation, useSocketEvents };