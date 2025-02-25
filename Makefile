install:
	go install github.com/air-verse/air@latest
	go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
	pnpm install
	sqlc generate
	go get .

build:
	go get .
	pnpm build
	go build .

serve-windows:
	pnpm build
	go build .
	./golang-backend.exe

serve-mac:
	pnpm build
	go build .
	./golang-backend

db/pull:
	go run github.com/steebchen/prisma-client-go db pull

db/push:
	go run github.com/steebchen/prisma-client-go db push

db/generate:
	go run github.com/steebchen/prisma-client-go generate

air-windows: 
	air -c .air.windows.toml

air-mac:
	air -c .air.mac.toml

devwin:
	make -j 2 air-windows

devmac:
	make -j 2 air-mac 