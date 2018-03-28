#!/bin/bash
REGION=us-east-1

#Build the image
docker build -t honey ../

#Tag the image
docker tag honey:latest 512040659177.dkr.ecr.$REGION.amazonaws.com/honey:latest

#Login
eval $(aws ecr get-login --no-include-email --region $REGION)

#Push the image
docker push 512040659177.dkr.ecr.$REGION.amazonaws.com/honey:latest