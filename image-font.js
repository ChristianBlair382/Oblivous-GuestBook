(function () {
  var letterFileMap = {
    a: "A_letter.png",
    b: "B_letter.png",
    c: "C_Letter.png",
    d: "D_Letter.png",
    e: "E_Letter.png",
    f: "F_Letter.png",
    g: "G_letter.png",
    h: "H_Letter.png",
    i: "I_Letter.png",
    j: "J_Letter.png",
    k: "K_letter.png",
    l: "L_letter.png",
    m: "M_letter.png",
    n: "N_letter.png",
    o: "O_letter.png",
    p: "P_letter.png",
    q: "Q_letter.png",
    r: "R_letter.png",
    s: "S_letter.png",
    t: "T_letter.png",
    u: "U_letter.png",
    v: "V_letter.png",
    w: "W_letter.png",
    x: "X_letter.png",
    y: "Y_letter.png",
    z: "Z_letter.png"
  };

  var punctuationFileMap = {
    ".": "Period_Mark.png",
    ",": "Period_Mark.png",
    ":": "Colon_Mark.png",
    ";": "Semi_Colon_Mark.png",
    "?": "Question_Mark.png",
    "!": "Exclamation_Mark.png"
  };

  function getDefaultLetterBasePath() {
    var path = window.location.pathname.toLowerCase();
    return path.indexOf("/pages/") !== -1
      ? "../Letters/"
      : "Letters/";
  }

  function getDefaultPunctuationBasePath() {
    var path = window.location.pathname.toLowerCase();
    return path.indexOf("/pages/") !== -1
      ? "../Images/Site Assets/Punctuation Marks/"
      : "Images/Site Assets/Punctuation Marks/";
  }

  function createLetterNode(character, letterBasePath, punctuationBasePath, state, options) {
    var lowerCharacter = character.toLowerCase();
    var fileName = letterFileMap[lowerCharacter];
    var sourcePath = letterBasePath;

    if (character === " ") {
      var spacer = document.createElement("span");
      spacer.className = "image-font-space";
      spacer.style.display = "block";
      spacer.style.flex = "0 0 auto";
      if (options.spaceWidth !== null) {
        spacer.style.width = options.spaceWidth + "px";
      }
      spacer.setAttribute("aria-hidden", "true");
      return spacer;
    }

    if (!fileName) {
      if (character === '"' || character === "'") {
        fileName = state.useOpeningQuote ? "Start_Quote_Mark.png" : "End_Quote_Mark.png";
        sourcePath = punctuationBasePath;
        state.useOpeningQuote = !state.useOpeningQuote;
      } else {
        fileName = punctuationFileMap[character];
        sourcePath = punctuationBasePath;
      }
    }

    if (!fileName) {
      var fallback = document.createElement("span");
      fallback.className = "image-font-fallback";
      fallback.textContent = character;
      fallback.setAttribute("aria-hidden", "true");
      return fallback;
    }

    var image = document.createElement("img");
    image.className = "image-font-letter";
    image.src = sourcePath + fileName;
    image.alt = "";
    image.setAttribute("aria-hidden", "true");
    return image;
  }

  function applyImageFont(element) {
    var originalText = element.textContent || "";
    var trimmedText = originalText.trim();

    if (!trimmedText) {
      return;
    }

    var letterBasePath = element.getAttribute("data-image-font-path") || getDefaultLetterBasePath();
    var punctuationBasePath = element.getAttribute("data-image-font-punctuation-path") || getDefaultPunctuationBasePath();
    var kerning = Number(element.getAttribute("data-image-font-kern"));
    var spaceWidth = Number(element.getAttribute("data-image-font-space-width"));
    var state = {
      useOpeningQuote: true
    };
    var options = {
      kerning: Number.isFinite(kerning) ? kerning : 0,
      spaceWidth: Number.isFinite(spaceWidth) ? spaceWidth : null
    };

    element.classList.add("image-font");
    element.setAttribute("aria-label", trimmedText);
    element.textContent = "";

    for (var i = 0; i < trimmedText.length; i += 1) {
      var node = createLetterNode(trimmedText[i], letterBasePath, punctuationBasePath, state, options);

      if (
        options.kerning !== 0 &&
        i > 0 &&
        trimmedText[i] !== " " &&
        trimmedText[i - 1] !== " " &&
        node.className === "image-font-letter"
      ) {
        node.style.marginLeft = options.kerning + "px";
      }

      element.appendChild(node);
    }
  }

  function initializeImageFont() {
    var elements = document.querySelectorAll("[data-image-font]");

    for (var i = 0; i < elements.length; i += 1) {
      applyImageFont(elements[i]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeImageFont);
  } else {
    initializeImageFont();
  }
})();
