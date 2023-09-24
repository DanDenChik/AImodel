const toggleButton = document.getElementById('toggleButton');
const passwordInput = document.getElementById('passwordInput');
const statusText = document.getElementById('statusText');
const PASSWORD = "123";  // Замените на ваш пароль

chrome.storage.local.get(['extensionEnabled'], function (result) {
    if (result.extensionEnabled) {
        statusText.textContent = "Extension is ON";
    } else {
        statusText.textContent = "Extension is OFF";
    }
});

toggleButton.addEventListener('click', function () {
    if (passwordInput.value === PASSWORD) {
        chrome.storage.local.get(['extensionEnabled'], function (result) {
            let newState = !result.extensionEnabled;
            chrome.storage.local.set({ extensionEnabled: newState }, function () {
                statusText.textContent = newState ? "Extension is ON" : "Extension is OFF";
            });
        });
    } else {
        alert("Incorrect password!");
    }
});
