Practice Test Test Automation Plan

Mode: Agent

Step 1: Immediate Analysis & Test Creation
1. Open [Practice Test Automation](https://practicetestautomation.com/) in your browser 
2. Navigate to the contacts tab
3. Quickly scan for 5-7 critical test scenarios (prioritize visible elements)
4. Create testcases to validate all elements in the contacts tab
5. Submit a contact form with valid data and verify the thanks message
6. Validate the contact form fields such as name, email, and message
7. Validate the contact form submission by checking if the data is sent correctly and the thank you message is displayed
8. Also check the contact form validation for empty fields and invalid email formats
9. Before starting every test execution, ensure you are logged out of the application

*Focus Areas:*
Visible UI elements
Core functionality
User workflows
Form validations
Navigations

Step 2: Instant Execution & Validation
1. Before creating actual spec file, execute identified scenarios using Playwright MCP
2. Verify all tests pass in the first run
3. For any failures:
Fix assertions or selectors
Rerun until all tests pass
Repeat the fix-and-rerun process until a 100% pass rate is achieved.
Before starting every test execution, ensure you are logged out of the application


*Validation Criteria:*
100% pass rate
Accurate selectors
Proper assertions

Step 3: Rapid Test Implementation
1. Generate a single `practice-test-contact.spec.ts` file in tests folder with all tests
2. Keep tests simple and direct
3. Focus on Chromium only
4. Include essential assertions for each test