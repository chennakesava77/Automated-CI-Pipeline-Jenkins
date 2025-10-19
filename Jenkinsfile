pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/chennakesava77/Automated-CI-Pipeline-Jenkins.git', branch: 'main', credentialsId: 'github-token'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install all dependencies using legacy-peer-deps to avoid ESLint conflicts
                sh 'npm install --legacy-peer-deps'
            }
        }

        stage('Static Code Analysis') {
            steps {
                // Lint all JS files and automatically fix fixable issues
                sh 'npx eslint src/**/*.js --fix'
            }
        }

        stage('Run Tests') {
            steps {
                // Run Jest tests and generate JUnit XML report
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
            // Publish Jest JUnit XML results
            junit 'tests/test-results.xml'
            echo 'Build finished. Check results above.'
        }
    }
}
