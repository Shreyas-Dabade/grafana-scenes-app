package plugin

import (
	"bytes"
	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/instancemgmt"
	"github.com/grafana/grafana-plugin-sdk-go/backend/resource/httpadapter"
)

// App is the backend plugin instance.
type App struct {
	backend.CallResourceHandler
}

// NewApp creates a new instance of the App.
func NewApp(_ context.Context, _ backend.AppInstanceSettings) (instancemgmt.Instance, error) {
	var app App

	// Register the resource handler with the correct path
	mux := http.NewServeMux()
	mux.HandleFunc("/api/query-llama", app.handleQuery)

	// Adapt the handler for Grafana
	app.CallResourceHandler = httpadapter.New(mux)

	return &app, nil
}

// handleQuery processes the query and forwards it to the Python FastAPI server.
func (a *App) handleQuery(w http.ResponseWriter, r *http.Request) {
	// Ensure it's a POST request
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Parse the request body
	var request struct {
		Query string `json:"query"`
	}
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Forward the request to the Python server
	pythonURL := "http://localhost:8000/query-llama"
	reqBody, _ := json.Marshal(map[string]string{
		"query": request.Query,
	})
	resp, err := http.Post(pythonURL, "application/json", bytes.NewBuffer(reqBody))
	if err != nil {
		http.Error(w, "Failed to connect to Llama backend", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	// Read response from Python server
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Failed to read response from Llama backend", http.StatusInternalServerError)
		return
	}

	// Send the response back to the frontend
	w.Header().Set("Content-Type", "application/json")
	w.Write(body)
}

// Dispose cleans up resources.
func (a *App) Dispose() {
	// No cleanup needed
}

// CheckHealth handles health checks.
func (a *App) CheckHealth(_ context.Context, _ *backend.CheckHealthRequest) (*backend.CheckHealthResult, error) {
	return &backend.CheckHealthResult{
		Status:  backend.HealthStatusOk,
		Message: "ok",
	}, nil
}
