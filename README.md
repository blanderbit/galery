0. install global
```
npm i -g truffle
npm i -g @angular/cli
npm i -g @nestjs/cli
```
1. Run mongo & ganache in docker
### For work in private network we need private key for import account with balance to MetaMask.
```
docker-compose up
```
2. Compile contract
```
cd truffle
npm install
truffle compile
./node_modules/.bin/typechain --target truffle --outDir app/contracts './build/contracts/*.json'
```
3. Install and then run server
```
cd server
npm install
npm start
```
4. Install and then run frontend
```
cd frontend
npm install
npm run start
```
