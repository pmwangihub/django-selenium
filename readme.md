# Case Study: Products Price Change Analytics

## Introduction

Dive into the world of data analytics with this curated case study on product pricing. This project demonstrates how data is leveraged to extract insights, visualize trends, and make informed decisions. The portfolio showcases expertise in data analysis, backend development, frontend design, and system security to deliver actionable results.

## Project Overview

### Features

- **Excel VLOOKUP**: Utilized Excel VLOOKUP to compare and match data during analysis for deeper insights.
- **Python Backend**: Built using Python for web scraping, task scheduling, and data processing to automate price tracking.
- **Redis Server**: Employed Redis for caching and handling asynchronous tasks to improve performance.
- **Authentication and Security**: Integrated secure authentication mechanisms to prevent brute-force attacks, ensuring data protection.
- **Nginx Proxy Server**: Configured Nginx as a reverse proxy to manage web traffic, providing load balancing and improved security.
- **React Frontend**: Developed a dynamic, user-friendly dashboard using React for data visualization and interaction.
- **Linux Command Tools**: Used Linux commands for server management, task automation, and process monitoring.
- **Database Management**: Utilized PostgreSQL to store and manage scraped data, ensuring efficient retrieval and scalability.

### Tech Stack

- **Backend**: Python, Django, Django REST Framework
- **Frontend**: React.js
- **Database**: PostgreSQL
- **Caching**: Redis
- **Web Server**: Nginx
- **Task Queue**: Celery
- **Others**: Selenium, Beautiful Soup, WebDriver Manager

## Folder Structure

```
├───app
│   ├───home
│   │   ├───api
│   │   │   └───__pycache__
│   │   ├───management
│   │   │   ├───commands
│   │   │   └───__pycache__
│   │   ├───migrations
│   │   │   └───__pycache__
│   │   └───__pycache__
│   ├───jumia
│   │   ├───api
│   │   │   └───__pycache__
│   │   ├───migrations
│   │   │   └───__pycache__
│   │   └───__pycache__
│   ├───projects
│   │   ├───api
│   │   │   └───__pycache__
│   │   ├───migrations
│   │   │   └───__pycache__
│   │   └───__pycache__
│   ├───user
│   │   ├───api
│   │   │   └───__pycache__
│   │   ├───migrations
│   │   │   └───__pycache__
│   │   └───__pycache__
│   └───__pycache__
├───docker
│   ├───django
│   ├───nginx
│   └───traefik
├───docs
├───react
│   ├───dist
│   │   └───assets
│   ├───public
│   └───src
│       ├───api
│       ├───assets
│       ├───pages
│       │   ├───about
│       │   ├───admin
│       │   │   ├───profileProducts
│       │   │   ├───scrape
│       │   │   └───settings
│       │   ├───auth
│       │   ├───components
│       │   ├───contact
│       │   ├───footer
│       │   ├───home
│       │   ├───hooks
│       │   ├───navbar
│       │   ├───products
│       │   │   ├───category
│       │   │   ├───productinfo
│       │   │   └───products
│       │   ├───sample
│       │   ├───scrape
│       │   └───wrapper
│       ├───resource
│       │   ├───actions
│       │   └───reducer
│       └───utils
├───src
│   ├───config
│   │   └───__pycache__
│   └───__pycache__
├───static
│   ├───css
│   ├───ico
│   ├───images
│   ├───js
│   └───vendor
│       ├───css
│       ├───images
│       └───js
└───templates
    ├───about
    ├───email
    ├───home
    ├───jumia
    ├───partials
    └───projects
```

## Requirements

The following Python libraries and dependencies are required:

```
Django
Django REST Framework
django-environ
djlint
django-cors-headers
django-celery-results
django-extensions
django-celery-beat

celery
whitenoise
Pillow
psycopg2-binary
gunicorn
uvicorn
uvicorn[standard]
uvicorn-worker
rav
redis
webdriver-manager
beautifulsoup4
selenium
