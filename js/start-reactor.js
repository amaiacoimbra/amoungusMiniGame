startReactor = {

    computerCombination: [],
    playerCombination: [],
    computerCombinationPosition: 1,
    combinationMaxPosition: 5,
    memoryMaxCombination: 9,

    audio: {},
    interface: {},

    load() {},
    start() {
        startReactor.computerCombination = startReactor.createCombination()
        startReactor.computerCombinationPosition = 1
        startReactor.playerCombination = []

    },

    createCombination() {

        let newCombination = []
        for (let n = 0; n < startReactor.combinationMaxPosition; n++) {
             const position = Math.floor((Math.random() * startReactor.memoryMaxCombination) + 1)
             newCombination.push(position-1)
        }
        return newCombination
    },

}