@web @appointment
Feature: Creating an appointment on the healthcare website
  As a user of the healthcare website
  I want to be able to create an appointment
  So that I can receive the medical care I need

  Background:
    Given I open the login page
    When I login with username "John Doe" and password "ThisIsNotAPassword"
    Then I should see the appointment page

  @smoke @critical
  Scenario: Successfully creating an appointment
    When I select the "Tokyo CURA Healthcare Center" facility
    And I check the "Apply for hospital readmission" checkbox
    And I select "Medicaid" from the "Healthcare Program" options
    And I enter "07/01/2026" as the visit date
    And I enter "Looking forward to my appointment!" in the comment box
    And I click the "Book Appointment" button
    Then I should see an appointment confirmation page

  @regression
  Scenario: Attempting to create an appointment with missing visit date
    When I select the "Tokyo CURA Healthcare Center" facility
    And I check the "Apply for hospital readmission" checkbox
    And I select "Medicaid" from the "Healthcare Program" options
    And I click the "Book Appointment" button
    Then I should still be on the appointment page

  @regression
  Scenario Outline: Creating appointments for different facilities
    When I select the "<facility>" facility
    And I select "<program>" from the "Healthcare Program" options
    And I enter "07/15/2026" as the visit date
    And I click the "Book Appointment" button
    Then I should see an appointment confirmation page

    Examples:
      | facility                              | program  |
      | Hongkong CURA Healthcare Center       | Medicare |
      | Seoul CURA Healthcare Center          | None     |
      | Tokyo CURA Healthcare Center          | Medicaid |

