dev:
	wails dev

build:
	wails build -clean

installer:
	wails build -nsis -clean -o="Victor-Installer.exe" -webview2=embed