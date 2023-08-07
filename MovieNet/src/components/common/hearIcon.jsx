import React from 'react'
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";

const HeartIcon = ({onPress ,isLiked}) => {
  if(isLiked)  
    return <div onClick={onPress}><BsHeartFill /></div>
  else
    return <div onClick={onPress}><BsHeart /></div>
}

export default HeartIcon