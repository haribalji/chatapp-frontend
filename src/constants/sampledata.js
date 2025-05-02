// avatar=[],
// name,
// _id,
// groupchat=false,//by default
// sameSender,
// isOnline,
// newMessagealert,
// index=0,
// handleDeleteChatOpen,

import { avatarClasses } from "@mui/material"


// it is for sample chats

export const samplechats=[{

    avatar:["https://www.w3schools.com/howto/img_avatar.png"],
    name:"john",
    _id:"1",
    groupchat:false,//by default
    // sameSender,
    // isOnline,
    // newMessagealert,
    // index=0,
    // handleDeleteChatOpen,.
    members:["1","2"]
    


},

{

    avatar:["https://www.w3schools.com/howto/img_avatar.png",
        // "https://www.w3schools.com/howto/img_avatar.png",
        // "  https://www.w3schools.com/howto/img_avatar.png",
        // "https://www.w3schools.com/howto/img_avatar.png"],
    ],
    name:"sugun",
    _id:"2",
    groupchat:true,//by default
    // sameSender,
    // isOnline,
    // newMessagealert,
    // index=0,
    // handleDeleteChatOpen,.
    members:["1","2"]
    


}



]
// it is for sample sampleusers

export const sampleUsers=[{


    avatar:["https://www.w3schools.com/howto/img_avatar.png"],
    name:"john",
    _id:"1",
},{


    avatar:["https://www.w3schools.com/howto/img_avatar.png"],
    name:"hari",
    _id:"2",    


},]

// it is for sample notification
export const samplenotification=[
    {

sender:{  avatar:["https://www.w3schools.com/howto/img_avatar.png"],
    name:"john",},
  
    _id:"1",
},

{

    sender:{ avatar:["https://www.w3schools.com/howto/img_avatar.png"],
        name:"hari",},
      
        _id:"1",
    },
    

]


// here the sample message content

export const sampleMessage=[
{
    // either it will have the content or it will the attachement

content:" hi how are you send me that photo ",
_id:"hari bkajim",
sender:{
    _id:"haril",
    name:"charam",
},
chat:"chatid",
createdAt:"2024-02-12T10:41:30.630Z",

},


{
    attachments:[{
        public_id :"jkdvj",
        url:"https://www.w3schools.com/howto/img_avatar.png"
    },],
    content:" l hi hoow are you ",
    _id:"haribb bkaji",
    sender:{
        _id:"hari",
        name:"nvp hari",
    },
    chat:"chatid",
    createdAt:"2024-02-12T10:41:30.630Z",
    
    }

]


export const  dashboardData={
    users:[
        {
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            name:"john",
            _id:"1",
            friends:20,
            username:"hari_",
            groups:5
        
        },
        {
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            name:"balaji",
            _id:"2",
            friends:20,
            username:"hari_",
            groups:5
        
        }

    ],

    chats:[{
        name:"hari_",
        avatar:["https://www.w3schools.com/howto/img_avatar.png"],
        _id:"1",
        groupchat:"false",
        members:[{_id:"1",avatar:"https://www.w3schools.com/howto/img_avatar.png"},
            {_id:"2",avatar:"https://www.w3schools.com/howto/img_avatar.png"}
        ],
        totalmembers:2,
        toltalmessages:20,
        creator:{
            name:"hari_",
            avatar:["https://www.w3schools.com/howto/img_avatar.png"]
        }
    },
    {
        name:"hari_bal",
        avatar:["https://www.w3schools.com/howto/img_avatar.png"],
        _id:"2",
        groupchat:"false",
        members:[{_id:"222",avatar:"https://www.w3schools.com/howto/img_avatar.png"},
            {_id:"22",avatar:"https://www.w3schools.com/howto/img_avatar.png"}
        ],
        totalmembers:23,
        toltalmessages:20,
        creator:{
            name:"hari_nvp",
            avatar:["https://www.w3schools.com/howto/img_avatar.png"]
        }
    }


],
messages:[
    {
        attachments:[],
        content:" l hi hoow are you ",
        _id:"haribb bkaji",
        sender:{
            // _id:"hari",
            name:"nvp hari",
            avatar:"https://www.w3schools.com/howto/img_avatar.png"
        },
        chat:"chatid",
        groupchat:false,
        createdAt:"2024-02-12T10:41:30.630Z",
        
        },
    {
        attachments:[{
            public_id :"jkdvj",
            url:"https://www.w3schools.com/howto/img_avatar.png"
        },],
        content:"",
        _id:"haribb bkajip",
        sender:{
            // _id:"hari",
            name:"nvp hari",
            avatar:"https://www.w3schools.com/howto/img_avatar.png"
        },
        chat:"chatid",
        groupchat:false,
        createdAt:"2024-02-12T10:41:30.630Z",
        
        }
]
}


