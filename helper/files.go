package helper

import (
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
	"runtime"
)

var (
	_, b, _, _ = runtime.Caller(0)
	RootPath   = filepath.Join(filepath.Dir(b), "../..")
)

func fileNameWithoutExtension(filename string) string {
	return filename[:len(filename)-len(filepath.Ext(filename))]
}

func SaveFile(h *multipart.FileHeader, mitarbeiterId string, number string) (string, error) {
	File, err := h.Open()
	if err != nil {
		return "", err
	}
	defer File.Close()

	tempFolderPath := fmt.Sprintf("%s%s", RootPath, "/tempFiles")
	tempFileName := fmt.Sprintf("%s--%s-%s-*.%s", number, mitarbeiterId, fileNameWithoutExtension(h.Filename), filepath.Ext(h.Filename))

	tempFile, err := os.CreateTemp(tempFolderPath, tempFileName)
	if err != nil {
		return "", err
	}
	defer tempFile.Close()

	//4. Write upload file bytes to your new file
	filebytes, err := io.ReadAll(File)
	if err != nil {
		return "", err
	}

	tempFile.Write(filebytes)
	return fmt.Sprintf("%s/%s", tempFolderPath, tempFileName), nil
}
