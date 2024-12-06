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
	RootPath   = filepath.Join(filepath.Dir(b), "../dist\\")
)

func SaveFile(h *multipart.FileHeader, mitarbeiterId string, number string) (string, error) {
	_, err := os.Stat("temp")
	if os.IsNotExist(err) {
		fmt.Println("Folder does not exist.")
		os.Mkdir(fmt.Sprintf("%s\\%s", RootPath, "upload"), os.ModePerm)

	}

	File, err := h.Open()
	if err != nil {
		return "", err
	}
	defer File.Close()

	tempFolderPath := fmt.Sprintf("%s%s", RootPath, "\\upload")
	tempFileName := fmt.Sprintf("%s--%s%s", number, mitarbeiterId, filepath.Ext(h.Filename))

	tempFile, err := os.Create(fmt.Sprintf("%s/%s", tempFolderPath, tempFileName))
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

	return fmt.Sprintf("%s/%s", "/upload/", tempFileName), nil
}
