/* ============================================================
   Phishing Awareness Simulator — App Logic

   Client-side only.
   Progress is stored in localStorage.

   Features:
   - Scenario lookup
   - Judgment tracking
   - Link-click tracking
   - Credential-submission tracking
   - Gmail-style sender details
   - Clickable sender-details arrow
   - Real destination hover tooltip
   ============================================================ */

const STORAGE_KEY = "phishsim_progress_v2";


/* ============================================================
   Progress
   ============================================================ */

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}


function saveProgress(progress) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(progress)
    );
  } catch (e) {
    /* Simulation still works if localStorage is unavailable. */
  }
}


function resetProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
}


function getRecord(progress, id) {
  return (
    progress[id] || {
      judged: null,
      clickedLink: false,
      submittedCreds: false,
      readAt: null
    }
  );
}


function setRecord(progress, id, patch) {
  progress[id] = Object.assign(
    {},
    getRecord(progress, id),
    patch
  );

  saveProgress(progress);

  return progress[id];
}


/* ============================================================
   Scenario helpers
   ============================================================ */

function findScenario(id) {
  return EMAIL_SCENARIOS.find(
    (scenario) => scenario.id === id
  );
}


function allScenarios() {
  return EMAIL_SCENARIOS;
}


function getQueryParam(name) {
  const params =
    new URLSearchParams(window.location.search);

  return params.get(name);
}


/* ============================================================
   Link hover behavior
   ============================================================ */

function attachLinkTooltip(container, scenario) {

  const tooltip =
    document.getElementById("link-tooltip");

  const link =
    container.querySelector(
      ".email-link[data-link='true']"
    );

  if (!link) {
    return;
  }


  /* ----------------------------------------------------------
     Show the REAL destination while hovering.

     This is important for the training lesson:
     the text can look legitimate while the actual destination
     is something completely different.
     ---------------------------------------------------------- */

  link.addEventListener("mousemove", (event) => {

    if (!tooltip) {
      return;
    }

    tooltip.textContent =
      scenario.linkHref || "No destination";


    const tooltipWidth = 360;

    let left =
      event.clientX + 14;

    let top =
      event.clientY + 14;


    if (
      left + tooltipWidth >
      window.innerWidth
    ) {
      left =
        window.innerWidth -
        tooltipWidth -
        20;
    }


    if (left < 10) {
      left = 10;
    }


    if (top + 50 >
        window.innerHeight) {

      top =
        event.clientY -
        50;
    }


    tooltip.style.left =
      `${left}px`;

    tooltip.style.top =
      `${top}px`;

    tooltip.classList.add("visible");
  });


  link.addEventListener("mouseleave", () => {

    if (tooltip) {
      tooltip.classList.remove("visible");
    }

  });


  /* ----------------------------------------------------------
     Clicking the training link does NOT visit the real
     destination.

     It records the click and takes the student to the
     simulated login page.
     ---------------------------------------------------------- */

  link.addEventListener("click", (event) => {

    event.preventDefault();
    event.stopPropagation();


    if (tooltip) {
      tooltip.classList.remove("visible");
    }


    const progress =
      loadProgress();


    setRecord(
      progress,
      scenario.id,
      {
        clickedLink: true,
        readAt: new Date().toISOString()
      }
    );


    window.location.href =
      `login.html?id=${encodeURIComponent(
        scenario.id
      )}`;
  });
}


/* ============================================================
   Sender address tooltip
   ============================================================ */

function attachSenderTooltip(
  element,
  scenario
) {

  if (!element) {
    return;
  }


  element.title =
    scenario.senderEmail || "";
}


/* ============================================================
   Sender details HTML
   ============================================================ */

function buildSenderDetails(scenario) {

  const details =
    scenario.senderDetails || {};


  return `
    <div
      class="sender-details"
      id="sender-details"
      role="region"
      aria-label="Sender details"
    >

      <div class="sender-details-title">
        Sender details
      </div>


      <div class="sender-detail-row">

        <div class="sender-detail-label">
          from:
        </div>

        <div class="sender-detail-value">
          ${escapeHtml(
            scenario.senderEmail
          )}
        </div>

      </div>


      <div class="sender-detail-row">

        <div class="sender-detail-label">
          to:
        </div>

        <div class="sender-detail-value">
          ${escapeHtml(
            details.to ||
            "Not available"
          )}
        </div>

      </div>


      <div class="sender-detail-row">

        <div class="sender-detail-label">
          reply-to:
        </div>

        <div class="sender-detail-value">
          ${escapeHtml(
            details.replyTo ||
            scenario.senderEmail ||
            "Not available"
          )}
        </div>

      </div>


      <div class="sender-detail-row">

        <div class="sender-detail-label">
          mailed-by:
        </div>

        <div class="sender-detail-value">
          ${escapeHtml(
            details.mailedBy ||
            "Not available"
          )}
        </div>

      </div>


      <div class="sender-detail-row">

        <div class="sender-detail-label">
          signed-by:
        </div>

        <div class="sender-detail-value">
          ${escapeHtml(
            details.signedBy ||
            "Not available"
          )}
        </div>

      </div>


      ${
        details.warning
          ? `
            <div class="sender-warning">

              <b>Training note:</b>

              <br>

              ${escapeHtml(
                details.warning
              )}

            </div>
          `
          : ""
      }

    </div>
  `;
}


