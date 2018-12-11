# Mitigating Circumstances Tracker
Bournemouth University Advanced Development Unit Assignment

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

##### Please Note: This project is dependent on the REST API found [here](https://github.com/rhysstubbs/MitigatingCircumstanceTrackerAPI).

### Prerequisites


* Python 2.7 and Pip (with VirtualEnv configured)
* Google App Engine Standard (Python 2.7 Runtime)
* NPM (Node Package Manager)

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

1 - Install the project dependencies
```bash
pip install -t lib -r requirements.txt
```

2 - Install Javascript dependencies (see package.json for details)
```bash
npm install
```

3 - Run webpack to  bundle front-end assets (See package.json for available commands)

Development Build

```bash
npm run watch [-r for analysis]
```

Staging Build

```bash
npm run dev
```

Production Build
```bash
npm run prod
```

### And coding style tests

The project uses ESlint for code styling tracking, specifically the React recommended defaults. This is the typical output to expect:
```
ERROR in ./resources/assets/js/views/view-all.jsx
// ...
22:24  error  'isAdmin' is missing in props validation  react/prop-types
✖ 1 problem (1 error, 0 warnings)
```

Build Analysis is available by using the following command and navigating to [http://127.0.0.1:8888/](http://127.0.0.1:8888/)
```bash
npm run analysis
```

## Deployment

Deployment is managed via Google Cloud Util, the following command can be used to deploy the application:
```bash
gcloud app deploy app.yaml
```

To stream console output, use:
```bash
gcloud app logs tail -s default
```

## Built With

* [Flask](http://flask.pocoo.org/) - The front-end web framework
* [React](https://reactjs.org/) - The front-end Javascript Framework
* [Webpack](https://webpack.js.org/) - Used to build and bundle the Javascript

## Contributing

This project is for education purposes ONLY, contributions are NOT accepted.

## Versioning

We use [GitHub](https://github.com) for versioning. For the versions available, see the [tags on this repository](https://github.com/rhysstubbs/MitigatingCircumstancesTracker). 

## Authors

* **Rhys Stubbs**
## Copyright

Copyright &copy; 2018 Rhys Stubbs. All rights reserved.

## Acknowledgments

* Hat tip to anyone whose code was used