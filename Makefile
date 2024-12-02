install:
	go install github.com/air-verse/air@latest
	go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
	pnpm install
	sqlc generate
	go get .

build:
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

air-windows: 
	air -c .air.windows.toml

air-mac:
	air -c .air.mac.toml

pnpm: 
	pnpm dev

devwin:
	make -j 2 air-windows pnpm

devmac:
	make -j 2 air-mac pnpm