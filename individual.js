class Individual {
    constructor(nDimensi, revenueFunction) {
        this.revenueFunction = revenueFunction;
        this.genes = Array(nDimensi).fill(0).map(() => Math.floor(Math.random() * 10));
        this.fitness = -Infinity;
    }

    calculateFitness() {
        this.fitness = this.revenueFunction(...this.genes);
        console.log(`Gen: ${this.genes}, Fitness: ${this.fitness}`);
    }
}

export { Individual };
