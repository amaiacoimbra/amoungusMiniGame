startReactor = {

    computerCombination: [],
    playerCombination: [],
    computerCombinationPosition: 1,
    combinationMaxPosition: 5,
    memoryMaxCombination: 9,

    audio: {
        start: 'start.mp3',
        fail: 'fail.mp3',
        complete: 'complete.mp3',
        combinations: ['0.mp3', '1.mp3', '2.mp3', '3.mp3', '4.mp3', '5.mp3', '6.mp3', '7.mp3', '8.mp3'],


            loadAudio(filename) {

                const file = `./audio/${filename}?cb=${new Date().getTime()}`
                const audio = new Audio(file)
                audio.load()
                return audio
       
            },


            loadAudios() {

                if (typeof(startReactor.audio.start) == "object") return

                startReactor.audio.start = startReactor.audio.loadAudio(startReactor.audio.start)
                startReactor.audio.complete = startReactor.audio.loadAudio(startReactor.audio.complete)
                startReactor.audio.fail = startReactor.audio.loadAudio(startReactor.audio.fail)
                startReactor.audio.combinations = startReactor.audio.combinations.map ( (audio) => startReactor.audio.loadAudio(audio))

            }
    },
    interface: {

        memoryPanel: document.querySelector(".painelMemory"),
        computerLedPanel: document.querySelector(".computerLedPanel"),
        playerLedPanel: document.querySelector(".playerLedPanel"),
        playerMemory: document.querySelector(".playerMemory"),
        playerMemoryButtons: document.getElementsByClassName("player_memory"),

        turnLedOn(index, ledPanel) {

            ledPanel.children[index].classList.add('ledOn');
        },

        turnAllLedsOff() {

            const computerLedPanel = startReactor.interface.computerLedPanel
            const playerLedPanel = startReactor.interface.playerLedPanel

            for (var i = 0; i < computerLedPanel.children.length; i++) {
                computerLedPanel.children[i].classList.remove("ledOn");
                playerLedPanel.children[i].classList.remove("ledOn");
            }
        },

        async start() {
            return startReactor.audio.start.play()
        },

        playItem(index, combinationPosition, location = 'computer') {
            const leds = (location == 'computer') ? startReactor.interface.computerLedPanel : startReactor.interface.playerLedPanel
            const memPanel = startReactor.interface.memoryPanel.children[index]

            memPanel.classList.add("memoryActive")
            startReactor.interface.turnLedOn(combinationPosition, leds)
            startReactor.audio.combinations[index].play().then(() => {
                setTimeout(() => {
                    memPanel.classList.remove("memoryActive")
                }, 150)
            })
        },

        enableButtons() {

            const playerMemory = startReactor.interface.playerMemory
            playerMemory.classList.add('playerActive')

            for (var i = 0; i < playerMemory.children; i++) {
                if (playerMemory.children[i].tagName == "DIV")
                    playerMemory.children[i].classList.add("playerMemoryActive")
            }
        },

        disableButtons() {

            const playerMemory = startReactor.interface.playerMemory
            playerMemory.classList.remove('playerActive')

            for (var i = 0; i < playerMemory.children.length; i++) {
                if (playerMemory.children[i].tagName == "DIV")
                playerMemory.children[i].classList.remove("playerMemoryActive");
            }

        },


    },

    load() {},
    start() {
        startReactor.computerCombination = startReactor.createCombination()
        startReactor.computerCombinationPosition = 1
        startReactor.playerCombination = []
        startReactor.interface.start().then(() => {
            setTimeout(() => {
                startReactor.playerCombination()
            }, 500)
        })

    },

    createCombination() {

        let newCombination = []
        for (let n = 0; n < startReactor.combinationMaxPosition; n++) {
             const position = Math.floor((Math.random() * startReactor.memoryMaxCombination) + 1)
             newCombination.push(position-1)
        }
        return newCombination
    },

    playerCombination() {}

}