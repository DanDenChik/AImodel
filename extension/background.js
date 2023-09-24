chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "reframeText") {
        fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer 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',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: `Перефразируйте следующее оскорбительное предложение, сохраняя общий смысл, но делая его менее агрессивным: "${request.text}"` }
                ]
            })            
        }).then(response => response.json()).then(data => {
            console.log("API Response:", data);
            if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
                sendResponse({ reframedText: data.choices[0].message.content.trim() });
            } else {
                console.error("Unexpected API response:", data);
                sendResponse({ error: "Failed to reframe content due to unexpected API response." });
            }
        }).catch(error => {
            console.error("Error:", error);
            sendResponse({ error: "Failed to reframe content." });
        });

        return true;
    }
});
