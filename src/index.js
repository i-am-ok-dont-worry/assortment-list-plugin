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
      module.get = (customerId) => {
        return restClient.get(`/kmk-customer/assortments/${customerId}/search?searchCriteria`);
      };

      return module;
    });

    return client;
  };

  router.get('/:customerId', async (req, res) => {
    try {
      const {customerId} = req.params;
      if (!customerId) { throw new Error(`Customer id is required`); }

      const client = createMage2RestClient();
      cache.get(req, ['assortment-list'], client.assortmentList.get, customerId)
        .then(assortments => {
          apiStatus(res, assortments, 200);
        })
        .catch(err => {
          apiError(res, `Assortments not found`);
        })
    } catch (e) {

    }
  });

  return {
    domainName: '@grupakmk',
    pluginName: 'assortment-list',
    route: '/assortments',
    router
  };
};
