// version: 1.2.0
// Google Apps Script code for Google Workspace Add-ons
// Apps Script QUnit Runner
class QUnitRunner {
    constructor(e) {
        console.log("QUnitRunner initialized - event:", e);
        console.log("version:", Static_Resources.package.version);
        console.log("build:", Static_Resources.package.build);
        // Initialize QUnit for testing
        QUnit.urlParams(e.parameter);
        QUnit.config({
            title: `${BasicTelegramBot_qUnit_Resources.title}.`
                + ` | version: ${Static_Resources.package.version}`
                + ` | build: ${Static_Resources.package.build}`,
            // hide passed tests as default
            // https://qunitjs.com/api/config/
            hidepassed: BasicTelegramBot_qUnit_Resources.hidepassed
        });

        //QUnit.config.hidepassed = true;
        QUnit.load(this.allTests.bind(this));
    }

    getHtml() {
        return QUnit.getHtml();
    }

    allTests() {
        // Run all tests
        this.test_types();
        this.test_helpers();
        // Run modules, views, controllers, and end-to-end tests
        this.test_services();
        this.test_views();
        this.test_controllers();
        this.test_e2eTriggers();
    }

    test_types() {
        
    }

    test_helpers() {        
        
    }

    test_services() {
    }

    test_views() {
        
    }

    test_controllers() {
        
    }


    test_e2eTriggers() {
    }
}