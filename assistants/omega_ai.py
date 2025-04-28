import openai

openai.api_key = "TA_CLE_API_ICI"

while True:
    prompt = input("\nDemande à OmegaAI : ")
    if prompt.lower() in ["exit", "quit"]:
        break
    reponse = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    print("\n🧠 Omega AI : " + reponse['choices'][0]['message']['content'])
