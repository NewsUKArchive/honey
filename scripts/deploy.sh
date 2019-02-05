#!/bin/bash
REGION=us-east-1
mkdir ~/.aws
echo "[default]
region = $REGION" > ~/.aws/config

#Build the image
docker build --build-arg GITHUB_KEY=%GITHUB_KEY% -t honey ../

#Tag the image
docker tag honey:latest $ACCOUNTID.dkr.ecr.$REGION.amazonaws.com/honey:latest

#Login
eval $(aws ecr get-login --no-include-email --region $REGION)

#Push the image
docker push $ACCOUNTID.dkr.ecr.$REGION.amazonaws.com/honey:latest

#reset the task to pull latest image
export CLUSTER_NAME=honey
export TASKARN=$(aws ecs list-tasks --cluster $CLUSTER_NAME | jq -r ".taskArns[]")
export TASKID=$(echo $TASKARN | grep -o '/.*'  | cut -f2- -d/)
aws ecs stop-task --cluster $CLUSTER_NAME --task $TASKID
