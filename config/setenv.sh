# Add logging JARs so that Tomcat logs can be forwarded
JTS=($CATALINA_HOME/lib/jul-to-slf4j-*.jar)
SLF=($CATALINA_HOME/lib/slf4j-api-*.jar)
LCL=($CATALINA_HOME/lib/logback-classic-*.jar)
LCO=($CATALINA_HOME/lib/logback-core-*.jar)
CLASSPATH=$JTS:$SLF:$LCL:$LCO:$CATALINA_HOME/conf/logback
echo "Logging classpath: " $CLASSPATH

# 1 GB memory limit
CATALINA_OPTS="$CATALINA_OPTS -Xmx1024m"
