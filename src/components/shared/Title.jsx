import React from 'react'
import {Helmet} from "react-helmet-async"
const Title=({

// default values
title="Chat",
description="this is chat app called pasu"



})=> {
  return (
    // this is to track the  title application
<Helmet>
    <title>{title}</title>
    <meta name="description" content={description}/>
</Helmet>
  )
}

export default Title
