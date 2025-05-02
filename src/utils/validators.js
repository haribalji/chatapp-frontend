import { isValidUsername } from "6pp";


// this is to validate the user input /
export const usernameValidator=(username)=>{
    if(!isValidUsername(username))
        return {isValid:false,errorMessage:"username is invalid"};
}