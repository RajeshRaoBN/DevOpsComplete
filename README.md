# **DevOps Project: CI/CD Pipeline for a Microservices-Based Web Application**

## **Overview**
This guide will walk you through building a fully automated **CI/CD pipeline** for a **microservices-based web application** using **Jenkins, Docker, Kubernetes, Terraform, Ansible, and AWS**.

---

## **Step 1: Set Up Version Control (GitHub)**
### **Step-by-Step Guide**
1. **Create a GitHub Repository:**
   - Go to [GitHub](https://github.com) and sign in.
   - Click **New Repository** and name it `devops-project`.
   - Select **Public** and check **Initialize with README**.
   - Click **Create repository**.

2. **Clone the Repository to Your Local Machine:**
   ```bash
   git clone https://github.com/yourusername/devops-project.git
   cd devops-project
   ```

3. **Organize Your Codebase:**
   ```bash
   mkdir frontend backend database k8s terraform ansible
   touch Jenkinsfile Dockerfile README.md
   ```
   - `frontend/` → React app
   - `backend/` → Node.js API
   - `database/` → MongoDB setup
   - `k8s/` → Kubernetes manifests
   - `terraform/` → Infrastructure code
   - `ansible/` → Configuration management scripts
   - `Jenkinsfile` → CI/CD pipeline script
   - `Dockerfile` → Containerization script

4. **Push Changes to GitHub:**
   ```bash
   git add .
   git commit -m "Initial project setup"
   git push origin main
   ```

---

## **Step 2: CI/CD Pipeline with Jenkins**
### **Step-by-Step Guide**
#### **Install and Configure Jenkins**
1. **Launch an AWS EC2 Instance:**
   - Go to AWS **EC2 Dashboard**.
   - Click **Launch Instance** → Choose **Ubuntu 22.04**.
   - Select **t2.medium**, configure **security group** to allow `22`, `8080`, and `80`.
   - Assign a key pair and launch.

2. **Install Jenkins on EC2:**
   ```bash
   sudo apt update
   sudo apt install openjdk-11-jdk -y
   wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
   echo "deb http://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list
   sudo apt update
   sudo apt install jenkins -y
   ```

3. **Start and Enable Jenkins:**
   ```bash
   sudo systemctl start jenkins
   sudo systemctl enable jenkins
   ```

4. **Access Jenkins UI:**
   - Visit `http://your-ec2-ip:8080`
   - Get the **Admin Password**:
     ```bash
     sudo cat /var/lib/jenkins/secrets/initialAdminPassword
     ```
   - Install suggested plugins and create an admin user.

#### **Create a Jenkins Pipeline Job**
1. **Go to Jenkins Dashboard → New Item → Pipeline**.
2. **Name your pipeline** and click **OK**.
3. **Under Pipeline Definition**, select **Pipeline Script**.
4. **Enter the following Jenkinsfile script:**
   ```groovy
   pipeline {
       agent any
       stages {
           stage('Checkout Code') {
               steps {
                   git 'https://github.com/yourusername/devops-project.git'
               }
           }
           stage('Build Docker Image') {
               steps {
                   sh 'docker build -t myapp-backend .'
               }
           }
           stage('Push to Docker Hub') {
               steps {
                   withDockerRegistry([credentialsId: 'docker-hub', url: '']) {
                       sh 'docker push myapp-backend'
                   }
               }
           }
           stage('Deploy to Kubernetes') {
               steps {
                   sh 'kubectl apply -f k8s/backend-deployment.yaml'
               }
           }
       }
   }
   ```
5. **Save and Build the Pipeline**.

---

## **Step 3: Dockerize the Application**
### **Step-by-Step Guide**
1. **Install Docker:**
   ```bash
   sudo apt update
   sudo apt install docker.io -y
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

2. **Create a Dockerfile for Backend:**
   ```dockerfile
   FROM node:14
   WORKDIR /app
   COPY . .
   RUN npm install
   CMD ["npm", "start"]
   ```

3. **Build and Push Docker Image:**
   ```bash
   docker build -t yourdockerhubusername/myapp-backend .
   docker login
   docker push yourdockerhubusername/myapp-backend
   ```

---

## **Step 4: Deploy to Kubernetes**
### **Step-by-Step Guide**
1. **Install Minikube & kubectl:**
   ```bash
   curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl"
   chmod +x kubectl
   sudo mv kubectl /usr/local/bin/
   minikube start
   ```

2. **Create Kubernetes Deployment YAML:**
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: backend-deployment
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: backend
     template:
       metadata:
         labels:
           app: backend
       spec:
         containers:
         - name: backend
           image: yourdockerhubusername/myapp-backend:latest
           ports:
           - containerPort: 3000
   ```

3. **Apply Deployment:**
   ```bash
   kubectl apply -f k8s/backend-deployment.yaml
   ```

---

## **Step 5: Infrastructure as Code (Terraform)**
### **Step-by-Step Guide**
1. **Install Terraform:**
   ```bash
   sudo apt update && sudo apt install terraform -y
   ```
2. **Define Terraform Configuration:**
   ```hcl
   provider "aws" {
     region = "us-east-1"
   }
   resource "aws_instance" "jenkins" {
     ami           = "ami-0c55b159cbfafe1f0"
     instance_type = "t2.medium"
     key_name      = "my-key"
     tags = {
       Name = "Jenkins-Server"
     }
   }
   ```
3. **Run Terraform Commands:**
   ```bash
   terraform init
   terraform apply -auto-approve
   ```

---

## **Next Steps**
Each tool now has a **detailed hands-on lab** to ensure a fully automated DevOps pipeline is implemented.

Would you like additional troubleshooting tips or an advanced security configuration? 🚀

