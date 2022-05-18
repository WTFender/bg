# bg

## Dev

Setup `config.json`.

```
{
    "mockApi": false,
    "apiUrl": "https://apiUrl/",
    "appUrl": "https://appUrl/",
    "authority": "https://oidcServer/",
    "client_id": "clientId",
    "response_type": "code",
    "scope": "openid profile groups"
}
```

```
npm install
npm run serve
```