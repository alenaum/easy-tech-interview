import Alert from './alert'
import Footer from './footer'
import Navbar from './navbar'
import Meta from '../meta'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  const alerttext = "🚧 The website is under active construction 🚧";
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert text={alerttext} />
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
