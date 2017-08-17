## Note
Check [booted](https://github.com/evenfrost/booted) for more complete Node.js app solution and CLI usage.

## Install

```bash
git clone git@github.com:evenfrost/raw.git
rm -rf .git
yarn install
```
## Run

### Development

```bash
yarn start # server is now up at http://localhost:5000
```

### Production

```bash
yarn build
yarn prod # server is now up at http://localhost:8080
```
### Configuration
Specify different port with
```bash
PORT=xxxx yarn start
# or
PORT=xxxx yarn prod
```
