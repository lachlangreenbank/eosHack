#!/bin/bash

account=$1
data=$2
cleos wallet unlock --password PW5Hpq49iJ2VxHEFTCbhomh2VvK4A3EzFu1YLPbATukDKhuBRKCyn
cleos push action "joe" create '["joe", 1,  "33.685",  "33.671",  "-116.234",  "-116.251",  "I grew up here"]' -p joe
# cleos push action $account create $data -p $account
