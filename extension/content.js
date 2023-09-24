// Функция поиска плохих слов в предложениях на странице
function detectViolentSentences(text) {
    const violentWords = ["жирный", "урод", "дебил", "придурок"]; // Список плохих слов
    const sentences = text.split('.');
    return sentences.filter(sentence =>
        violentWords.some(word => sentence.toLowerCase().includes(word.toLowerCase())) // Превращаем их в строчные буквы
    );
}

// Функция отправленияя запроса на изменение текста
function reframeText(originalText) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "reframeText", text: originalText }, function (response) {
            // Отправяем запрос на сервер и если измененный текст есть он есть, то отправляем его дальше
            if (response.reframedText) {
                resolve(response.reframedText);
            } else {
                reject(response.error);
            }
        });
    });
}

// Весь текст на странице
const bodyText = document.body.innerText;
// Все предложения с плохими словами
const violentSentences = detectViolentSentences(bodyText);

async function processText() {
    // Создаем функцию для сохранения перефразированного текста
    let reframedBodyText = bodyText;

    for (let sentence of violentSentences) {
        try {
            // Для всех предложений с плохими словами отправляем их в на сервер с помощью функции
            const reframed = await reframeText(sentence);
            // Заменяем текст на новый
            reframedBodyText = reframedBodyText.replace(sentence, reframed);
        } catch (error) {
            // Выводим ошибку при таковой
            console.error("Ошибка:", sentence, error);
        }
    }

    document.body.innerText = reframedBodyText;
}

// Если расширение включено, отправляем текст на проверку
chrome.storage.local.get('extensionEnabled', function (data) {
    if (data.extensionEnabled) {
        if (violentSentences.length > 0) {
            // Если есть изменения, меняем их
            document.body.innerText = "Данный текст был отправлен на модерацию...";
            processText();
        }
    }
});

