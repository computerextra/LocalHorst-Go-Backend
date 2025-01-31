package helper

import (
	"bufio"
	"encoding/base64"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"

	"github.com/computerextra/golang-backend/env"
)

var (
	RootPath = env.GetEnv().UPLOAD_FOLDER
)

func checkFolder() {
	_, err := os.Stat("temp")
	if os.IsNotExist(err) {
		fmt.Println("Folder does not exist.")
		os.Mkdir(RootPath, os.ModePerm)

	}
}

func SaveFile(h *multipart.FileHeader, mitarbeiterId string, number string) (string, error) {
	checkFolder()

	File, err := h.Open()
	if err != nil {
		return "", err
	}
	defer File.Close()

	tempFolderPath := RootPath
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

	return fmt.Sprintf("%s/%s", RootPath, tempFileName), nil
}

func SavePdf(Title string) error {
	checkFolder()

	env := env.GetEnv()
	ArchivePath := env.ARCHIVE_PATH
	tempFolderPath := RootPath

	directory := filepath.Join(ArchivePath, Title)
	fi, err := os.Open(directory)
	if err != nil {
		return err
	}
	defer func() {
		if err := fi.Close(); err != nil {
			panic(err)
		}
	}()

	// make a read buffer
	r := bufio.NewReader(fi)

	fo, err := os.Create(fmt.Sprintf("%s/%s", tempFolderPath, fi.Name()))
	if err != nil {
		return err
	}
	defer func() {
		if err := fo.Close(); err != nil {
			panic(err)
		}
	}()

	// make a write buffer
	w := bufio.NewWriter(fo)

	buf := make([]byte, 1024)
	for {
		// read a chunk
		n, err := r.Read(buf)
		if err != nil && err != io.EOF {
			return err
		}
		if n == 0 {
			break
		}

		// write a chunk
		if _, err := w.Write(buf[:n]); err != nil {
			return err
		}
	}

	if err = w.Flush(); err != nil {
		return err
	}

	return nil
}

func ImageToBase64(path string) string {
	bytes, err := os.ReadFile(path)
	if err != nil {
		return ""
	}

	var base64Encoding string
	mimeType := http.DetectContentType(bytes)
	switch mimeType {
	case "image/jpeg":
		base64Encoding = "data:image/jpeg;base64,"
	case "image/png":
		base64Encoding = "data:image/png;base64,"
	}
	base64Encoding += base64.StdEncoding.EncodeToString(bytes)
	return base64Encoding
}
