// ==UserScript==
// @name         GeoGuessr Tiny Leave Game Button
// @description  Make the "Leave Game" button tiny to prevent accidental clicks.
// @version      1.0.0
// @author       Posio
// @license      MIT
// @match        https://www.geoguessr.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

const observer = new MutationObserver((mutationsList, observer) => {
  const containsChildList = mutationsList.some(
    (mutation) => mutation.type === "childList"
  )
  if (!containsChildList) {
    console.log("No childList mutation")
    return
  }

  const overlay = document.querySelector(
    'div[class^="game-menu_inGameMenuOverlay__"]'
  )
  if (!overlay) {
    // console.log("Container not found")
    return
  }

  // console.log("Container found")

  const buttonsContainer = overlay.querySelector(
    'div[class^="buttons_buttons__"]'
  )
  if (!buttonsContainer) {
    // console.log("Buttons container not found")
    return
  }

  // console.log("Buttons found")

  // find 2nd button element in buttons
  const buttons = buttonsContainer.querySelectorAll("button")[1]
  if (!buttons || buttons.length < 2) {
    console.log("Leave button not found")
    return
  }

  // console.log("Leave Game button found")

  // change left and right padding to 4
  const leaveButton = buttons[1]
  leaveButton.style.paddingLeft = "4px"
  leaveButton.style.paddingRight = "4px"

  // hide button
  // leaveButton.style.display = "none"

  // change text inside button
  const span = leaveButton.querySelector("span")
  if (!span) {
    // console.log("span not found")
    return
  }
  span.textContent = "-"
})

const target = document.querySelector("#__next")
if (target) {
  observer.observe(target, { subtree: true, childList: true })
} else {
  console.log("Target not found")
}
