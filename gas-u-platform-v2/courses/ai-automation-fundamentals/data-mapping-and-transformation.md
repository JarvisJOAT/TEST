---
title: "Data Mapping and Transformation"
description: "Learn the critical skill of moving, changing, and structuring data as it flows through your workflows."
---
# Lesson 4: Data Mapping and Transformation

## Introduction
Data is the lifeblood of any workflow. It flows from the trigger through each node, but it's rarely in the perfect format for every step. **Data Mapping and Transformation** is the process of modifying this data so that each node in your workflow can understand and use it.

## What is Data Mapping?
Data mapping is the process of connecting data fields from one node (the source) to another (the target).
*   **Example:** You have a "New Contact" trigger from your CRM with fields like `FNAME` and `LNAME`. You want to send an email. In the email node, you map the `FNAME` source field to the `FirstName` variable in your email template.

## What is Data Transformation?
Data transformation is the process of changing the data itself.
*   **Changing Format:** Converting a date from `MM/DD/YYYY` to `YYYY-MM-DD`.
*   **Combining Data:** Joining a `FirstName` and `LastName` field to create a `FullName` field.
*   **Performing Calculations:** Calculating a total price by multiplying `Quantity` and `Price` fields.
*   **Conditional Logic:** Using an "IF" statement to output different values based on an input. For example, IF `Country` is "USA", output "Domestic". Otherwise, output "International".

## Why is this Important?
Different applications and APIs have different requirements for how data should be structured. A date format required by Google Calendar might be different from the one stored in your database. Data transformation is the bridge that allows these different systems to talk to each other.

## Conclusion
Mastering data mapping and transformation is what separates simple workflows from powerful, robust automations. It's a fundamental skill for ensuring data flows smoothly and accurately between all the steps in your process.
