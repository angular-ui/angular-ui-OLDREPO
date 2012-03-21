
JS_SRC_DIR = src/
JS_LIB_DIR = lib/

JS_FILES = \
	${JS_SRC_DIR}linky.js\
	${JS_SRC_DIR}scrollfix.js

js:
	cat ${JS_FILES} > ${JS_LIB_DIR}directives.js
	uglifyjs -o ${JS_LIB_DIR}directives.min.js --no-mangle --no-squeeze ${JS_LIB_DIR}directives.js

.PHONY: js