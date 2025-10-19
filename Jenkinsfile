pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/chennakesava77/Automated-CI-Pipeline-Jenkins-.git', branch: 'main'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Static Code Analysis') {
      steps {
        sh 'npx eslint src/**/*.js'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm test'
      }
    }

    stage('Build & Package') {
      steps {
        sh 'mkdir -p build && zip -r build/artifact.zip src/'
      }
    }

    stage('Archive Artifacts') {
      steps {
        archiveArtifacts artifacts: 'build/artifact.zip', fingerprint: true
      }
    }
  }

  post {
    always {
      junit 'tests/test-results.xml'
      mail to: 'team@example.com',
           subject: "Jenkins Build Notification",
           body: "Build completed. Check Jenkins for details."
    }
  }
}