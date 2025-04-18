package utils

import (
	"encoding/base64"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
)

func If[T any](cond bool, vtrue, vfalse T) T {
	if cond {
		return vtrue
	}
	return vfalse
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

func checkFolder(RootPath string) {
	_, err := os.Stat("temp")
	if os.IsNotExist(err) {
		fmt.Println("Folder does not exist.")
		os.Mkdir(RootPath, os.ModePerm)

	}
}

func SaveFile(h *multipart.FileHeader, mitarbeiterId string, number string) (string, error) {

	uploadFolder, ok := os.LookupEnv("UPLOAD_FOLDER")
	if !ok {
		return "", fmt.Errorf("UPLOAD_FOLDER not set")
	}
	checkFolder(uploadFolder)

	File, err := h.Open()
	if err != nil {
		return "", err
	}
	defer File.Close()

	tempFolderPath := uploadFolder
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

	return fmt.Sprintf("%s/%s", uploadFolder, tempFileName), nil
}

func GetSageConnectionString() (string, error) {
	server, ok := os.LookupEnv("SAGE_SERVER")
	if !ok {
		return "", fmt.Errorf("env error: could not find SAGE_SERVER")
	}
	portString, ok := os.LookupEnv("SAGE_PORT")
	if !ok {
		return "", fmt.Errorf("env error: could not find SAGE_PORT")
	}
	port, err := strconv.Atoi(portString)
	if err != nil {
		return "", err
	}
	user, ok := os.LookupEnv("SAGE_USER")
	if !ok {
		return "", fmt.Errorf("env error: could not find SAGE_USER")
	}
	pass, ok := os.LookupEnv("SAGE_PASS")
	if !ok {
		return "", fmt.Errorf("env error: could not find SAGE_PASS")
	}
	db, ok := os.LookupEnv("SAGE_DB")
	if !ok {
		return "", fmt.Errorf("env error: could not find SAGE_DB")
	}

	return fmt.Sprintf("server=%s;database=%s;user id=%s;password=%s;port=%d", server, db, user, pass, port), nil
}
