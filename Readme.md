## Overview

This project is a fully functional course selling website, developed from scratch for educational purposes. All features are implemented manually without the use of large language models, providing a hands-on learning experience.

## Features

- **Secure Video Hosting:** Private course videos are delivered securely using AWS S3 and CDN.
- **Public Video Support:** Easily embed public videos via YouTube iframes.
- **Robust Validation:** All data is validated using [Zod](https://zod.dev/).
- **Automated Emailing:** Email notifications are sent using [Nodemailer](https://nodemailer.com/).

## Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** React
- **Validation:** Zod
- **Email:** Nodemailer
- **Storage:** AWS S3
- **CDN:** AWS CloudFront (or similar)

## Getting Started

1. **Clone the repository:**
    ```bash
    git clonehttps://github.com/Sachinchaurasiya360/Course-Selling-Website
    cd Course-Selling-Website
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Configure environment variables:** Set up credentials for AWS, Nodemailer, and other services as needed.
4. **Start the development server:**
    ```bash
    npm run dev
    ```

## Design Preview

Check out the design mockup [here](https://app.banani.co/preview/Q1yEjhsxt6yzkRNAAxkB).

## License

This project is intended for educational use only.

---

**Created by:**  
Sachin Chaurasiya  
mrsachinchaurasiya@gmail.com

