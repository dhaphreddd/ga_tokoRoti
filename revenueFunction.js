function revenueFunction(keju, isi, tawar) {
    const tepung = 100 * keju + 150 * isi + 200 * tawar;
    const margarin = 5 * keju + 3 * isi + 2 * tawar;
    const telur = keju + isi + 0.5 * tawar;
    const gula = 50 * keju + 80 * isi + 30 * tawar;

    if (tepung > 5000 || margarin > 50 || telur > 20 || gula > 1000) {
        return -Infinity;
    }

    return (10000 * keju + 15000 * isi + 12000 * tawar);
}

export { revenueFunction };
