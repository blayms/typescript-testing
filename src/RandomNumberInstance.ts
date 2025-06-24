export class RandomNumber
{
    public readonly min: number;
    public readonly max: number;
    private generatedNumber: number = 0;

    constructor(min: number, max: number)
    {
        this.min = min;
        this.max = max;
        RandomNumber.generateNumberFor(this);
    }

    private static generateNumberFor(rnd: RandomNumber): void
    {
        rnd.generatedNumber = Math.random() * (rnd.max - rnd.min) + rnd.min;
    }
    public get value(): number
    {
        return this.generatedNumber;
    }
}
