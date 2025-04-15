dev:
	wails dev

builddev:
	wails build -o="Victor.exe" -devtools

installer:
	wails build -nsis -o="Victor-Installer.exe" -webview2=embed