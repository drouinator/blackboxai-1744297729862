import openai

openai.api_key = "TA_CLE_OPENAI_ICI"

while True:
    question = input("\nPose ta question à Omega AI : ")
    if question.lower() in ["exit", "quit"]:
        break
    reponse = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": question}]
    )
    print("\nOmega AI : " + reponse['choices'][0]['message']['content'])
