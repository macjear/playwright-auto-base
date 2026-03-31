@web
Feature: Creating an appointment on the healthcare website
  As a user of the healthcare website, I want to be able to create an appointment so that I can receive the medical care I need.
  
  Scenario: Successfully creating an appointment
    Given I open the login page
    When I login with username "John Doe" and password "ThisIsNotAPassword"
    And I should see the appointment page
    When I select the "Tokyo CURA Healthcare Center" facility
    And I check the "Apply for hospital readmission" checkbox
    And I select "Medicaid" from the "Healthcare Program" options
    And I enter "07/01/2026" as the visit date
    And I enter "Looking forward to my appointment!" in the comment box
    And I click the "Book Appointment" button
    Then I should see an appointment confirmation page

    # Scenario: Attempting to create an appointment with missing required fields
    # Given I open the login page
    # When I login with username "John Doe" and password "ThisIsNotAPassword"
    # And I should see the appointment page
    # When I select the "Tokyo CURA Healthcare Center" facility
    # And I check the "Apply for hospital readmission" checkbox
    # And I select "Medicaid" from the "Healthcare Program" options       
    # And I click the "Book Appointment" button
    # Then I should see an error message from appointment page as "Please fill out this field."

    # Scenario: Attempting to create an appointment with an invalid date
    # Given I open the login page 
    # When I login with username "John Doe" and password "ThisIsNotAPassword"
    # And I should see the appointment page
    # When I select the "Tokyo CURA Healthcare Center" facility
    # And I check the "Apply for hospital readmission" checkbox
    # And I select "Medicaid" from the "Healthcare Program" options
    # And I enter "2024/02/30" as the visit date
    # And I enter "Looking forward to my appointment!" in the comment box
    # And I click the "Book Appointment" button
    # Then I should see an error message from appointment page as "Please enter a valid date for your appointment."


           

