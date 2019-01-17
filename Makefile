.PHONY: start-front
start-front:
	@cd app && yarn start

.PHONY: start-back
start-back:
	@cd functions && yarn serve

.PHONY: deploy
deploy:
	@cd app && yarn build && @cd ../ && firebase deploy
	