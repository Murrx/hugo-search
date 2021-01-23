Feature: Lunr Search Provider

  Scenario: Search function
    Given an instance of LunrSearchProvider
    When  search is called with "carpenter"
    Then  index.search is called with "carpenter"

  Scenario: Search function empty query
    Given an instance of LunrSearchProvider
    When  search is called with ""
    Then  index.search is not called