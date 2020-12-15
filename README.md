# Assortments plugin
This plugin allows to fetch assortment list from Magento per customer. By default API token 
is used to connect to Magento Rest, but user token can be used if passed as `token` query param.

Data fetched from Magento is lately decorated with full product info from ES.

## Entry point
Entry point for plugin is a /src/index.js file. It contains a template function
for api plugin.

## Usage
Plugin exposes single REST endpoint:
```shell script
curl -X GET "http://localhost:8080/api/vendor/assortments/{{customerId}}?token={{token}}&storeCode={{storeCode}}"
```

## Cache
Assortments fetched from Magento are stored in Redis cache and invalidated
automatically after one week
