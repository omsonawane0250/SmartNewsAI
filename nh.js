
function likeNews(btn){

//   btn.innerText = "❤️ ";//Liked
 btn.style.color = "red";


}


function saveNews(btn){
alert("Saved");
// btn.innerText = "💾";
 btn.style.color = "#0ba1cb";

}


function shareNews(){

alert("Share this news link!");
 btn.style.color = "#313ef5";
}


function addComment(button){

let input = button.previousElementSibling;

 let text = input.value;  //user type in cmt


if(text=="") return;


let comment = document.createElement("p"); //for cmt

comment.innerText = text;


button.parentElement
.querySelector(".comments")
.appendChild(comment);


input.value = "";

}


function handleComment(event, input){

if(event.key === 'Enter'){

let text = input.value;

if(text=="") return;

let comment = document.createElement("p");

comment.innerText = text;

input.parentElement.querySelector(".comments").appendChild(comment);

input.value = "";

}

}


const search = document.getElementById("search");


search.addEventListener("keyup",function(){


let value = this.value.toLowerCase();


let cards = document.querySelectorAll(".card");


cards.forEach(card=>{

let title = card.dataset.title.toLowerCase();

if(title.includes(value)){

card.style.display="block";

}

else{

card.style.display="none";

}

});

});






// date time 

function updateDateTime() {
    const now = new Date();


    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const date = now.toLocaleDateString('en-US', options);
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit', second:'2-digit' });

    document.getElementById('dateTime').textContent = `${date} | ${time}`;
}

// Initial call and update every second
updateDateTime();
setInterval(updateDateTime, 1000);




//ai summary

function getSummary(button) {

let card = button.parentElement;
let text = card.querySelector(".news").innerText;
let summaryBox = card.querySelector(".summary");

        // select cmt box
        let commentBox = card.querySelector(".comment-box");

        //  TOGGLE (agar summary already hai)
        if(summaryBox.innerText !== ""){
          summaryBox.innerText = "";
          commentBox.style.display = "block"; // show comment again
          return;
        }

        // cmt hide
        commentBox.style.display = "none";

        //Summary
        summaryBox.innerHTML = "<b>⏳ Loading...</b>";

        setTimeout(() => {

          
          let sentences = text.split(".");

          // pick imp line
          let summary = sentences.slice(0, 1).join(".") + ".";

          
          summary = summary.trim();

          summaryBox.innerText = summary;

        }, 800);
      }




 //navbar
      function filterNews(category) {
        let cards = document.querySelectorAll(".card");

        cards.forEach(card => {
          let cardCategory = card.getAttribute("data-category");

          if (category === "all" || cardCategory === category) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      }

// searching
document.getElementById("search").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    let searchText = this.value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
      let title = card.querySelector("h3").innerText.toLowerCase();
      let content = card.querySelector(".news").innerText.toLowerCase();

      if (title.includes(searchText) || content.includes(searchText)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
});
//returning to search
document.getElementById("search").addEventListener("keyup", function() {
  if (this.value === "") {
    let cards = document.querySelectorAll(".card");
    cards.forEach(card => card.style.display = "block");
  }
});


//      PAID VERSION


async function getSummary(button) {
  let card = button.parentElement;
  let text = card.querySelector(".news").innerText;
  let summaryBox = card.querySelector(".summary");
  summaryBox.innerText = "⏳ Loading AI summary...";
  try {
    let res = await fetch("http://localhost:3000/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: text })
    });
    let data = await res.json();
    summaryBox.innerText = data.summary;
  } catch (err) {
    summaryBox.innerText = "❌ Error fetching summary";
  }
}
