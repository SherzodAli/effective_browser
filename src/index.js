const YOUTUBE_ORIGIN_LIST = ['https://www.youtube.com', 'https://m.youtube.com']

function handleRouteChange(tabId, changeInfo, tab) {
	const url = new URL(tab.url)

	if (!YOUTUBE_ORIGIN_LIST.includes(url.origin)) return

	let css = ''
	const isRendered = changeInfo?.status === 'complete'

	if (url.pathname === '/') {
		css = '#guide, #header, #contents, #home-page-skeleton { display: none !important; }'
	}
	if (url.pathname === '/watch') {
		css = '#guide, #header, #related { display: none !important; }'
		isRendered && setCSSDelayed({ tabId, css: '#contents { display: block !important; }' })
	}

	if (url.pathname === '/results') {
		css = '#guide, #header { display: none !important; }'
		isRendered && setCSSDelayed({ tabId, css: '#contents { display: block !important; }' })
	}

	if (url.pathname.startsWith('/@')) {
		css = '#guide { display: none !important; }'
		isRendered && setCSSDelayed({ tabId, css: '#contents, #header { display: block !important; }' })
	}

	setCSS({ tabId, css })
}

function setCSSDelayed({ tabId, css, delay = 1000 }) {
	setTimeout(() => setCSS({ tabId, css }), delay)
}

async function setCSS({ tabId, css }) {
	try {
		chrome.scripting.insertCSS({ target: { tabId }, css })
	} catch (e) {}
}

async function sendMessage({ tabId, data }) {
	try {
		const response = await chrome.tabs.sendMessage(tabId, data)
	} catch (e) {}
}

chrome.tabs.onUpdated.addListener(handleRouteChange)
