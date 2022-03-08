# nate.challenge.consumer

Technical challenge for Consumer Team engineering candidates

## Overview

nate is a universal shopping experience that is designed to purchase any online product on behalf of a user.

## Challenges

The challenge is different for full-stack and backend candidates.

### Backend

* Create an endpoint in the API to purchase a product with a certain ID
  * Use `lib/purchase-api.ts` to execute a purchase
* Design a risk assessment flow with provided `lib/risk-api.ts` functions and `lib/action-api.ts` actions
  * Assume that more than 1 missed payment should reject the purchase
  * The balance should cover the cost of the product and reject otherwise
  * The risk score should be less than 80 to accept, above 90 to reject, and anything in-between should be flagged

#### General Notes

* The solution should include automated tests
* The code should be readable, well-factored, and easily testable

### Full Stack

* Implement web app functionality to fetch product data from `/products` endpoint and display to the user
* Create a purchase product endpoint in the API
* Add some UI for products to execute a purchase using the new endpoint
* Refactor code & add some unit tests (web app & API)

### Objects

A seamless purchase experience is a crucial part of our platform, and it involves a few important objects:

`User`: the person purchasing a product through nate
* `userId` (`string`): uniquely identifies a `User`
* Other data about a user (email, billing address, etc) can be ignored for this exercise


`Product`: an item that can be purchased at an online shop
* `productId` (`string`): uniquely identifies a `Product`
* `productUrl` (`string`): the URL that is used to access the product page on the web
* `productPrice` (`number`): the price of a product (it can be assumed that this includes any taxes or fees)
* `discountCode` (optional `string`): a code that can be used on checkout to apply a discount


`Purchase`: an entity representing a `User` buying a `Product` through nate
 * `purchaseId` (`string`): uniquely identifies a `Purchase`
 * `paymentMethodId` (`string`): a reference to a user's payment method they are using for the purchase
 * `status` (`success | merchant-rejected | charge-failed | invalid-details`): the status of a purchase in nate's systems
   * `success`: indicates that the product was purchased successfully for the user
   * `merchant-rejected`: indicates that the merchant rejected this purchase because of issues on their end
   * `charge-failed`: indicates that the payment method was rejected when checking out
   * `invalid-details`: indicates that the details for the purchase are invalid

### Risk Assessment

Sometimes, people behave in a fraudulent manner. There are lots of ways this can happen, and it's business-critical for nate to evaluate purchase risk before going through and buying something on behalf of a user.

When a risk assessment is performed, the possible outcomes are:
* `accepted`: the risk level is low enough to proceed with the purchase
* `rejected`: the risk level is too high for this purchase
* `flagged_for_review`: the risk level is uncertain, and this purchase should be reviewed manually

## Project Layout

* `api`: server application that allows callers to interact with nate's systems
  * `src`: source code for the server
    * `index.ts`: the server entrypoint
      * `purchase-api.ts`: an interface for executing a purchase
      * `risk-api.ts`: a collection of interfaces for providing risk-related data about a user or payment method
      * `action-api.ts`: a collection of interfaces for accepting, rejecting, or flagging a purchase after risk assessment
    * `risk.ts`: source code for risk-related functionality
    * `lib`: external libraries & APIs that provide useful functionality for the business - **note that these APIs are asynchronous and should not be modified**
