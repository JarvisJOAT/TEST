---
title: "Triggers and Scheduling"
description: "Learn how to kick off your automations automatically based on events or schedules."
---
# Lesson 3: Triggers and Scheduling

## Introduction
A workflow is useless if you have to start it manually every time. **Triggers** are the starting point of all automations. They are the specific events that "trigger" a workflow to run.

## Types of Triggers

There are two primary categories of triggers:

### 1. Event-Based Triggers
These triggers run whenever a specific event occurs in an application or service. They are the foundation of real-time automation.
*   **Webhook Triggers:** Many apps can send a "webhook" (a simple HTTP request) when something happens. Your workflow listens for this webhook and starts immediately. Example: A new sale in your Shopify store triggers a workflow to update your accounting software.
*   **App-Specific Triggers:** Many platforms have built-in triggers for common events. Examples: "On New Email" in Gmail, "On New Row" in Google Sheets, "On New Message" in Slack.

### 2. Schedule-Based Triggers (Polling)
These triggers run at a predefined time or interval. They are useful for tasks that need to happen regularly, or for checking for new information in apps that don't support event-based triggers.
*   **Cron Jobs:** A classic scheduling method that allows for highly specific intervals (e.g., "at 5 PM on the first Monday of every month").
*   **Simple Intervals:** "Every 15 minutes," "Once a day," "Every Monday at 9 AM."

## Choosing the Right Trigger
*   Use **event-based triggers** whenever possible. They are faster and more efficient because they only run when needed.
*   Use **schedule-based triggers** for regular, repeating tasks or when an app doesn't offer a webhook or event-based trigger.

## Conclusion
Every great automation starts with a reliable trigger. Understanding the difference between event-based and schedule-based triggers is fundamental to building efficient and effective workflows.
