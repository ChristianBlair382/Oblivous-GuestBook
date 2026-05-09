(function () {
  var footerConfig = {
    label: "Last updated:",
    fallbackText: "Unknown"
  };

  function getFormattedLastUpdated() {
    var modifiedDate = new Date(document.lastModified);

    if (isNaN(modifiedDate)) {
      return document.lastModified || footerConfig.fallbackText;
    }

    return modifiedDate.toLocaleString();
  }

  function createFooter() {
    var footer = document.createElement("footer");
    var timestamp = document.createElement("p");
    var licenseContainer = document.createElement("p");

    footer.className = "site-footer";

    timestamp.id = "site-last-updated";
    timestamp.className = "site-footer-timestamp";
    timestamp.textContent = footerConfig.label + " " + getFormattedLastUpdated();

    licenseContainer.className = "site-footer-license";
    licenseContainer.innerHTML = 'This work is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;">';

    footer.appendChild(timestamp);
    footer.appendChild(licenseContainer);
    return footer;
  }

  function initializeFooter() {
    if (document.querySelector(".site-footer")) {
      return;
    }

    var footer = createFooter();
    document.body.appendChild(footer);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeFooter);
  } else {
    initializeFooter();
  }
})();
