
SRC_DIR = src/
LIB_DIR = lib/

JS_FILES = \
	${SRC_DIR}module.js\
	${SRC_DIR}directives/*.js\
	${SRC_DIR}filters/*.js

CSS_FILES = \
	${SRC_DIR}directives/*.css
	
js:
	cat ${JS_FILES} > ${LIB_DIR}angular-ui.js
	uglifyjs -o ${LIB_DIR}angular-ui.min.js --no-mangle --no-squeeze ${LIB_DIR}angular-ui.js
	
css:	
	cat ${CSS_FILES} > ${LIB_DIR}angular-ui.css

.PHONY: js css
