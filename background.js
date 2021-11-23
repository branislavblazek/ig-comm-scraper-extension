const type = {
    CLICK_ON_MORE_BUTTON: 'clickOnMoreButton',
    CONSOLE_LOG: 'consoleLog'
}

const answer = {
    OK: 'ok',
    FAIL: 'fail'
};

let buttonClicks = 0;

const action = {
    [type.CLICK_ON_MORE_BUTTON]: () => sendMessage(
        type.CLICK_ON_MORE_BUTTON,
        null,
        payload => {
            if (payload === answer.OK) {
                buttonClicks += 1;
                consoleLog(`Button was clicked for ${buttonClicks} times.`);
                clickOnMoreButton();
            } else if (payload === answer.FAIL) { consoleLog(`Problem with Button at ${buttonClicks} click.`) }
            else { consoleLog(`Unregistred error with Button at ${buttonClicks} click.`) }

        },
    ),
    [type.CONSOLE_LOG]: payload => sendMessage(type.CONSOLE_LOG, payload)
}

const clickOnMoreButton = () => action[type.CLICK_ON_MORE_BUTTON]();
const consoleLog = payload => action[type.CONSOLE_LOG](payload);

const sendMessage = (type, payload, callback = () => { }) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            { type, payload },
            callback,
        );
        buttonClicks = 0;
    });
};

chrome.action.onClicked.addListener(() => clickOnMoreButton());