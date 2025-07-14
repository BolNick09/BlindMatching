import { Link } from "react-router-dom"

export default function NavBar () 
{
  return (
    <>
      <nav>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/form">Ввести имя</Link>
          </li>
          <li>
            <Link to="/game">Play</Link>
          </li>
          <li>
            <Link to="/results">Hall of fame</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}