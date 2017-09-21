angular.module("ovh-api-services").service("OvhApiCloudDb", function ($injector) {
    "use strict";

    return {
        Lexi: function () {
            return $injector.get("OvhApiCloudDbLexi");
        },
        Dump: function () {
            return $injector.get("OvhApiCloudDbDump");
        },
        StandardInstance: function () {
            return $injector.get("OvhApiCloudDbStdInstance");
        }
    };
});
