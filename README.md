# my-react-starter

Common React + Redux starter pack

## Build & Run ##

To run application locally for development do the following:

1) Clone the repository
```sh
$ git clone git@github.com:hartex/my-react-starter.git <your-project-name>
$ cd <your-project-name>
```
2) Install dependencies (Note that Node.js LTS version should be installed on your machine)
```sh
$ npm i
```
3) Run application using webpack-dev-server
```sh
$ npm run dev
```
4) See your application running on [localhost:8080](http://localhost:8080)

## Testing ##

Run unit tests:
```sh
$ npm run test
```

## Deployment ##

To run a production build execute the following:
```sh
$ npm run prod
```

To build Docker image for production run:
```sh
$ docker build -t <your-project-name> .
```

To test correctness of built image run container from it by executing:
```sh
$ docker run -d -it -p 8080:8080 --name=<your-project-name>-cont <your-project-name>
```
And check [localhost:8080](http://localhost:8080) in your browser
