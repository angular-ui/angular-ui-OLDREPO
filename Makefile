JS_SRC_FILES = $(shell find modules -type f -path '*/src/*.js')
JS_TEST_FILES = $(shell find modules -type f -path '*/test/*.js')
COFFEE_FILES = $(shell find modules -type f -name '*.coffee')

all: build

coffee:
	coffee -c --bare ${COFFEE_FILES}

js: coffee
	cat common/src/*.js ${JS_SRC_FILES} > build/angular-ui.js
	uglifyjs -o build/angular-ui.min.js --no-mangle --no-squeeze build/angular-ui.js

ieshiv:
	cp common/ieshiv/src/*.js build/angular-ui-ieshiv.js
	uglifyjs -o build/angular-ui-ieshiv.min.js --no-mangle --no-squeeze build/angular-ui-ieshiv.js

css:
	lessc common/stylesheets/angular-ui.less build/angular-ui.css
	lessc common/stylesheets/angular-ui.less build/angular-ui.min.css -compress

build: js css ieshiv

test: build
	testacular-run

.PHONY: all coffee js css build