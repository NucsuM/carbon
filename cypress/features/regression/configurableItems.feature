Feature: Configurable Items component
  I want to change Configurable Items component

  Background: Open Configurable Items component in iframe
    Given I open "Configurable Items" component in iframe

  @positive @applitools
  Scenario Outline: Drag record inside Configurable Items element <record> to <destinationId> element position
    When I drag Configurable Items "<record>" to <destinationId>
    Then Configurable Items "<record>" is dragged to <destinationId>
      And Element displays correctly in iframe
    Examples:
      | record | destinationId |
      | test 1 | 1             |
      | test 1 | 2             |
      | test 1 | 3             |
      | test 2 | 1             |
      | test 2 | 2             |
      | test 2 | 3             |
      | test 3 | 1             |
      | test 3 | 2             |
      | test 3 | 3             |
