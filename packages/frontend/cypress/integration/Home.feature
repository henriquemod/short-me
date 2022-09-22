Feature: Home Page

  I want to use Home page

  Background:
    Given I go to home page
    Then I see "Short Me" in the title

  @focus
  Scenario: I create a short link
    When I type 'http://google.com.br' in input id 'insert-url-2'
    And I click on 'insert-button'
    Then I should see 'Your url was successfully shortened.'
    And I should see 'http://google.com.br'

  @focus
  Scenario: I copy a short url
    When I type 'http://google.com.br' in input id 'insert-url-2'
    And I click on 'insert-button'
    Then I should see 'Your url was successfully shortened.'

    When I click on 'copy-button'
    Then I should see 'Url copied to your clipboard.'

  @focus
  Scenario: I delete a short url
    When I type 'http://google.com.br' in input id 'insert-url-2'
    And I click on 'insert-button'
    Then I should see 'Your url was successfully shortened.'

    When I click on 'delete-button'
    Then I should see 'Url has been deleted.'

  @focus
  Scenario: I try to create a short url with invalid url
    When I type '1' in input id 'insert-url-2'
    And I click on 'insert-button'
    Then I should see 'An error ocurred, please try again later.'




