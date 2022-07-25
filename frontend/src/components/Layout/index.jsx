import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { Header } from '../Header'
import { Sidebar } from '../Sidebar'

const Layout = ({children}) => {
  const {breakpoints} = useTheme()
  // const [isMobile, setIsMobile] = useState(() => {
  //   const breakPoint = breakpoints?.sm || breakpoints?.md;
  //   return breakPoint;
  // });

  const contentRef = useRef(null)
      
  // useEffect(() => {
  //     let viewport = breakpoints?.sm || breakpoints?.md
  //     setIsMobile(viewport);

  //     if(isMobile){
  //       console.log(isMobile)
  //       contentRef.current.style.marginLeft = '0px'
  //     }else{
  //       contentRef.current.style.marginLeft = 'var(--margin-sidebar)'
  //     }
  // }, [breakpoints])



  return (
    <div className="layout">
        <Sidebar/>
        <div className='content' ref={contentRef}>
            <Header />
            {children}
        </div>
    </div>
  )
}

export default Layout