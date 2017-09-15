angular.module("ovh-api-services").service("OvhApiCloudDbStdInstanceWhiteList", function ($injector) {
    "use strict";

    return {
        Lexi: function () {
            return $injector.get("OvhApiCloudDbStdInstanceWhiteListLexi");
        }
    };
});
