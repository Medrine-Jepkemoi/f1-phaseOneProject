document.addEventListener("DOMContentLoaded", (e) => {
  console.log("Welcome to my website");

  //rendering f1 drivers details on the drivers section
  function renderDriverInfo(driver) {
    const drivers = document.querySelector("#driverCards");
    drivers.innerHTML += `
      <div class="individualCard">
          <div class="image">
            <img src="${driver.url}" alt="Lewis Hamilton">
            <div id="driverDetails">
              <h3>${driver.givenName} ${driver.familyName}</h3>
              <p>${driver.team}</p>
              <p>${driver.permanentNumber}</p>
              <p>${driver.nationality}</p>
              <button id = "likeBtn">Like</button>
              <p class="updateLikes">Likes: ${driver.likes}</p>

            </div>
          </div>
          <div class="moreDriverDetails">
            <p>${driver.description}</p>
          </div>
        </div>
        `;

    //liking a driver
    const like = document.querySelector("#likeBtn");
    like.addEventListener("click", () => {
      driver.likes = driver.likes + 1;
      document.querySelector(".updateLikes").innerHTML = `Likes: ${driver.likes}`;

      fetch(`http://localhost:3000/Drivers/${driver.driverId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driver),
      })
        .then((res) => res.json())
        .then((driver) => alert(driver.likes));
    });
  }

  //fetching the data
  fetch("http://localhost:3000/Drivers")
    .then((res) => res.json())

    //populating drivers indo
    .then((data) =>
      data.forEach((driver) => {
        renderDriverInfo(driver);
      })
    );

  //   patching/updating likes
  //   function updateLikes(data) {
  //     fetch(`http://localhost:3000/Drivers/${data.driverId}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     })
  //       .then((res) => res.json())
  //       .then((driver) => console.log(driver));
  //   }
});
