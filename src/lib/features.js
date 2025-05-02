import moment from "moment";

const fileformat=(url="")=>{
// here we will figureout the file format

// for that first we need to extract the file extension
// from the file 
// this split(".")  it will split the  array wherever the . comes into array
const fileExt=url.split(".").pop();
// as we know the extension generally will be the last part so the pop()
// function is used to get the last element from the array

if(fileExt==="mp4" || fileExt==="webm"||fileExt==="ogg")
    return "video";

if(fileExt==="mp3" || fileExt==="wav") return "audio";

if(fileExt==="png"||
    fileExt==="jpg"||
    fileExt==="jpeg"||
    fileExt==="gif"
)
return "image";


// if nothing  means the return  simply "file" which can be xl .csv anything

return "file";


};

// it is for transformation of the image with respect to the pixel
// const transformImage=(url="",width=100)=>{
//   // /dpr_auto/w_200 // setting the image size in  chrome

//   const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);

//   return newUrl;
// }

const transformImage = (url = "", width = 100) => {
  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);

  return newUrl;
};

const  getLast7Days=()=>{
    const currentDate=moment();

    const last7Days=[];
    for(let i=0;i<7;i++){

  const dayDate=currentDate.clone().subtract(i,"days");//.subtract(i, "days") moves backward in time.
//   .clone() ensures that the currentDate is not modified
  const dayName=dayDate.format("dddd")
//   .format("dddd") extracts the day name (e.g., "Monday", "Tuesday").
last7Days.unshift(dayName);
// .unshift(dayName) adds each day at the beginning of the array
//  (to maintain order from oldest to newest).

    }
    return last7Days;

}

// it is used to store the newmessages alert in the local storage so that alert will not 
// deleted when chat is refreshed
const getOrSaveFromStorage = ({ key, value, get }) => {
  if (get)//if the key is present then fetch the value 
// other wise return null
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  else localStorage.setItem(key, JSON.stringify(value));
  // if not create the  new one and store
};


export {fileformat,transformImage,getLast7Days,getOrSaveFromStorage};