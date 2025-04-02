from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import ollama

router = APIRouter()

class QueryRequest(BaseModel):
    query: str

class QueryResponse(BaseModel):
    response: str

@router.post("/query-llama", response_model=QueryResponse)
async def query_llama(request: QueryRequest):
    """Handles Llama model queries via Ollama."""
    try:
        response = ollama.chat(
            model="llama3.2:1b",  
            messages=[{"role": "user", "content": request.query}]
        )

        if 'message' in response and 'content' in response['message']:
            return {"response": response['message']['content']}
        else:
            raise HTTPException(status_code=500, detail="Invalid response from Llama model.")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying Llama: {str(e)}")
