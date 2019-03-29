#!/bin/bash

## Look for environment variable specifying which configuration to use, and link it in.

SOURCE_DIR=/usr/local/tomcat/configurations
DEST_DIR=/usr/local/tomcat
CATALINA_DIR=/usr/local/tomcat/conf/Catalina/localhost

mkdir -p $CATALINA_DIR

if [ -n "$APP_CONFIG" ]; then
	CONFIG_DIR=$SOURCE_DIR/$APP_CONFIG
	if [ -e $CONFIG_DIR ]; then
		## Copy defaults, then requested configurations to override them
		cp -v $SOURCE_DIR/default/* $DEST_DIR
		cp -v $CONFIG_DIR/* $DEST_DIR
		mv -v $DEST_DIR/context.xml $CATALINA_DIR/ROOT.xml
	else
		echo "No configuration named " $APP_CONFIG
		echo "Set APP_CONFIG to one of these:"
		ls $SOURCE_DIR
		exit 1
	fi
else
	echo "Environment variable APP_CONFIG must be supplied"
	exit 1
fi

exec "$@"
