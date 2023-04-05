document.addEventListener("DOMContentLoaded", (e) => {
  console.log("Welcome to my website");

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
              <p><button>Like</button> ${driver.likes} likes</p>

            </div>
          </div>
          <div class="moreDriverDetails">
            <p>${driver.description}</p>
          </div>
        </div>
        `;
  }

  //fetchingg the data
  fetch("http://localhost:3000/Drivers")
    .then((res) => res.json())

    //populating drivers indo
    .then((data) =>
      data.forEach((driver) => {
        renderDriverInfo(driver);
      })
    );
});
