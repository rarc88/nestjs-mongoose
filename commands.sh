#!/bin/bash

sudo chmod 777 dist/src/commands.js
npx crun users:seed
npx crun permissions:seed
npx crun roles:seed
