function detectViolentSentences(text) {
    console.log(text);
    const violentWords = ["жирный", "Пенис", "Fuck"];
    const sentences = text.split('.');
    return sentences.filter(sentence => violentWords.some(word => sentence.includes(word)));
}
const bodyText = document.body.innerText;
const violentSentences = detectViolentSentences(bodyText);

if (violentSentences.length > 0) {
    fetch('http://http://127.0.0.1:5000/rephrase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sentences: violentSentences })
    })
    .then(response => response.json())
    .then(data => {
        let modifiedText = bodyText;
        violentSentences.forEach((sentence, index) => {
            modifiedText = modifiedText.replace(sentence, data.reframed_sentences[index]);
        });
        document.body.innerText = modifiedText;
    })
    .catch(error => {
        console.error("Error:", error);
    });
}