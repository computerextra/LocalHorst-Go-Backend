dev:
	wails dev

builddev:
	wails build -o="Victor-dev.exe" -devtools

installer:
	wails build -nsis -o="Victor-Installer.exe" -webview2=embed

prod:
	wails build -o="Victor.exe"

generate:
	go run -mod=mod entgo.io/ent/cmd/ent generate --feature sql/upsert ./ent/schema