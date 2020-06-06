class MachineNode {
    constructor(_name) {
        this.name = _name;
        this.children = [];
        this.maxInput = [];
        this.input = []; //[{name: a, amount:x}, ...]
        this.output = {};
        // this.width;
        // this.height;
        // this.cost = [];
    }

    getInput() {
        return (this.input)
    }

    getOutput() {
        return (this.output)
    }

    getChildren() {
        return (this.children)
    }

    getMaxInput() {
        return (this.maxInput)
    }

    addInput(_name, _amount) {
        this.input.push({
            name: _name, 
            amount: _amount
        })
    }

    addMaxInput(_name, _amount) {
        this.maxInput.push({
            name: _name, 
            amount: _amount
        })
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
            else { return (0) }
        }
    }

    getMaxInputAmount(material) {
        for (let input of this.getMaxInput()) {
            if(input.name === material) { return (input.amount) }
            else { return (0) }
        }
    }


    // edit this so that it correctly splits the output 
    // and records how much of what is sent to which child
    sendOutput() { 
        let children = this.getChildren()
        let consumption = 0; //total amount of output consumed by children
        let material = this.getOutput().name

        for (let child of children) {
            consumption += child.getMaxInputAmount(material)
        }

        if (consumption >= this.getOutput().amount) { //if consumption > output, split evenly
            let split = Math.round(this.getOutput().amount / children.length)
            for (let child of children) {
                child.addInput(material, split)
            }
        } 
        
        else { //split so that each child gets their max input
            for (let child of children) {
                child.addInput(material, child.getMaxInputAmount(material))
            }
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

    wipeInputOutput() {
        this.input = []; //[{name: a, amount:x}, ...]
        this.output = {};
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