import Link from "next/link"
import { PROJECT_NAME } from "../../lib/constants"

const Navbar = () => {
  return (
    <div className="navbar bg-neutral shadow-xl">
        <div className="flex-1 navbar-start">
            <Link className="btn btn-ghost text-xl" href="/">{PROJECT_NAME}</Link>
        </div>
        <div className="flex-none navbar-start">
            <ul className="menu menu-horizontal px-1">
                <li><Link className="btn btn-ghost text-xl" href="/docs/intro">Explore Docs</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar