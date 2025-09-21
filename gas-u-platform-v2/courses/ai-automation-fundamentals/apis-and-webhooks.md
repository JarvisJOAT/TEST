---
title: "Connecting to the Web: APIs and Webhooks"
description: "Understand the two primary ways workflows connect to and communicate with other applications on the internet."
---
# Lesson 5: Connecting to the Web: APIs and Webhooks

## Introduction
Workflows don't exist in a vacuum. Their real power comes from connecting different applications together. The two fundamental technologies that make this possible are APIs and Webhooks.

## What is an API? (Application Programming Interface)
Think of an API as a menu at a restaurant.
*   The menu (API) provides a list of dishes (functions) you can order.
*   You (your workflow) make a request for a specific dish (call an API endpoint).
*   The kitchen (the other application) prepares your order and the waiter (the API) brings it back to you (returns data).

When your workflow needs to get data *from* another service or tell it *to do* something, it makes an **API call**. This is an **outbound** request from your workflow.

**Example:** Your workflow makes an API call to the Google Maps API to get the driving distance between two addresses.

## What is a Webhook?
A Webhook is the reverse of an API call. It's a way for an application to send your workflow data the moment an event happens. Think of it like getting a text message notification.
*   You give the application your phone number (the unique webhook URL).
*   When something happens (e.g., your package has shipped), the application sends a message directly to your number (sends data to your webhook URL).

When your workflow needs to receive data *from* another service in real-time, it provides a **Webhook URL**. This is an **inbound** request to your workflow. As we learned in a previous lesson, webhooks are a common type of **event-based trigger**.

## API vs. Webhook: The Key Difference
*   **API Call:** Your workflow actively asks for data. (PULL)
*   **Webhook:** The other application actively sends data to your workflow. (PUSH)

## Conclusion
Understanding the push-and-pull dynamic of APIs and Webhooks is essential. APIs let you fetch data or command other apps, while Webhooks let other apps notify you of events in real-time. Together, they are the foundation of all modern application integration.
