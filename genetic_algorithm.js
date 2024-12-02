import { Individual } from "./individual.js";

class GeneticAlgorithm {
    constructor(nPopulation, nDimensi, revenueFunction) {
        this.nPopulation = nPopulation;
        this.nDimensi = nDimensi;
        this.revenueFunction = revenueFunction;
        this.population = [];
        this.gbestFitness = -Infinity;
        this.gbestGenes = [];
        this.mutationRate = 0.1; // Tingkat mutasi 10%
        this.init_population();
    }

    init_population() {
        for (let i = 0; i < this.nPopulation; i++) {
            const individual = new Individual(this.nDimensi, this.revenueFunction);
            individual.calculateFitness();
            this.population.push(individual);
        }
    }

    evaluatePopulation() {
        this.population.forEach(individual => {
            individual.calculateFitness();
            if (individual.fitness > this.gbestFitness) {
                this.gbestFitness = individual.fitness;
                this.gbestGenes = [...individual.genes];
            }
        });
    }

    selection() {
        const validIndividuals = this.population.filter(individual => individual.fitness !== -Infinity);
        return validIndividuals.sort((a, b) => b.fitness - a.fitness).slice(0, this.nPopulation / 2);
    }


    crossover(parent1, parent2) {
        const crossoverPoint = Math.floor(Math.random() * parent1.genes.length);
        const child1Genes = [...parent1.genes.slice(0, crossoverPoint), ...parent2.genes.slice(crossoverPoint)];
        const child2Genes = [...parent2.genes.slice(0, crossoverPoint), ...parent1.genes.slice(crossoverPoint)];
        const child1 = new Individual(this.nDimensi, this.revenueFunction);
        const child2 = new Individual(this.nDimensi, this.revenueFunction);
        child1.genes = child1Genes;
        child2.genes = child2Genes;
        return [child1, child2];
    }

    mutate(individual) {
        if (Math.random() < this.mutationRate) {
            const geneIndex = Math.floor(Math.random() * individual.genes.length);
            individual.genes[geneIndex] = Math.floor(Math.random() * 10);

            this.ensureValidGenes(individual);
        }
    }

    ensureValidGenes(individual) {
        let [keju, isi, tawar] = individual.genes;
        keju = Math.min(Math.max(keju, 0), 10);
        isi = Math.min(Math.max(isi, 0), 10);
        tawar = Math.min(Math.max(tawar, 0), 10);
        individual.genes = [keju, isi, tawar];
        individual.calculateFitness();
    }


    generateNewPopulation() {
        const selected = this.selection();
        const newPopulation = [];
        while (newPopulation.length < this.nPopulation) {
            const parent1 = selected[Math.floor(Math.random() * selected.length)];
            const parent2 = selected[Math.floor(Math.random() * selected.length)];
            const [child1, child2] = this.crossover(parent1, parent2);

            this.mutate(child1);
            this.mutate(child2);

            if (child1.fitness !== -Infinity) newPopulation.push(child1);
            if (child2.fitness !== -Infinity) newPopulation.push(child2);
        }
        this.population = newPopulation.slice(0, this.nPopulation);
    }


    mainGA(maxGenerations) {
        for (let generation = 0; generation < maxGenerations; generation++) {
            this.evaluatePopulation();
            this.generateNewPopulation();
            console.log(`Generasi ${generation + 1}, Gbest Fitness: ${this.gbestFitness}, Gen Terbaik: ${this.gbestGenes}`);
        }
    }
}

export { GeneticAlgorithm };
