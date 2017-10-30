/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // check if each feed in the allFeeds object has a URL define and that the URL is not empty
        it('has URL and not empty', function () {
            allFeeds.forEach(function (element) {
                expect(element.url).toBeDefined();
                expect(element.url).toBeTruthy();
            });
        });

        // check if each feed in the allFeeds object has a Name define and that the URL is not empty
        it('has name and not empty', function () {
            allFeeds.forEach(function (element) {
                expect(element.name).toBeDefined();
                expect(element.name).toBeTruthy();
            });
        });
    });


    // new test suite for the menu
    describe('The menu', function () {
        // check if the menu is hidden by default
        it('is hidden by default', function () {
            // VARS
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        // check if the menu icon is working
        it('changes visibility when the menu icon is clicked', function () {
            // VARS
            let $menuIcon = $('.menu-icon-link');
            let $body = $('body');

            $menuIcon.triggerHandler('click');
            expect(!$body.hasClass('menu-hidden')).toBeTruthy();

            $menuIcon.triggerHandler('click');
            expect($body.hasClass('menu-hidden')).toBeTruthy();
        });
    });


    // new test suite for the data
    describe('Initial Entries', function () {
        // call it before each test case       
        beforeEach(function (done) {
            // LOAD NEW DATA
            loadFeed(0, done);
        });

        // check if the loadFeed function is working
        it('ensures when the loadFeed there is at least a single .entry element', function () {
            // VARS
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    // new test suite for the New Feed Selection
    describe('New Feed Selection', function () {
        // VARS
        let $container;
        let html1, html2;

        // call it before each test case
        beforeEach(function (done) {
            // VARS
            $container = $('.feed');
            // LOAD NEW DATA
            Promise.all([
                new Promise(function (resolve) {
                    loadFeed(0, function () {
                        html1 = $container.html();
                        resolve();
                    });
                }),
                new Promise(function (resolve) {
                    loadFeed(1, function () {
                        html2 = $container.html();
                        resolve();
                    });
                })
            ]).then(function () {
                done();
            });
        });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */


        it('content actually changes', function () {
            // VARS
            expect(html1).not.toBe(html2);
        });
    });
}());