/**
 * @param {string} key
 * @param {string[]} searchKeys
 * @returns {boolean}
 */
function wasKeyPressed(key, searchKeys = []) {
	return searchKeys.includes(key.toLowerCase())
}

function clearDialogueWindow() {
	const url = window.location.href.split('#')
	window.history.pushState({}, '', url[0])
}

function handleKeyDown() {
	if (event.ctrlKey && wasKeyPressed(event.key, ['m', 'ь'])) {
		clearDialogueWindow()
	}
}

document.addEventListener('keydown', handleKeyDown)
