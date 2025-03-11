pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/RajeshRaoBN/DevOpsComplete.git'
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