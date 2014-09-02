package main

import (
	"fmt"
	"net/http"
)

func echo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)
	f, ok := w.(http.Flusher)
	if ok {
		for i := 1; i <= 10; i++ {
			fmt.Fprintln(w, fmt.Sprintf(`{"status":"ok","progress":%d}`, i*10))
			f.Flush()
		}
	}
}

func main() {
	http.HandleFunc("/echo", echo)
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/", fs)
	http.ListenAndServe(":9999", nil)
}
