import ApplicationContainer from './containers/application';

const appContainer = 'app';

// Mount the dashboard.html
if (document.getElementById(appContainer) != null) {
    ApplicationContainer.mount(appContainer);
}
