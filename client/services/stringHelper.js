angular
    .module("sehajPaathTracker")
    .service("stringHelper", stringHelper);

function stringHelper() {
    var service = this;

    service.format = function (string, context) {
        return string.replace(/\{(\S+)\}/g, function (str, key) { return context[key] });
    }
}