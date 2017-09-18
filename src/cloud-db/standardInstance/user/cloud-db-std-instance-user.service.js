angular.module("ovh-api-services").service("OvhApiCloudDbStdInstanceUser", function ($injector) {
    "use strict";

    return {
        Lexi: function () {
            return $injector.get("OvhApiCloudDbStdInstanceUserLexi");
        }
    };
});
