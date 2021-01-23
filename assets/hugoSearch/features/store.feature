Feature: Store
  Scenario: Creating a new store
    Given a store that is created with the value "test"
    Then  the created store should hold the value "test"

  Scenario: Subscribing to a store
    Given a store that is created with the value "makeni"
    When  subscribed to that store
    Then  the callback method is called inmediatly

  Scenario: Changing store value
    Given a store that is created with the value "school"
    And   subscribed to that store
    When  the value of the store changes to "hospital"
    Then  the callback method is called with "hospital"
