#!/bin/bash

# Build the Vue 3 TypeScript application
echo "Building Vue 3 TypeScript application..."
npm run build

# Serve the built files using serve
echo "Starting the server..."
serve -s dist
