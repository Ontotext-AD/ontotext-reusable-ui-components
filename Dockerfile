FROM cypress/base:12

COPY . /ontotext-reusable-ui-components/

WORKDIR /ontotext-reusable-ui-components/

RUN npm install --save-dev cypress

CMD ["npm", "run", "cy:ci"]
