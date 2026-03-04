/* ─────────────────────────────────────────
   Drop this <style> once anywhere in your
   app (e.g. index.css or App.jsx)
───────────────────────────────────────── */

/*
  @keyframes captionFadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
*/

// ── Caption Component ──────────────────────────────────────────────────────
// Usage:  <Caption item={item} expand={expand} toggle={toggle} />
// ──────────────────────────────────────────────────────────────────────────

const Caption = ({ item, expand, toggle }) => {
  const isExpanded = expand === item._id;
  const isLong = item.caption.length > 80;

  // Split caption into words and auto-link #hashtags and @mentions
  const renderCaption = (text) =>
    text.split(/(\s+)/).map((word, i) => {
      if (word.startsWith("#"))
        return (
          <span
            key={i}
            className="text-[#4f9eff] font-medium hover:text-blue-300 cursor-pointer transition-colors duration-150"
          >
            {word}
          </span>
        );
      if (word.startsWith("@"))
        return (
          <span
            key={i}
            className="text-[#4f9eff] font-medium hover:text-blue-300 cursor-pointer transition-colors duration-150"
          >
            {word}
          </span>
        );
      return word;
    });

  const displayText = isExpanded
    ? item.caption
    : isLong
    ? item.caption.slice(0, 80)
    : item.caption;

  return (
    <div
      className="px-1 pt-1 pb-2"
      style={{ animation: "captionFadeIn 0.25s ease both" }}
    >
      <p className="text-[14px] leading-[1.6] text-[#f5f5f5]">
        {/* Username — bold, white, inline */}
        <span
          className="font-bold text-white mr-[6px] cursor-pointer
                     hover:opacity-75 active:opacity-50
                     transition-opacity duration-150"
        >
          {item.user.username}
        </span>

        {/* Caption text with hashtag/mention colouring */}
        <span className="font-normal tracking-[0.01em]">
          {renderCaption(displayText)}
        </span>

        {/* Truncation toggle */}
        {isLong && (
          <>
            {!isExpanded && (
              <span className="text-[#a8a8a8]"> ... </span>
            )}
            <button
              onClick={() => toggle(item._id)}
              className="text-[#a8a8a8] text-[13px] font-normal
                         hover:text-white active:scale-95
                         transition-all duration-150 ml-0.5"
            >
              {isExpanded ? "less" : "more"}
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default Caption;


/* ─── Add this to your global CSS ────────────────────────────
@keyframes captionFadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
─────────────────────────────────────────────────────────── */