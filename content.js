const type = {
    CLICK_ON_MORE_BUTTON: 'clickOnMoreButton',
    SCRAPE_COMMENTS: 'scrapeComments',
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
        if (button) {
            button.click();
            resolve(answer.OK)
        } else reject(answer.FAIL);
    });
}

const scrapeFunction = scrapeFn => {
    return new Promise(async (resolve, reject) => {
        const data = [...document.querySelectorAll('.Mr508')].map(comments => {
            const comment = comments.querySelector('.C4VMK');
            const user = comment.querySelector('a').textContent;
            const text = comment.querySelector('span:nth-child(2)').textContent;
            return {
                author: user,
                comment: text,
            };
        })
        if (data) {
            resolve(data)
        } else reject(answer.FAIL)
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
        case type.SCRAPE_COMMENTS:
            scrapeFunction().then(sendResponse).catch(sendResponse);
            return true;
        default:
            console.log('Invalid event type!');
    }
});