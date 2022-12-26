# ur-time-calendar

Load your schedule from the SME's email, see it with a nice interface and Keep It For You !

Available at [this link](https://stephanebranly.github.io/ur-time-calendar/)

🍻 Send messages and say thanks to the author with a PayUTC transaction 🍻

Made with ❤️ by branlyst (Stéphane BRANLY)

## To update the semester organization

1. Fork the project [Fork a repo doc](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
2. Create a new semester organization file like [getP23organization](./src/data/getP23organization.ts)
3. Fill it with the right semester organization by following rules :
    - Use date intervals
    - Intervals cannot be on 2 different months
    - Intervals cannot overlap
    - The intervals are of the following format:
        ```YEAR/MM/DD-YEAR/MM/DD-W-S-R```
        * ```YEAR/MM/DD-YEAR/MM/DD``` With the first date corresponding to the start date of the interval, and the second the end date included in the interval.
        * ```W: 'A' | 'B' | 'x' ``` Alternating week
        * ```S: 'M' | 'F' | 'C' | 'H' | 'x'``` Special day label (Median, Final, Congé/Férié, Holiday)
        * ```R: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'x'``` Replacement day
    - In [App.tsx](./src/App.tsx), import and set the right semester organization state
    - Check everything is working
    - Create a pull request which will be merged in the reference repository 