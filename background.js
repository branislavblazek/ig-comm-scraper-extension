async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

chrome.action.onClicked.addListener(() => {
    const tab = getCurrentTab();
    console.log('ahoj');
    chrome.runtime.sendMessage({ "message": 'testikos' });
});

