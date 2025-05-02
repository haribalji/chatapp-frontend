import React from 'react'
import { transformImage } from '../../lib/features';
import { FileOpen as  FileOpenIcon} from '@mui/icons-material';

const RenderAttachment = (file,url) => {
//  it is a funcion
switch(file){

    case "video":
      return  <video src={url} preload="none" width={"200px"} controls/>
//  The controls attribute adds built-in playback 
// controls, allowing users to play, pause, adjust volume, and seek through the video.


    case "image":
      return (  <img src={transformImage(url,200)} alt="attachement"
        
        width={"200px"}
        height={"150px"}
        style={{
            objectFit:"contain",
        }}
        
        
        />)
        

    case "audio":
        // So, <audio></audio> is allowed in JSX only if it has children inside it.
        // as here it does not have the children so it is
        return <audio src={url} preload="none"  controls/>
        //  The controls attribute adds built-in playback 
        // controls, allowing users to play, pause, adjust volume, and seek through the audio.
           
    default:
        // if nothing is executed  it will be executed
     return   <FileOpenIcon/>


}

}

export default RenderAttachment
