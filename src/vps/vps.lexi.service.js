angular.module("ovh-api-services").service("OvhApiVpsLexi", function ($resource, $cacheFactory) {
    "use strict";

    var cache = $cacheFactory("OvhApiVpsLexi");
    var queryCache = $cacheFactory("OvhApiVpsLexiQuery");

    var interceptor = {
        response: function (response) {
            cache.remove(response.config.url);
            queryCache.removeAll();
            return response;
        }
    };

    var vps = $resource("/vps/:serviceName", {
        serviceName: "@serviceName"
    }, {
        query: { method: "GET", isArray: true, cache: queryCache },
        get: { method: "GET", cache: cache },
        edit: { method: "PUT", interceptor: interceptor },
        getMonitoring: {
            url: "/vps/:serviceName/monitoring",
            method: "GET",
            period: "@period",
            type: "@type",
            cache: cache
        }
    });

    vps.resetCache = function () {
        cache.removeAll();
    };

    vps.resetQueryCache = function () {
        queryCache.removeAll();
    };

    return vps;
});
