// This is the spec file that Jasmine will read and contains
// all of the tests that will be run against your application.
//
// We're placing all of our tests within the $() function,
// since some of these tests may require DOM elements. We want
// to ensure they don't run until the DOM is ready.

$(function() {

  // Testing suite of RSS Feeds
  describe("RSS Feeds", function() {

    // Make sure all feeds are defined, not empty
    it("are defined", function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds instanceof Array).toBeTruthy();
      expect(allFeeds.length).not.toBe(0);
    });

    // Make sure all feeds have URL that starts with "http(s)://"
    it("have URLs", function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
        expect(feed.url).toMatch(/^(http|https):\/\//);
      });
    });

    // Make sure all feeds have names (String), not empty
    it("have names", function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(typeof feed.name).toBe("string");
        expect(feed.name.length).not.toBe(0);
      });
    });
  });

  // Testing suite of Menu
  describe("The menu", function() {

    // Pre-define elements needed for testing hiding/showing of the menu
    var body = document.body;
    var menuIcon = document.querySelector(".menu-icon-link");

    // Make sure the menu is hidden initially
    it("body has 'menu-hidden' initially", function() {
      expect(body.className).toContain("menu-hidden");
    });

    // Make sure menu icon toggles hide/show on clicking
    it("body toggles the class 'menu-hidden' on clicking menu icon", function() {
      menuIcon.click();
      expect(body.className).not.toContain("menu-hidden");

      menuIcon.click();
      expect(body.className).toContain("menu-hidden");
    });
  });

  // Testing suite of Initial Entries
  describe("Initial Entries", function() {

    // Avoid duplicated setup
    // Before loading feed
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    // Load "loadFeed" function is called and completes it, and there
    // should at least 1 .entry element in the .feed contianer
    it("has at least 1 entry after loadFeed function is called", function(done) {
      var numEntries = document.querySelector(".feed").getElementsByClassName("entry").length;
      expect(numEntries).toBeGreaterThan(0);
      done();
    });

    // Make sure each (.feed .entry-link) element has valid link
    it("has a entry that has a link starting with 'http(s)://'", function(done) {
      var entries = document.querySelector(".feed").getElementsByClassName("entry-link");
      for(var i = 0; i < entries.length; i++){
        expect(entries[i].href).toMatch(/^(http|https):\/\//);
      }
      done();
    });
  });

  // Testing suite of New Feed Selection
  describe("New Feed Selection", function() {

    // Avoid duplicated setup
    // Initial loaded feed setup
    var initFeedSelection;
    beforeEach(function(done) {
      loadFeed(0, function() {
        initFeedSelection = document.querySelector(".feed").innerHTML;

        loadFeed(1, function() {
          done();
        });
      });
    });

    // Make sure when new feed is loaded using loadFeed function,
    // the content changes
    it("changes its loaded content", function(done) {
      var newFeedSelection = document.querySelector(".feed").innerHTML;
      expect(initFeedSelection).not.toBe(newFeedSelection);
      done();
    });
  });

}());
