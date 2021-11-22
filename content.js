const type = {
    GET_BUTTON_FROM_DOM: 'getButtonFromDOM',
    CONSOLE_LOG: 'consoleLog'
}

const getButtonFromDOM = () => {
    return new Promise(async (resolve, reject) => {
        const getScript = label => document.querySelectorAll(`[aria-label="${label}"]`)[0]?.parentElement?.parentElement
        const button = await getScript("Načítať ďalšie komentáre") || await getScript('Load more comments');
        button ? resolve({ 'button': button }) : reject(null)
    });
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.type) {
        case type.CONSOLE_LOG:
            console.log(request);
            break;
        case type.GET_BUTTON_FROM_DOM:
            getButtonFromDOM().then(sendResponse);
            return true;
        default:
            console.log('Invalid event type!');
    }
});