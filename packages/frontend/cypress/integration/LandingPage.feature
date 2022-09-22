Feature: Landing Page

    I want to use Landing page

    @focus
    Scenario: Should wait timer finish in order to enable button

        Given I have a short url
        And I go to my created short url
        Then The element 'url-button' should be disabled
        And I wait timer finishes
        And The element 'url-button' should be enabled

    @focus
    Scenario: Should show message when no key is finded

        Given I go to '/invalidkey'
        Then I should see 'The URL you tried either is wrong or no longer exists'
