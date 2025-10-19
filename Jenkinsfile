pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Must match your NodeJS installation in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/chennakesava77/Automated-CI-Pipeline-Jenkins.git', branch: 'main', credentialsId: 'github-token'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Use legacy-peer-deps to fix ESLint dependency issues
                sh 'npm install --legacy-peer-deps'
            }
        }

        stage('Static Code Analysis') {
            steps {
                // Lint all JS files and automatically fix fixable issues
                sh 'npx eslint src/**/*.js --fix || true'
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests and generate JUnit XML report
                sh 'npm test'
            }
        }

        stage('Build & Package') {
            steps {
                sh 'mkdir -p build && zip -r build/artifact.zip src/ package.json'
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
            // Adjust this path if Jest is configured with jest-junit
            junit 'reports/junit/results.xml'
            echo 'Build finished. Check results above.'
            // mail step can be added if email plugin configured
        }
    }
}
