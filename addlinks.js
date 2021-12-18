// add current link to storage
let addLink = document.getElementById("addLink");
let linkContainer = document.getElementById("official-links");

chrome.storage.sync.get("officialLinks", ({ officialLinks }) => {
  var linkHTML = "";
  officialLinks.forEach(link => {
    linkHTML += `<div class="links"><h3><a href="https://${link}" target="_blank">${link}</a></h3><button class="removeButton">Remove</button></div>`;
  })
  linkContainer.innerHTML = linkHTML;
  addRemoveListener(officialLinks);
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting === "link added"){
      chrome.storage.sync.get("officialLinks", ({ officialLinks }) => {
        var linkHTML = "";
        officialLinks.forEach(link => {
          linkHTML += `<div class="links"><h3><a href="https://${link}" target="_blank">${link}</a></h3><button class="removeButton">Remove</button></div>`;
        })
        linkContainer.innerHTML = linkHTML;
        addRemoveListener(officialLinks);
      });
    }
  }
);
function addRemoveListener(officialLinks){
  var removeBtn = document.getElementsByClassName("removeButton");
  Array.from(removeBtn).forEach((rBtn) => {
    rBtn.addEventListener("click", (e) => {
      var btn = e.target;
      var index = getElementIndex(btn.parentElement);
      popElementFromArray(officialLinks, index);
      chrome.storage.sync.set({ officialLinks })
      btn.parentElement.removeChild(btn.previousElementSibling);
      btn.parentElement.removeChild(btn);
    })
  });
}
function popElementFromArray(array, index){
  if (index !== -1) {
      array.splice(index, 1);
  }
}

function getElementIndex (element) {
  return Array.from(element.parentElement.children).indexOf(element);
}

addLink.addEventListener("click", async () => {

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const executed = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: addOfficialLinkToStorage,
  })
});

// The body of this function will be executed as a content script inside the
// current page
function addOfficialLinkToStorage() {
  let url = new URL(window.location.href).hostname;
  chrome.storage.sync.get("officialLinks", ({ officialLinks }) => {
    if (officialLinks.includes(url)) return;
    officialLinks.push(url);
    chrome.storage.sync.set({ officialLinks });
  });
  chrome.runtime.sendMessage({greeting:"link added"});
}
