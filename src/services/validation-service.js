export const userNameValidation = (username) => {
    if(username.indexOf('@') > -1){
        return false;
    }else{
        return true;
    }
}

export const fieldLengthValidation = (word) => {
   if(word.length < 3){
      return false;
   }else{
       return true;
   }
}