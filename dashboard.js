// Language Toggle Example
document.getElementById("lang-toggle").addEventListener("click", () => {
  const title = document.getElementById("title");
  const welcome = document.getElementById("welcome-text");
  if (document.documentElement.lang === "en") {
    document.documentElement.lang = "pa";
    alert("ਭਾਸ਼ਾ ਪੰਜਾਬੀ ਵਿੱਚ ਬਦਲੀ ਗਈ");
  } else {
    document.documentElement.lang = "en";
    alert("Language switched to English");
  }
});
