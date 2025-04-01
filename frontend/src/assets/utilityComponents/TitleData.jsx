import React from 'react'
import Helmet from "react-helmet"
const TitleData = ({data}) => {
  return (
    <Helmet>
      <title>{data}</title>
    </Helmet>
  )
}

export default TitleData
