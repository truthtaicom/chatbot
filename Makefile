.PHONY: start-front
start-front:
	@cd app && yarn start

.PHONY: start-back
start-back:
	@cd functions && yarn serve
	