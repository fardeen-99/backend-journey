import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Useauth } from '../../auth/hooks/auth.hook'
import { useEffect } from 'react'
import { Logout } from '../../auth/services/auth.api'

const navItems = [
  { to: '/', label: 'Feed', icon: '⌂' },
  { to: '/create', label: 'Post', icon: '+' },
  { to: '/save', label: 'Saved', icon: '◈' },
  { to: '/search', label: 'Search', icon: '⌕' },
  { to: '/reel', label: 'Reels', icon: '▷' },
  { to: '/profile', label: 'Profile', icon: '◉' },
]

const Aside = () => {
  const navigate=useNavigate()
  const { user, handlegetallpost, fetchUser } = Useauth()

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');

        .aside-root {
          font-family: 'Space Grotesk', sans-serif;
          background: #0C1014;
          position: relative;
          overflow: hidden;
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Subtle grid texture */
        .aside-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,179,237,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.03) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          z-index: 0;
        }

        /* Ambient glow top */
        .aside-root::after {
          content: '';
          position: absolute;
          top: -80px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(99,179,237,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .logo-wrap {
          position: relative;
          z-index: 1;
          padding: 28px 16px 20px;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .logo-wrap img {
          width: 140px;
          filter: drop-shadow(0 0 18px rgba(99,179,237,0.35));
          transition: filter 0.3s ease;
        }
        .logo-wrap img:hover {
          filter: drop-shadow(0 0 28px rgba(99,179,237,0.6));
        }

        /* Divider */
        .divider {
          position: relative;
          z-index: 1;
          width: 60%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,179,237,0.4), transparent);
          margin-bottom: 18px;
        }

        .nav-list {
          position: relative;
          z-index: 1;
          list-style: none;
          padding: 0;
          margin: 0;
          width: 100%;
          flex: 1;
        }

        .nav-item {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 28px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: all 0.25s ease;
          position: relative;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, #63b3ed, #4299e1);
          opacity: 0;
          transition: opacity 0.25s ease;
          border-radius: 0 2px 2px 0;
        }

        .nav-link:hover,
        .nav-link.active {
          color: #fff;
          background: rgba(99,179,237,0.07);
        }

        .nav-link:hover::before,
        .nav-link.active::before {
          opacity: 1;
        }

        .nav-link.active {
          color: #63b3ed;
          background: rgba(99,179,237,0.1);
        }

        .nav-icon {
          font-size: 18px;
          width: 24px;
          text-align: center;
          opacity: 0.7;
          font-style: normal;
        }

        .nav-link.active .nav-icon,
        .nav-link:hover .nav-icon {
          opacity: 1;
        }

        /* User footer */
        .user-footer {
          position: relative;
          z-index: 1;
          width: 100%;
          padding: 16px 20px 24px;
          border-top: 1px solid rgba(99,179,237,0.08);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .avatar-wrap img {
          height: 38px;
          width: 38px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid rgba(99,179,237,0.4);
          display: block;
        }

        .avatar-glow {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #63b3ed, #4299e1, #63b3ed);
          z-index: -1;
          opacity: 0.5;
          animation: spin 4s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .logout-btn {
          flex: 1;
          background: linear-gradient(135deg, rgba(66,153,225,0.15), rgba(99,179,237,0.08));
          border: 1px solid rgba(99,179,237,0.25);
          color: #63b3ed;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 9px 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }

        .logout-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(99,179,237,0.2), rgba(66,153,225,0.1));
          opacity: 0;
          transition: opacity 0.25s;
        }

        .logout-btn:hover::before {
          opacity: 1;
        }

        .logout-btn:hover {
          border-color: rgba(99,179,237,0.5);
          color: #fff;
          box-shadow: 0 0 18px rgba(99,179,237,0.15);
        }
      `}</style>

      <div className="aside-root overflow-y-hidden">
        <div className="logo-wrap">
          <img src="/devgram2.png" alt="" />
        </div>

        <div className="divider" />

        <ul className="nav-list">
          {navItems.map(({ to, label, icon }) => (
            <li className="nav-item" key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                <i className="nav-icon">{icon}</i>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="user-footer">
          <div className="avatar-wrap"
          onClick={()=>navigate("/profile")}
          >
            <div className="avatar-glow" />
            <img src={user?.profile_image} alt="" />
          </div>
          <button className="logout-btn"
          onClick={()=>{
            Logout()
            navigate("/login")

          }}
          >Logout</button>
        </div>
      </div>
    </>
  )
}

export default Aside