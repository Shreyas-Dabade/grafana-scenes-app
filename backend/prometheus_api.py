from fastapi import APIRouter, HTTPException, Query
import requests

router = APIRouter()

PROMETHEUS_URL = "http://localhost:9090/api/v1/query"  # Change to your Prometheus URL

@router.get("/query-prometheus")
def query_prometheus(promql: str = Query(..., title="PromQL Query")):
    """Fetches PromQL query results from Prometheus."""
    try:
        response = requests.get(PROMETHEUS_URL, params={"query": promql})
        
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=500, detail="Failed to fetch data from Prometheus.")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying Prometheus: {str(e)}")
