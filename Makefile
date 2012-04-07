MODULE_DIR = modules/
COMMON_SRC_DIR = ${MODULE_DIR}common/src/
DIRECTIVES_SRC_DIR = ${MODULE_DIR}directives/*/src/
FILTERS_SRC_DIR = ${MODULE_DIR}filters/*/src/

ALL_SRC_DIR = \
	${COMMON_SRC_DIR}\
	${DIRECTIVES_SRC_DIR}\
	${FILTERS_SRC_DIR}

LESS_SRC_DIR = src/less/
BUILD_DIR = build/

JS_FILES = \
	${DIRECTIVES_SRC_DIR}*.js\
	${FILTERS_SRC_DIR}*.js\
	${COMMON_SRC_DIR}*.js

all: build

coffee:
	coffee -c ${ALL_SRC_DIR}

js: coffee
	cat ${JS_FILES} > ${BUILD_DIR}angular-ui.js
	uglifyjs -o ${BUILD_DIR}angular-ui.min.js --no-mangle --no-squeeze ${BUILD_DIR}angular-ui.js
	
css:	
	lessc ${LESS_SRC_DIR}angular-ui.less ${BUILD_DIR}angular-ui.css
	lessc ${LESS_SRC_DIR}angular-ui.less ${BUILD_DIR}angular-ui.min.css -compress
		
build: js css

