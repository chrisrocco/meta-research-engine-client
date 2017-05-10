import $ from 'jquery';
import Site from 'Site';

const EMAIL_SELECTOR = ".bd-email";
const NAME_SELECTOR = ".bd-name";

class BigData extends Site {
    processed(){
        super.processed();
        this.renderSession();
    }

    renderSession(){
        // TODO
    }
}

let instance = null;
function getInstance() {
    if (!instance) {
        instance = new BigData();
    }
    return instance;
}
function run() {
    let site = getInstance();
    site.run();
}
export default BigData;
export {
    BigData,
    run,
    getInstance
};