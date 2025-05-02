import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from '@mui/material'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setIsFileMenu, setUploadingLoader } from '../../redux/reducers/misc';
import { AudioFile as AudioFileIcon, Image as ImageIcon, UploadFile as UploadFileIcon, VideoFile as VideoFileIcon } from '@mui/icons-material';
import toast from "react-hot-toast";
import { useSendAttachmentsMutation } from '../../redux/api/api';

const Filemenu = ({anchorE1,chatId}) => {
  const { isFileMenu } = useSelector((state) => state.misc);
  const [sendAttachments] = useSendAttachmentsMutation();//sendAttachments with this name it is called

  const dispatch = useDispatch();
  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const closeFileMenu = () => dispatch(setIsFileMenu(false));
  const selectImage = () => imageRef.current?.click();
  const selectAudio = () => audioRef.current?.click();
  const selectVideo = () => videoRef.current?.click();
  const selectFile = () => fileRef.current?.click();

  // Here, imageRef.current is your <input type="file" /> element.

  // .click() simulates a user click on that file input.
  
  // So the file picker opens up when you click the button!




  const fileChangeHandler = async (e, key) => {

    const files = Array.from(e.target.files);
    console.log(e.target.files)//here we are getting the selected files

    if (files.length <= 0) return;

    if (files.length > 5)
      return toast.error(`You can only send 5 ${key} at a time`);
   
    dispatch(setUploadingLoader(true));

    const toastId = toast.loading(`Sending ${key}...`);
    closeFileMenu();//here we are closing the file menu
    try {
            // Fetching Here and sending

      const myForm = new FormData();
// FormData is a special JavaScript object.
//It lets you build a form-like body in memory — key-value pairs.
//Useful when you want to upload files + other data together to the server 
// (without needing to create a real HTML <form>).

      myForm.append("chatId", chatId);

      files.forEach((file) => myForm.append("files", file));
      // files  --> it is only key here that we created
// creating the format to send the data

      const res = await sendAttachments(myForm);

      if (res.data) toast.success(`${key} sent successfully`, { id: toastId });
      else toast.error(`Failed to send ${key}`, { id: toastId });

    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      dispatch(setUploadingLoader(false));
    }


  };


  return (<Menu
   open={isFileMenu}
   onClose={closeFileMenu}//when filemenu open and you  click anywhere 
  //  then that filemenu will close
   anchorEl={anchorE1}>
    <div
    style={{
    width:"10rem",
   }}>
      
      <MenuList>
          <MenuItem 

          onClick={selectImage}

//           When you click the button, it programmatically clicks the hidden file input element (through ref)!

// So it opens the file picker window.
          >
            <Tooltip title="Image">
              <ImageIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Image</ListItemText>
            <input
              type="file"
              multiple//allowing multiple files to be sent
              accept="image/png, image/jpeg, image/gif"//accept this image only
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Images")}
              ref={imageRef}//You are attaching a reference to a DOM element
          // After attaching, you can read or manipulate the DOM element 
          
          />
          </MenuItem>

          <MenuItem onClick={selectAudio}>
            <Tooltip title="Audio">
              <AudioFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
            <input
              type="file"
              multiple
              accept="audio/mpeg, audio/wav"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Audios")}
              ref={audioRef}
            />
          </MenuItem> 

          <MenuItem onClick={selectVideo}>
            <Tooltip title="Video">
            <VideoFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>Video</ListItemText>
            <input
              type="file"
              multiple
              accept="video/mp4, video/webm, video/ogg"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Videos")}
              ref={videoRef}
            />
          </MenuItem>


{/* here we are accepting all kinds of file */}
          <MenuItem onClick={selectFile}>
            <Tooltip title="File">
              <UploadFileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: "0.5rem" }}>File</ListItemText>
            <input
              type="file"
              multiple
              accept="*"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Files")}
              ref={fileRef}
            />
          </MenuItem> 


        </MenuList>

    </div>
    
    </Menu>)
}

export default Filemenu
