angular.module("ovh-api-services").service("OvhApiCloudDbDump", function ($injector) {
    "use strict";

    return {
        Lexi: function () {
            return $injector.get("OvhApiCloudDbDumpLexi");
        }
    };
});
