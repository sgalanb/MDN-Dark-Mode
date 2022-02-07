function addCSS() {
    const documentHead = document.head
    const linkCSS = document.createElement('link')
    linkCSS.id = 'darkStyles.css'
    linkCSS.rel  = 'stylesheet'
    linkCSS.type = 'text/css'
    linkCSS.href = chrome.runtime.getURL('/darkStyles.css')
    documentHead.appendChild(linkCSS)
}

function addElements() {
    let darkMode = localStorage.getItem('darkMode')
    let selectedTheme = localStorage.getItem('selectedTheme')
    const div = document.createElement('div')
    div.id = 'div'
    const image = document.createElement('img')
    image.id = 'toggle'
    const form = document.createElement('form')
    form.id = 'form'
    const select = document.createElement('select')
    select.id = 'select'
    const option1 = document.createElement('option')
    option1.value = 'dark-mode-TokyoNight'
    option1.textContent = 'Tokyo Night'
    const option2 = document.createElement('option')
    option2.value = 'dark-mode-OneDarkPro'
    option2.textContent = 'OneDarkPro'
    const documentBody = document.body
    documentBody.appendChild(div)
    div.appendChild(image)
    div.appendChild(form)
    form.appendChild(select)
    select.appendChild(option1)
    select.appendChild(option2)

    if (darkMode == 'enabled') {
        const themeSelector = document.getElementById('select')
        themeSelector.disabled = true;
        image.src = chrome.runtime.getURL('/images/lightbulb-regular.svg') 
        document.body.classList.add(selectedTheme) 
        document.getElementById('select').classList.add('dark-mode-class')
    } else {
        image.src = chrome.runtime.getURL('/images/lightbulb-solid.svg')
        document.getElementById('select').classList.add('light-mode-class')
        document.getElementById('darkStyles.css').disabled = true;
    }
}

addCSS()
addElements()

const darkModeToggle = document.getElementById('toggle')
const themeSelector = document.getElementById('select')

function enableDarkMode(theme) {
    document.body.classList.add(theme)
    localStorage.setItem('darkMode', 'enabled')
    localStorage.setItem('selectedTheme', theme)
    darkModeToggle.classList.remove('light-mode-class')
    themeSelector.classList.remove('light-mode-class')
    darkModeToggle.classList.add('dark-mode-class')
    themeSelector.classList.add('dark-mode-class')
    // Enable, disable and enable again the css file.
    // This is because the first time the file is enable
    // it doesn't load (I think it's a Chrome bug).
    document.getElementById('darkStyles.css').disabled = false;
    document.getElementById('darkStyles.css').disabled = true;
    document.getElementById('darkStyles.css').disabled = false;
    console.log('enable Dark Mode')
}

function disableDarkMode(theme) {
    document.body.classList.remove(theme)
    localStorage.setItem('darkMode', 'disabled')
    darkModeToggle.classList.remove('dark-mode-class')
    themeSelector.classList.remove('dark-mode-class')
    darkModeToggle.classList.add('light-mode-class')
    themeSelector.classList.add('light-mode-class')
    document.getElementById('darkStyles.css').disabled = true; 
    console.log('disable Dark Mode')
}

darkModeToggle.addEventListener('click', () => {
    let darkMode = localStorage.getItem('darkMode')
    let theme = document.getElementById('select').value
    if (darkMode == 'enabled') {
        disableDarkMode(theme)
        themeSelector.disabled = false;
        darkModeToggle.src = chrome.runtime.getURL('/images/lightbulb-solid.svg')
    } else {
        enableDarkMode(theme)
        themeSelector.disabled = true;
        darkModeToggle.src = chrome.runtime.getURL('/images/lightbulb-regular.svg') 
    }
})