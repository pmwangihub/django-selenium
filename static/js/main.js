
/**
* @mwangihub github link: https://github.com/mwangihub
* Website: https://www.pminnovest.com/
* Author: Peter Mwangi
* License: MIT
* @summary I like old JS syntax, after all it works
*/

/**
 * @mwangihub 
 * @summary Utility function to select elements
 * @param {*} selector 
 * @param {*} all 
 * @returns null
 */
function select(selector, all = false) {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}


(function () {
    /**
     * @mwangihub
     * @summary Handle hash scroll events Change
     *          this is to offload unnecessary functionality in react application
     * @returns  null
     */
    function handleHashChange() {
        try {
            let arrayOfTargetSections = select('#section_tag', true);
            arrayOfTargetSections.forEach(section => {
                section.addEventListener("click", event => {
                    arrayOfTargetSections.forEach(target => target.classList.remove('highlight'));
                    const targetSection = event.target.getAttribute('data-target');
                    const targetElement = select(`[data-section="${targetSection}"]`);
                    if (targetElement) {
                        targetElement.classList.add("highlight");
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        } catch (error) {

        }

    }
    document.addEventListener('DOMContentLoaded', handleHashChange);

})();


let preloader = select('#preloader');
if (preloader) {
    window.addEventListener('load', () => {
        preloader.remove()
    });
}