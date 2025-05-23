FROM ghcr.io/zero2ai/snetdevcontainer:3001251346
# Root is the default user

# Ensure we’re in the right working dir (not strictly needed if scripts live at /scripts)
WORKDIR /workspaces/${LOCAL_WORKSPACE_FOLDER}

# Copy your scripts into /scripts
COPY scripts /scripts
RUN chmod +x /scripts/*.sh
