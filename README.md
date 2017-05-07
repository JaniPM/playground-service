# playground-service
Playing around with node and mongo

## Prerequisites
Project uses mongo for database and expects it to be running in mongodb://127.0.0.1:27017/playground_db.
Configuration can be changed from src/common/config.js.

## Commands
- **npm test** for unit testing (includes basic test coverage).
- **npm run test-coverage-report** (produces html coverage report as well).
- **npm start** start service for development. Restarts after file changes.
- **npm run standard** to validate JS-standard styling.

## Structure
- **src** for code
- **test** for common test utilities and integration tests.
  Unit tests are next to the implementation in **src**
- Each api implementation is inside api/<entity> folder. 
  Folders contains the layered architecture in itself.
