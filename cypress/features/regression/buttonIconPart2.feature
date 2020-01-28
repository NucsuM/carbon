Feature: Button component
  I want to check Button component properties

  Background: Open Button component page default
    Given I open "Button" component page
      And I check has icon checkbox

  @positive
  Scenario Outline: Set Button icon to <iconType>
    When I select iconType to "<iconType>"
    Then Button icon is set to "<iconType>"
    Examples:
      | iconType        |
      | favourite       |
      | favourite_lined |
      | fax             |
      | feedback        |
      | filter          |
      | filter_new      |
      | fit_height      |
      | fit_width       |
      | folder          |
      | gift            |
      | graph           |
      | grid            |
      | home            |
      | image           |
      | in_progress     |
      | in_transit      |
      | info            |
      | individual      |
      | key             |
      | link            |
      | list_view       |
      | locked          |
      | location        |
      | logout          |
      | marker          |
      | message         |
      | minus           |
      | minus_large     |
      | mobile          |
      | pdf             |
      | people          |
      | person          |
      | phone           |
      | play            |
      | plus            |
      | plus_large      |
      | print           |
      | progress        |
      | progressed      |
      | question        |
      | refresh         |
      | remove          |
      | save            |
      | search          |
      | services        |
      | settings        |
      | share           |
      | shop            |
      | sort_down       |
      | sort_up         |
      | submitted       |
      | sync            |
      | tick            |
      | unlocked        |
      | upload          |
      | uploaded        |
      | video           |
      | view            |
      | warning         |