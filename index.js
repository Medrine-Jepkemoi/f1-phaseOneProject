document.addEventListener("DOMContentLoaded", (e) => {
  console.log("Welcome to my website");

  // const slideshow = document.querySelector()
  //   var i = 0;
  //   var images = [];
  //   var time = 1000;

  //   images[0] = "./images/lewis.jpg";
  //   images[1] = "./images/homeImage.jpg";

  //   function changeImage() {
  //     document.slide.src = images[i];
  //     if (i < images.length - 1) {
  //       i++;
  //     } else {
  //       i = 0;
  //     }

  //     setTimeout("changeImage()", time);
  //   }

  //   window.onload = changeImage;

  //rendering f1 drivers details on the drivers section
  function renderDriverInfo(driver) {
    const drivers = document.querySelector("#driverCards");
    drivers.innerHTML += `
      <div class="individualCard">
          <div class="image" data-item="${driver.nationality}">
            <img src="${driver.url}" alt="Lewis Hamilton">
            <div id="driverDetails">
              <h3>${driver.givenName} ${driver.familyName}</h3>
              <p>${driver.team}</p>
              <p>${driver.permanentNumber}</p>
              <p>${driver.nationality}</p>
              <button id =${driver.id}>Like</button>
              <p class="updateLikes">Likes: ${driver.likes}</p>

            </div>
          </div>
          <div class="moreDriverDetails">
            <p>${driver.description}</p>
          </div>
        </div>
        `;

    //liking a driver
    const like = document.querySelector(`#${driver.id}`);

    like.addEventListener("click", () => {
      console.log("I was clicked");
      driver.likes = driver.likes + 1;
      console.log(driver.likes);
      document.querySelector(".updateLikes").innerHTML = `Likes: ${driver.likes}`;

      console.log(driver);

      fetch(`http://localhost:3000/Drivers/${driver.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driver),
      })
        .then((res) => res.json())
        .then((driver) => alert(driver));
    });
    console.log(like);
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
