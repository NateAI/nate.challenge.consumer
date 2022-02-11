# nate.challenge.consumer
Technical challenge for Consumer Team engineering candidates

The challenge is different for full-stack and backend candidates.

## Full Stack

- Implement web app functionality to fetch product data from `/products` endpoint and display to the user
- Create a purchase product endpoint in the API
- Add some UI for products to execute a purchase using the new endpoint
- Create risk assessment flow for incoming purchases using provided lib functions
- Refactor code & add some unit tests (web app & API)

## Backend

- Create a purchase product endpoint in the API
- Use library functions to fetch product metadata (options) & discounts for an item from URL
  - In purchase request, include product ID and selected options
- Design a risk assessment flow with provided lib functions
  - Assume that more than 1 missed payment should reject the purchase
  - The balance should cover the cost of the product and reject otherwise
  - The risk score should be less than 80 and reject otherwise
- Reorganize/refactor the code to improve the structure & testability
- Add at least one meaningful test
