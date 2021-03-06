(function () {
    "use strict";

    angular.module("ovh-api-services").service("OvhApiIpLoadBalancingFrontendLexi", function ($resource, $cacheFactory) {
        var queryCache = $cacheFactory("OvhApiIpLoadBalancingFrontendLexiQuery");

        var iplbFrontend = $resource("/ipLoadbalancing/:serviceName/definedFrontends", {
            serviceName: "@serviceName"
        }, {
            query: { method: "GET", isArray: true, cache: queryCache }
        });

        iplbFrontend.resetQueryCache = function () {
            queryCache.removeAll();
        };

        return iplbFrontend;
    });

    _.forEach(["tcp", "udp", "http"], function (type) {
        var frontendType = _.capitalize(type);
        angular
            .module("ovh-api-services")
            .service("OvhApiIpLoadBalancingFrontend" + frontendType + "Lexi",
                     ["$resource", "$cacheFactory", function ($resource, $cacheFactory) {
                         var cache = $cacheFactory("OvhApiIpLoadBalancingFrontend" + frontendType + "Lexi");
                         var queryCache = $cacheFactory("OvhApiIpLoadBalancingFrontend" + frontendType + "LexiQuery");

                         var interceptor = {
                             response: function (response) {
                                 cache.remove(response.config.url);
                                 queryCache.removeAll();
                                 return response.resource;
                             }
                         };

                         var iplbFrontend = $resource("/ipLoadbalancing/:serviceName/" + type + "/frontend/:frontendId", {
                             serviceName: "@serviceName",
                             frontendId: "@frontendId"
                         }, {
                             query: { method: "GET", isArray: true, cache: queryCache },
                             get: { method: "GET", cache: cache },
                             post: { method: "POST", interceptor: interceptor },
                             put: { method: "PUT", interceptor: interceptor },
                             "delete": { method: "DELETE", interceptor: interceptor }
                         });

                         iplbFrontend.resetCache = function () {
                             cache.removeAll();
                         };

                         iplbFrontend.resetQueryCache = function () {
                             queryCache.removeAll();
                         };

                         return iplbFrontend;
                     }]);
    });
})();

