#!/bin/bash

cwd=$(pwd)

PLUGIN_NAME=$(cat package.json | grep pluginname | sed 's/.*"pluginname": "\(.*\)".*/\1/')
COMPANY=$(cat package.json | grep companyname | sed 's/.*"companyname": "\(.*\)".*/\1/')
echo "Installing LSF plugin" $PLUGIN_NAME from $COMPANY "..."

INSTALLATION_PATH="../"
if [ -f "../package.json" ]
then
  INSTALLATION_PATH="../";
elif [ -f "../../package.json" ]
then
  INSTALLATION_PATH="../.."
elif [ -f "../../../package.json" ]
then
  INSTALLATION_PATH="../../.."
elif [ -f "../../../../package.json" ]
then
  INSTALLATION_PATH="../../../.."
else
  echo "Cannot install script. Invalid API structure"
  exit 0
fi;

mkdir -p "$cwd/$INSTALLATION_PATH/vendor/@$COMPANY/$PLUGIN_NAME"
cp -R src/* "./$INSTALLATION_PATH/vendor/@$COMPANY/$PLUGIN_NAME"
cp README.md "./$INSTALLATION_PATH/vendor/@$COMPANY/$PLUGIN_NAME/README.md"
