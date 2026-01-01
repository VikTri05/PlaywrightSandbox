pipeline {
    agent any
    
    tools {
        nodejs 'Node22'
    }
    triggers{
        cron('0 22 * * *')
    }
    
    stages {        
        stage('Install Dependencies') {
            steps {
                dir('PlaywrightSandbox') {
                    bat 'npm ci'
                    bat 'npx playwright install --with-deps'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                    bat 'npx playwright test src/tests --reporter=html'
            }
        }
        stage('Archive HTML results'){
            steps{
                publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report',
                reportTitles: ''
            ])
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            // Email with HTML content and attachment
            emailext(
                subject: "Playwright Test Report - ${currentBuild.currentResult} | Build#${env.BUILD_NUMBER} | ${env.JOB_NAME}",
                body: """
                <html>
                  <body style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #0078d7;">Playwright Test Execution Report</h2>
                    <p>Hi Team,</p>
                    <p>The Playwright test execution has been completed. Please find the report attached and/or view it in Jenkins:</p>
                    <p>
                      📊 <a href="${env.BUILD_URL}HTML_20Report" 
                      style="color: #0078d7; text-decoration: none;">View Full HTML Report in Jenkins</a>
                    </p>
                    <p>Thanks,<br><b>Jenkins CI</b></p>
                  </body>
                </html>
                """,

                mimeType: 'text/html',
                to: 'vikas.tripathi05081990@gmail.com',
                attachLog: true,
                attachmentsPattern: 'playwright-report/index.html'
            )
        }
    }
}
