export class Alerter
{
    private static readonly PI: number = Math.PI;
    /**
     * Alert
     */
    public static Alert(content: string): void
    {
        alert(`Alert from Blayms.Alerter:\n${content}\n\nPI: ${Alerter.PI}`);
    }
}
