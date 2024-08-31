#!groovy
//  groovy Jenkinsfile
pipeline  {
    agent any;
    stages {
         stage("Backup files")
         {
             steps{
                sh """
                #!/bin/bash
                hostname
                """
             }
         }
        stage("Change IP in appsettings.json")
         {
             steps{
                sh "find BackEnd/Amazon-clone/ -type f -exec sed  -i 's#http://localhost:81#https://20.172.64.52/#g' {} +"
             }
         }
        steps{
                sh "find BackEnd/Amazon-clone/ -type f -exec sed  -i 's#Server=20.240.61.200#Server=20.172.64.52/#g' {} +"
             }
         }
    }
}
