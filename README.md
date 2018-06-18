# json-query
A simple tool to query json data using any library of choice.


<!-- TOC -->

- [json-query](#json-query)
- [Supported features](#supported-features)
- [Uses](#uses)

<!-- /TOC -->

This tool can be used to run any query on the fly against json data.

# Supported features
- Add new libraries
- Fetch data using CURL request
- Locally save the snippets 
- Save the snippets as GIST

Live version is available at [JsonQuery](http://jq.ashwanik.in)

# Uses

```input``` is the variable which contains the JSON data which is to be queried.

A simple query using ```Lodash``` can be
```javascript

_.filter(input,function(language){
    return language.name==="Java"
});

```

# Running locally

Following commands should get you up and running
```sh
npm install

//Run with development profile
gulp development
//Run with release profile
gulp release

node app.js


```

Access [localhost](http://localhost:9099) to see the website.

After making any changes in the client code, run following command
```sh
gulp web
```


# Credits:
The UI is motivated by [this](http://www.jsonquerytool.com/)