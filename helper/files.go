package helper

import (
	"bufio"
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
	"runtime"

	"github.com/computerextra/golang-backend/env"
)

var (
	_, b, _, _ = runtime.Caller(0)
	RootPath   = filepath.Join(filepath.Dir(b), "../dist\\")
)

func checkFolder() {
	_, err := os.Stat("temp")
	if os.IsNotExist(err) {
		fmt.Println("Folder does not exist.")
		os.Mkdir(fmt.Sprintf("%s\\%s", RootPath, "upload"), os.ModePerm)

	}
}

func SaveFile(h *multipart.FileHeader, mitarbeiterId string, number string) (string, error) {
	checkFolder()

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

func SavePdf(Title string) error {
	checkFolder()

	env := env.GetEnv()
	ArchivePath := env.ARCHIVE_PATH
	tempFolderPath := fmt.Sprintf("%s%s", RootPath, "\\upload")

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
