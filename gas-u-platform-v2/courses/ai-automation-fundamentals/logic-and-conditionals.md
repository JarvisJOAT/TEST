---
title: "Logic and Conditionals"
description: "Move beyond simple linear workflows by adding conditional logic that allows your automations to make decisions."
---
# Lesson 8: Logic and Conditionals

## Introduction
The most powerful workflows are not just a straight line of steps; they can adapt and change their behavior based on the data they receive. **Conditional Logic** (also known as IF/THEN/ELSE logic) is what gives your workflow this decision-making power.

## Core Components

1.  **IF/ELSE Node (or Router/Switch):** Most workflow tools have a specific node for this. It checks one or more conditions.
    *   If a condition is **true**, the workflow proceeds down one path.
    *   If the condition is **false**, it proceeds down a different path.

2.  **Conditions:** A condition is a statement that evaluates to either true or false.
    *   **Equals:** `User_Country` equals "USA"
    *   **Contains:** `Email_Subject` contains "Urgent"
    *   **Greater Than:** `Order_Amount` is greater than 100
    *   **Is Empty:** `Shipping_Address` is empty

## Example: Email Triage
Imagine a workflow that processes incoming emails.

1.  **Trigger:** New email arrives.
2.  **IF/ELSE Node:** Checks the condition: Does the email subject contain the word "Invoice"?
    *   **IF TRUE:** The workflow follows the "Yes" path, forwarding the email to the accounting department.
    *   **IF FALSE:** The workflow follows the "No" path, proceeding to another IF/ELSE node that checks if the subject contains "Support", and so on.

## Multiple Conditions (AND/OR)
You can often combine conditions:
*   **AND:** Both conditions must be true. (e.g., `Order_Amount` > 100 AND `User_Country` is "Canada")
*   **OR:** At least one of the conditions must be true. (e.g., `Email_Subject` contains "Urgent" OR `Email_Priority` is "High")

## Conclusion
Conditional logic is the key to creating dynamic, intelligent workflows. By using IF/ELSE nodes to route your data based on specific conditions, you can build automations that handle a wide variety of situations.
