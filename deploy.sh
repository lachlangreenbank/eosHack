#!/bin/bash

account=$1

cleos wallet unlock --password PW5Hpq49iJ2VxHEFTCbhomh2VvK4A3EzFu1YLPbATukDKhuBRKCyn
cleos set contract $account ./ docusign.wast docusign.abi
