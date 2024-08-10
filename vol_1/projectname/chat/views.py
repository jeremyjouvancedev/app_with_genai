from django.http import JsonResponse
from django.conf import settings
import httpx
import json


# If your view is meant to be asynchronous, you should use httpx.AsyncClient
async def chat_with_chatgpt(request):
    json_body = json.loads(request.body)
    user_input = json_body.get('user_input')

    if not user_input: 
        return JsonResponse({"error": "You must add an input"}, status=400)


    async with httpx.AsyncClient() as client:
        response = await client.post(
            'https://api.openai.com/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {settings.OPENAI_API_KEY}'
            },
            json={
                "model": "gpt-4",
                "messages": [
                    {"role": "user", "content": user_input}
                ],
                "temperature": 0.7,
                "max_tokens": 150,
            },
        )
        
        if response.status_code == 200:
            return JsonResponse({'response': response.json()['choices'][0]['message']['content'].strip()})
        else:
            return JsonResponse({"error": "Failed to get response from OpenAI"}, status=500)
