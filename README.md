## TomoStatus

## Requirements
- NodeJS (If you get EACCES permission issue, please see: https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)

## Config

```
cp config/default.json config/local.json
```
- Update `local.json` file to support your environment
  - Update grafana configuration:
      `  "grafana": {
      "uri": "",
      "apiKey": ""
      },
    `

## Install
```
npm install
```

## Run
- Start TomoStatus
```
npm run dev
```
The site will run at [`http://localhost:3000`](http://localhost:3000)
