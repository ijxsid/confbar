#Confbar

- Watch the best Tech Conferences on Confbar

### Components
- [Node Backend](https://gitlab.com/confbar/backend)
  - Based on Express, Mongoose and Passport.js
  - Serves api.confbar.com
- [Frontend](https://gitlab.com/confbar/frontend)
  - Based on Next.js, React.js and Redux
  - Serves confbar.com
- [Workers](https://gitlab.com/confbar/workers)
  - Accomplish various small tasks such as fetching videos and updating images.
- Nginx - Load Balancing and Reverse Proxy
- MongoDB - Database
- Certbot - for fetching https certificates
- NVM - for managing node versions. (currently Confbar runs on node 9.5.0)

### Installation and Setup Instructions (for Ubuntu 16.04 LTS)
1. Install nvm and then install node version 9.5.0
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

nvm install 9.5.0
```
2. Install Nginx (Only Required for Production)
```
sudo apt-get update
sudo apt-get install nginx
sudo systemctl enable nginx #start at boot

```
3. Install MongoDB
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org

sudo systemctl enable mongod #start at boot
```
4. Install Certbot (Only required for Production)
```
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx 

```

5. Fetch Certificates (Only required for Production)

```
sudo certbot certonly --standalone -d api.confbar.com
sudo certbot certonly --standalone -d www.confbar.com
sudo certbot certonly --standalone -d confbar.com
```
6. Restore MongoDB from  a dump
```
mongorestore dump/
```
7. Install Yarn and PM2.
```
npm install -g yarn pm2
``` 
8. Setup Confbar Backend.
```
git clone git@gitlab.com:confbar/backend.git

cd backend

yarn install

pm2 start -i 2 npm --name "api" -- start -i 2 #Starting 2 clusters of api process.

```
9. Setup Confbar Frontend
```
git clone git@gitlab.com:confbar/frontend.git

cd frontend

yarn install
yarn run build

pm2 start -i 2 npm --name "next" -- start -i 2 #Starting 2 clusters of nextjs process.
```

10. Both Confbar API and Frontend require `config.json` files in thier root directories. Sample of them is given below


#### Frontend Config
```json
{
  "backend": {
    "base": "https://api.confbar.com",
    "auth": "/login/twitter/",
    "api": "/api/"
  },
  "frontend": {
    "imageServer": "https://confbar.com/",
    "base": "https://confbar.com/"
  },
  "youtube": {
    "autoplay": 0
  }
}

```

#### Backend Config
```json
{
  "twitter": {
    "consumerKey": "TWITTER_APP_CONSUMER_KEY",
    "consumerSecret": "TWITTER_APP_CONSUMER_SECRET",
    "callbackURL": "http://api.confbar.com/login/twitter/return"
  },
  "database": {
    "url": "mongodb://MONGODB_ADDRESS/confyconf"
  },
  "jwt": {
    "secret": "some_JWT_SECRET"
  },
  "server": {
    "PORT": 3001
  },
  "express": {
    "secret": "SOME SESSION SECRET"
  },
  "frontend": {
    "server": "https://confbar.com/",
    "cookieDomain": "confbar.com"
  }
}

```
