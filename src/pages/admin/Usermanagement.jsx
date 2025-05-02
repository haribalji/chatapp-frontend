import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table';
import { dashboardData } from '../../constants/sampledata';
import { transformImage } from '../../lib/features';
import { Avatar, Skeleton } from '@mui/material';
import axios from 'axios';
import { useErrors } from '../../hooks/hook';
import { server } from '../../constants/config';
// D:\web project\chatapp\npx create-vite@5.2.0 my-vite-app --template react\src\components\shared\Table.jsx

const colums=[{//it will be the columns of the TABLE
field:"id", //here defining each column
headerName:"ID",
headerClassName:"table-header",
width:200
}
,{//it will be the columns of the TABLE
  field:"avatar", //here defining each column
  headerName:"Avatar",
  headerClassName:"table-header",
  width:150,
  // When renderCell: (params) => (...) is used, MUI 
  // automatically fills params with the cell-specific data of that particular row.
  renderCell:(params)=>{
  
  // In MUI's DataGrid, params holds all relevant
  //  data for the specific cell of a particular row.
    // console.log(params); // Debugging: View params object in console

  return <Avatar alt={params.row.name} src={params.row.avatar} />

  // <Avatar alt={params.row.name}
  //   // renderCell is a custom rendering function
  //   //  for a specific column in DataGrid.
  // src={params.row.avatar}
  
  // />
  

  }
  },{//it will be the columns of the TABLE
    field:"name", //here defining each column
    headerName:"Name",
    headerClassName:"table-header",
    width:200
    }
    ,{//it will be the columns of the TABLE
      field:"username", //here defining each column
      headerName:"Username",
      headerClassName:"table-header",
      width:200
      },{//it will be the columns of the TABLE
        field:"friends", //here defining each column
        headerName:"Friends",
        headerClassName:"table-header",
        width:150
        }
        ,{//it will be the columns of the TABLE
          field:"groups", //here defining each column
          headerName:"Groups",
          headerClassName:"table-header",
          width:200
          }
         



];
const Usermanagement = () => {
   const [rows, setrows] = useState([]);


   const [stats, setStats] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
 
  //  const server = "http://localhost:3000";
 
   useEffect(() => {
     const fetchStats = async () => {
       try {
         const { data } = await axios.get(`${server}/api/v1/admin/users`, {
           withCredentials: true, // if you're using cookies/session
        
          });
          console.log(data)
         setStats(data);
// format
// Object
// status
// : 
// "success"
// users
// : 
// Array(28)
// 0
// : 
// {avatar: 'sdvsd', _id: '67eea274305b09c23ab593a9', groups: 3, friends: 15}
// 1
// : 
// {name: 'jkjds', username: 'hari', avatar: 'https://avatars.githubusercontent.com/u/5464322', _id: '67f22299f090352af840928f', groups: 3, …}
// 2
// : 
// {name: 'jkjds_hari', username: 'hari_', avatar: 'sdvsd', _id: '67f22342127ccd8eb0f75511', groups: 8, …}
// 3
// : 
// {name: 'jkjds_hari', username: 'hari_bslji', avatar: 'sdvsd', _id: '67f223c69d4c5a4f90a183d9', groups: 3, …}
// 4
// : 
// {name: 'jkjds', username: 'hari_mmal', avatar: 'sdvsd', _id: '67f22693d7b46bc80f98c7af', groups: 6, …}
// 5
// : 
// {name: 'jkjds_hari', username: 'hari_bslji vnp', avatar: 'sdvsd', _id: '67f23603cfa7c3d5d0eb158a', groups: 6, …}
// 6
// : 
// {name: 'jkjds_harirdf', username: 'hari_bslji vnpffd', avatar: 'sdvsd', _id: '67f265fb0e0c70229cbe9d4e', groups: 6, …}
// 7
// : 
// {name: 'jkjds_harirdf', username: 'hari_bslji vnpffdjjs', avatar: 'sdvsd', _id: '67f267d847b8693796d85cab', groups: 4, …}
// 8
// : 
// {name: 'hari', username: 'hari blajid', avatar: 'sdvsd', _id: '67f27298bfd8e1fc8e45d024', groups: 5, …}
// 9
// : 
// {name: 'jkjds_harirdf', username: 'hari_bslji vvnpffdjjs', avatar: 'sdvsd', _id: '67f2732cbfd8e1fc8e45d026', groups: 5, …}
// 10
// : 
// {name: 'hari', username: 'hari blajiddd', avatar: 'sdvsd', _id: '67f28312556ec12ae155bbef', groups: 4, …}
// 11
// : 
// {name: 'Myrtle Waelchi-Metz', username: 'Ottis.Bahringer', avatar: 'https://avatars.githubusercontent.com/u/50901968', _id: '67f3b4edc7248b87c0630ac2', groups: 4, …}
// 12
// : 
// {name: 'Winifred Kassulke PhD', username: 'Destin74', avatar: 'https://avatars.githubusercontent.com/u/55065278', _id: '67f3b4edc7248b87c0630ac6', groups: 7, …}
// 13
// : 
// {name: 'Christy Feeney', username: 'Leif.Hermiston59', avatar: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/40.jpg', _id: '67f3b4edc7248b87c0630ac9', groups: 4, …}
// 14
// : 
// {name: 'Patrick Bartoletti MD', username: 'Estell.Fadel', avatar: 'https://avatars.githubusercontent.com/u/24094560', _id: '67f3b4edc7248b87c0630ac8', groups: 6, …}
// 15
// : 
// {name: 'Morris Kertzmann', username: 'Angela.Mosciski-Rolfson', avatar: 'https://avatars.githubusercontent.com/u/5464322', _id: '67f3b4edc7248b87c0630aca', groups: 3, …}
// 16
// : 
// {name: 'Amelia Bode', username: 'Hans33', avatar: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/50.jpg', _id: '67f3b4edc7248b87c0630ac5', groups: 5, …}
// 17
// : 
// {name: 'Larry Ferry', username: 'Eloy_Mante4', avatar: 'https://avatars.githubusercontent.com/u/49797131', _id: '67f3b4edc7248b87c0630ac7', groups: 4, …}
// 18
// : 
// {name: 'Bradford Kohler', username: 'Afton_Rogahn49', avatar: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/97.jpg', _id: '67f3b4edc7248b87c0630ac3', groups: 4, …}
// 19
// : 
// {name: 'Curtis Daniel', username: 'Juwan.Kreiger', avatar: 'https://avatars.githubusercontent.com/u/972260', _id: '67f3b4edc7248b87c0630ac1', groups: 2, …}
// 20
// : 
// {name: 'Mr. Geoffrey Turner', username: 'Kaitlyn_Jacobs', avatar: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/91.jpg', _id: '67f3b4edc7248b87c0630ac4', groups: 5, …}
// 21
// : 
// {name: 'hari', username: 'hari blajiddddd', avatar: 'sdvsd', _id: '67fe22a5a50536162404b19e', groups: 0, …}
// 22
// : 
// {name: 'hari', username: 'hari blajidd', avatar: 'https://res.cloudinary.com/dbfyjehcn/image/upload/…5132435/02931d5c-1adf-4fc0-8b6a-3da13db7d9b3.webp', _id: '67fe23b4a50536162404b1a0', groups: 1, …}
// 23
// : 
// {name: 'dfvxcxfsd n  ', username: 'mmdmm', avatar: 'https://res.cloudinary.com/dbfyjehcn/image/upload/…5132435/02931d5c-1adf-4fc0-8b6a-3da13db7d9b3.webp', _id: '68049b956ef51c9edc8bef2c', groups: 0, …}
// 24
// : 
// {name: 'sugun', username: 'nvp', avatar: 'https://res.cloudinary.com/dbfyjehcn/image/upload/…45931668/62831f10-15f5-4fa1-a99b-5c94e667d973.jpg', _id: '6810cd9567de743df77a3cc5', groups: 1, …}
// 25
// : 
// {name: 'sudharshan', username: 'sud', avatar: 'https://res.cloudinary.com/dbfyjehcn/image/upload/…45934201/35c13355-be74-4e0b-af47-7326858c9e57.jpg', _id: '6810d779b2f0c770cfaf517b', groups: 2, …}
// 26
// : 
// {name: 'eswar', username: 'eswar', avatar: 'https://res.cloudinary.com/dbfyjehcn/image/upload/…46068326/48485975-8aef-4442-8d98-61f568b03cb7.png', _id: '6812e3663ec08a06db638e85', groups: 2, …}
// 27
// : 
// {name: 'sumathi', username: 'hariram', avatar: 'https://res.cloudinary.com/dbfyjehcn/image/upload/…46086696/00110706-8438-4a27-ba64-c5b805ba5274.jpg', _id: '68132b28a0c8f7173cbecfab', groups: 0, …}
// length
// : 
// 28

         
       } catch (err) {
         setError(err.response?.data?.message || "Something went wrong");
       } finally {
         setLoading(false);
       }
     };
 
     fetchStats();
   }, []);
 
 console.log(stats)
 
   useErrors([
     {
       isError: error,
       error: error,
     },
   ]);




   useEffect(() => {
    if (stats.users) {
      setrows(
        stats.users.map((i) => ({
          ...i,
          id: i._id,
          avatar: transformImage(i.avatar, 50),
        }))
      );
    }
  }, [stats]);



//    useEffect(() => {
//     setrows(    dashboardData
// .users.map(i=>({...i
//   // ...i-->
// // This spreads all properties of i 
// // (each user object) into a new object
//   ,id:i._id,
//   // id: i._id-->
// // The _id field from i is mapped to id.

// // This is likely done to match the expected structure of DataGrid,
// //  which uses id instead of _id
// avatar:i.avatar.map((i)=>transformImage(i,50))//it will transform the image according to the needed purpose
// // avatar: Array.isArray(transformImage(i.avatar, 50)) 
// // ? transformImage(i.avatar, 50)[0]  // Pick the first image if it's an array
// // : transformImage(i.avatar, 50),
// })))
//    }, [])

  return (
<AdminLayout>
{loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Table heading={"All Users"} colums={colums} rows={rows}/>
      )

}


</AdminLayout>
  )
}

export default Usermanagement
