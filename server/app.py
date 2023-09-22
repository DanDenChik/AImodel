from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import GPT2LMHeadModel, GPT2Tokenizer

app = Flask(__name__)
CORS(app)

tokenizer = GPT2Tokenizer.from_pretrained("gpt2-medium")
model = GPT2LMHeadModel.from_pretrained("gpt2-medium")

@app.route('/rephrase', methods=['POST'])
def rephrase_endpoint():
    sentences = request.json.get('sentences')
    reframed_sentences = []
    
    for sentence in sentences:
        prompt = f"Как бы вы сказали следующее предложение более вежливым и дружелюбным образом? {sentence}"
        input_ids = tokenizer.encode(prompt, return_tensors="pt")
        output = model.generate(input_ids, max_length=100, num_return_sequences=1, pad_token_id=tokenizer.eos_token_id)
        reframed_sentence = tokenizer.decode(output[0], skip_special_tokens=True).replace(prompt, '').strip()
        reframed_sentences.append(reframed_sentence)

    return jsonify({"reframed_sentences": reframed_sentences})

if __name__ == '__main__':
    app.run(debug=True)
