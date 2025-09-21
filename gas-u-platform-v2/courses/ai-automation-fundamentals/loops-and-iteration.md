---
title: "Loops and Iteration"
description: "Learn how to process multiple items at once, such as rows in a spreadsheet or files in a folder."
---
# Lesson 9: Loops and Iteration

## Introduction
What if you need to perform the same action on a list of items? For example, sending a personalized email to 100 different subscribers. You don't want to build 100 separate steps. This is where **Loops and Iteration** come in.

## What is a Loop?
A loop is a structure that allows your workflow to repeat a set of actions for each item in a list.

## How It Works
Most automation tools handle this automatically or with a specific "Loop" or "Split" node.

1.  **Input is a List:** A node in your workflow outputs a list (an array) of items. This could be a list of email addresses from a database, rows from a spreadsheet, or files from a folder.
2.  **Iteration:** The workflow then takes this list and runs the *next* set of actions once for each individual item.
    *   On the first run (iteration 1), it processes item 1.
    *   On the second run (iteration 2), it processes item 2.
    *   ...and so on, until every item has been processed.
3.  **Aggregation (Optional):** After the loop is finished, you can optionally aggregate (combine) the results from all the individual runs back into a single list.

## Example: Processing Spreadsheet Rows
Imagine you have a Google Sheet with a list of new users.

1.  **Trigger:** Runs once a day on a schedule.
2.  **Node 1:** "Read Sheet" node gets all rows from the spreadsheet. This node outputs a list of 50 rows.
3.  **Loop:** The workflow now automatically iterates 50 times. In each iteration, the data for one row is available.
4.  **Node 2:** "Send Email" node uses the `email` and `name` from the current iteration's row to send a personalized welcome email.
5.  **Node 3:** "Update Row" node adds a "Yes" to the "Welcome Email Sent?" column for the current row.

## Conclusion
Loops are a cornerstone of efficient automation. They allow you to build a single, simple process that can scale to handle hundreds or thousands of items without any extra work. Any time you hear "for each item in a list," you should immediately think of using a loop.
