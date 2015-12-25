angular
    .module("sehajPaathTracker")
    .directive("editPaathTitle", editPaathTitleDirective);

function editPaathTitleDirective() {
    return {
        scope: {},
        controller: 'EditPaathTitleCtrl',
        controllerAs: 'vm',
        bindToController: {
            title: "&",
            onSave: "&",
            onCancel: "&"
        }
    };
}