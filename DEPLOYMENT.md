# Deployment Guide (Ubuntu)

## 1. Prerequisites

- Ubuntu Server (20.04 or 22.04 LTS recommended)
- Root or sudo access
- Domain name (optional but recommended)

## 2. Install Node.js & MongoDB

### Install Node.js (via NVM)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```

### Install MongoDB

Follow the official MongoDB installation guide for Ubuntu:

```bash
sudo apt-get install gnupg curl
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

## 3. Setup Backend

1. **Clone/Copy Code**: Upload your `backend` folder to the server (e.g., `/var/www/afford-backend`).
2. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```
3. **Configure Environment**:
   Create `.env` file:
   ```bash
   nano .env
   ```
   Paste your variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/affordmed
   JWT_SECRET=your_super_secret_key_change_this
   JWT_EXPIRE=1d
   CORS_ORIGIN=*  # Change to your frontend URL in production for security
   ```

## 4. Run with PM2 (Process Manager)

PM2 keeps your app running in the background and restarts it on crash/reboot.

```bash
npm install -g pm2
pm2 start src/server.js --name "afford-backend"
pm2 save
pm2 startup
```

## 5. Configure Firewall (UFW)

Allow traffic on port 5000 (if testing directly) or 80/443 (if using Nginx).

```bash
sudo ufw allow 5000
sudo ufw allow ssh
sudo ufw enable
```

## 6. Frontend Connection

Your API URL will be:
`http://<YOUR_SERVER_IP>:5000/api`

Update your frontend code to point to this URL.

### Avoiding CORS Errors

- In `.env`, setting `CORS_ORIGIN=*` allows ALL websites to access your API.
- To restrict it to your specific frontend (Recommended for security):
  ```env
  CORS_ORIGIN=http://your-frontend-domain.com
  ```
