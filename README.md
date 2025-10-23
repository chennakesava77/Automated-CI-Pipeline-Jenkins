

                 -- Project Title--
**Automated CI Pipeline for a Web Application using Jenkins**

---

##  Description
This project demonstrates a **Continuous Integration (CI) pipeline** for a simple Node.js web application using **Jenkins**.  
The pipeline automatically performs source code checkout, dependency installation, linting, unit testing, packaging, and artifact archiving.

It integrates **GitHub** (for source control), **Jenkins** (for automation), and **Jest** (for testing).  
This setup ensures code quality and reliability through automation.

---

##  Tech Stack
| Component | Technology |
|------------|-------------|
| **Programming Language / Framework** | Node.js |
| **CI Tool** | Jenkins |
| **Source Control** | GitHub |
| **Testing Framework** | Jest |
| **Static Analysis Tool** | ESLint |
| **Build Tool** | npm & zip |

---

##  Pipeline Overview
Below is an overview of the stages implemented in the Jenkinsfile:

| Stage | Description |
|--------|--------------|
| **1. Code Checkout** | Pulls source code from the GitHub repository using Jenkins. |
| **2. Dependency Installation** | Installs all Node.js dependencies using `npm install --legacy-peer-deps`. |
| **3. Static Code Analysis** | Runs ESLint to detect and auto-fix JavaScript code issues. |
| **4. Unit Testing** | Executes Jest tests and generates a JUnit XML report for Jenkins. |
| **5. Build & Package** | Packages the application source and dependencies into a `.zip` artifact. |
| **6. Post-Build Actions** | Publishes test results and archives build artifacts for download. |

---

##  Setup Instructions

### 1. Install Jenkins
- Download and install Jenkins from [https://www.jenkins.io/download/](https://www.jenkins.io/download/)
- Start Jenkins and open it in your browser:  
  `http://localhost:8080`

### 2. Install Required Jenkins Plugins
- NodeJS Plugin  
- Git Plugin  
- Pipeline Plugin  
- JUnit Plugin  
- Workspace Cleanup Plugin (optional)

### 3. Configure NodeJS in Jenkins
1. Go to **Manage Jenkins → Tools → NodeJS Installations**
2. Add a new installation named **NodeJS**
3. Check “Install automatically”

### 4. Connect GitHub Repository
- Go to your GitHub repository and copy the HTTPS URL.  
  Example:  
  `https://github.com/chennakesava77/Automated-CI-Pipeline-Jenkins.git`
- In Jenkins, create **new credentials** (if private repo) with ID `github-token`.

### 5. Create a Jenkins Pipeline
1. In Jenkins Dashboard → **New Item**
2. Choose **Pipeline**, name it:  
   `Automated-CI-Pipeline-Jenkins`
3. Under **Pipeline Definition**, select:
   - **Pipeline script from SCM**
   - SCM: **Git**
   - Repository URL: your GitHub repo URL
   - Script Path: `Jenkinsfile`

### 6. Trigger and View Builds
- Click **Build Now** to trigger the pipeline.
- View logs in **Console Output**.
- Monitor progress in **Pipeline Stage View**.

---

##  Expected Outputs
After a successful build:
- All tests pass using Jest.
-  A `.zip` artifact is generated under `build/artifact.zip`.
-  Test results appear under **Test Result** in Jenkins.
-  Artifacts are archived and downloadable from Jenkins.

**Generated File:**  

---

##  Results / Screenshots
Below are the required CI pipeline evidence screenshots:

1.  Jenkins Dashboard showing the project/job  
2.  Pipeline Stage View with all stages visible  
3.  Successful build status (Finished: SUCCESS)  
4.  Archived Artifacts showing `build/artifact.zip`  
5.  Test Report (Jest results: 1 test passed, 0 failed)

*(Attach actual screenshots from your Jenkins UI here)*

---

##  Example Jenkinsfile (Reference)

```groovy
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
                sh 'npm install --legacy-peer-deps'
            }
        }

        stage('Static Code Analysis') {
            steps {
                sh 'npx eslint src/**/*.js --fix || true'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx jest --ci --reporters=default --reporters=jest-junit'
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
            junit 'reports/junit/results.xml'
            echo ' Build completed. Check test results and artifacts above.'
        }
    }
}
<img width="1920" height="1080" alt="Screenshot (110)" src="https://github.com/user-attachments/assets/3b5ad637-ba9e-4122-8105-203c843a614b" />


