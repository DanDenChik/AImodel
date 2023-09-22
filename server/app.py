from flask import Flask, request, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer

app = Flask(__name__)

tokenizer = GPT2Tokenizer.from_pretrained("gpt2-medium")
model = GPT2LMHeadModel.from_pretrained("gpt2-medium")

@app.route('/rephrase', methods=['POST'])
def rephrase_endpoint():
    text = request.json.get('text')
    input_ids = tokenizer.encode(text, return_tensors="pt")
    output = model.generate(input_ids, max_length=100, num_return_sequences=1, pad_token_id=tokenizer.eos_token_id)
    rephrased_text = tokenizer.decode(output[0], skip_special_tokens=True)
    return jsonify({"rephrased_text": rephrased_text})

if __name__ == '__main__':
    app.run(debug=True)
