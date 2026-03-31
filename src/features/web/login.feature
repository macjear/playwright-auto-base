@web
Feature: Login

  Scenario: Successful login
    Given I open the login page
    When I login with username "John Doe" and password "ThisIsNotAPassword"
    Then I should see the appointment page

  Scenario: Unsuccessful login
    Given I open the login page
    When I login with username "John Doe" and password "WrongPassword"
    Then I should see an error message "Login failed! Please ensure the username and password are valid."  

  Scenario: Unsuccessful login with empty fields
    Given I open the login page
    When I login with username "" and password ""
    Then I should see an error message "Login failed! Please ensure the username and password are valid."

  Scenario: Unsuccessful login with empty password
    Given I open the login page
    When I login with username "John Doe" and password ""
    Then I should see an error message "Login failed! Please ensure the username and password are valid."  

  Scenario: Unsuccessful login with empty username
    Given I open the login page
    When I login with username "" and password "ThisIsNotAPassword"
    Then I should see an error message "Login failed! Please ensure the username and password are valid."  

  Scenario: Unsuccessful login with special characters
    Given I open the login page
    When I login with username "John Doe" and password "!@#$%^&*()"
    Then I should see an error message "Login failed! Please ensure the username and password are valid."
  
  Scenario: Unsuccessful login with long credentials
    Given I open the login page
    When I login with username "John Doe" and password "ThisIsAVeryLongPasswordThatExceedsTheMaximumLength"
    Then I should see an error message "Login failed! Please ensure the username and password are valid."

  Scenario: Unsuccessful login with SQL injection
    Given I open the login page     
    When I login with username "John Doe" and password "' OR '1'='1"
    Then I should see an error message "Login failed! Please ensure the username and password are valid."

  Scenario: Unsuccessful login with XSS attack
    Given I open the login page
    When I login with username "John Doe" and password "<script>alert('XSS')</script>"
    Then I should see an error message "Login failed! Please ensure the username and password are valid."

  Scenario: Unsuccessful login with HTML injection
    Given I open the login page
    When I login with username "John Doe" and password "<b>Bold</b>"
    Then I should see an error message "Login failed! Please ensure the username and password are valid."
  
  Scenario: Unsuccessful login with whitespace
    Given I open the login page 
    When I login with username "John Doe" and password "   "
    Then I should see an error message "Login failed! Please ensure the username and password are valid."  

  Scenario: Unsuccessful login with case sensitivity
    Given I open the login page
    When I login with username "john doe" and password "thisisnotapassword"
    Then I should see an error message "Login failed! Please ensure the username and password are valid."
    
  Scenario: Unsuccessful login with leading/trailing whitespace
    Given I open the login page
    When I login with username " John Doe " and password " ThisIsNotAPassword "
    Then I should see an error message "Login failed! Please ensure the username and password are valid."

  Scenario: Unsuccessful login with non-existent user
    Given I open the login page
    When I login with username "Jane Doe" and password "ThisIsNotAPassword"
    Then I should see an error message "Login failed! Please ensure the username and password are valid."

  Scenario: Unsuccessful login with SQL injection in username
    Given I open the login page
    When I login with username "' OR '1'='1" and password "ThisIsNotAPassword"
    Then I should see an error message "Login failed! Please ensure the username and password are valid."      

  Scenario: Unsuccessful login with XSS attack in username
    Given I open the login page
    When I login with username "<script>alert('XSS')</script>" and password "ThisIsNotAPassword"
    Then I should see an error message "Login failed! Please ensure the username and password are valid."

  Scenario: Unsuccessful login with HTML injection in username
    Given I open the login page
    When I login with username "<b>Bold</b>" and password "ThisIsNotAPassword"
    Then I should see an error message "Login failed! Please ensure the username and password are valid."

  Scenario: Unsuccessful login with whitespace in username
    Given I open the login page
    When I login with username "   " and password "ThisIsNotAPassword"
    Then I should see an error message "Login failed! Please ensure the username and password are valid."
 
  Scenario: Unsuccessful login with case sensitivity in username
    Given I open the login page
    When I login with username "john doe" and password "ThisIsNotAPassword"
    Then I should see an error message "Login failed! Please ensure the username and password are valid."

  Scenario: Unsuccessful login with leading/trailing whitespace in username
    Given I open the login page
    When I login with username " John Doe " and password "ThisIsNotAPassword"
    Then I should see an error message "Login failed! Please ensure the username and password are valid."
    
  Scenario: Unsuccessful login with non-existent user in username
    Given I open the login page
    When I login with username "Jane Doe" and password "ThisIsNotAPassword"
    Then I should see an error message "Login failed! Please ensure the username and password are valid."