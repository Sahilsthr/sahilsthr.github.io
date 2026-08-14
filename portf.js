// =========================================================
// ABOUT TABS
// =========================================================

const tabContents = document.getElementsByClassName("tab-content");

function opentab(tabname, clickedTab) {
  const tabLinks = document.getElementsByClassName("tab-links");

  for (const tabLink of tabLinks) {
    tabLink.classList.remove("active-link");
  }

  for (const tabContent of tabContents) {
    tabContent.classList.remove("active-tab");
  }

  clickedTab.classList.add("active-link");

  const selectedTab = document.getElementById(tabname);

  if (selectedTab) {
    selectedTab.classList.add("active-tab");
  }
}

// =========================================================
// MOBILE SIDE MENU
// =========================================================

const sideMenu = document.getElementById("sidemenu");

function openmenu() {
  if (sideMenu) {
    sideMenu.classList.add("active");
  }
}

function closemenu() {
  if (sideMenu) {
    sideMenu.classList.remove("active");
  }
}

// Close menu when clicking outside the menu

document.addEventListener("click", function (event) {
  if (!sideMenu) return;

  const menuButton = document.querySelector(".menu-btn");

  const clickedInsideMenu = sideMenu.contains(event.target);
  const clickedMenuButton = menuButton && menuButton.contains(event.target);

  if (
    sideMenu.classList.contains("active") &&
    !clickedInsideMenu &&
    !clickedMenuButton
  ) {
    closemenu();
  }
});

// =========================================================
// GOOGLE SHEETS CONTACT FORM
// =========================================================

const scriptURL =
  "https://script.google.com/macros/s/AKfycbxbAEsJQm5j9fuyYHLbOrmpijCWdbtJuWI4s6PBvnippw1789Zt_5GRWwF8LJYeB7vU/exec";

const form = document.forms["submit-to-google-sheet"];

const message = document.getElementById("msg");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    message.innerHTML = "Sending...";

    const formData = new FormData(form);

    fetch(scriptURL, {
      method: "POST",
      body: formData,
    })
      .then(function () {
        message.innerHTML = "Message sent successfully!";

        form.reset();

        setTimeout(function () {
          message.innerHTML = "";
        }, 4000);
      })
      .catch(function (error) {
        console.error("Error!", error);

        message.innerHTML = "Something went wrong. Please try again.";

        setTimeout(function () {
          message.innerHTML = "";
        }, 4000);
      });
  });
}
