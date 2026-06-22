import "./ThemeToggle.css";

export default function ThemeToggle({ darkMode, onToggle }) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={darkMode ? "Light Mode" : "Dark Mode"}
    >
      <div className={`theme-toggle-track ${darkMode ? "dark" : ""}`}>
        <div className="theme-toggle-thumb">
          {darkMode ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Zm11.394-5.834a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59Zm-1.06 13.668a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18Zm-7.834-6.566a.75.75 0 0 0 0 1.5H6.75a.75.75 0 0 0 0-1.5H4.166Zm13.084 0a.75.75 0 0 0 0 1.5H21a.75.75 0 0 0 0-1.5h-2.25ZM5.106 5.106a.75.75 0 0 0-1.06 1.06l1.59 1.591a.75.75 0 1 0 1.061-1.06L5.106 5.106Zm1.59 13.668a.75.75 0 0 0-1.06-1.06l-1.59 1.59a.75.75 0 1 0 1.06 1.061l1.59-1.59Z" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}
