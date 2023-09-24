const toggleButton = document.getElementById('toggleButton');
const passwordInput = document.getElementById('passwordInput');
const statusText = document.getElementById('statusText');
const PASSWORD = "123"; // Пароль для отключения расширения

chrome.storage.local.get(['extensionEnabled'], function (result) {
    // Текст для отображения статуса расширения
    if (result.extensionEnabled) {
        statusText.textContent = "Расширение включено";
    } else {
        statusText.textContent = "Расширение выключено";
    }
});

toggleButton.addEventListener('click', function () {
    // При вводе пароля расширение либо отключается, либо включается
    if (passwordInput.value === PASSWORD) {
        chrome.storage.local.get(['extensionEnabled'], function (result) {
            let newState = !result.extensionEnabled;
            chrome.storage.local.set({ extensionEnabled: newState }, function () {
                statusText.textContent = newState ? "Расширение включено" : "Расширение выключено";
            });
        });
    } else {
        alert("Неверный пароль!");
    }
});
