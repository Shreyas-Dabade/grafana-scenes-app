package main

import (
	"os"

	"github.com/grafana/grafana-plugin-sdk-go/backend/app"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
	"github.com/shreyas/scenes/pkg/plugin"
)

func main() {
	// Start the plugin
	if err := app.Manage("shreyas-scenes-app", plugin.NewApp, app.ManageOpts{}); err != nil {
		log.DefaultLogger.Error(err.Error())
		os.Exit(1)
	}
}