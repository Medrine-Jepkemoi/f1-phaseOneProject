document.addEventListener("DOMContentLoaded", async (e) => {
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
              <button id ="likes" class=${driver.id}>Like</button>
              <p class="updateLikes">Likes: ${driver.likes}</p>

            </div>
          </div>
          <div class="moreDriverDetails">
            <p>${driver.description}</p>
          </div>
        </div>
        `;
  }

  function filterNationality(nationality) {}

  //fetching the data
  let data = await fetch("http://localhost:3000/Drivers");
  data = await data.json();
  data.forEach((driver) => renderDriverInfo(driver));

  let likeBtn = document.querySelectorAll("#likes");

  likeBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let driverId = e.target.className;
      let likes = e.target.nextElementSibling;
      let likesNum = parseInt(likes.innerText.split(" ")[1]);
      likesNum++;
      likes.innerText = `Likes: ${likesNum}`;
      fetch(`http://localhost:3000/Drivers/${driverId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likes: likesNum }),
      })
        .then((res) => res.json())
        .then((driver) => console.log(driver));
    });
  });
});
