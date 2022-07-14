#!/bin/bash

echo 'push with proxy:'
git config --global http.https://github.com.proxy http://127.0.0.1:10080
git config --global https.https://github.com.proxy https://127.0.0.1:10080
git config --global http.https://github.com.proxy
git config --global https.https://github.com.proxy
git pull
git config --global --unset http.https://github.com.proxy
git config --global --unset https.https://github.com.proxy
