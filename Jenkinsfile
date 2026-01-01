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
                    bat 'npx playwright test src/tests'
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

    // post {
    //     always {
    //         // Email with HTML content and attachment
    //         emailext(
    //             subject: "Playwright Test Report - ${currentBuild.currentResult} | Build#${env.BUILD_NUMBER} | ${env.JOB_NAME}",
    //             body: """
    //             <html>
    //               <body style="font-family: Arial, sans-serif; color: #333;">
    //                 <h2 style="color: #0078d7;">Playwright Test Execution Report</h2>
    //                 <p>Hi Team,</p>
    //                 <p>The Playwright test execution has been completed. Please find the report attached and/or view it in Jenkins:</p>
    //                 <p>
    //                   📊 <a href="${env.BUILD_URL}HTML_20Report" 
    //                   style="color: #0078d7; text-decoration: none;">View Full HTML Report in Jenkins</a>
    //                 </p>
    //                 <p>Thanks,<br><b>Jenkins CI</b></p>
    //               </body>
    //             </html>
    //             """,

    //             mimeType: 'text/html',
    //             to: 'vikas.tripathi05081990@gmail.com',
    //             attachLog: true,
    //             attachmentsPattern: 'playwright-report/index.html'
    //         )
    //     }
    // }

    post {
    always {
        script {
            def jsonPath = "${env.WORKSPACE}/test-results/results.json"
            if (!fileExists(jsonPath)) {
                echo "results.json not found, skipping email report"
                return
            }

            // Read JSON safely (NO plugin needed)
            def jsonText = readFile(jsonPath)
            def jsonResults = new groovy.json.JsonSlurper().parseText(jsonText)

            def passed = 0
            def failed = 0
            def testDetails = []

            jsonResults.suites.each { suite ->
                suite.specs.each { spec ->
                    spec.tests.each { test ->
                        def result = test.results[-1]
                        def status = result.status

                        if (status == 'passed') passed++
                        else if (status == 'failed') failed++

                        testDetails << [
                            name: test.title,
                            status: status,
                            duration: result.duration ?: 0
                        ]
                    }
                }
            }

            def testRows = testDetails.collect { test ->
                def icon = test.status == 'passed' ? '✅' : '❌'
                """
                <tr>
                    <td style="padding:10px;border:1px solid #ddd;">${test.name}</td>
                    <td style="padding:10px;border:1px solid #ddd;text-align:center;">
                        ${icon} ${test.status}
                    </td>
                    <td style="padding:10px;border:1px solid #ddd;text-align:center;">
                        ${String.format('%.2f', test.duration / 1000.0)}s
                    </td>
                </tr>
                """
            }.join('')

            emailext(
                subject: "Playwright Test Report | ${passed} Passed, ${failed} Failed | Build #${env.BUILD_NUMBER}",
                mimeType: 'text/html',
                to: 'vikas.tripathi05081990@gmail.com',
                body: """
                <html>
                <body style="font-family: Arial, sans-serif;">
                    <h2 style="color:#0078d7;">Playwright Test Execution Report</h2>

                    <p>
                        <strong>Total:</strong> ${testDetails.size()} |
                        <span style="color:green;"><strong>Passed:</strong> ${passed}</span> |
                        <span style="color:red;"><strong>Failed:</strong> ${failed}</span>
                    </p>

                    <table style="border-collapse:collapse;width:100%;">
                        <thead>
                            <tr style="background:#f2f2f2;">
                                <th style="padding:10px;border:1px solid #ddd;">Test</th>
                                <th style="padding:10px;border:1px solid #ddd;">Status</th>
                                <th style="padding:10px;border:1px solid #ddd;">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${testRows}
                        </tbody>
                    </table>

                    <p style="margin-top:20px;">
                        <a href="${env.BUILD_URL}Playwright_20Test_20Report">
                            View Full HTML Report
                        </a>
                    </p>
                </body>
                </html>
                """
            )
        }
    }
}

}
