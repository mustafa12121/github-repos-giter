//https://api.github.com/users/sbbahh/repos;

let userName = document.querySelector("#name");
let button = document.querySelector("button");
let result = document.querySelector(".result");

button.onclick = () => {
  if (userName.value == "") {
    result.innerHTML = "the input feild can't be Empty";
  } else {
    getRepos(userName.value);
    userName.value = "";
  }
};
async function getRepos(userName) {
  try {
    result.innerHTML = "";
    // let respons = await fetch(`${userName.trim()}Repos.json`); for local json fills
    let respons = await fetch(
      `https://api.github.com/users/${userName.trim()}/repos`
    );
    let reposList = await respons.json();
    for (let i in reposList) {
      let div = document.createElement("div");
      let p = document.createElement("p");
      let innerDiv = document.createElement("div");

      document.createAttribute("data-name");
      p.appendChild(
        document.createTextNode(`${+i + 1}-name:${reposList[i].name},`)
      );
      innerDiv.prepend(p);
      let a = document.createElement("a");
      a.href = `${reposList[i].html_url}`;
      a.target = "_blank";
      a.innerHTML = "vist";
      innerDiv.appendChild(a);
      innerDiv.classList.add("repo-name");
      let info = document.createElement("div");
      info.appendChild(
        creatSpan(reposList[i].stargazers_count, "star", "gold")
      );
      info.appendChild(creatSpan(reposList[i].forks, "share", "blue"));
      info.appendChild(creatSpan(reposList[i].watchers_count, "eye"));
      info.classList.add("info");
      div.appendChild(innerDiv);
      div.appendChild(info);
      div.classList.add("repo");
      div.setAttribute("data-name", reposList[i].name);
      result.appendChild(div);
    }
  } catch {
    result.innerHTML = `<p>no user  Named <span class="error">${userName}</span> or chick your internet conection</p>`;
  }
}

/*############################the secand way################################### */
// let getRepo = (userName) => {
//   return new Promise((reso, rejec) => {
//     if (userName.value !== "") {
//       result.innerHTML = "";

//       let requst = new XMLHttpRequest();
//       requst.open("Get", `${userName.value.trim()}Repos.json`);
//       requst.send();
//       requst.onload = () => {
//         if (requst.status === 200 && requst.readyState === 4) {
//           reso(JSON.parse(requst.responseText));
//         } else rejec(userName.value);
//         userName.value = "";
//       };
//     } else {
//       result.innerHTML = "input faild can't be Empty";
//     }
//   })
//     .then((results) => {
//       for (let i in results) {
//         let div = document.createElement("div");
//         let p = document.createElement("p");
//         let innerDiv = document.createElement("div");

//         document.createAttribute("data-name");
//         p.appendChild(
//           document.createTextNode(`${+i + 1}-name:${results[i].name},`)
//         );
//         innerDiv.prepend(p);
//         let a = document.createElement("a");
//         a.href = `${results[i].html_url}`;
//         a.target = "_blank";
//         a.innerHTML = "vist";
//         innerDiv.appendChild(a);
//         innerDiv.classList.add("repo-name");
//         let info = document.createElement("div");
//         info.appendChild(
//           creatSpan(results[i].stargazers_count, "star", "gold")
//         );
//         info.classList.add("info");
//         info.appendChild(creatSpan(results[i].forks, "share", "blue"));
//         info.appendChild(creatSpan(results[i].watchers_count, "eye"));
//         div.appendChild(innerDiv);
//         div.appendChild(info);
//         div.classList.add("repo");
//         div.setAttribute("data-name", results[i].name);
//         result.appendChild(div);
//       }
//     })
//     .catch((name) => {
//       result.innerHTML = `<div>no user name caled <span class="error">${name}</span></div>`;
//     });
// };

// button.onclick = () => getRepo(userName);

/*golobal */
function creatSpan(value, icon, color = "black") {
  let ele = document.createElement("span");
  ele.innerHTML = `${value} <i class="fa-solid fa-${icon}" style="color:${color}"></i>`;
  return ele;
}
