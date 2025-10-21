pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git url: 'https://github.com/chennakesava77/Automated-CI-Pipeline-Jenkins.git', 
                    branch: 'main', 
                    credentialsId: 'github-token'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install dependencies and handle peer conflicts gracefully
                sh 'npm install --legacy-peer-deps'
            }
        }

        stage('Static Code Analysis') {
            steps {
                // Run ESLint and fix automatically fixable issues
                sh 'npx eslint src/**/*.js --fix || true'
            }
        }

        stage('Run Tests') {
            steps {
                // Run Jest tests with JUnit reporting
                sh 'npx jest --ci --reporters=default --reporters=jest-junit'
            }
        }

        stage('Build & Package') {
            steps {
                // Create build directory and zip project files
                sh 'mkdir -p build && zip -r build/artifact.zip src/ package.json'
            }
        }

        stage('Archive Artifacts') {
            steps {
                // Save build output as Jenkins artifact
                archiveArtifacts artifacts: 'build/artifact.zip', fingerprint: true
            }
        }
    }

    post {
        always {
            // Publish test results from Jest JUnit output
            junit 'junit.xml'
            echo '✅ Build completed. Check test results and artifacts above.'
        }
    }
}
