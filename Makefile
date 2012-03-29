
JS_SRC_DIR = src/js/
COFFEE_SCRIPT_SRC_DIR = src/coffee-script/
LESS_SRC_DIR = src/less/
LIB_DIR = lib/

JS_FILES = \
	${JS_SRC_DIR}module.js\
	${JS_SRC_DIR}directives/*.js\
	${JS_SRC_DIR}filters/*.js

coffee:
	coffee -co ${JS_SRC_DIR} ${COFFEE_SCRIPT_SRC_DIR}

js:
	cat ${JS_FILES} > ${LIB_DIR}angular-ui.js
	uglifyjs -o ${LIB_DIR}angular-ui.min.js --no-mangle --no-squeeze ${LIB_DIR}angular-ui.js
	
css:	
	lessc ${LESS_SRC_DIR}angular-ui.less ${LIB_DIR}angular-ui.css
	lessc ${LESS_SRC_DIR}angular-ui.less ${LIB_DIR}angular-ui.min.css -compress
		
build: js css

.PHONY: js css
