
# Data Deduplication #2


## Development
```
git clone <this repo> 
npm i
npm start
```

The web-server hosting DHIS2 instance has to have the following settings in `nginx.conf`:

```
location / {
    proxy_cookie_path / "/; secure; HttpOnly; SameSite=None";
}
```

## Configuration
```
src/config/*.json
```

## Testing
```
npm test             # Jest-based tests (unit/integration)
npm run test:cy     # Cypress-based tests (e2e)
```

## Deployment
- Manually via *App Management* module of DHIS2
- Via *appRepars* script from DATIM *Global* repo

## Technology Stack
- REACT
- create-react-app
- TypeScript
- Cypress
- Jest
- MaterialUI