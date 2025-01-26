# Use Ubuntu as the base image
FROM ubuntu:22.04

# Set working directory
WORKDIR /app

# Install necessary dependencies
RUN apt update && apt install -y curl

# Install Ollama
RUN curl -fsSL https://ollama.ai/install.sh | sh

# Copy project files
COPY . .

# Expose the port Ollama runs on
EXPOSE 11434

# Start Ollama in the background and run your backend
CMD ollama serve &
