# .devcontainer/Dockerfile
FROM ghcr.io/zero2ai/snetdevcontainer:3001251346

# Install Node.js LTS
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
 && apt-get install -y nodejs

# Default Docker user is root—no USER override needed

# Set working directory
WORKDIR /workspaces/${LOCAL_WORKSPACE_FOLDER}

# instead of COPY scripts /scripts
COPY scripts /workspaces/${LOCAL_WORKSPACE_FOLDER}/scripts
RUN chmod +x /workspaces/${LOCAL_WORKSPACE_FOLDER}/scripts/*.sh