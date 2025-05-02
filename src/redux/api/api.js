import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";




// createApi → creates a custom API service for interacting with your backend.

// fetchBaseQuery → like a simpler version of axios or fetch. It's used for making HTTP requests.

// server → likely a constant like "http://localhost:3000", 





// createApi: Creates an API slice to handle fetching, caching, and updating data.
const api = createApi({
  reducerPath: "api",
//   reducerPath: The key name in Redux store where RTK Query will store its cache and state
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
 
//   Sets a common base URL for all API requests.

//   Every endpoint you define later will append onto this base URL.
  
//   e.g., chat/my becomes http://localhost:3000/api/v1/chat/my
 
  tagTypes: ["Chat", "User", "Message"],
//   builder is an object automatically provided by createApi.
//   It contains methods to define your endpoints — like queries and mutations.
  
  
  endpoints: (builder) => ({//
    // builder.query()	To define a GET request (for fetching data)
// builder.mutation()	To define POST, PUT, DELETE requests (for modifying data)
    myChats: builder.query({//Defines a GET request (used for fetching data)
// collecting all the chats connected with user
      query: () => ({//Returns config for the request

        url: "chat/my",
        credentials: "include",
      }),
    //   In RTK Query, providesTags is used to label cached data returned by a query, so that mutations (like POST, PUT, DELETE) can tell RTK Query what to 
    //   refetch automatically when the data might have changed.
      providesTags: ["Chat"],

//Whenever you create, update, or delete a chat, your myChats list is automatically updated without you needing to manually reload or call a refetch.
// This mutation tells RTK Query: “Anything tagged 'Chat' should be refetched.”// 
//   "Invalidates" means: this mutation changed something — please refresh anything related."
// this process now done automatically
}),
// it is used to  get the user 
searchUser: builder.query({
  // The argument name receives the value you passed (i.e., search.value)
    query: (name) => ({
      url: `user/search?name=${name}`,
      credentials: "include",
    }),
    providesTags: ["User"],
  }),


  sendFriendRequest: builder.mutation({
    query: (data) => ({
      url: "user/sendrequest",
      method: "PUT",
      credentials: "include",
      body: data,
    }),
    invalidatesTags: ["User"],
  }),
// it is for getting the notfication
  getNotifications: builder.query({
    query: () => ({
      url: `user/notifications`,
      credentials: "include",
    }),
    keepUnusedDataFor: 0,//here we will not do the caching
  }),
// here we are writing the code for  accepting the notification
  acceptFriendRequest: builder.mutation({
    query: (data) => ({
      url: "user/acceptrequest",
      method: "PUT",
      credentials: "include",
      body: data,
    }),
    invalidatesTags: ["Chat"],
  }),


  chatDetails: builder.query({
    query: ({ chatId, populate = false }) => {
      let url = `chat/${chatId}`;
      // if the populate true only we will add the populate true
      if (populate) url += "?populate=true";

      return {
        url,
        credentials: "include",
      };
    },
    providesTags: ["Chat"],
  }),
  getMessages: builder.query({
    // it is for getting the messages
    query: ({ chatId, page }) => ({
      url: `chat/message/${chatId}?page=${page}`,
      credentials: "include",
    }),
    keepUnusedDataFor: 0,
  }),

  sendAttachments: builder.mutation({
    
    query: (data) => ({
      

      // data will be coming here and it will sent 
      url: "chat/message",
      method: "POST",
      credentials: "include",
      body: data,
    }),

  }),

  myGroups: builder.query({
    query: () => ({
      url: "chat/my/groups",
      credentials: "include",
    }),
    providesTags: ["Chat"],
  }),


newGroup:builder.mutation({
    query: ({ name, members }) => ({
      url: "chat/new",
      method: "POST",
      credentials: "include",
      body: { name, members },
    }),
    invalidatesTags: ["Chat"],
  }),

  availableFriends: builder.query({
    query: (chatId) => {
      let url = `user/friends`;
      if (chatId) url += `?chatId=${chatId}`;

      return {
        url,
        credentials: "include",
      };
    },
    providesTags: ["Chat"],
  }),

  renameGroup: builder.mutation({
    query: ({ chatId, name }) => ({
      url: `chat/${chatId}`,
      method: "PUT",
      credentials: "include",
      body: { name },
    }),
    invalidatesTags: ["Chat"],
  }),
  removeGroupMember: builder.mutation({
    query: ({ chatId, userId }) => ({
      url: `chat/removemember`,
      method: "PUT",
      credentials: "include",
      body: { chatId, userId },
    }),
    invalidatesTags: ["Chat"],
  }),
  addGroupMembers: builder.mutation({
    query: ({ members, chatId }) => ({
      url: `chat/addmembers`,
      method: "PUT",
      credentials: "include",
      body: { members, chatId },
    }),
    invalidatesTags: ["Chat"],
  }),

  deleteChat: builder.mutation({
    query: (chatId) => ({
      url: `chat/${chatId}`,
      method: "DELETE",
      credentials: "include",
    }),
    invalidatesTags: ["Chat"],
  }),

  leaveGroup: builder.mutation({
    query: (chatId) => ({
      url: `chat/leave/${chatId}`,
      method: "DELETE",
      credentials: "include",
    }),
    invalidatesTags: ["Chat"],
  }),

})




})


export default api;


export const { 
    // Because RTK Query was built to generate custom React hooks 
    // automatically, based on the endpoints you define.
    useMyChatsQuery,
    useLazySearchUserQuery,//if we write like this then it need  to be triggered to execute the function
    useSendFriendRequestMutation,
    useGetNotificationsQuery,
    useAcceptFriendRequestMutation,
    useChatDetailsQuery,
    useGetMessagesQuery,
    useSendAttachmentsMutation,
    useMyGroupsQuery,
    useAvailableFriendsQuery,
    useNewGroupMutation,
    useRenameGroupMutation,
    useRemoveGroupMemberMutation,
    useAddGroupMembersMutation,
    useDeleteChatMutation,
    useLeaveGroupMutation,
  } = api;

























































