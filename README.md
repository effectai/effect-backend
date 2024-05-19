# Elysia with Bun runtime

## Development
Copy the example environment configuration:
```bash
cp .env-example .env
```
To start the development environment run:
```bash
./scripts/restart-docker
```

this will automatically run migrations and seed some test data.

Open http://localhost:8888/ with your browser to test the API server is running, or use the following CURL request to check the connection:
```bash
curl http://localhost:8888/health-check
```
