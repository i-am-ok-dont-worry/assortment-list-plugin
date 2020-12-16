const ElasticMapper = require('./utils/es-product-mapper');

/**
 * This plugin allows to fetch assortment list from Magento
 * per customer.
 * It exposes one rest endpoint:
 * GET /assortments/:customerId - returns list of assortment for customer
 */
module.exports = ({ config, db, router, cache, apiStatus, apiError, getRestApiClient }) => {
  const createMage2RestClient = () => {
    const client = getRestApiClient();
    client.addMethods('assortmentList', (restClient) => {
      const module = {};
      module.get = (customerId, token) => {
        return restClient.get(`/kmk-customer/assortments/${customerId}/search?searchCriteria`, token);
      };

      return module;
    });

    return client;
  };

  router.get('/:customerId', async (req, res) => {
    try {
      const {customerId} = req.params;
      const {token, storeCode} = req.query;
      if (!customerId) { throw new Error(`Customer id is required`); }

      const client = createMage2RestClient();
      cache.get(req, [`assortments-${customerId}`], client.assortmentList.get, customerId, token)
        .then(async response => {
          try {
            const {items} = response;
            const es = new ElasticMapper(db, config, storeCode);
            const decoratedProducts = await es.decorateProducts(items);

            apiStatus(res, decoratedProducts, 200);
          } catch (e) {
            apiStatus(res, response, 200);
          }
        })
        .catch(err => {
          apiError(res, err.message || err || `Assortments not found`);
        })
    } catch (err) {
      apiError(res, { code: 401, errorMessage: err.message || err || 'Assortnents error' });
    }
  });

  router.post('/:customerId', async (req, res) => {
    const {customerId} = req.params;
    const {token} = req.query;

    try {
      if (!token) { throw new Error('Cannot invalidate'); }
      if (!customerId) { throw new Error(`Customer id is required`); }

      const client = createMage2RestClient();
      client.assortmentList.get(customerId, token)
        .then(async response => {
          await cache.set(req.url, response, [`assortments-${customerId}`]);
          apiStatus(res, { message: 'ok' });
        })
        .catch(async () => {
          await cache.getCacheInstance().invalidate(`assortments-${customerId}`);
          apiStatus(res, { message: 'ok' });
        });
    } catch (e) {
      await cache.getCacheInstance().invalidate(`assortments-${customerId}`);
      apiError(res, e);
    }
  });

  return {
    domainName: '@grupakmk',
    pluginName: 'assortment-list',
    route: '/assortments',
    router
  };
};
