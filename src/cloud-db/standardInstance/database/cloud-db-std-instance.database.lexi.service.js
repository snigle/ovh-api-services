angular.module("ovh-api-services").service("OvhApiCloudDbStdInstanceDatabaseLexi", function ($resource, $cacheFactory) {
    "use strict";

    var cache = $cacheFactory("OvhApiCloudDbStdInstanceDatabaseLexi");
    var queryCache = $cacheFactory("OvhApiCloudDbStdInstanceDatabaseLexiQuery");
    var interceptor = {
        response: function (response) {
            cache.removeAll();
            queryCache.removeAll();
            return response.data;
        }
    };

    var resource = $resource("/cloudDB/:projectId/standard/instance/:instanceId/database/:databaseId", {
        projectId: "@projectId",
        instanceId: "@instanceId",
        databaseId: "@databaseId"
    }, {
        query: { method: "GET", isArray: true },
        get: { method: "GET", cache: cache },
        post: { method: "POST", interceptor: interceptor },
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
