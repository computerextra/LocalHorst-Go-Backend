live/templ:
	templ generate --watch --proxy="http://localhost:3000" --open-browser=false -v

live/server:
	go run github.com/cosmtrek/air@v1.51.0

live/tailwind:
	pnpm dlx @tailwindcss/cli -i ./static/css/input.css -o ./static/css/style.css --minify --watch=forever

db/pull:
	go run github.com/steebchen/prisma-client-go db pull

db/push:
	go run github.com/steebchen/prisma-client-go db push

db/generate:
	go run github.com/steebchen/prisma-client-go generate

live/sync_assets:
	go run github.com/cosmtrek/air@v1.51.0 \
	--build.cmd "templ generate --notify-proxy" \
	--build.bin true \
	--build.delay "100" \
	--build.exclude_dir "" \
	--build.exclude_dir "node_modules" \
	--build.include_dir "static" \
	--build.include_ext "js,css"

react/build:
	pnpm esbuild --bundle react/index.ts --outdir=./static --minify

dev:
	make -j4 live/tailwind live/templ live/server live/sync_assets

build:
	go get .
	make db/generate
	go generate
	go build