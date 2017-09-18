angular.module("ovh-api-services").service("OvhApiCloudDbStdInstanceDatabase", function ($injector) {
    "use strict";

    return {
        Lexi: function () {
            return $injector.get("OvhApiCloudDbStdInstanceDatabaseLexi");
        }
    };
});
