import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const location = useLocation();

  const trackScreenWidth = () => {
    const width = window.innerWidth;
    setScreenWidth(width);
    if (width > 600) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    if (screenWidth < 600) {
      setOpen(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove('idToken');
    history.push('/login');
  };

  useEffect(() => {
    trackScreenWidth();
    window.addEventListener('resize', trackScreenWidth);
    return () => window.removeEventListener('resize', trackScreenWidth);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-wrapper" style={{ textAlign: 'right' }}>
        <div className="list-wrapper" >
          {!Cookies.get('idToken') && (
            <>
              <img
                src="https://github.com/DwinaTech/public-images/blob/main/menu-bars.png?raw=true"
                alt="Menu bars"
                style={{ opacity: !open ? 1 : 0 }}
                onClick={() => {
                  setOpen(!open);
                }}
              />
              <img
                src="https://github.com/DwinaTech/public-images/blob/main/cross-menu-icon.png?raw=true"
                alt="Menu cross"
                style={{ opacity: open ? 1 : 0 }}
                onClick={() => {
                  setOpen(!open);
                }}
              />

              <ul style={{ left: open ? '0' : '-100vw' }} className="navi">
                <li>
                  <Link
                    to="/Login"
                    onClick={handleClose}
                    style={{
                      color: location.pathname === '/about' && '#4071f4',
                    }}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Signup"
                    onClick={handleClose}
                    style={{
                      color: location.pathname === '/skills' && '#4071f4',
                    }}
                  >
                    Signup
                  </Link>
                </li>
              </ul>
            </>
          )}
          {Cookies.get('idToken') && (
            <div>
              <ul style={{ left: open ? '0' : '-100vw'}} className="navi" >
                <li>
                  <span
                    onClick={handleLogout}
                    style={{
                      color: location.pathname === '/skills' && '#4071f4',
                    }}
                  >
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
