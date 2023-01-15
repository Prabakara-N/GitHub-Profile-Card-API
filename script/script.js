"use strict";
// elements

const inputEl = document.getElementById("user-input");
const btnsearch = document.getElementById("btn");
const profileEl = document.getElementById("profile");
const gitNameEl = document.querySelector(".name");
const bioEl = document.querySelector(".bio");
const followersEl = document.getElementById("followers");
const followingEl = document.getElementById("following");
const repoEl = document.getElementById("repo");
const gistEl = document.getElementById("gist");
const locationEl = document.getElementById("location");
const hiddenEl = document.querySelector(".hidden");

// kishorebabu420

// functions
function getUser() {
  // api
  let userName = inputEl.value;
  fetch(`https://api.github.com/users/${userName}`)
    .then((resp) => {
      if (!resp.ok) {
        alert("User Not Found...SORRY!!!");
      }
      return resp.json();
    })
    .then((data) => {
      // profile pic
      profileEl.innerHTML = `<div class="user-img" id="profile">
      <img src="${data.avatar_url}" class='img' alt="profile-pic" />
    </div>`;

      // name
      if (data.name === null) {
        gitNameEl.innerHTML = `<h3 class="name">
      <i class="fa-brands fa-github name-icon"></i>
    </h3>`;
      } else {
        gitNameEl.innerHTML = `<h3 class="name">
      <i class="fa-brands fa-github name-icon"></i> ${data.name}
    </h3>`;
      }

      // bio
      if (data.bio === null) {
        bioEl.innerText = "-";
      } else {
        bioEl.innerText = `${data.bio}`;
      }

      // followers/following
      followersEl.innerHTML = `<span>Followers</span> ${data.followers}`;
      followingEl.innerHTML = `<span>Following</span> ${data.following}`;

      // repo & gist
      repoEl.innerHTML = `<span>Repositories</span> ${data.public_repos}`;
      gistEl.innerHTML = `<span>Public Gists</span> ${data.public_gists}`;

      // location
      if (data.location === null) {
        locationEl.innerHTML = `<i class="fa-solid fa-location-dot"></i>`;
      } else {
        locationEl.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.location}`;
      }
    });
}

btnsearch.addEventListener("click", () => {
  if (inputEl.value === "") {
    alert("Please Enter A Valid GitHub Name...");
    hiddenEl.style.visibility = "hidden";
  } else {
    hiddenEl.style.visibility = "visible";
    getUser();
  }
});

// event listneres
inputEl.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    hiddenEl.style.visibility = "visible";
    getUser();
  }
});

// loading anime
window.addEventListener("load", () => {
  const loading = document.querySelector(".loader");
  loading.style.display = "none";
});
