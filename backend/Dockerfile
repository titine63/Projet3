# Utiliser une image de base Node
FROM node:16

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Compiler l'application
RUN npm run build

# Exposer le port sur lequel l'application sera accessible
EXPOSE 3000

# Commande pour exécuter l'application
CMD ["npm", "run", "start:dev"]
