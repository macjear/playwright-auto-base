@web @login
Feature: Login
  As a user of the CURA Healthcare website
  I want to be able to log in
  So that I can access the appointment system

  Background:
    Given I open the login page

  @smoke @critical
  Scenario: Successful login with valid credentials
    When I login with username "John Doe" and password "ThisIsNotAPassword"
    Then I should see the appointment page

  @regression
  Scenario Outline: Unsuccessful login with invalid credentials
    When I login with username "<username>" and password "<password>"
    Then I should see an error message "Login failed! Please ensure the username and password are valid."

    Examples:
      | username              | password                                           | description                    |
      | John Doe              | WrongPassword                                      | wrong password                 |
      |                       |                                                    | empty fields                   |
      | John Doe              |                                                    | empty password                 |
      |                       | ThisIsNotAPassword                                 | empty username                 |
      | John Doe              | !@#$%^&*()                                         | special characters in password |
      | John Doe              | ThisIsAVeryLongPasswordThatExceedsTheMaximumLength | long password                  |
      | John Doe              | ' OR '1'='1                                        | SQL injection in password      |
      | ' OR '1'='1           | ThisIsNotAPassword                                 | SQL injection in username      |
      | John Doe              | <script>alert('XSS')</script>                      | XSS in password                |
      | <script>alert('XSS')  | ThisIsNotAPassword                                 | XSS in username                |
      | John Doe              | <b>Bold</b>                                        | HTML injection in password     |
      | john doe              | thisisnotapassword                                 | case sensitivity               |
      | Jane Doe              | ThisIsNotAPassword                                 | non-existent user              |