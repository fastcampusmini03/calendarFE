import { ReactNode } from 'react'

import Footer from '../Footer'
import AduAppbar from '../AduAppbar'

type LayoutProps = {
  children: ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  const shouldRenderAppbar = window.location.pathname

  return (
    <div>
      {shouldRenderAppbar === '/' ? null : <AduAppbar />}
      {children}
      <Footer />
    </div>
  )
}

export default Layout
