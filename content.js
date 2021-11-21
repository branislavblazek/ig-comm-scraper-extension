const actions = {
    GET_BUTTON_FROM_DOM: {
        REQUEST: 'getButtonFromDOMRequest',
        RESPONSE: 'getButtonFromDOMResponse',
    }
}

const getButtonFromDOM = () => (new Promise((resolve) => {
    const getScript = label => document.querySelectorAll(`[aria-label="${label}"]`)[0]?.parentElement?.parentElement
    const button = getScript("Načítať ďalšie komentáre") || getScript('Load more comments');
    resolve(button);
}));


chrome.runtime.onMessage.addListener((rq, sender, sendResponse) => {
    console.log(rq, sender, sendResponse);
    switch (rq.type) {
        case actions.GET_BUTTON_FROM_DOM.REQUEST:
            const result = getButtonFromDOM();
            console.log(result);
            sendResponse('whatever');
            break;
        default:
            console.log('Invalid event type!');
    }
});