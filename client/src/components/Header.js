import { useSelector } from "react-redux";
import Payments from "./Payments";

function Header() {
  const user = useSelector((state) => {
    return state.auth.user;
  });

  let content;
  if (!user)
    content = (
      <li>
        <a href="/auth/google">Login with Google</a>
      </li>
    );
  else
    content = [
      <li key="1">
        <Payments />
      </li>,
      <li key="2" style={{ margin: "0 10px" }}>
        Credits:{user.credits || 0}
      </li>,
      <li key="3">
        <a href="/api/logout">Logout</a>
      </li>,
    ];

  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo" href={user ? "/surveys" : "/"}>
            Emaily
          </a>
          <ul id="nav-mobile" className="right">
            {content}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
