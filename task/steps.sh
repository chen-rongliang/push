#!/bin/sh

function rand(){  
    min=$1  
    max=$(($2-$min+1))  
    num=$(($RANDOM+1000000000)) #增加一个10位的数再求余  
    echo $(($num%$max+$min))  
}

step=$(rand 10000 30000) 
#curl -s -G -d 'mobile=13632377709' -d 'psw=Dagou520**' -d 'step='.$step http://api.eyoutw.com/fed/test/steps/submit.php

step=$(rand 10000 30000)
#curl -s -G -d 'mobile=13642661574' -d 'psw=Dagou520**' -d 'step='.$step http://api.eyoutw.com/fed/test/steps/submit.php

exit 0