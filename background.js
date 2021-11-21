const actions = {
    GET_BUTTON_FROM_DOM: {
        REQUEST: 'getButtonFromDOMRequest',
        RESPONSE: 'getButtonFromDOMResponse',
    }
}

const sendMessage = (tabId, type, payload) => {
    chrome.tabs.sendMessage(
        tabId,
        { type, payload },
        (e) => { console.log(e) }
    );
}

let state = [];

const updateState = newItems => state.push(newItems);

chrome.action.onClicked.addListener(tab => sendMessage(tab.id, actions.GET_BUTTON_FROM_DOM.REQUEST, null));