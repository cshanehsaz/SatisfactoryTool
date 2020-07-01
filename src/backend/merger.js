export default class Merger {
    constructor(_name) {
        this.name = _name;
        this.children = [];
        this.material = '';
        this.amount = 0;
        this.max = 0;
        this.output = {};
    }

    getMaterial() {
        return this.material;
    }

    setMaterial(mat) {
        this.material = mat;
    }

    addToMax(amount) {
        this.max += amount;
    }

    getAmount() {
        return this.amount;
    }

    getOutput() {
        return this.output
    }

    getChildren() {
        return this.children
    }
    
    updateMaxInput() {
        for (let child of this.getChildren()) {
            if(child.checkInput(this.getMaterial())) {
                this.addToMax(child.getInputMax(this.getMaterial()))
            }
        }
    }

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

}