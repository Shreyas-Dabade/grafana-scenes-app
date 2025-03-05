from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import ollama

app = FastAPI()

# Define request body model
class QueryRequest(BaseModel):
    prompt: str

# Define a route to interact with Llama 3
@app.post("/query")
async def query_llama(request: QueryRequest):
    try:
        response = ollama.chat(model="llama3", messages=[{"role": "user", "content": request.prompt}])
        return {"response": response["message"]["content"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

