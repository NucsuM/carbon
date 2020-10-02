Feature: Link component
  I want to test Link component properties

  @positive
  Scenario Outline: Change Link target to <target>
    When I open default "Link" component in noIFrame with "link" json from "commonComponents" using "<nameOfObject>" object name
    Then Link on preview target is set to <target>
    Examples:
      | target | nameOfObject |
      | _blank | targetBlank  |
      | _self  | targetSelf   |
      | _top   | targetTop    |

  @positive
  Scenario Outline: Change Link children to <children>
    When I open default "Link" component in noIFrame with "link" json from "commonComponents" using "<nameOfObject>" object name
    Then children on preview is <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario: Disable Link component
    When I open default "Link" component in noIFrame with "link" json from "commonComponents" using "disabled" object name
    Then Link is disabled

  @positive
  Scenario: Enable Link component
    When I open default "Link" component in noIFrame with "link" json from "commonComponents" using "disabledFalse" object name
    Then Link is enabled

  @positive
  Scenario Outline: Change Link href to <href>
    When I open default "Link" component in noIFrame with "link" json from "commonComponents" using "<nameOfObject>" object name
    Then Link on preview href is set to <href>
    Examples:
      | href                         | nameOfObject         |
      | mp150ú¿¡üßä                  | hrefOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | hrefSpecialCharacter |

  @positive
  Scenario Outline: Change link component icon align position to <iconAlign>
    When I open default "Link" component in noIFrame with "link" json from "commonComponents" using "<nameOfObject>" object name
    Then icon align is set to "<iconAlign>"
    Examples:
      | iconAlign | nameOfObject   |
      | left      | iconAlignLeft  |
      | right     | iconAlignRight |

  @positive
  Scenario Outline: Change tooltip align to <tooltipAlign>
    When I open default "Link" component in noIFrame with "link" json from "commonComponents" using "<nameOfObject>" object name
      And I hover mouse onto "add" icon in no iFrame
    Then tooltipAlign is set to "<tooltipAlign>"
    Examples:
      | tooltipAlign | nameOfObject       |
      | left         | tooltipAlignLeft   |
      | right        | tooltipAlignRight  |
      | top          | tooltipAlignTop    |
      | bottom       | tooltipAlignBottom |
      | center       | tooltipAlignCenter |

  @positive
  Scenario Outline: Change tooltip tooltipPosition to <tooltipPosition>
    When I open default "Link" component in noIFrame with "link" json from "commonComponents" using "<nameOfObject>" object name
      And I hover mouse onto "add" icon in no iFrame
    Then tooltipPosition is set to "<tooltipPosition>"
    Examples:
      | tooltipPosition | nameOfObject          |
      | right           | tooltipPositionRight  |
      | left            | tooltipPositionLeft   |
      | bottom          | tooltipPositionBottom |
      | top             | tooltipPositionTop    |

  @positive
  Scenario: Link is tabbable
    When I open default "Link" component in noIFrame with "link" json from "commonComponents" using "tabbable" object name
    Then Link is tabbable

  @positive
  Scenario: Link is not tabbable
    When I open default "Link" component in noIFrame with "link" json from "commonComponents" using "tabbableFlase" object name
    Then Link is not tabbable

  @positive
  Scenario: Change type of icon for a Link component to feedback
    When I open default "Link" component in noIFrame with "link" json from "commonComponents" using "icon" object name
    Then icon on link component preview is "feedback"