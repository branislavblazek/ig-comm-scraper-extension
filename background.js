const type = {
    GET_BUTTON_FROM_DOM: 'getButtonFromDOM',
    CONSOLE_LOG: 'consoleLog'
}

const action = {
    [type.GET_BUTTON_FROM_DOM]: () => sendMessage(
        type.GET_BUTTON_FROM_DOM,
        null,
        payload => sendMessage(type.CONSOLE_LOG, payload)
    ),
    [type.CONSOLE_LOG]: payload => sendMessage(type.CONSOLE_LOG, payload)
}

const runAction = type => action[type]();

const sendMessage = (type, payload, callback = () => { }) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            { type, payload },
            callback,
        );
    });
};

const handleInit = tab => runAction(type.GET_BUTTON_FROM_DOM);

chrome.action.onClicked.addListener(handleInit);