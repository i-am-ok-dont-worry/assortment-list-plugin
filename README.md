# Assortments plugin
This plugin allows to fetch assortment list from Magento per customer.

## Entry point
Entry point for plugin is a /src/index.js file. It contains a template function
for api plugin.

## Usage
Plugin exposes single REST endpoint:
```shell script
curl -X GET "http://localhost:8080/api/vendor/assortments/{{customerId}}"
```

## Cache
Assortments fetched from Magento are stored in Redis cache and invalidated
automatically 
