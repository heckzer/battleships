radio.onReceivedNumberDeprecated(function (receivedNumber) {
    if (receivedNumber >= 0) {
        music.playTone(554, music.beat(BeatFraction.Sixteenth))
        basic.pause(50)
        music.playTone(415, music.beat(BeatFraction.Sixteenth))
        basic.pause(50)
        music.playTone(311, music.beat(BeatFraction.Sixteenth))
        basic.pause(50)
        music.playTone(988, music.beat(BeatFraction.Sixteenth))
        basic.pause(50)
        music.playTone(988, music.beat(BeatFraction.Sixteenth))
        basic.pause(50)
        if (my_battle_area[receivedNumber] == 1) {
            my_battle_area[receivedNumber] = 0
            hit_y = Math.floor(receivedNumber / 5)
            hit_x = receivedNumber - 5 * hit_y
            led.unplot(hit_x, hit_y)
            soundExpression.hello.playUntilDone()
            radio.sendNumber(-1)
        } else {
            radio.sendNumber(-2)
        }
    } else {
        if (receivedNumber == -1) {
            soundExpression.soaring.playUntilDone()
            hit_count += 1
            led.plot(0, 0)
            led.unplot(4, 0)
            state = 1
            if (hit_count == 5) {
                basic.clearScreen()
                while (true) {
                    basic.showString("SIEGER!")
                    music.playMelody("C5 B A G F G A B ", 999)
                }
            }
        } else {
            if (receivedNumber == -2) {
                led.plot(4, 0)
                led.unplot(0, 0)
                state = 0
                soundExpression.sad.playUntilDone()
            }
        }
    }
})
input.onButtonPressed(Button.A, function () {
    music.playTone(262, music.beat(BeatFraction.Half))
    fire_x = (fire_x + 1) % 5
})
input.onButtonPressed(Button.AB, function () {
    music.playTone(932, music.beat(BeatFraction.Sixteenth))
    basic.pause(50)
    music.playTone(932, music.beat(BeatFraction.Sixteenth))
    basic.pause(50)
    music.playTone(932, music.beat(BeatFraction.Sixteenth))
    basic.pause(50)
    music.playTone(932, music.beat(BeatFraction.Sixteenth))
    basic.pause(50)
    music.playTone(932, music.beat(BeatFraction.Sixteenth))
    basic.pause(50)
    radio.sendNumber(fire_x + 5 * fire_y)
    fire_x = 0
    fire_y = 1
})
input.onButtonPressed(Button.B, function () {
    music.playTone(392, music.beat(BeatFraction.Half))
    fire_y = (fire_y + 1) % 5
    if (fire_y == 0) {
        fire_y = 1
    }
})
let hit_x = 0
let hit_y = 0
let index = 0
let position_y = 0
let position_x = 0
let my_battle_area: number[] = []
let state = 0
let hit_count = 0
let fire_y = 0
let fire_x = 0
radio.setGroup(888)
fire_x = 0
fire_y = 1
hit_count = 0
state = 0
my_battle_area = []
let strip = neopixel.create(DigitalPin.P0, 5, NeoPixelMode.RGB)
strip.setBrightness(20)
strip.showRainbow(1, 360)
images.createImage(`
    # # . # #
    . # . # .
    . . # . .
    . # . # .
    # # . # #
    `).showImage(0)
music.playMelody("C C E C G G G - ", 360)
basic.pause(1000)
images.createImage(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `).showImage(0)
for (let index2 = 0; index2 < 25; index2++) {
    my_battle_area.push(0)
}
let number_of_ships = 5
while (number_of_ships > 0) {
    position_x = randint(0, 4)
    position_y = 1 + randint(0, 3)
    index = position_x + 5 * position_y
    if (my_battle_area[index] == 0) {
        my_battle_area[index] = 1
        led.plot(position_x, position_y)
        number_of_ships += 0 - 1
    }
}
basic.forever(function () {
    led.unplot(fire_x, fire_y)
    basic.pause(200)
    led.plot(fire_x, fire_y)
    basic.pause(200)
    for (let index3 = 0; index3 <= 25; index3++) {
        position_y = Math.floor(index3 / 5)
        position_x = index3 - 5 * position_y
        if (my_battle_area[index3] == 1) {
            led.plot(position_x, position_y)
        } else {
            led.unplot(position_x, position_y)
        }
    }
    if (state == 0) {
        led.plot(0, 0)
        led.unplot(4, 0)
    } else {
        led.plot(4, 0)
        led.unplot(0, 0)
    }
    basic.pause(200)
})
