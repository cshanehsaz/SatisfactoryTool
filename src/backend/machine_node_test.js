//let file = require('./machine_node.js');

let a = new MachineNode('a');
let b = new MachineNode('b');
let c = new MachineNode('c');
let d = new MachineNode('d');

//tests parent-child functions
a.addChild(b);
a.addChild(c);
console.log('TEST 1: ' + (
    a.children[0]===b && 
    a.children[1]===c  
    ? "PASSED" : "FAILED"
));


//--------------------------


//tests output >= consumption
a.addOutput("iron", 2)
b.addMaxInput("iron", 1)
c.addMaxInput("iron", 1)

a.sendOutput()

console.log('TEST 2: ' + (
    b.getInput()[0].name === 'iron' &&
    c.getInput()[0].name === 'iron' &&
    b.getInput()[0].amount + c.getInput()[0].amount === a.getOutput().amount
    ? 'PASSED' : 'FAILED'
))


//--------------------------


a.addChild(d)

a.wipeInputOutput()
b.wipeAll()
c.wipeAll()

a.addOutput("iron", 12)
b.addMaxInput("iron", 5)
c.addMaxInput("iron", 5)
d.addMaxInput("iron", 5)

a.sendOutput()

console.log('TEST 3: ' + (
    b.getInput()[0].name === 'iron' &&
    c.getInput()[0].name === 'iron' &&
    d.getInput()[0].name === 'iron' &&
    b.getInputAmount('iron') + c.getInputAmount('iron') + d.getInputAmount('iron') === 
        a.getOutput().amount 
    ? 'PASSED' : 'FAILED'
))


//--------------------------


a.removeChild(b)

console.log('TEST 4: ' + (
    a.getChildren()[0] === c &&
    a.getChildren()[1] === d
    ? 'PASSED' : 'FAILED'
))

