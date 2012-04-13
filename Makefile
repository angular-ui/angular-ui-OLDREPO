JS_FILES = $(shell find modules -type f -name '*.js')
COFFEE_FILES = $(shell find modules -type f -name '*.coffee')

all: build

coffee:
	coffee -c ${COFFEE_FILES}

js: coffee
	cat ${JS_FILES} > build/angular-ui.js
	uglifyjs -o build/angular-ui.min.js --no-mangle --no-squeeze build/angular-ui.js
	
css:
	lessc modules/common/stylesheets/angular-ui.less build/angular-ui.css
	lessc modules/common/stylesheets/angular-ui.less build/angular-ui.min.css -compress
		
build: js css

.PHONY: all coffee js css build