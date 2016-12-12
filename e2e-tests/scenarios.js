'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /selectTeam when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/selectTeam");
  });


  describe('selectTeam', function() {

    beforeEach(function() {
      browser.get('index.html#!/selectTeam');
    });


    it('should render selectTeam when user navigates to /selectTeam', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('startPage', function() {

    beforeEach(function() {
      browser.get('index.html#!/startPage');
    });


    it('should render startPage when user navigates to /startPage', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