/* ============================================================
   Sender details popup
   ============================================================ */

function attachSenderDetails(
  container,
  scenario
) {

  if (!container) {
    return;
  }


  /*
   * IMPORTANT:
   *
   * The arrow MUST be a real button with the class
   * ".sender-chevron".
   *
   * We deliberately search inside the container instead of
   * relying on a particular HTML structure.
   */

  const button =
    container.querySelector(
      ".sender-chevron"
    );


  const popup =
    container.querySelector(
      ".sender-details"
    );


  if (!button || !popup) {
    return;
  }


  /* ----------------------------------------------------------
     Make sure the arrow behaves like a real button.
     ---------------------------------------------------------- */

  button.setAttribute(
    "type",
    "button"
  );

  button.setAttribute(
    "aria-expanded",
    "false"
  );

  button.setAttribute(
    "aria-controls",
    "sender-details"
  );


  /* ----------------------------------------------------------
     Click arrow
     ---------------------------------------------------------- */

  button.addEventListener(
    "click",
    (event) => {

      event.preventDefault();
      event.stopPropagation();


      const isOpen =
        popup.classList.contains(
          "visible"
        );


      /*
       * Close every other sender-details popup on the page.
       */

      document
        .querySelectorAll(
          ".sender-details.visible"
        )
        .forEach((otherPopup) => {

          if (otherPopup !== popup) {
            otherPopup.classList.remove(
              "visible"
            );
          }
        });


      document
        .querySelectorAll(
          ".sender-chevron[aria-expanded='true']"
        )
        .forEach((otherButton) => {

          if (otherButton !== button) {
            otherButton.setAttribute(
              "aria-expanded",
              "false"
            );
          }
        });


      /*
       * Toggle this popup.
       */

      if (isOpen) {

        popup.classList.remove(
          "visible"
        );

        button.setAttribute(
          "aria-expanded",
          "false"
        );

      } else {

        popup.classList.add(
          "visible"
        );

        button.setAttribute(
          "aria-expanded",
          "true"
        );
      }

    }
  );


  /* ----------------------------------------------------------
     Keyboard accessibility
     ---------------------------------------------------------- */

  button.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        button.click();
      }

    }
  );


  /* ----------------------------------------------------------
     Do NOT allow clicks inside the popup to close it.
     ---------------------------------------------------------- */

  popup.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();
    }
  );


  /*
   * Keep the popup available after clicking elsewhere.
   * This listener is intentionally NOT { once: true }.
   */

  document.addEventListener(
    "click",
    (event) => {

      if (
        !popup.classList.contains(
          "visible"
        )
      ) {
        return;
      }


      if (
        popup.contains(event.target) ||
        button.contains(event.target)
      ) {
        return;
      }


      popup.classList.remove(
        "visible"
      );

      button.setAttribute(
        "aria-expanded",
        "false"
      );

    }
  );
}


/* ============================================================
   Optional helper for creating the sender header
   ============================================================ */

function buildSenderHeader(scenario) {

  return `
    <div class="detail-sender-row">

      <div class="avatar">
        ${escapeHtml(
          scenario.avatarInitial || "?"
        )}
      </div>


      <div class="detail-sender-info">

        <div class="detail-sender-name">

          ${escapeHtml(
            scenario.sender
          )}

          <span class="detail-sender-email">

            &lt;${escapeHtml(
              scenario.senderEmail
            )}&gt;

          </span>


          <button
            type="button"
            class="sender-chevron"
            aria-expanded="false"
            aria-controls="sender-details"
            aria-label="Show sender details"
            title="Show sender details"
          >
            <span
              class="sender-chevron-icon"
              aria-hidden="true"
            >
              ▾
            </span>
          </button>

        </div>


        ${
          buildSenderDetails(
            scenario
          )
        }

      </div>


      <div class="detail-time">

        ${escapeHtml(
          scenario.time
        )}

      </div>

    </div>
  `;
}


/* ============================================================
   Close sender details when Escape is pressed
   ============================================================ */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key !== "Escape") {
      return;
    }


    document
      .querySelectorAll(
        ".sender-details.visible"
      )
      .forEach((popup) => {

        popup.classList.remove(
          "visible"
        );
      });


    document
      .querySelectorAll(
        ".sender-chevron[aria-expanded='true']"
      )
      .forEach((button) => {

        button.setAttribute(
          "aria-expanded",
          "false"
        );
      });

  }
);


/* ============================================================
   HTML escaping
   ============================================================ */

function escapeHtml(value) {

  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }


  return String(value)

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    )

    .replaceAll(
      '"',
      "&quot;"
    )

    .replaceAll(
      "'",
      "&#039;"
    );
}
