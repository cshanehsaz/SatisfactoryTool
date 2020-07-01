export default class MachineNode {
    constructor(_name, _input1, _input2, _input3, _input4, _output) {
        this.name = _name;
        this.children = [];
        this.input1 = _input1; // {name:, amount:, max: }
        this.input2 = _input2;
        this.input3 = _input3;
        this.input4 = _input4;
        this.output = _output;
        this.currentOutput = [];
        this.before = 0;
        // this.width;
        // this.height;
        // this.cost = [];
    }

    getOutput() {
        return (this.output)
    }

    getCurrentOutput() {
        return (this.currentOutput)
    }

    addCurrentOutput(child, material, amount) {
        //if output to child already exists, only update amount
        //if output to child does not exist, add new output object
        let search = this.findOutputAmountToChild(child)
        if ( search !== 0) { 
            search = amount 
        } else {
            let out = {child: child, material: material, amount: amount}
            this.getCurrentOutput().push(out)
        }
        
    }

    setCurrentOutputToChild(child, material, amount) {
        for(let output of this.getCurrentOutput()) {
            if(output.child === child) {
                output.material = material
                output.amount = amount
                return
            }
        }
        this.addCurrentOutput(child, material, amount)

    }

    findOutputAmountToChild(child) {
        for(let output of this.getCurrentOutput()) {
            if(output.child === child) { 
                console.log('findOutputAmountToChild: ' + output.amount)
                return output.amount }
        }
        return(0)
    }

    getChildren() {
        return (this.children)
    }

    getInput1() {
        return (this.input1)
    }

    getInput2() {
        return (this.input2)
    }

    getInput3() {
        return (this.input3)
    }

    getInput4() {
        return (this.input4)
    }

    getInput() {
        return([
            this.getInput1(), this.getInput2(), this.getInput3(), this.getInput4()
        ])
    }

    getAvailableInput(material) {
        return(this.getInputMax(material) - this.getInputAmount(material))
    }

    addInput(material, amount) {
        console.log(this.getInput())
        for (let input of this.getInput()) {
            if(input.name === material) {
                input.amount = input.amount + amount//Math.min(input.amount + _amount, this.getInputMax(material))
                return(input.amount)
            }
        }
    }

    setInput(material, amount) {
        for (let input of this.getInput()) {
            if(input.name === material) {
                input.amount = amount;
                return (input)
            }
        }
        return (-1)
    }

    removeInput(material, amount) {
        for (let input of this.getInput()) {
            if(input.name === material) {
                input.amount -= amount
                return(input.amount)
            }
        }
    }

    addOutput(_name, _amount) {
        this.output = {
            name: _name,
            amount: _amount
        }
    }

    getInputAmount(material) {
        for (let input of this.getInput()) {
            if(input.name === material) { return (input.amount) }
        }
        return(0)
    }

    checkInput(material) {
        for (let input of this.getInput()) {
            if(input.name === material) { return (true) }
        }
        return (false)
    }

    getInputMax(material) {
        for (let input of this.getInput()) {
            if(input.name === material) { return(input.max) } 
        }
        return(0)
    }


    // edit this so that it correctly splits the output 
    // and records how much of what is sent to which child

    sendOutput() {
        let material = this.getOutput().name;
        let amount = this.getOutput().amount;
        let allChildren = this.getChildren();
        let children = [];

        //only include children that accept the output
        for(let child of allChildren) {
            if( child.checkInput(material) ) { children.push(child) }
        }

        let numChildren = children.length
        let split = this.getOutput().amount / numChildren

        //saves what the input was prior to any changes for later
        for(let child of children) {
            child.before = child.getInputAmount(material)
        }

        //removes all previous input from the parent node
        for(let i=0; i < (children.length - 1); i++) {
            children[i].removeInput(material, this.findOutputAmountToChild(children[i]) )
        }
        

        //if too much output, just set all to max
        let availableInput = 0;
        for (let child of children) {
            availableInput += child.getAvailableInput(material)
        }
        if(availableInput < amount) {
            for(let child of children) {
                child.setInput(material, child.getInputMax(material))
            }
            return
        }
        
        for (let child of children) {
            child.addInput(material, split)
        }

        MachineNode.evenOutputSplit(children, material)

        for(let child of children) {
            let amountSent = child.getInputAmount(material) - (child.before - this.findOutputAmountToChild(child))
            this.setCurrentOutputToChild(child, material, amountSent)
        }
    }

    static evenOutputSplit(children, material) {
        if(children.length <= 1){return}

        let i = 0;
        let countGood = 0;
        // let childrenToUpdate = [];

        while(true) { //make all children even split and not above max
            let diff = children[i].getAvailableInput(material)
            let nextChild = ( i+1 >= children.length ) ? 0 : i+1

            if(diff <= 0) {
                children[i].setInput( material, children[i].getInputAmount(material) - 1 )
                children[nextChild].setInput (material, children[nextChild].getInputAmount(material) + 1 )
                countGood = 0;
            } else {
                countGood++
            }
            
            i=nextChild;

            if (countGood === children.length) { break }
        }
    }

    wipeOutputToChildren(output, children) {
        if(children.length <= 1){ return }
        console.log('wiped')
        let split = Math.round( output.amount / Math.max( children.length, 1 ) )
        for (let child of children) {
            child.removeInput(output.name, split)
        }
    }

    splitOutput(output, children) {
        let material = output.name
        let amount = output.amount
        this.wipeOutputToChildren(output, children)
        let countAtMax = 0;

        //if at full capacity don't count in the split
        for(let child of children) {
            if(child.getInputAmount(material) === child.getInputMax(material)) { countAtMax += 1 }
        }

        let split = Math.round(amount / (children.length - countAtMax) )

        for (let child of children) {
            child.addInput(
                material,
                split
            )
            amount -= split
        }

        if(amount > 0) {
            this.splitOutput(material, amount, children)
        }
    }

    addChild(_child) { //sets a child node and adds parent
        this.children.push(_child);
    }
    
    removeChild(_child) {
        for (let child of this.getChildren()) {
            if (_child === child) {
                this.children = this.getChildren().filter( (c) => {
                    return (c !== _child)
                })
            }
        }
    }

    wipeInput() {
        this.input = [];
    }

    wipeInputOutput() {
        this.input = []; //[{name: a, amount:x}, ...]
        this.output = {};
    }

    wipeChildrenInput() {
        for(let child of this.children) {
            child.wipeInput()
        }
    }

    wipeChildren() {
        this.children = [];
    }

    wipeAll() {
        this.children = [];
        this.maxInput = [];
        this.input = []; //[{name: a, amount:x}, ...]
        this.output = {};
    }

}