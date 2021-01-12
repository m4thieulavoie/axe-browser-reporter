// import bootstrap from "./dist/index.js";

function doStuff() {
  /* eslint-disable no-undef */
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    var activeTab = tabs[0];
    //   var activeTabId = activeTab.id; // or do whatever you need
    console.log({ activeTab });
  });
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const button = document.querySelector("button");
    button.onclick = () => doStuff();

    if (true) {
      // bootstrap();
    }
  },
  false
);

// chrome.tabs.executeScript({
//   // code:
//   //   'var div=document.createElement("div"); document.body.appendChild(div); div.innerText="test123";',
//   file: "script.js",
// });

// (function () {
//   // just place a div at top right
//   var div = document.createElement("div");
//   div.style.position = "fixed";
//   div.style.top = 0;
//   div.style.right = 0;
//   div.textContent = "Injected!";
//   document.body.appendChild(div);

//   alert("inserted self... giggity");
// })();

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("color", (data) => {
    // changeColor.style.backgroundColor = data.color;
    // changeColor.setAttribute("value", data.color);
  });
  //   chrome.storage.sync.set({ color: "#3aa757" }, () => {
  //     console.log("The color is green.");
  //   });
});
