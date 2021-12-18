// background.js

let officialLinks = ["www.coingecko.com","uniswap.org","pancakeswap.finance","poocoin.app","metaverse.pro"];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ officialLinks });
  console.log(`Default officialLinks set to ${officialLinks}`);
});
