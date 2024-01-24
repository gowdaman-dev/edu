import React from 'react'
import Navigator from '../components/Navbar/Navigator'

function layout({children}) {
  return (
    <Navigator>
        {children}
    </Navigator>
  )
}

export default layout