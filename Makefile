install:
	npm install

lint:
	npx eslint .

build:
	rm -rf dist
	npm run build

publish:
	npm publish --dry-run
