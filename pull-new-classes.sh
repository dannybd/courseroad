#!/bin/bash
OUTPUT=~/cron_scripts/output.html
echo "" > $OUTPUT
DATE=$(date +"%d-%b-%Y" --date="1 days ago")
env LD_LIBRARY_PATH=~/Downloads/instantclient_11_2 TWO_TASK=warehouse \
rlwrap -H /tmp/sqlplus_hist ~/Downloads/instantclient_11_2/sqlplus \
-S $(cat ~/cron_scripts/.warehousecreds) <<EOF
set echo on verify off feedback off
set linesize 10000
set pagesize 0
set markup html on
spool $OUTPUT
SELECT * FROM cis_course_catalog WHERE last_activity_date='$DATE';
spool off;
exit;
EOF
curl -sS "http://courseroad.mit.edu/dev/output.php"
