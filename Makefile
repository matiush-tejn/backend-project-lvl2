install:
	npm install

lint:
	npx eslint .

test:
	npm test

test-watch:
	npm test -- --watch

test-coverage:
	npm test -- --coverage

build:
	rm -rf dist
	npm run build

publish:
	npm publish --dry-run
