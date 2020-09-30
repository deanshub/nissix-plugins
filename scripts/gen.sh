#!/bin/bash
if [ $# -eq 0 ];
then
  echo "Please provide a plugin name"
  exit 1
else
  node scripts/generate.js create-plugin __name__=$1
fi
