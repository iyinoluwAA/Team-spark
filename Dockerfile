FROM ghcr.io/zero2ai/snetdevcontainer:3001251346

# install Node.js LTS and dos2unix
RUN apt-get update \
 && apt-get install -y curl nodejs dos2unix \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /workspaces/${LOCAL_WORKSPACE_FOLDER}

# copy in your scripts
COPY spark-container/scripts ./scripts

# strip CR, ensure Unix LF
RUN dos2unix ./scripts/*.sh \
 && chmod +x ./scripts/*.sh
