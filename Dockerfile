FROM node:8.2

ENV NPM_CONFIG_LOGLEVEL warn

# Install node_modules with Yarn
ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn install
RUN mkdir -p /reskongoal/api && cd /reskongoal/api && ln -s /tmp/node_modules

WORKDIR /reskongoal/api
COPY ./ /reskongoal/api

EXPOSE 8080

CMD if [ ${NODE_ENV} = production ]; \
	then \
	npm start; \
	else \
	npm run dev; \
	fi
