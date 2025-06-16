import { Link } from "react-router-dom"

export default function NavBar ()  
{
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Game">Play</Link>
          </li>
          <li>
            <Link to="/Results">Hall of fame</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
