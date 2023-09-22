chrome.storage.local.get('filterEnabled', function(data) {
    if (data.filterEnabled) {
        const bodyText = document.body.innerText;
        if (bodyText.includes("someViolentWord")) {  // Замените на вашу логику определения насильственного контента
            fetch('http://127.0.0.1:5000/rephrase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: bodyText })
            })
            .then(response => response.json())
            .then(data => {
                document.body.innerText = data.rephrased_text;
            })
            .catch(error => {
                console.error("Error:", error);
            });
        }
    }
});
