#!/bin/bash
export CLUSTER_NAME=honey
export REGION=us-east-1

echo "[default]
region = $REGION" > ~/.aws/config

#Build the image
docker build -t honey ../

#Tag the image
docker tag honey:latest 512040659177.dkr.ecr.$REGION.amazonaws.com/honey:latest

#Login
eval $(aws ecr get-login --no-include-email --region $REGION)

#Push the image
docker push 512040659177.dkr.ecr.$REGION.amazonaws.com/honey:latest

#reset the task to pull latest image
export TASKARN=$(aws ecs list-tasks --cluster $CLUSTER_NAME | jq -r ".taskArns[]")
export TASKID=$(echo $TASKARN | grep -o '/.*'  | cut -f2- -d/)
aws ecs stop-task --cluster $CLUSTER_NAME --task $TASKID