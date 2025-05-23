# .devcontainer/Dockerfile
FROM ghcr.io/zero2ai/snetdevcontainer:3001251346

# Install Node.js LTS
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
 && apt-get install -y nodejs

# Use root (default)
WORKDIR /workspaces/${LOCAL_WORKSPACE_FOLDER}

# Copy in your scripts—this only runs when you build via `build` in devcontainer.json
COPY scripts /workspaces/${LOCAL_WORKSPACE_FOLDER}/scripts
RUN chmod +x /workspaces/${LOCAL_WORKSPACE_FOLDER}/scripts/*.sh
