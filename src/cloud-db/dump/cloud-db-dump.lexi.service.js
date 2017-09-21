angular.module("ovh-api-services").service("OvhApiCloudDbDumpLexi", function ($resource, $cacheFactory) {
    "use strict";

    var cache = $cacheFactory("OvhApiCloudDbDumpLexi");
    var queryCache = $cacheFactory("OvhApiCloudDbDumpLexiQuery");
    var interceptor = {
        response: function (response) {
            cache.removeAll();
            queryCache.removeAll();
            return response.data;
        }
    };

    var resource = $resource("/cloudDB/:projectId/dump/:dumpId", {
        projectId: "@projectId",
        dumpId: "@dumpId"
    }, {
        query: { method: "GET", isArray: true },
        get: { method: "GET", cache: cache },
        remove: { method: "DELETE", interceptor: interceptor }
    });

    resource.resetCache = function () {
        cache.removeAll();
    };

    resource.resetQueryCache = function () {
        queryCache.removeAll();
    };

    return resource;
});
