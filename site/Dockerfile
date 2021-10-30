FROM node:14.18.1-alpine3.12

# définit le dossier 'app' comme dossier de travail
WORKDIR /app

RUN adduser -HD site

# copie 'package.json' et 'package-lock.json' (si disponible)
COPY package*.json ./

# installe les dépendances du projet
RUN npm install

# copie les fichiers et dossiers du projet dans le dossier de travail (par exemple : le dossier 'app')
COPY . .

RUN chown -R site:site .

EXPOSE 8080
USER site

CMD ["npm", "run", "serve"]
