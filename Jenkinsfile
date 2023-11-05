pipeline { 

    agent any

    triggers {
        pollSCM('* * * * *')
    }

    stages {

        stage('Source checkout') {
            steps {
                echo 'Cloning source code is finished.'
            }
        }

        stage('Test') {
            steps {
                echo 'Cloning source test is finished.'
            }
        }

        stage('Docker build') {
            steps {
                echo 'Build docker image'
                sh ''' docker image build -t cabmanager-webapp .'''
            }
        }

        stage('Docker deploy') {
            steps {
                echo '----------------- This is a docker deployment phase ----------'
                sh '''
                (if  [ $(docker ps -a | grep cabmanager-webapp-container | cut -d " " -f1) ]; then \
                        echo $(docker rm -f cabmanager-webapp-container); \
                        echo "---------------- successfully removed cabmanager-webapp-container ----------------"
                     else \
                    echo OK; \
                 fi;);
                docker container run --network cabmanager-webapp-network --restart always --name cabmanager-webapp-container -p 4300:80 -d cabmanager-webapp
            '''
            }
        }
    }
}