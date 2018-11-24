#!/bin/bash
docker build -t fxchain .
docker run --rm -ti fxchain "$@"