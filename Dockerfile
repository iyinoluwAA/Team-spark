# .devcontainer/Dockerfile
FROM ghcr.io/zero2ai/snetdevcontainer:3001251346

# Install Node.js LTS and dos2unix
RUN apt-get update \
 && apt-get install -y \
      curl \
      nodejs \
      dos2unix \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /workspaces/${LOCAL_WORKSPACE_FOLDER}

# Copy scripts and convert CRLF→LF at build time
COPY scripts /workspaces/${LOCAL_WORKSPACE_FOLDER}/scripts
RUN dos2unix /workspaces/${LOCAL_WORKSPACE_FOLDER}/scripts/*.sh \
 && chmod +x /workspaces/${LOCAL_WORKSPACE_FOLDER}/scripts/*.sh
