import ApplicationContainer from './containers/application';

const appContainer = 'app';

// Mount the application
if (document.getElementById(appContainer) != null) {
    ApplicationContainer.mount(appContainer);
}



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