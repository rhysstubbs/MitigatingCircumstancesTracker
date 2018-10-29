import ApplicationContainer from './containers/application';

//import 'bootstrap';
//import 'jquery';

const appContainer = 'app';

// Mount the application
if (document.getElementById(appContainer) != null) {
    ApplicationContainer.mount(appContainer);
}
