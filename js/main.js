
let Button = document.getElementsByClassName("pure-menu-item")
Button[1].addEventListener("click",function(){
document.querySelector("div.content").innerHTML = ""
fetchFriends().then(populateList)
})

let contentDiv = document.querySelector(".content").addEventListener("click",function(evt){
document.querySelector("div.content").innerHTML = ""
  let id = evt.target.dataset.id;
  fetchInfo(id).then(res=>viewInfo(res))
})




const fetchFriends = async function () {
  const response = await fetch("../friends/friends.json").then((res) => {
    return res;
  });

  return await response.json();
};

const fetchInfo =  async function (id) {
 
  let response = await fetch(`../friends/${id}.json`).then((res) =>{
    return res
  })
  return await response.json();
}

const populateList = function (data) {

    let tbody = document.querySelector(".content");

  // Using DOM API to create document fragments for list of friends
  let divMenu = document.createElement("div");
  divMenu.classList.add("pure-menu");
  divMenu.classList.add("custom-restricted-width");



  let title = document.createTextNode("Friends");
  let span = document.createElement("span");
  span.classList.add("pure-menu-heading");
  span.append(title);

  let ullist = document.createElement("ul");
  ullist.classList.add("pure-menu-list");

  divMenu.appendChild(span);
  divMenu.appendChild(ullist);

  let bodyHtml = "";

  for (let friend of data) {
    let templateString = `<li class="pure-menu-item"><a href="#" class="pure-menu-link" data-id="${friend.id}">${friend.firstName}</a></li>`;
    bodyHtml += templateString;
  }
  ullist.innerHTML = bodyHtml;
  tbody.append(divMenu);
};

const viewInfo = function(data){

  let tbody = document.querySelector(".content");

  let divFriend = document.createElement("div");
  divFriend.classList.add("friend");

  let templateString = `<div class="identity">
  <img src="img/${data.avatar}" class="photo" />
  <h2 class="name">${data.firstName + " " +data.lastName}</h2>
  <ul>
      <li><span class="label">email:</span> ${data.email}</li>
      <li><span class="label">hometown:</span>${data.hometown}</li>
  </ul>
</div>
<p class="bio">
  ${data.bio}
</p>`;

  divFriend.innerHTML = templateString

  tbody.append(divFriend)


}