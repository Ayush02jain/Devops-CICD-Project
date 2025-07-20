# CI/CD Pipeline Testing 

This repository contains the source code for a fun, interactive Tic-Tac-Toe game. More importantly, it serves as the live demo application for a complete **Continuous Integration and Continuous Deployment (CI/CD)** pipeline built with **GitHub Actions** and **AWS S3**.

Many Organizations adopt DevOps Practices to innovate faster by automating and streamlining the software development and infrastructure management processes. Beyond cultural adoption, DevOps also suggests following certain best practices and Continuous Integration and Continuous Delivery (CI/CD) is among the important ones to start with. CI/CD practice reduces the time it takes to release new software updates by automating deployment activities. Many tools are available to implement this practice. Although AWS has a set of native tools to help achieve your CI/CD goals, it also offers flexibility and extensibility for integrating with numerous third party tools.

The goal was to create a hands-on project that not only showcases frontend skills but also demonstrates a real-world automated deployment workflow.

## ✨ Features of the App

- **Play vs. Bot** -> A single-player experience against a simple AI opponent.
- **Sleek UI** -> A clean and modern interface.
- **Dark/Light Mode** -> A theme toggle that saves your preference in the browser.
- **Win Animation** -> A fun confetti animation celebrates your victory!
- **Fully Automated Deployment** -> Push to `main`, and the site is live.

## 💻 Tech Stack

- **Frontend** -> Vanilla HTML5, CSS3, and JavaScript (ES6).
- **Deployment** -> GitHub Actions, AWS S3 (for static hosting), and AWS IAM (for secure credentials).

## 🚀 Getting Started Locally

To run this project on your local machine, follow these simple steps:

1.  **Clone the repository:**
    ```
    git clone https://github.com/your-username/your-repo-name.git
    ```

2.  **Navigate to the project directory:**
    ```
    cd your-repo-name
    ```

3.  **Open the application:**
    Simply open the `index.html` file in your favorite web browser.

---

## 🪄 Step-by-Step Setup Guide

Here is the end-to-end guide for setting up the AWS infrastructure and the GitHub Actions workflow to enable automated deployments.

### 1. 🛠 Create an IAM User in AWS
- **What it is** -> This creates a dedicated user account in AWS with specific permissions. GitHub Actions will use this user to interact with your AWS account.
- **Action** -> Navigate to the AWS IAM Console, create a new user, and grant it `AmazonS3FullAccess` to allow it to manage objects in your S3 bucket.
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d421af10-b911-4032-8703-7e69e6de8da1" />

### 2. ✅ Create an S3 Bucket
- **What it is** -> An S3 bucket is a storage container where your website's files (`index.html`, `style.css`, etc.) will live.
- **Action** -> Go to the AWS S3 Console and create a new bucket. Remember that the bucket name must be globally unique.
<img width="1917" height="379" alt="image" src="https://github.com/user-attachments/assets/fd8cfe54-256c-4277-a8a0-4725a617f78e" />

### 3. 🌐 Enable Static Website Hosting
- **What it is** -> This feature tells S3 to treat the files in your bucket as a public website.
- **Action** -> In your bucket's **Properties** tab, enable "Static website hosting" and set `index.html` as the index document.
<img width="1918" height="1079" alt="image" src="https://github.com/user-attachments/assets/0c407f60-ffe0-4449-a1da-47b5382b6b62" />

### 4. 🔓 Allow Public Access
- **What it is** -> By default, S3 buckets are private. This step makes your bucket's contents readable by the public.
- **Action** -> In the **Permissions** tab, edit "Block public access" and uncheck all the boxes to allow public access.
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f4d28d6b-6818-42b1-ac1d-6887097b09a4" />

### 5. 🛡 Attach a Public Read Policy
- **What it is** -> A bucket policy is a formal document that defines who can access your bucket and what they can do.
- **Action** -> Use the AWS Policy Generator or manually add a policy that allows the `s3:GetObject` action for all principals (`*`) on your bucket's ARN. This is what lets browsers load your website's files.
<img width="1902" height="457" alt="image" src="https://github.com/user-attachments/assets/4acd5757-98a0-4bd7-98c4-b477929c0b22" />

### 6. 🔑 Create Access Keys for the IAM User
- **What it is** -> These are the secret credentials (an Access Key ID and a Secret Access Key) that act as a username and password for your IAM user.
- **Action** -> Navigate to your created IAM user, go to the "Security credentials" tab, and create a new access key. **Save these securely**, as they will be needed for GitHub.
<img width="497" height="315" alt="image" src="https://github.com/user-attachments/assets/d79265bc-6275-4c7a-b7b8-384997f11813" />

### 7. ⚙️ Go to GitHub Actions
- **What it is** -> This is the central hub within your GitHub repository for creating, managing, and monitoring automation workflows.
- **Action** -> Click on the "Actions" tab in your repository and choose to set up a new workflow yourself.

### 8. 📄 Create a Workflow File
- **What it is** -> This YAML file (`main.yml`) is the blueprint for your CI/CD pipeline. It defines the trigger (e.g., a push to the `main` branch) and the sequence of jobs to run.
- **Action** -> Create a file at `.github/workflows/main.yml` and paste in the provided workflow code. This code checks out your repository, configures your AWS credentials, and syncs your files to the S3 bucket.
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b59a5185-d742-44ff-95a2-988d806f6d4c" />

### 9. 🤫 Add Repository Secrets
- **What it is** -> This is GitHub's secure vault for storing sensitive information like API keys and passwords.
- **Action** -> Go to your repository's `Settings > Secrets and variables > Actions`. Add your `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_S3_BUCKET_NAME` as new repository secrets. The workflow file will securely access these values without exposing them in the code.
<img width="1010" height="336" alt="image" src="https://github.com/user-attachments/assets/a3e0a1bb-749e-459c-a07e-880aa0f3e16c" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2ffd8a91-012b-444c-9a03-7642136c1f4b" />

