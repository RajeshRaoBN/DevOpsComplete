CODE_CHANGES = getGitChanges()
pipeline {
    agent any
    stages {
        stage("build"){
/*             when {
                expression {
                    BRANCH_NAME == 'dev' && CODE_CHANGES == 'true'
                }
            } */
            steps {
                echo 'building the application...'
            }
        }
        stage("test"){
/*             when {
                expression {
                    BRANCH_NAME == 'dev' || BRANCH_NAME == 'main'
                }
            } */
            steps {
                echo 'testing the application...'
            }
        }
        stage("deploy"){
            steps {
                echo 'deploy the application...'
            } 
        }
        post (
            always {

            }
            failure {

            }
        )
    } 
}