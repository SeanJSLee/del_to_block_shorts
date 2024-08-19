// Function to trigger the "Don't recommend this channel" action
function triggerDontRecommend() {
    // Find and click the "More" button
    let moreButton = document.evaluate(
      "/html/body/ytd-app/div[1]/ytd-page-manager/ytd-shorts/div[3]/div[2]/ytd-reel-video-renderer[1]/div[5]/ytd-reel-player-overlay-renderer/div[2]/div/div[4]/ytd-menu-renderer/yt-button-shape/button/yt-touch-feedback-shape/div/div[2]",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  
    if (moreButton) {
      moreButton.click();
  
      // Wait for the menu to appear and then click "Don't recommend this channel"
      setTimeout(function() {
        let dontRecommendButton = document.evaluate(
          "/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/ytd-menu-popup-renderer/tp-yt-paper-listbox/ytd-menu-service-item-renderer[3]/tp-yt-paper-item/yt-formatted-string",
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
  
        if (dontRecommendButton) {
          dontRecommendButton.click();
        } else {
          console.log("Don't recommend button not found.");
        }
      }, 500); // Wait for 500ms to ensure the menu is loaded
    } else {
      console.log("More button not found.");
    }
  }
  
  // Listen for the "Delete" key
  document.addEventListener("keydown", function(event) {
    if (event.key === "Delete") {
      triggerDontRecommend();
    }
  });
  
  // Create and insert the "Block" button overlay
  function createBlockButton() {
    let blockButton = document.createElement("button");
    blockButton.innerText = "Block";
    blockButton.style.position = "fixed";
    blockButton.style.bottom = "20px";
    blockButton.style.right = "20px";
    blockButton.style.padding = "10px 20px";
    blockButton.style.fontSize = "16px";
    blockButton.style.backgroundColor = "#FF0000";
    blockButton.style.color = "#FFFFFF";
    blockButton.style.border = "none";
    blockButton.style.borderRadius = "5px";
    blockButton.style.cursor = "pointer";
    blockButton.style.zIndex = "10000";
    blockButton.id = "blockButton"; // Assign an ID to the button for easier removal
  
    blockButton.addEventListener("click", function() {
      triggerDontRecommend();
    });
  
    document.body.appendChild(blockButton);
  }
  
  // Remove the "Block" button if it exists
  function removeBlockButton() {
    let existingButton = document.getElementById("blockButton");
    if (existingButton) {
      existingButton.remove();
    }
  }
  
  // Ensure the button is added after the page fully loads and based on the URL
  function ensureBlockButtonAdded() {
    if (window.location.href.includes("youtube.com/shorts/")) {
      // If on a YouTube Shorts page, add the button
      if (!document.getElementById("blockButton")) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
          createBlockButton();
        } else {
          window.addEventListener("load", createBlockButton);
        }
      }
    } else {
      // If not on a Shorts page, remove the button if it exists
      removeBlockButton();
    }
  }
  
  // Run the function to ensure the button is managed correctly based on the URL
  ensureBlockButtonAdded();
  
  // Monitor for URL changes (e.g., navigating within YouTube) and adjust the button as needed
  let previousUrl = window.location.href;
  setInterval(() => {
    const currentUrl = window.location.href;
    if (currentUrl !== previousUrl) {
      previousUrl = currentUrl;
      ensureBlockButtonAdded();
    }
  }, 1000);
  