FROM node:20-alpine

USER root

WORKDIR /var/www/html

# Copy start.sh to the working directory
COPY start_prod.sh .
COPY start_dev.sh .
# Set the default command based on the NODE_ENV environment variable
ENTRYPOINT ["sh", "-c", "if [ \"$STAG\" = 'production' ]; then sh start_prod.sh; else sh start_dev.sh; fi"]
