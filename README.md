# ba9a-blassa

ba9ablassa (clone markoub) est une platforme de réservation de voyages en ligne qui permet de trouver les voyage qui vous correspond en fonction de votre temp et votre budget.

## Guide d'installation

1. cloner le projet : `git clone https://github.com/shawpoufo/ba9a-blassa.git `
2. positioner vous sur le fichier **ba9a-blassa** taper la commande `npm i` pour installer tous les paquets nécessaire du server puis postionner vous sur le dossier **client** taper la comande `npm i` pour installer les paquet nécessaire pour la partie front-end

- ### Base de données

  ce projet utilise mysql mais vous pouvez choisire une autre base de donnée car j'utilise l'ORM [<img src="https://img.shields.io/badge/orm-sequelize-blue">](https://sequelize.org/) qui va se charger de la compatibilité

  1. Crée une base de donnée avec le nom que vous voulez par exemple `ba9aBlassa`
  2. Entrer dans le dossier **ba9a-blassa** ouvré le dossier **server** puis **config** clicker sur le fichier **config.json** pour configurer votre base de données

  3. ```JSON
     {
         //changer les information par rapport a
         //votre base de données
          "development": {
              "username": "root",
              "password": "root",
              "database": "ba9aBlassa",
              "host": "127.0.0.1",
              "dialect": "mysql",
              "port": 3306
          }
          ...
     }

     ```

- ### Migration de la base de données avec sequelize

  1. Maintenant vous êtes placer sur le fichier **ba9a-blassa** taper la commande suivante pour changer de répertoire `cd server`

  2. Taper la commande `npx sequelize-cli db:migrate` pour faire une migration des table (création des table)

  3. Taper la commande `npx sequelize-cli db:seed:all` pour insérer quelque données

- ### Configuration du JWT :key:

  Ce projet utilise la méthode d'authentification [JWT](https://jwt.io/) pour géner des token afin de sécuriser l'accée a l'application

  - dans le répertoire `/server/.env` vous aller par défaut une configuration pour l'authentification si vous voulez la changer modifier la variable : `ACCESS_TOKEN_SECRET`

- ### Configuration de l'email pour envoyer un message de vérification

  - Dans le fichier `/server/.env` changer la variable `EMAIL` et `PASSWORD` , `EMAIL_TOKEN` contient une valeur par défault pour générer un token unique pour la vérification du compte

:tada: c'est tout , lancer la commande `cd ..` pour revenire au parent et lancer la commande `npm run dev` pour lancer le projet .

**pour gérer votre application vous disposer du compte admin :**

:email: : **root@email.com**
:key: : **root**

! pour l'instant vous ne pouver pas le modifié :innocent:
