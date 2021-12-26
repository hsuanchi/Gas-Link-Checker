let officialLinks = ["www.coingecko.com","uniswap.org","pancakeswap.finance","www.dextools.io/app/","poocoin.app"];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ officialLinks });
});
