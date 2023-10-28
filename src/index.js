const YOUTUBE_ORIGIN_LIST = ['https://www.youtube.com', 'https://m.youtube.com']

function handleRouteChange(tabId, changeInfo, tab) {
	const url = new URL(tab.url)

	if (!YOUTUBE_ORIGIN_LIST.includes(url.origin)) return

	const isRendered = changeInfo?.status === 'complete'

	let css = '#guide, #related, #icon, #guide-button { display: none !important; }'

	if (url.pathname === '/') {
		css += '#contents, #chips, #home-page-skeleton { display: none !important; }'
	} else if (
		url.pathname.includes('/videos') ||
		url.pathname.includes('/streams') ||
		url.pathname.includes('/shorts') ||
		url.pathname.includes('/playlists')
	) {
		isRendered && setCSSDelayed({ tabId, css: '#contents { display: flex !important; }' })
	} else {
		isRendered && setCSSDelayed({ tabId, css: `#contents { display: block !important; }` })
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
