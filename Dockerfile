# Build with "mvn clean package dockerfile:build"

FROM tomcat:9.0-jre11-slim

ARG PROJNAME

MAINTAINER Boris Goldowsky <bgoldowsky@cast.org>

RUN rm -rf /usr/local/tomcat/webapps/*

RUN mkdir /usr/local/tomcat/conf/logback /usr/local/tomcat/configurations
ADD config/logback.xml /usr/local/tomcat/conf/logback/
ADD config/logging.properties /usr/local/tomcat/conf/
ADD config/setenv.sh /usr/local/tomcat/bin/
ADD config/configurations/ /usr/local/tomcat/configurations/

# Logging jars need to be in Tomcat lib dir so they can be used before webapp loads

ADD target/${PROJNAME}/WEB-INF/lib/jul-to-slf4j-* \
	target/${PROJNAME}/WEB-INF/lib/slf4j-api-* \
	target/${PROJNAME}/WEB-INF/lib/logback-* \
	/usr/local/tomcat/lib/

#ADD content /usr/local/tomcat/content
#ADD theme   /usr/local/tomcat/theme

ADD config/entrypoint.sh /usr/local/bin/
RUN chmod a+x /usr/local/bin/entrypoint.sh

ADD target/${PROJNAME}.war /usr/local/tomcat/webapps/ROOT.war

#HEALTHCHECK --interval=5m --timeout=3s CMD curl -f http://localhost:8080/healthz || exit 1

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["catalina.sh", "run"]
