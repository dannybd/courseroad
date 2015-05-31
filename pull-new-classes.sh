#!/bin/bash
OUTPUT=~/cron_scripts/output.html
echo "" > $OUTPUT
NUMDAYS=1
TEST_MODE=""
while getopts "n:t" opt; do
  case $opt in
    n)
      NUMDAYS=${OPTARG}
      ;;
    t)
      echo "ENTERING TEST MODE"
      TEST_MODE="?test"
      ;;
    \?)
      echo "Invalid option: -${OPTARG}" >&2
      exit 1
      ;;
  esac
done
DATE=$(date +"%d-%b-%Y" --date="${NUMDAYS} days ago")
echo "Looking for classes from up to ${NUMDAYS} days ago: ${DATE}"
env LD_LIBRARY_PATH=~/Downloads/instantclient_11_2 TWO_TASK=warehouse \
rlwrap -H /tmp/sqlplus_hist ~/Downloads/instantclient_11_2/sqlplus \
-S $(cat ~/cron_scripts/.warehousecreds) <<EOF
set echo on verify off feedback off
set linesize 10000
set pagesize 0
set markup html on
spool $OUTPUT
SELECT * FROM cis_course_catalog WHERE last_activity_date>='${DATE}';
spool off;
exit;
EOF
curl -sS "http://courseroad.mit.edu/dev/output.php${TEST_MODE}";
