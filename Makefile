MODULE_DIR = modules/
DIRECTIVES_DIR = ${MODULE_DIR}directives/*/
FILTERS_DIR = ${MODULE_DIR}filters/*/

COMMON_SRC_DIR = ${MODULE_DIR}common/src/
DIRECTIVES_SRC_DIR = ${DIRECTIVES_DIR}src/
FILTERS_SRC_DIR = ${FILTERS_DIR}src/
ALL_SRC_DIR = \
	${COMMON_SRC_DIR}\
	${DIRECTIVES_SRC_DIR}\
	${FILTERS_SRC_DIR}

DIRECTIVES_TEST_DIR = ${DIRECTIVES_DIR}test/
FILTERS_TEST_DIR = ${FILTERS_DIR}test/
ALL_TEST_DIR = \
	${DIRECTIVES_TEST_DIR}\
	${FILTERS_TEST_DIR}

JS_SRC_FILES = \
	${DIRECTIVES_SRC_DIR}*.js\
	${FILTERS_SRC_DIR}*.js\
	${COMMON_SRC_DIR}*.js

JS_TEST_FILES = \
	${DIRECTIVES_TEST_DIR}*.js\
	${FILTERS_TEST_DIR}*.js

LESS_FILES = ${MODULE_DIR}common/stylesheets/angular-ui.less

BUILD_DIR = build/

all: build

coffee:
	coffee -c ${ALL_SRC_DIR}
	coffee -c ${ALL_TEST_DIR}

js: coffee
	cat ${JS_SRC_FILES} > ${BUILD_DIR}angular-ui.js
	uglifyjs -o ${BUILD_DIR}angular-ui.min.js --no-mangle --no-squeeze ${BUILD_DIR}angular-ui.js
	
css:
	lessc ${LESS_FILES} ${BUILD_DIR}angular-ui.css
	lessc ${LESS_FILES} ${BUILD_DIR}angular-ui.min.css -compress
		
build: js css

test: build
	testacular-run

.PHONY: all coffee js css build