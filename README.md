# Client Gateway

## Dev

1. Clone repository
2. Install dependencies
3. Create a `.env` file based on `env.template`
4. Make sure the NATS server is running

```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```

5. Run `npm run start:dev`

## Prod

Execute

```
docker build -f dockerfile.prod -t client-gateway .
```

## NATS

Execute

```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```
