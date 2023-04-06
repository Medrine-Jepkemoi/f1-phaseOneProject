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
document.addEventListener("DOMContentLoaded", async (e) => {
  console.log("Welcome to my website");

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

//filter drivers based on nationality
async function filterSelection(nationality) {
  let data = await fetch("http://localhost:3000/Drivers");
  data = await data.json();
  const drivers = document.querySelector("#driverCards");
  drivers.innerHTML = "";
  if (nationality === "all") {
    data.forEach((driver) => renderDriverInfo(driver));
    return;
  }
  let filter = data.filter((driver) => {
    if (driver.nationality.toLowerCase() === nationality.toLowerCase()) {
      return driver;
    }
  });

  filter.forEach((driver) => renderDriverInfo(driver));
}

//reviewing drivers
let review = document.querySelector("#submitReview");

review.onclick = function (e) {
  e.preventdefault();
  let userInput = document.querySelector("#write form textarea").value;
  document.querySelector("#displayedReview").innerHTML += `
         <div id="task">    
           <span> ${userInput} </span> 
        </div>
        `;
};
