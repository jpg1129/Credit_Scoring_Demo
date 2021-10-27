# specify base image 
FROM node:alpine

WORKDIR '/usr/app'

# install some dependencies 
COPY ./package.json ./

RUN yarn install 

COPY ./ ./

# defualt command 
CMD ["yarn", "start"]