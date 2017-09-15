angular.module("ovh-api-services").service("OvhApiCloudDbStdInstanceLexi", function ($resource, $cacheFactory) {
    "use strict";

    var cache = $cacheFactory("OvhApiCloudDbStdInstanceLexi");
    var queryCache = $cacheFactory("OvhApiCloudDbStdInstanceLexiQuery");
    var interceptor = {
        response: function (response) {
            cache.removeAll();
            queryCache.removeAll();
            return response.data;
        }
    };

    var resource = $resource("/cloudDB/:projectId/standard/instance/:instanceId", {
        projectId: "@projectId",
        instanceId: "@instanceId"
    }, {
        query: { method: "GET", isArray: true },
        get: { method: "GET", cache: cache },
        edit: { method: "PUT", interceptor: interceptor },
        getConfiguration: {
            url: "/cloudDB/:projectId/standard/instance/:instanceId/configuration",
            method: "GET",
            cache: cache
        },
        updateConfiguration: {
            url: "/cloudDB/:projectId/standard/instance/:instanceId/configuration/update",
            method: "POST",
            cache: cache,
            interceptor: interceptor
        }
    });

    resource.resetCache = function () {
        cache.removeAll();
    };

    resource.resetQueryCache = function () {
        queryCache.removeAll();
    };

    return resource;
});
