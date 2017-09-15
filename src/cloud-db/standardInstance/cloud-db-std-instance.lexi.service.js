angular.module("ovh-api-services").service("OvhApiCloudDbStdInstance", function ($injector) {
    "use strict";

    return {
        Lexi: function () {
            return $injector.get("OvhApiCloudDbStdInstanceLexi");
        },
        WhiteList: function () {
            return $injector.get("OvhApiCloudDbStdInstanceWhiteList");
        }
    };
});
