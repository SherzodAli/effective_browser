chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
	const page = response?.page
	if (page === 'MAIN_PAGE') mainPage()
})

function mainPage() {
	const css = `#guide, #header, #contents, #home-page-skeleton { display: none !important; }`
	createStyleFile(css)
}

function createStyleFile(cssText) {
	const style = document.createElement('style')

	if (style.styleSheet) style.styleSheet.cssText = cssText
	else style.appendChild(document.createTextNode(cssText))

	document.getElementsByTagName('head')[0].appendChild(style)
}

function hide(selector) {
	const element = document.querySelector(selector)
	if (element?.style) element.style.display = 'block !important'
}

function show(selector) {
	const element = document.querySelector(selector)
	if (element?.style) element.style.display = 'block !important'
}
