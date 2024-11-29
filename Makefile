install:
	go install github.com/air-verse/air@latest
	go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
	pnpm install
	go get .
	sqlc generate

build:
	pnpm build
	go build .

serve:
	pnpm build
	go build .
	./golang-backend.exe

air: 
	air

pnpm: 
	pnpm dev

dev:
	make -j 2 air pnpm