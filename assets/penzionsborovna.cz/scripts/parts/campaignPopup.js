/* global document */

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

function getCookie(cname) {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i += 1) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

function checkCookie() {
    const campaignCookie = getCookie('zbraslaviceCampaignCookie');
    console.log(campaignCookie);
    if (!campaignCookie) {
        setCookie('zbraslaviceCampaignCookie', 'yes', 1);
    }
}

const setCampaignPopupCookie = () => {
    const campaignPopup = document.querySelector('.js_campaign-popup');

    if (!campaignPopup) {
        return;
    }

    const closeBtn = campaignPopup.querySelector('.js_popup-close');

    if (!closeBtn) {
        return;
    }

    closeBtn.addEventListener('click', event => {
        event.preventDefault();

        campaignPopup.style.display = 'none';
        checkCookie();
    });
};

const checkCampaignPopupCookie = () => {
    const campaignPopup = document.querySelector('.js_campaign-popup');

    if (!campaignPopup) {
        return;
    }

    const campaignCookie = getCookie('zbraslaviceCampaignCookie');

    if (!campaignCookie) {
        campaignPopup.style.display = 'flex';
    }
};

export default {
    setCampaignPopupCookie,
    checkCampaignPopupCookie,
};
