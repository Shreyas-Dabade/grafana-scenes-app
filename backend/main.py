from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Import API routers
from ollama_api import router as ollama_router
from prometheus_api import router as prometheus_router

app = FastAPI()

# Enable CORS (Modify `allow_origins` for security in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(ollama_router, prefix="/llama", tags=["Llama API"])
app.include_router(prometheus_router, prefix="/prometheus", tags=["Prometheus API"])

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
