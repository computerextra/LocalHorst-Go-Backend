install:
	pnpm install
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