import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { usePost } from "../hooks/post.hook";
import { Useauth } from "../../auth/hooks/auth.hook";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { storyHandle, story, followHandle, unfollowHandle } = usePost();
  const { fetchUser, user } = Useauth();
  const navigate = useNavigate();

  useEffect(() => {
    storyHandle();
    fetchUser();
  }, []);

  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);

  const filterstory = story.filter((item) =>
    item.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-[#0c0c0e] px-4 py-6">

      {/* ── Header ── */}
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold tracking-tight">
          Discover People
        </h1>
        <p className="text-zinc-500 text-sm mt-0.5">
          Search and connect with others
        </p>
      </div>

      {/* ── Search Bar ── */}
      <div className="relative mb-6">
        {/* Gradient glow ring when focused */}
        <div
          className={`absolute -inset-[1.5px] rounded-2xl transition-opacity duration-300 ${
            focused ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
            zIndex: 0,
          }}
        />
        <div className="relative z-10 flex items-center bg-[#18181b] rounded-2xl px-4 py-3 gap-3">
          <FaSearch
            className={`text-base flex-shrink-0 transition-colors duration-200 ${
              focused ? "text-indigo-400" : "text-zinc-500"
            }`}
          />
          <input
            type="text"
            placeholder="Search users…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="flex-1 bg-transparent text-white text-base placeholder-zinc-600 outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-zinc-500 hover:text-white text-xs transition-colors duration-150"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Result count pill ── */}
      {search && filterstory.length > 0 && (
        <p className="text-zinc-500 text-xs mb-3 px-1">
          {filterstory.length} result{filterstory.length !== 1 ? "s" : ""} for{" "}
          <span className="text-indigo-400 font-medium">"{search}"</span>
        </p>
      )}

      {/* ── Results List ── */}
      {filterstory.length > 0 ? (
        <div className="flex flex-col gap-2">
          {filterstory.map((item, index) => (
            <div
              key={item._id}
              className="group flex items-center justify-between gap-3 bg-[#18181b] hover:bg-[#1f1f24] border border-[#27272a] hover:border-[#3f3f46] rounded-2xl px-4 py-3 transition-all duration-200"
              style={{
                animation: `fadeSlideIn 0.3s ease both`,
                animationDelay: `${index * 40}ms`,
              }}
            >
              {/* ── Avatar + Name ── */}
              <div
                className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                onClick={() =>
                  user.id === item._id
                    ? navigate("/profile")
                    : navigate(`/personprofile/${item._id}`)
                }
              >
                {/* Avatar with gradient ring on hover */}
                <div className="relative flex-shrink-0">
                  <div
                    className="absolute -inset-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #ec4899)",
                    }}
                  />
                  <img
                    src={item.profile_image}
                    alt={item.username}
                    className="relative h-11 w-11 rounded-full object-cover border-2 border-[#27272a]"
                  />
                  {/* Online dot */}
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-[#18181b]" />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm leading-tight truncate group-hover:text-indigo-300 transition-colors duration-150">
                    {item.username}
                  </p>
                  <p className="text-zinc-600 text-xs mt-0.5">
                    @{item.username.toLowerCase().replace(/\s+/g, "_")}
                  </p>
                </div>
              </div>

              {/* ── Follow / Following Button ── */}
              {item._id !== user.id && (
                <button
                  onClick={() =>
                    item.isfollowing
                      ? unfollowHandle(item._id)
                      : followHandle(item._id)
                  }
                  className={`
                    flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-xl
                    transition-all duration-200 active:scale-95
                    ${
                      item.isfollowing
                        ? "bg-[#27272a] text-zinc-400 border border-[#3f3f46] hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30"
                        : "text-white border border-transparent"
                    }
                  `}
                  style={
                    !item.isfollowing
                      ? {
                          background:
                            "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                          boxShadow: "0 0 16px rgba(99,102,241,0.35)",
                        }
                      : {}
                  }
                >
                  {item.isfollowing ? "Following" : "Follow"}
                </button>
              )}

              {/* ── "You" badge ── */}
              {item._id === user.id && (
                <span className="flex-shrink-0 text-[10px] font-semibold px-3 py-1.5 rounded-xl bg-[#27272a] text-zinc-500 border border-[#3f3f46] tracking-wide uppercase">
                  You
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* ── Empty State ── */
        <div className="flex flex-col items-center justify-center h-[60dvh] gap-4">
          <div
            className="h-16 w-16 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #1e1e2e 0%, #27272a 100%)",
              border: "1px solid #3f3f46",
            }}
          >
            <FaSearch className="text-zinc-600 text-2xl" />
          </div>
          <div className="text-center">
            <p className="text-white font-semibold text-lg">
              {search ? "No results found" : "Find someone"}
            </p>
            <p className="text-zinc-600 text-sm mt-1">
              {search
                ? `No users match "${search}"`
                : "Type a username to search"}
            </p>
          </div>
        </div>
      )}

      {/* ── Keyframe animation ── */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Search;