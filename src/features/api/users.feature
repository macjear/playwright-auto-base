@api @users
Feature: CURA Application HTTP Endpoint Tests
  As a consumer of the CURA website
  I want to verify key HTTP endpoints are reachable and return expected status codes
  So that I can detect availability regressions

  @smoke @api
  Scenario: Home page returns 200
    When I send a GET request to "/"
    Then the response status code should be 200

  @regression @api
  Scenario: Login page returns 200
    When I send a GET request to "/profile.php#login"
    Then the response status code should be 200

  @regression @api
  Scenario: Non-existent page returns 404
    When I send a GET request to "/nonexistent-page-xyz"
    Then the response status code should be 404
