# testing screenshot using puppeteer

## setup
``` bash
# cloning project
$ git clone git@github.com:willi-dev/puppeteer-screenshot-test.git

# npm install
$ npm install
```

## setup your base url and endpoint url
open test.js
```
...
const appTest = {
  baseURL: 'your url',
  listPages: [
    {
      name: 'your page name for file name',
      url: 'example endpoint' // example: '/contact'
    }
  ]
}
...
```
