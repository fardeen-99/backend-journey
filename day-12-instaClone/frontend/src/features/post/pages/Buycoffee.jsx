import { useState, useEffect } from "react";
import { usePost } from "../hooks/post.hook";

const coffeeOptions = [
  { count: 1, emoji: "☕", label: "One Coffee", price: 3 },
  { count: 3, emoji: "☕☕☕", label: "Three Coffees", price: 9 },
  { count: 5, emoji: "🫖", label: "A Whole Pot", price: 15 },
];

const socials = [
  {
    name: "GitHub",
    handle: "Fardeen khan",
    href: "https://github.com/fardeen-99",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    color: "hover:text-white hover:bg-gray-900",
  },
  {
    name: "LinkedIn",
    handle: "Mohd Fardeen",
    href: "https://www.linkedin.com/in/mohd-fardeen-b31307358",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "hover:text-white hover:bg-blue-700",
  },
  {
    name: "Instagram",
    handle: "Fardeen_x_khan",
    href: "https://www.instagram.com/fardeen_x_khan/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
    color: "hover:text-white hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400",
  },
];

export default function BuyMeACoffee() {

const{HandleFeedBack}=usePost()

  const [selected, setSelected] = useState(1);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [steam, setSteam] = useState([0, 0, 0]);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const interval = setInterval(() => {
      setSteam([Math.random(), Math.random(), Math.random()]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

const submiter = async (e) => {
  e.preventDefault()

  await HandleFeedBack(name, message)

  setSubmitted(true)
  setName("")
  setMessage("")

  await new Promise(resolve => setTimeout(resolve, 4000))

  setSubmitted(false)

}


  const handleSupport = () => {
    if (!submitted) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  const selectedOption = coffeeOptions.find((o) => o.count === selected);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a0a00 0%, #2d1200 40%, #1a0a00 100%)",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Ambient grain overlay */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "150px",
        }}
      />

      {/* Warm glow blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, #f59e0b, transparent)",
            top: "-100px",
            right: "-100px",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-10"
          style={{
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, #d97706, transparent)",
            bottom: "-50px",
            left: "-50px",
          }}
        />
      </div>

      {/* Card */}
      <div
        className="relative w-full max-w-md transition-all duration-1000"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
        }}
      >
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, rgba(45,20,5,0.97), rgba(30,12,2,0.98))",
            border: "1px solid rgba(251,191,36,0.15)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(251,191,36,0.1)",
          }}
        >
          {/* Top banner */}
          <div
            className="px-8 pt-10 pb-6 text-center relative"
            style={{
              borderBottom: "1px solid rgba(251,191,36,0.08)",
            }}
          >
            {/* Coffee cup with steam */}
            <div className="relative inline-block mb-4">
              <div className="flex justify-center gap-3 absolute -top-6 left-1/2 -translate-x-1/2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-0.5 rounded-full"
                    style={{
                      height: "20px",
                      background: "linear-gradient(to top, rgba(251,191,36,0.6), transparent)",
                      animation: `steamRise ${1.5 + i * 0.3}s ease-in-out infinite`,
                      animationDelay: `${i * 0.4}s`,
                      transform: `scaleY(${0.6 + steam[i] * 0.4})`,
                      transition: "transform 2s ease-in-out",
                    }}
                  />
                ))}
              </div>
              <div
                className="text-6xl select-none"
                style={{ filter: "drop-shadow(0 4px 12px rgba(251,191,36,0.4))" }}
              >
                ☕
              </div>
            </div>

            <h1
              className="text-3xl font-bold mb-1"
              style={{
                color: "#fbbf24",
                letterSpacing: "-0.5px",
                textShadow: "0 2px 20px rgba(251,191,36,0.3)",
              }}
            >
              Buy Me a Coffee
            </h1>
            <p
              className="text-sm"
              style={{ color: "rgba(251,191,36,0.5)", letterSpacing: "2px", textTransform: "uppercase" }}
            >
              Support my work
            </p>

            {/* Avatar placeholder */}
            <div className="flex justify-center mt-5">
              
                <img src="/fardeen.jpg" className="h-20 w-20 object-cover rounded-full shrink-0 " alt="" />
              
            </div>

            <p className="mt-3 text-base" style={{ color: "rgba(255,235,200,0.85)" }}>
              Hey there! I'm a developer who loves building And learning new things. If my work has impress you, consider buying me a coffee! ☕
            </p>
          </div>

          {/* Coffee selector */}
          {/* <div className="px-8 py-6" style={{ borderBottom: "1px solid rgba(251,191,36,0.08)" }}>
            
            <div className="grid grid-cols-3 gap-3">
              {coffeeOptions.map((opt) => (
                <button
                  key={opt.count}
                  onClick={() => setSelected(opt.count)}
                  className="rounded-2xl py-3 px-2 text-center transition-all duration-300 cursor-pointer"
                  style={{
                    background: selected === opt.count
                      ? "linear-gradient(135deg, #f59e0b, #d97706)"
                      : "rgba(251,191,36,0.06)",
                    border: selected === opt.count
                      ? "1px solid #f59e0b"
                      : "1px solid rgba(251,191,36,0.1)",
                    transform: selected === opt.count ? "scale(1.04)" : "scale(1)",
                    boxShadow: selected === opt.count ? "0 8px 24px rgba(251,191,36,0.3)" : "none",
                  }}
                >
                  <div className="text-lg mb-0.5">{opt.count === 1 ? "☕" : opt.count === 3 ? "☕×3" : "🫖"}</div>
                  <div
                    className="text-xs font-bold"
                    style={{ color: selected === opt.count ? "#1a0a00" : "rgba(251,191,36,0.8)" }}
                  >
                    ${opt.price}
                  </div>
                </button>
              ))}
            </div>
          </div> */}

          {/* Form */}
          <div className="px-8 py-6" style={{ borderBottom: "1px solid rgba(251,191,36,0.08)" }}>
            <p className="text-xs mb-6" style={{ color: "rgba(251,191,36,0.4)", letterSpacing: "2px", textTransform: "uppercase" }}>
              What you Like The Most Comment
            </p>
            
            <input
              type="text"
              required
              placeholder="Your name "
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl px-4 py-3 mb-3 text-sm outline-none transition-all duration-300"
              style={{
                background: "rgba(251,191,36,0.05)",
                border: "1px solid rgba(251,191,36,0.12)",
                color: "rgba(255,235,200,0.9)",
                caretColor: "#f59e0b",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(251,191,36,0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(251,191,36,0.12)")}
            />
            <textarea
            required
              placeholder="Leave a kind message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none transition-all duration-300"
              style={{
                background: "rgba(251,191,36,0.05)",
                border: "1px solid rgba(251,191,36,0.12)",
                color: "rgba(255,235,200,0.9)",
                caretColor: "#f59e0b",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(251,191,36,0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(251,191,36,0.12)")}
            />
          </div>

          {/* CTA */}
          <div className="px-8 py-6" style={{ borderBottom: "1px solid rgba(251,191,36,0.08)" }}>
            <button

              onClick={(e)=>{
                submiter(e)
            }}
              className="w-full rounded-2xl py-4 text-base font-bold transition-all duration-300 relative overflow-hidden cursor-pointer"
              style={{
                background: submitted
                  ? "linear-gradient(135deg, #16a34a, #15803d)"
                  : "linear-gradient(135deg, #f59e0b, #d97706)",
                color: "#1a0a00",
                boxShadow: submitted 
                  ? "0 8px 30px rgba(22,163,74,0.4)"
                  : "0 8px 30px rgba(251,191,36,0.4)",
                transform: "scale(1)",
                letterSpacing: "0.5px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {submitted ? (
                <span >✓ Thank you so much! 🎉</span>
              ) : (
                <span >
                   Feedback And Support 💗
                </span>
              )}
            </button>
          </div>

          {/* Social links */}
          <div className="px-8 py-7">
            <p
              className="text-xs text-center mb-5"
              style={{ color: "rgba(251,191,36,0.35)", letterSpacing: "2px", textTransform: "uppercase" }}
            >
              Find me online
            </p>
            <div className="flex flex-col gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300 group ${s.color}`}
                  style={{
                    background: "rgba(251,191,36,0.04)",
                    border: "1px solid rgba(251,191,36,0.08)",
                    color: "rgba(255,235,200,0.7)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(251,191,36,0.2)";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(251,191,36,0.08)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(251,191,36,0.08)" }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold" style={{ color: "rgba(251,191,36,0.6)", letterSpacing: "1px", textTransform: "uppercase" }}>
                      {s.name}
                    </div>
                    <div className="text-[12px] " style={{ color: "rgba(255,235,200,0.8)" }}>
                      {s.handle}
                    </div>
                  </div>
                  <div className="ml-auto opacity-40 group-hover:opacity-80 transition-opacity">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-8 py-4 text-center text-xs"
            style={{
              color: "rgba(251,191,36,0.25)",
              borderTop: "1px solid rgba(251,191,36,0.06)",
            }}
          >
            Crafted with ❤️ & ☕ — DevGram
          </div>
        </div>
      </div>

      <style>{`
        @keyframes steamRise {
          0%, 100% { opacity: 0.3; transform: translateY(0) scaleX(1); }
          50% { opacity: 0.8; transform: translateY(-8px) scaleX(1.5); }
        }
        input::placeholder, textarea::placeholder {
          color: rgba(251,191,36,0.25);
        }
      `}</style>
    </div>
  );
}