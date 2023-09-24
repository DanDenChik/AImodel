function detectViolentSentences(text) {
    const violentWords = ["жирный", "урод", "дебил", "придурок"];
    const sentences = text.split('.');
    return sentences.filter(sentence =>
        violentWords.some(word => sentence.toLowerCase().includes(word.toLowerCase()))
    );
}

function reframeText(originalText) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: "reframeText", text: originalText }, function (response) {
            if (response.reframedText) {
                resolve(response.reframedText);
            } else {
                reject(response.error);
            }
        });
    });
}

const bodyText = document.body.innerText;
const violentSentences = detectViolentSentences(bodyText);

async function processText() {
    let reframedBodyText = bodyText;

    for (let sentence of violentSentences) {
        try {
            const reframed = await reframeText(sentence);
            reframedBodyText = reframedBodyText.replace(sentence, reframed);
        } catch (error) {
            console.error("Failed to reframe:", sentence, error);
        }
    }

    document.body.innerText = reframedBodyText;
}

chrome.storage.local.get('extensionEnabled', function(data) {
    if (data.extensionEnabled) {
        if (violentSentences.length > 0) {
            document.body.innerText = "Данный текст был отправлен на модерацию...";
            processText();
        }
    }
});

