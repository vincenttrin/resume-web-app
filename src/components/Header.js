import { Link } from "react-router-dom";
import '../App.css';

export default function Header() {
  return (
    <div className="header">
      <Link to="/resume">Resume</Link>
      <Link to="/electrical-lines"> Electrical Lines Project</Link>
      <Link to="/grid-game"> Grid Game</Link>
      <Link to="/morse-decoder"> Morse Decoder</Link>
    </div>
  );
}
