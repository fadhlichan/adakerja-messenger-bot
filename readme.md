# MESSENGER BOT
### Submission for AdaKerja NodeJS Interview Task

## Install dependencies
```
npm install
```

## Running in development mode
```
npm run dev
```

## Running tests
```
MONGO_URI_TEST <YOUR-MONGO-URI-FOR-TESTING> npm test
```

## Running in production mode
```
npm start
```

## Environment variables
|       name        |               description             |
|-------------------|---------------------------------------|
| VERIFY_TOKEN      | Random string to verify your webhook  |
| PAGE_ACCESS_TOKEN | Genereated token for authorized page  |
| MONGO_URI         | Your mongodb connection string        |

## API Endpoints
 - `GET /messages[?page=1]` List all messages sent by users.
 - `GET /message/:messageId` Get specified message by its id.
 - `DELETE /message/:messageId` Delete message by its id

## Preview
![Preview](https://raw.githubusercontent.com/fadhlichan/adakerja-messenger-bot/466819405880732945a4f29f69448e0cbff8bfac/preview.gif)
