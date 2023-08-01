pipeline {

  agent { label 'Agent-1' }

  tools { nodejs 'Nodejs 18.12.1' }

  stages {
    stage('Install dependecies') {
      steps {
          sh 'node --version'
          sh 'npm --version'
          sh 'npm install'
      }
    }

    stage('Test') {
      parallel {
        stage('Unit tests') {
            steps { 
              echo "npm run test"
            }
        }
      }
    }

    stage('Build') {
      steps { 
        sh 'npm run build'
      }
    }

    stage('Deployment') {
      steps { 
        echo "Deploying..."
      }
    }
  }
}

