const type = {
    CLICK_ON_MORE_BUTTON: 'clickOnMoreButton',
    CONSOLE_LOG: 'consoleLog'
}

const answer = {
    OK: 'ok',
    FAIL: 'fail'
};

const clickOnMoreButton = () => {
    return new Promise(async (resolve, reject) => {
        const getScript = label => document.querySelectorAll(`[aria-label="${label}"]`)[0]?.parentElement?.parentElement
        const button = await getScript("Načítať ďalšie komentáre") || await getScript('Load more comments');
        console.log(button);
        if (button) {
            button.click();
            resolve(answer.OK)
        } else reject(answer.FAIL);
    });
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.type) {
        case type.CONSOLE_LOG:
            console.log(request.payload);
            break;
        case type.CLICK_ON_MORE_BUTTON:
            clickOnMoreButton().then(sendResponse).catch(sendResponse);
            return true;
        default:
            console.log('Invalid event type!');
    }
});