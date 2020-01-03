# Game Your Skills

A fun alternative to competitive programming. Better docs coming soon.

## Running

The project uses `Golang` as the backend language and `React` in the frontend.

1. Install Golang +1.10.x (assuming `git` is already installed).
2. Make a default repository for cloning the project. This should be strictly inside the `GOPATH`. Paste this instruction in your terminal to get started. `mkdir -p $GOPATH/src/github/ankitjena/`.
3. Navigate to the directory via `cd $GOPATH/src/github/ankitjena/`.
4. Clone the repository via `git clone`.
5. Navigate into cloned repo `cd game-your-skills`
6. Install the server dependencies via `go get -v -u ./...`
7. Navigate inside the client `cd client`
8. Install the dependencies using `yarn`
9. Build the client using `yarn build`
10. Start the client using `yarn start`. This will run the client in port `3000`
11. Run the application from the root of the project using `go run main.go`. The server runs on port `5000`

>*Note: The application is setup to run the built react files. This will also serve the client in port `5000`. But changes will not be visible since its a production build. In development you have to run both the servers separately.*