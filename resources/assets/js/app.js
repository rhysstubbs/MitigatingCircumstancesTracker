import ApplicationContainer from './containers/application';

const appContainer = 'app';

/**
 * APPLICATION ENTRY POINT
 */

// Mount the application
if (document.getElementById(appContainer) != null) {
    ApplicationContainer.mount(appContainer);


    // Uncomment to find elements wider than viewport
    /**var docWidth = document.documentElement.offsetWidth;

    [].forEach.call(
        document.querySelectorAll('*'),
        function (el) {
            if (el.offsetWidth > docWidth) {
                console.log(el);
            }
        }
    );*/
}

/**
 * CUSTOM PROTOTYPE FUNCTIONS & HELPERS
 */

String.prototype.toPascalCase = function () {

    const pascalise = function (str) {
        return str.charAt(0).toUpperCase() + str.substr(1, str.length);
    };

    let strArray = this.split(" ");

    if (strArray.length === 1) {
        return pascalise(this);
    } else {

        return this.reduce((str) => (pascalise(str) + ""));
    }

};

String.prototype.splitByCaps = function () {
    return this.split(/(?=[A-Z])/).join(" ");
};